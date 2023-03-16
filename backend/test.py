from flask import Flask
from flask_restful import Resource, Api, reqparse
import sqlite3 as sl
import pandas as pd
import ast

app = Flask(__name__)
api = Api(app)


con = sl.connect('my-test.db')


class Student(Resource):
    def get(self):
        return "Getting data", 201


api.add_resource(Users, '/users')  # '/users' is our entry point


if __name__ == '__main__':
    app.run()  #
