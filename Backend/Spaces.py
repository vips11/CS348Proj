from flask_restful import Resource
from flask import jsonify, make_response, request
import sqlite3 as sl


class SpacesFilter(Resource):
    def post(self):
        dto = request.json
        name = dto["name"]
        response = []

        try:
            con = sl.connect('applicationDb.db')
            query = f"select * from SPACES where name like '%{name}%'"
            print(query)
            cursor = con.cursor()
            cursor.execute(query)
            rows = cursor.fetchall()

            result = []

            for row in rows:
                result.append({
                    "space_ID": row[0],
                    "name": row[1],
                    "description": row[2]
                })

            response = result
        except Exception as e:
            print("Error: ", e)

        response = jsonify(response)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response


class SpacesDetail(Resource):
    def post(self):
        dto = request.json
        key = dto["key"]
        response = {}

        try:
            con = sl.connect('applicationDb.db')
            query = f"select S.space_id, S.name, S.description, P.title, P.description from SPACES S join POSTS P on S.space_id = P.space_id where S.space_id = {key}"
            print(query)
            cursor = con.cursor()
            cursor.execute(query)
            rows = cursor.fetchall()

            result = {
                "spaceId": rows[0][0],
                "name": rows[0][1],
                "description": rows[0][2],
                "posts": []
            }

            for row in rows:
                result["posts"].append({
                    "title": row[3],
                    "description": row[4]
                })

            response = result
        except Exception as e:
            print("Error: ", e)

        response = jsonify(response)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
