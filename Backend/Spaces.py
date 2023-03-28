from flask_restful import Resource
from flask import jsonify, make_response, request
import sqlite3 as sl


class SpacesFilter(Resource):
    def get(self):
        dto = request.json
        response = {
            "student": []
        }

        try:
            con = sl.connect('applicationDb.db')
            query = f"select * from SPACES"
            cursor = con.cursor()
            cursor.execute(query)
            rows = cursor.fetchall()

            response["student"] = rows
        except Exception as e:
            print("Error: ", e)

        return make_response(jsonify(response), 200)


# class Spaces(Resource):
#     def get(self):
#         dto = request.json
#         response = {
#             "student": []
#         }
#
#         try:
#             con = sl.connect('applicationDb.db')
#             key = dto["key"]
#             query = f"select * from SPACES where space_id = '{key}'"
#             cursor = con.cursor()
#             cursor.execute(query)
#             row = cursor.fetchone()
#         except Exception as e:
#             print("Error: ", e)
#
#         return make_response(jsonify(response), 200)
