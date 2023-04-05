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


# def prepareDetailedStudent(student):


class Students(Resource):
    def get(self):
        key = request.args.get("key")
        firstName = request.args.get('firstName')
        lastName = request.args.get('lastName')
        term = request.args.get('term')
        program = request.args.get("program")
        company = request.args.get("company")

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

    def post(self):
        dto = request.json
        key = dto["key"]
        first_name = dto['firstName']
        last_name = dto['lastName']
        program = dto['curProgram']
        term = dto['curTerm']
        description = dto['term']

        response = {"success": False}
        try:
            if key is None:
                response["message"] = "No id provided"
                raise Exception

            con = sl.connect('applicationDb.db')
            cursor = con.cursor()
            if first_name is not None:
                query = f"Update Student Set first_name = '{first_name}' Where uw_email = {key}"
                cursor.execute(query)
            if last_name is not None:
                query = f"Update Student Set last_name = '{last_name}' Where uw_email = {key}"
                cursor.execute(query)
            if program is not None:
                query = f"Update Student Set program = '{program}' Where uw_email = {key}"
                cursor.execute(query)
            if term is not None:
                query = f"Update Student Set term = '{term}' Where uw_email = {key}"
                cursor.execute(query)
            if description is not None:
                query = f"Update Student Set description = '{description}' Where uw_email = {key}"
                cursor.execute(query)

            con.commit()

            response["success"] = True
        except Exception as e:
            print("Error", e)

        response = jsonify(response)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    def put(self):
        dto = request.json
        response = {
            "success": False
        }
        try:
            con = sl.connect('applicationDb.db')
            cursor = con.cursor()

            query = f"""INSERT OR IGNORE INTO STUDENT VALUES 
                    ({dto["id"]}, "{dto["firstName"]}", "{dto["lastName"]}", "{dto["currentTerm"]}",  "{dto["semester"]}",  {dto["year"]},
                    "{dto["uw_email"]}", "{dto["program"]}", "{dto["description"]}")"""

            cursor.execute(query)

            if "username" in dto and "password" in dto:
                query = f"""
                    INSERT OR IGNORE INTO AUTHORISATION VALUES 
                    ({dto["id"]}, "{dto["username"]}", "{dto["password"]}")
                """
                con.execute(query)

            if "socials" in dto:
                for social in dto["socials"]:
                    query = f"""INSERT OR IGNORE INTO SOCIAL VALUES 
                                        ({social["id"]}, "{social["platform"]}", "{social["link"]}")"""
                    cursor.execute(query)

            if "courses" in dto:
                for course in dto["courses"]:
                    query = f"""INSERT OR IGNORE INTO TAKES VALUES 
                        ({course["ID"]}, "{course["course_ID"]}", {course["section_ID"]}, "{course["semester"]}", {course["year"]}, "{course["term"]}")"""
                    cursor.execute(query)

            if "works" in dto:
                for work in dto["works"]:
                    companyId = uuid.uuid4()
                    jobId = uuid.uuid4()

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
                        ("{work["term"]}", "{work["semester"]}", "{work["year"]}", {work["student_ID"]},
                        {jobId}, {companyId})
                    """
                    cursor.execute(query)

            response["success"] = True
        except Exception as e:
            print("Error: ", e)

        response = jsonify(response)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response


class DetailedStudent(Resource):
    def get(self):
        key = request.args.get("key")
        student = {}

        try:
            query1 = f"select * from student where uw_email = '{key}'"
            query2 = f"""select student_id, T.term as term, S.semester as semester, 
                        S.year as year, course_id from STUDENT as S join TAKES T 
                        on S.id = T.student_id where S.uw_email = '{key}'"""

            row = executeQuery(query1)[0]
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

            rows = executeQuery(query2)
            rows += executeQuery(query3)
            timeline = getTimeline(rows)

            rows = executeQuery(query4)
            socials = []
            for row in rows:
                socials.append({
                    "platform": row[0],
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
    def get(self):
        courseName = request.args.get("courseName")
        year = request.args.get("year")
        sem = request.args.get("year")

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
    def get(self):
        key = request.args.get("key")

        response = {
            "students": []
        }
        try:
            con = sl.connect('applicationDb.db')
            query = f"""
                SELECT DISTINCT s2.id, s2.first_name, s2.last_name FROM Student s1
                JOIN Takes t1 ON s1.ID = t1.student_ID
                JOIN Takes t2 ON t1.course_ID = t2.course_ID AND t1.section_ID = t2.section_ID AND t1.semester = t2.semester AND t1.year = t2.year
                JOIN Student s2 ON t2.student_ID = s2.ID
                WHERE s1.ID = '{key}' AND s2.ID <> '{key}'
                GROUP BY s2.ID
                HAVING COUNT(DISTINCT t2.course_ID) >= 3;
            """

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
    def get(self):
        response = {
            "authorize": False
        }

        try:
            username = request.args.get("username")
            password = request.args.get("password")

            con = sl.connect('applicationDb.db')
            query = f"SELECT * from AUTHORISATION WHERE uw_email = '{username}' and password = '{password}'"
            #print(query)

            cursor = con.cursor()
            cursor.execute(query)
            rows = cursor.fetchall()

            if len(rows) > 0:
                response["authorize"] = True
        except Exception as e:
            print("Error: ", e)

        response = jsonify(response)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
