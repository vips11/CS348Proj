from flask import Flask
from flask_restful import Api
import loadDatabase
from Students import Students, FindAMentor

app = Flask(__name__)
api = Api(app)


api.add_resource(Students, '/student')
api.add_resource(FindAMentor, '/find-a-mentor')


if __name__ == '__main__':
    loadDatabase.createTables()
    loadDatabase.loadData()
    loadDatabase.con.commit()
    app.run()
