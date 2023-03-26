from flask_restful import Resource
from flask import jsonify, make_response, request
import sqlite3 as sl


class Students(Resource):
    def get(self):
        name = request.args.get('name')
        term = request.args.get('term')
        program = request.args.get('program')

        response = {
            "students": []
        }
        try:
            con = sl.connect('applicationDb.db')
            query = "SELECT * FROM STUDENT"
            isFirst = True
            if name is not None:
                query += f" where first_name like '%{name}%' or last_name like '%{name}%'"
                isFirst = False
            if term is not None:
                if isFirst:
                    query += f" where term = '{term}'"
                else:
                    query += f" and term = '{term}'"
                isFirst = False
            if program is not None:
                if isFirst:
                    query += f" where program like '%{program}%'"
                else:
                    query += f" and program like '%{program}%'"

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

            con.commit()

            response["success"] = True
        except Exception as e:
            print("Error", e)

        return make_response(jsonify(response), 200)


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

