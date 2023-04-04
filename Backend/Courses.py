from flask_restful import Resource
from flask import jsonify, make_response, request

from Backend.helper import *


class Courses(Resource):
    def get(self):
        dto = request.json
        name = dto["name"]
        liked = dto["liked"]
        useful = dto["useful"]
        alpha = dto["alpha"]
        response = []

        try:
            query = f"select course_ID from COURSE C natural join RATES R where course_ID LIKE '%{name}%'"
            if liked != "none":
                query += " order by liked_rating " + liked
            if useful != "none":
                query += " order by useful_rating " + useful
            if alpha != "none":
                query += " order by course_ID " + name
            rows = executeQuery(query)

            print(query)

            result = []
            for row in rows:
                result.append(row[0])

            response = result
        except Exception as e:
            print("Error: ", e)

        return make_response(jsonify(response), 200)

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

            print(query)
            con = sl.connect('applicationDb.db')
            cursor = con.cursor()
            cursor.execute(query)
            con.commit()

            response["success"] = True
        except Exception as e:
            print("Error: ", e)

        return make_response(jsonify(response), 200)