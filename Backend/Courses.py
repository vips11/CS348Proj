from flask_restful import Resource
from flask import jsonify, make_response, request

from helper import *


class Courses(Resource):
    def get(self):
        name = request.args.get("courseId")
        liked = request.args.get("liked")
        useful = request.args.get("useful")
        alpha = request.args.get("alpha")
        response = []

        try:
            query = f"select course_ID, section_ID, semester, year, course_description from RATES R natural join COURSE C natural join SECTION where course_ID LIKE '%{name}%'"
            if liked != "none":
                query += " order by liked_rating " + liked
            if useful != "none":
                query += " order by useful_rating " + useful
            if alpha != "none":
                query += " order by course_ID " + name
            rows = executeQuery(query)

            print(query)

            result = {}
            for row in rows:
                result[row[0]] = {
                    "courseId": row[0],
                    "sectionId": row[1],
                    "semester": row[2],
                    "year": row[3],
                    "description": row[4]
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

    def post(self):
        dto = request.json
        liked = dto["liked"]
        useful = dto["useful"]
        studentId = dto["studentId"]
        course = dto["courseId"]

        response = {
            "success": False
        }

        try:
            query = f"""INSERT OR IGNORE INTO RATES VALUES 
                    ({liked}, {useful}, "{course}", {studentId})"""

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
