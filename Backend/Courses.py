from flask_restful import Resource
from flask import jsonify, make_response, request

from helper import *


class GetCourses(Resource):
    def post(self):
        dto = request.json
        name = dto["courseId"]
        liked = dto["liked"]
        useful = dto["useful"]
        alpha = dto["alpha"]
        response = []

        try:
            isFirst = True
            query = f"select course_ID, course_description from RATES R natural join COURSE C where course_ID LIKE '%{name}%'"
            if liked != "":
                query += " order by liked_rating " + liked
                isFirst = False
            if useful != "":
                if isFirst:
                    query += " order by useful_rating " + useful
                else:
                    query += ", useful_rating " + useful

                isFirst = False
            if alpha != "":
                if isFirst:
                    query += " order by course_ID " + alpha
                else:
                    query += ", course_ID " + alpha
            rows = executeQuery(query)

            print(query)

            result = {}
            for row in rows:
                result[row[0]] = {
                    "courseId": row[0],
                    "description": row[1]
                }

            actResult = []
            for course in result:
                actResult.append(result[course])
            response = actResult
        except Exception as e:
            print("Error: ", e)

        response = jsonify(response)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response


class RateCourse(Resource):
    def post(self):
        dto = request.json
        liked = dto["liked"]
        useful = dto["useful"]
        email = dto["email"]
        course = dto["courseId"]

        response = {
            "success": False
        }

        try:
            query = f"select id from student where uw_email = '{email}'"
            studentId = executeQuery(query)[0][0]

            query = f"""INSERT OR IGNORE INTO RATES VALUES 
                    ({liked}, {useful}, "{course}", {studentId})"""

            print(query)

            con = sl.connect('applicationDb.db')
            cursor = con.cursor()
            cursor.execute(query)
            con.commit()

            response["success"] = True
        except Exception as e:
            print("Error: ", e)

        response = jsonify(response)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
