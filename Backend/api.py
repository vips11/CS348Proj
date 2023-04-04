from flask import Flask
from flask_restful import Api
import loadDatabase
from Students import Students, FindAMentor, Authorize, DetailedStudent, FindAStudyGroup
from Spaces import SpacesFilter, SpacesDetail

app = Flask(__name__)
api = Api(app)


api.add_resource(Students, '/student')
api.add_resource(DetailedStudent, '/student/detail')
api.add_resource(FindAMentor, '/find-a-mentor')
api.add_resource(Authorize, "/authorize")
api.add_resource(SpacesFilter, "/spaces")
api.add_resource(SpacesDetail, "/spaces/detail")
api.add_resource(FindAStudyGroup, "/find-a-study-grp")


if __name__ == '__main__':
    loadDatabase.createTables()
    loadDatabase.loadData()
    loadDatabase.con.commit()
    app.run()
