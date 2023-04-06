from flask import Flask
from flask_restful import Api
from flask_cors import CORS

import loadDatabase
from Students import *
from Spaces import *
from Company import *
from Courses import *

app = Flask(__name__)
CORS(app)

api = Api(app)


api.add_resource(GetStudents, '/student')
api.add_resource(UpdateStudent, '/update-student')
api.add_resource(CreateStudent, '/create-student')
api.add_resource(DetailedStudent, '/student/detail')
api.add_resource(FindAMentor, '/find-a-mentor')
api.add_resource(Authorize, "/authorize")
api.add_resource(SpacesFilter, "/spaces")
api.add_resource(SpacesDetail, "/spaces/detail")
api.add_resource(FindAStudyGroup, "/find-a-study-grp")
api.add_resource(Company, "/company")
api.add_resource(GetCourses, "/course")
api.add_resource(RateCourse, "/course/rate")


if __name__ == '__main__':
    loadDatabase.createTables()
    loadDatabase.loadData()
    loadDatabase.con.commit()
    app.run()
