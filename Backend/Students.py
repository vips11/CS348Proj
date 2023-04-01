from flask_restful import Resource
from flask import jsonify, make_response, request
import sqlite3 as sl

from Backend.helper import *


def intersect(list1, list2):
    intersect = []
    for student1 in list1:
        for student2 in list2:
            if student2["uw_email"] == student1["uw_email"]:
                student2["termInfo"] = student2["term"] + " " + student2["program"]
                student2["key"] = student2["uw_email"]
                intersect.append(student2)
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

            if firstName != "":
                query = f"select * from STUDENT where first_name like '%{firstName}%'"
                rows = intersect(rows, executeQuery(query))
            if lastName != "":
                query = f"select * from STUDENT where last_name like '%{lastName}%'"
                rows = intersect(rows, executeQuery(query))
            if term != "":
                query = f"select * from STUDENT where term = '{term}'"
                rows = intersect(rows, executeQuery(query))
            if program != "":
                query = f"select * from STUDENT where term = '{term}'"
                rows = intersect(rows, executeQuery(query))
            if company != "":
                query = f"select * from STUDENT, COMPANY natural join WORKS where COMPANY.name like '%{company}%';"
                rows = intersect(rows, executeQuery(query))

            response["students"] = rows
        except Exception as e:
            print("Error", e)

        return make_response(jsonify(response), 200)

    def post(self):
        id = request.args.get('id')
        first_name = request.args.get('first_name')
        last_name = request.args.get('last_name')
        program = request.args.get('program')
        term = request.args.get('term')

        response = {"success": False}
        try:
            if id is None:
                response["message"] = "No id provided"
                raise Exception

            con = sl.connect('applicationDb.db')
            cursor = con.cursor()
            if first_name is not None:
                query = f"Update Student Set first_name = '{first_name}' Where ID = {id}"
                cursor.execute(query)
            if last_name is not None:
                query = f"Update Student Set last_name = '{last_name}' Where ID = {id}"
                cursor.execute(query)
            if program is not None:
                query = f"Update Student Set program = '{program}' Where ID = {id}"
                cursor.execute(query)
            if term is not None:
                query = f"Update Student Set term = '{term}' Where ID = {id}"
                cursor.execute(query)
            if program is not None:
                query = f"Update Student Set term = '{program}' Where ID = {id}"
                cursor.execute(query)

            con.commit()

            response["success"] = True
        except Exception as e:
            print("Error", e)

        return make_response(jsonify(response), 200)


# class DetailedStudent(Resource):
#     def get(self):
#         dto = request.json
#         key = dto["key"]
#
#         try:
#             con = sl.connect('applicationDb.db')
#             query = f"select * from STUDENT where uw_email = '{key}'"
#
#             cursor = con.cursor()
#             cursor.execute(query)
#
#             rows = cursor.fetchall()
#
#             query2 = f"select * from "
#
#             for student in rows:


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

# How to innovatively fund venture in times of crisis
# Give examples like "covid", "2008 crisis"
# How innovative ideas made a difference
# 1 mil companies went out of business in covid times
