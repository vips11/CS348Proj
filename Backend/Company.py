from flask_restful import Resource
from flask import jsonify, make_response, request

from helper import *


class Company(Resource):
    def get(self):
        dto = request.json
        name = request.args.get("name")
        response = []

        try:
            query = f"select name from COMPANY where NAME LIKE '%{name}%'"
            rows = executeQuery(query)

            response = rows
        except Exception as e:
            print("Error: ", e)

        response = jsonify(response)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response