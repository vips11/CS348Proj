import random
import uuid

from flask_restful import Resource
from flask import jsonify, make_response, request

from helper import *


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


class GetStudents(Resource):
    def post(self):
        dto = request.json
        key = dto["key"]
        firstName = dto['firstName']
        lastName = dto['lastName']
        term = dto['term']
        program = dto["program"]
        company = dto["company"]

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
            query = "select * from STUDENT"
            rows = intersect(rows, executeQuery(query), isFirst)
            isFirst = False
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
                query = f"select * from STUDENT where program = '{program}'"
                rows = intersect(rows, executeQuery(query), isFirst)
                isFirst = False
            if company != "":
                query = f"select * from STUDENT, COMPANY natural join WORKS where COMPANY.name like '%{company}%';"
                rows = intersect(rows, executeQuery(query), isFirst)

            response["students"] = rows
        except Exception as e:
            print("Error", e)

        response = jsonify(response)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response


class UpdateStudent(Resource):
    def post(self):
        dto = request.json
        print(dto)
        key = dto["key"]
        first_name = dto['firstName']
        last_name = dto['lastName']
        program = dto['program']
        term = dto['term']
        description = dto['description']

        response = {"success": False}
        try:
            if key is None:
                response["message"] = "No id provided"
                raise Exception

            query = f"select id from student where uw_email = '{key}'"
            studentId = executeQuery(query)[0][0]
            print(studentId)

            con = sl.connect('applicationDb.db')
            cursor = con.cursor()
            if first_name is not None:
                query = f"Update Student Set first_name = '{first_name}' Where uw_email = '{key}'"
                cursor.execute(query)
            if last_name is not None:
                query = f"Update Student Set last_name = '{last_name}' Where uw_email = '{key}'"
                cursor.execute(query)
            if program is not None:
                query = f"Update Student Set program = '{program}' Where uw_email = '{key}'"
                cursor.execute(query)
            if term is not None:
                query = f"Update Student Set term = '{term}' Where uw_email = '{key}'"
                cursor.execute(query)
            if description is not None:
                query = f"Update Student Set description = '{description}' Where uw_email = '{key}'"
                cursor.execute(query)

            if "socials" in dto:
                for social in dto["socials"]:
                    query = f"""INSERT OR IGNORE INTO SOCIALS VALUES 
                                        ({studentId}, "{social["platform"]}", "{social["link"]}")"""
                    print(query)
                    cursor.execute(query)

            if "courses" in dto:
                for course in dto["courses"]:
                    query = f"""INSERT OR IGNORE INTO TAKES VALUES 
                        ({studentId}, "{course["course_ID"]}", {course["section_ID"]}, "{course["semester"]}", {course["year"]}, "{course["term"]}")"""
                    cursor.execute(query)

            if "works" in dto:
                for work in dto["works"]:
                    companyId = random.randint(100, 9999)
                    jobId = random.randint(100, 9999)

                    query = f"""
                        INSERT OR IGNORE INTO COMPANY VALUES 
                        ({companyId}, "{work["company"]}")
                    """
                    cursor.execute(query)

                    query = f"""
                        INSERT OR IGNORE INTO JOB VALUES 
                        ({jobId}, "{work["position"]}", "{work["isFullTime"]}", {companyId})
                    """
                    con.execute(query)

                    query = f"""INSERT OR IGNORE INTO WORKS VALUES 
                        ("{work["term"]}", "{work["semester"]}", "{work["year"]}", {studentId},
                        {jobId}, {companyId})
                    """
                    cursor.execute(query)

            con.commit()

            response["success"] = True
        except Exception as e:
            print("Error", e)

        response = jsonify(response)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response


class CreateStudent(Resource):
    def post(self):
        dto = request.json
        print(dto)
        response = {
            "success": False
        }
        try:
            con = sl.connect('applicationDb.db')
            cursor = con.cursor()

            query = f"""INSERT OR IGNORE INTO STUDENT VALUES 
                    ({dto["id"]}, "{dto["firstName"]}", "{dto["lastName"]}", "{dto["currentTerm"]}",  "{dto["semester"]}",  {dto["year"]},
                    "{dto["uw_email"]}", "{dto["program"]}", "{dto["description"]}")"""
            print(query)

            cursor.execute(query)

            if "username" in dto and "password" in dto:
                query = f"""
                    INSERT OR IGNORE INTO AUTHORISATION VALUES 
                    ({dto["id"]}, "{dto["username"]}", "{dto["password"]}")
                """
                con.execute(query)

            response["success"] = True
            print(response)
            con.commit()
        except Exception as e:
            print("Error: ", e)

        response = jsonify(response)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response


class DetailedStudent(Resource):
    def post(self):
        dto = request.json
        key = dto["key"]
        student = {}

        try:
            query1 = f"select * from student where uw_email = '{key}'"
            query2 = f"""select student_id, T.term as takesTerm, T.semester as semester, 
                        T.year as year, course_id from STUDENT as S join TAKES T 
                        on S.id = T.student_id where S.uw_email = '{key}'"""

            print("hi")
            row = executeQuery(query1)[0]
            print("hi")
            print(row)

            query3 = f"""select student_id, term, semester, year, name as company_name, position_name from 
                                    WORKS natural join COMPANY natural join JOB where student_id = '{row[0]}'"""

            query4 = f"""select platform, link from SOCIALS where id = '{row[0]}'"""

            student = {
                "student_id": row[0],
                "firstName": row[1],
                "lastName": row[2],
                "currentTerm": row[3],
                "program": row[7],
                "startYear": row[5],
                "email": row[6],
                "description": row[8],
            }

            print("hi")

            rows = executeQuery(query2)
            rows += executeQuery(query3)
            timeline = getTimeline(rows)

            rows = executeQuery(query4)
            socials = []
            for row in rows:
                socials.append({
                    "type": row[0],
                    "link": row[1]
                })

            student["links"] = socials
            student["timeline"] = timeline
        except Exception as e:
            print("Error: ", e)

        response = jsonify(student)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response


class FindAMentor(Resource):
    def post(self):
        dto = request.json
        courseName = dto["courseName"]
        year = dto["year"]
        sem = dto["semester"]

        response = []
        try:
            con = sl.connect('applicationDb.db')
            query = f"select uw_email, first_name, last_name from Takes join Student on student_id = id  " \
                    f"where course_ID = '{courseName}' and Takes.year < {year} and " \
                    f"Takes.semester <> '{sem}'"

            cursor = con.cursor()
            cursor.execute(query)
            rows = cursor.fetchall()

            result = []

            for row in rows:
                result.append({
                    "email": row[0],
                    "firstName": row[1],
                    "lastName": row[2]
                })

            response = result
        except Exception as e:
            print("Error", e)

        response = jsonify(response)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response


class FindAStudyGroup(Resource):
    def post(self):
        dto = request.json
        key = dto["key"]
        semester = dto["semester"]
        year = dto["year"]

        response = {
            "students": []
        }
        try:
            con = sl.connect('applicationDb.db')

            query = f"select id from student where uw_email = '{key}'"
            studentId = executeQuery(query)[0][0]
            print(studentId)

            query = f"""
                SELECT s.ID, s.first_name, s.last_name, s.uw_email, s.program, s.description
                FROM Student s JOIN Takes t ON s.ID = t.student_ID
                JOIN Section sec ON t.course_ID = sec.course_ID AND t.section_ID = sec.section_ID AND t.semester = sec.semester AND t.year = sec.year
                WHERE sec.semester = '{semester}' AND sec.year = {year}
                AND t.student_id <> {studentId} AND t.course_ID IN (
                SELECT t2.course_ID FROM Takes t2
                WHERE t2.student_id = {studentId})
                GROUP BY s.ID HAVING COUNT(DISTINCT t.course_ID) >= 3
            """

            print(query)

            cursor = con.cursor()
            cursor.execute(query)
            rows = cursor.fetchall()

            result = []

            for row in rows:
                result.append({
                    "firstName": row[1],
                    "lastName": row[2],
                    "id": row[0]
                })

            response = {
                "students": result
            }
        except Exception as e:
            print("Error", e)

        response = jsonify(response)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response


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

        response = jsonify(response)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response


class Authorize(Resource):
    def post(self):
        dto = request.json
        response = {
            "authorize": False
        }

        try:
            username = dto["username"]
            password = dto["password"]

            con = sl.connect('applicationDb.db')
            query = f"SELECT * from AUTHORISATION WHERE uw_email = '{username}' and password = '{password}'"
            print(query)

            cursor = con.cursor()
            cursor.execute(query)
            rows = cursor.fetchall()
            print(rows)

            if len(rows) > 0:
                response["authorize"] = True
        except Exception as e:
            print("Error: ", e)

        response = jsonify(response)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
