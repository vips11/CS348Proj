from flask import Flask
from flask_restful import Api
import loadDatabase
from Students import Students, FindAMentor, Authorize
from Spaces import SpacesFilter

app = Flask(__name__)
api = Api(app)


api.add_resource(Students, '/student')
api.add_resource(FindAMentor, '/find-a-mentor')
api.add_resource(Authorize, "/authorize")
api.add_resource(SpacesFilter, "/spaces")


if __name__ == '__main__':
    loadDatabase.createTables()
    loadDatabase.loadData()
    loadDatabase.con.commit()
    app.run()
