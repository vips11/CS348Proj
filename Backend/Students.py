from flask_restful import Resource
from flask import jsonify, make_response, request
import sqlite3 as sl

from Backend.helper import *


def intersect(list1, list2, isFirst):
    EMAIL_INDEX = 6
    FNAME_INDEX = 1
    LNAME_INDEX = 2
    TERM_INDEX = 3
    PROGRAM_INDEX = 7
    intersect = []

    if isFirst:
        for student in list2:
            newStudent = {
                "key": student[EMAIL_INDEX],
                "firstName": student[FNAME_INDEX],
                "lastName": student[LNAME_INDEX],
                "termInfo": getTermInfo(student[TERM_INDEX], student[PROGRAM_INDEX])
            }

            intersect.append(newStudent)

        return intersect

    for student1 in list1:
        for student2 in list2:
            if student2[EMAIL_INDEX] == student1["key"]:
                intersect.append(student1)
                break

    return intersect


# def prepareDetailedStudent(student):


class Students(Resource):
    def get(self):
        dto = request.json
        firstName = lastName = term = program = company = key = ""
        if "firstName" in dto:
            firstName = dto["firstName"]
        if "lastName" in dto:
            lastName = dto["lastName"]
        if "term" in dto:
            term = dto["term"]
        if "program" in dto:
            program = dto["program"]
        if "company" in dto:
            company = dto["program"]

        response = {
            "students": []
        }
        try:
            rows = []
            if key != "":
                query = f"select * from STUDENT where uw_email = '{key}'"
                response["students"] = executeQuery(query)

                return make_response(jsonify(response), 200)

            isFirst = True
            if firstName != "":
                query = f"select * from STUDENT where first_name like '%{firstName}%'"
                rows = intersect(rows, executeQuery(query), isFirst)
                isFirst = False
            if lastName != "":
                query = f"select * from STUDENT where last_name like '%{lastName}%'"
                rows = intersect(rows, executeQuery(query), isFirst)
                isFirst = False
            if term != "":
                query = f"select * from STUDENT where term = '{term}'"
                rows = intersect(rows, executeQuery(query), isFirst)
                isFirst = False
            if program != "":
                query = f"select * from STUDENT where term = '{term}'"
                rows = intersect(rows, executeQuery(query), isFirst)
                isFirst = False
            if company != "":
                query = f"select * from STUDENT, COMPANY natural join WORKS where COMPANY.name like '%{company}%';"
                rows = intersect(rows, executeQuery(query), isFirst)
                isFirst = False

            response["students"] = rows
        except Exception as e:
            print("Error", e)

        return make_response(jsonify(response), 200)

    def post(self):
        dto = request.json
        key = dto["key"]
        first_name = dto['firstName']
        last_name = dto['lastName']
        program = dto['curProgram']
        term = dto['curTerm']
        description = dto['term']

        response = {"success": False}
        try:
            if key is None:
                response["message"] = "No id provided"
                raise Exception

            con = sl.connect('applicationDb.db')
            cursor = con.cursor()
            if first_name is not None:
                query = f"Update Student Set first_name = '{first_name}' Where uw_email = {key}"
                cursor.execute(query)
            if last_name is not None:
                query = f"Update Student Set last_name = '{last_name}' Where uw_email = {key}"
                cursor.execute(query)
            if program is not None:
                query = f"Update Student Set program = '{program}' Where uw_email = {key}"
                cursor.execute(query)
            if term is not None:
                query = f"Update Student Set term = '{term}' Where uw_email = {key}"
                cursor.execute(query)
            if description is not None:
                query = f"Update Student Set description = '{description}' Where uw_email = {key}"
                cursor.execute(query)

            con.commit()

            response["success"] = True
        except Exception as e:
            print("Error", e)

        return make_response(jsonify(response), 200)


# def updateStudentTerms(Resource):
#     def post(self):
#         dto = request.json
#         key = dto["key"]
#         term = dto['curTerm']
#         description = dto['term']
#
#         response = {"success": False}
#         try:
#             if key is None:
#                 response["message"] = "No id provided"
#                 raise Exception
#
#             con = sl.connect('applicationDb.db')
#
#             con.commit()
#
#             response["success"] = True
#         except Exception as e:
#             print("Error", e)
#
#         return make_response(jsonify(response), 200)


class DetailedStudent(Resource):
    def get(self):
        dto = request.json
        key = dto["key"]
        student = {}

        try:
            query1 = f"select * from student where uw_email = '{key}'"
            query2 = f"""select student_id, T.term as term, S.semester as semester, 
                        S.year as year, course_id from STUDENT as S join TAKES T 
                        on S.id = T.student_id where S.uw_email = '{key}'"""

            row = executeQuery(query1)[0]

            query3 = f"""select student_id, term, semester, year, name as company_name, position_name from 
                                    WORKS natural join COMPANY natural join JOB where student_id = '{row[0]}'"""

            student = {
                "student_id": row[0],
                "firstName": row[1],
                "lastName": row[2],
                "CurTerm": row[3],
                "CurSemester": row[4],
                "startYear": row[5],
                "uw_email": row[6],
                "description": row[7],
            }

            rows = executeQuery(query2)
            rows += executeQuery(query3)
            timeline = getTimeline(rows)

            student["timeline"] = timeline
        except Exception as e:
            print("Error: ", e)

        return make_response(jsonify(student), 200)


class FindAMentor(Resource):
    def get(self):
        courseName = request.args.get('course')

        response = {
            "students": []
        }
        try:
            con = sl.connect('applicationDb.db')
            query = f"select first_name, last_name from Takes join Student on student_id = id  where course_ID = '{courseName}' and Takes.year < 2023"

            print(query)

            cursor = con.cursor()
            cursor.execute(query)
            rows = cursor.fetchall()

            response = {
                "students": rows
            }
        except Exception as e:
            print("Error", e)

        return make_response(jsonify(response), 200)


class FindAFriend(Resource):

    def get(self):

        response = {
            "students": []
        }

        try:
            con = sl.connect('applicationDb.db')
            query = f"select distinct first_name, last_name, uw_email from Student s join Interested i1 ON s.id = i1.student_id join Interested i2 ON i1.interest_id = i2.interest_id AND i2.student_id = id WHERE s.id <> id group by s.id having count(DISTINCT i1.interest_id) >= 1"

            print(query)

            cursor = con.cursor()
            cursor.execute(query)
            rows = cursor.fetchall()

            response = {
                "students": rows
            }

        except Exception as e:
            print("Error", e)

        return make_response(jsonify(response), 200)


class Authorize(Resource):
    def get(self):
        response = {
            "authorize": False
        }

        try:
            username = request.args.get('user')
            password = request.args.get("pwd")

            con = sl.connect('applicationDb.db')
            query = f"SELECT * from AUTHORISATION WHERE uw_email = '{username}' and password = '{password}'"

            cursor = con.cursor()
            cursor.execute(query)
            rows = cursor.fetchall()

            if len(rows) > 0:
                response["authorize"] = True
        except Exception as e:
            print("Error: ", e)

        return make_response(jsonify(response), 200)
