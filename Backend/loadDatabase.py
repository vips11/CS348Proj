import sqlite3 as sl
import json


con = sl.connect('applicationDb.db')

BASE_PATH = "../data/JSON Format"

dataFileMapping = {
    "student.json": "STUDENT",
    "company.json": "COMPANY",
    "course.json": "COURSE",
    "facility.json": "FACILITY",
    "interested.json": "INTERESTED",
    "interests.json": "INTERESTS",
    "job.json": "JOB",
    "section.json": "SECTION",
    "takes.json": "TAKES",
    "works.json": "WORKS",
    "rates.json": "RATES",
    "spaces.json": "SPACES",
    "isMember.json": "ISMEMBER",
    "authorisation.json": "AUTHORISATION"
}


def createTables():
    tableQueries = []

    # Student table
    tableQueries.append("""
        CREATE TABLE IF NOT EXISTS STUDENT (
            id INTEGER PRIMARY KEY,
            first_name varchar(255),
            last_name varchar(255),
            term varchar(2),
            semester varchar(7),
            year INTEGER,
            uw_email varchar(255) UNIQUE,
            program varchar(255),
            description varchar(255)
        )
    """)


    # Interests table
    tableQueries.append("""
        CREATE TABLE IF NOT EXISTS INTERESTS (
            id INTEGER PRIMARY KEY,
            name varchar(255)
        )
    """)

    # Interested Table
    tableQueries.append("""
        CREATE TABLE IF NOT EXISTS INTERESTED (
            student_id INTEGER,
            interest_id INTEGER,
            PRIMARY KEY (student_id, interest_id),
            FOREIGN KEY (student_id) REFERENCES STUDENT(ID),
            FOREIGN KEY (interest_id) REFERENCES INTERESTS(ID)
        )
    """)

    # Course Table
    tableQueries.append("""
        CREATE TABLE IF NOT EXISTS COURSE (
            course_id varchar(6) PRIMARY KEY,
            course_name varchar(255),
            course_description varchar(255)
        )
    """)


    # Takes Table
    tableQueries.append("""
        CREATE TABLE IF NOT EXISTS SECTION (
            course_id varchar(10),
            section_id INTEGER,
            semester varchar(255),
            year varchar(255),
            PRIMARY KEY (course_id, section_id, semester, year),
            FOREIGN KEY (course_id) REFERENCES COURSE(course_id)
        )
    """)

    # Takes Table
    tableQueries.append("""
        CREATE TABLE IF NOT EXISTS TAKES (
            student_id INTEGER,
            course_id varchar(10),
            section_id INTEGER,
            semester varchar(255),
            year INTEGER,
            term varchar(2),
            PRIMARY KEY (student_id, course_id, section_id, semester, year),
            FOREIGN KEY (student_id) REFERENCES STUDENT(id),
            FOREIGN KEY (course_id, section_id, semester, year) REFERENCES SECTION
        )
    """)

    # Company
    tableQueries.append("""
        CREATE TABLE IF NOT EXISTS COMPANY (
            company_id INTEGER,
            name varchar(255),
            PRIMARY KEY (company_id)
        )
    """)

    # Facility
    tableQueries.append("""
        CREATE TABLE IF NOT EXISTS FACILITY (
            facility_id INTEGER,
            company_id INTEGER,
            street varchar(255),
            city varchar(255),
            country varchar(255),
            building_name varchar(255),
            PRIMARY KEY (facility_id, company_id),
            FOREIGN KEY (company_id) REFERENCES COMPANY(company_id) 
        )
    """)

    # Job
    tableQueries.append("""
        CREATE TABLE IF NOT EXISTS JOB (
            job_id INTEGER,
            position_name varchar(255),
            is_full_time varchar(255),
            facility_id INTEGER,
            company_id INTEGER,
            PRIMARY KEY (job_id, company_id),
            FOREIGN KEY (company_id) REFERENCES COMPANY(company_id),
            FOREIGN KEY (facility_id) REFERENCES FACILITY(facility_id)
        )
    """)

    # Works
    tableQueries.append("""
        CREATE TABLE IF NOT EXISTS WORKS (
            term varchar(2),
            start_date date,
            end_date date,
            student_id INTEGER,
            job_id INTEGER,
            company_id INTEGER,
            facility_id INTEGER,
            PRIMARY KEY (student_id, job_id),
            FOREIGN KEY (student_id) REFERENCES STUDENT(id),
            FOREIGN KEY (job_id) REFERENCES JOB(job_id)
        )
    """)

    # Rates
    tableQueries.append("""
        CREATE TABLE IF NOT EXISTS RATES (
            student_id INTEGER,
            course_id varchar(6),
            liked_rating INTEGER,
            useful_rating INTEGER,
            PRIMARY KEY(liked_rating, useful_rating, course_id),
            FOREIGN KEY (student_id) REFERENCES STUDENT(id),
            FOREIGN KEY (course_id) REFERENCES COURSE(course_id)
        )
    """)

    # Space
    tableQueries.append("""
        CREATE TABLE IF NOT EXISTS SPACES (
            space_id INTEGER,
            name varchar(255),
            description varvhar(255),
            PRIMARY KEY(space_id)
        )
    """)

    # IsMember
    tableQueries.append("""
        CREATE TABLE IF NOT EXISTS ISMEMBER (
            space_id INTEGER,
            student_id INTEGER,
            PRIMARY KEY (space_id, student_id),
            FOREIGN KEY (student_id) REFERENCES STUDENT(id),
            FOREIGN KEY (space_id) REFERENCES SPACE(space_id)
        )
    """)

    #Authorisation
    tableQueries.append("""
        CREATE TABLE IF NOT EXISTS AUTHORISATION (
            student_id INTEGER,
            uw_email varchar(255) UNIQUE,
            password varchar(255),
            PRIMARY KEY (uw_email, password),
            FOREIGN KEY (student_id) REFERENCES STUDENT(id),
            FOREIGN KEY (uw_email) REFERENCES STUDENT(uw_email)
        )
    """)

    for tableQuery in tableQueries:
        con.execute(tableQuery)


def loadStudentData():
    try:
        with open(f"{BASE_PATH}/entities/Student.json", "r") as f:
            tableData = json.loads(f.read())

        for data in tableData:
            query = f"""
                    INSERT INTO STUDENT VALUES 
                    ({data["id"]}, "{data["first_name"]}", "{data["last_name"]}", "{data["uw_email"]}", "{data["program"]}",
                     "{data["description"]}", "{data["current_term"]}",  "{data["semester"]}",  {data["year"]})
                """
            cursor = con.cursor()
            cursor.execute(query)
            # con.execute(query)

        print("Added data to student table")
    except Exception as e:
        print("Error while adding data to student table: ", e)


def loadCompanyData():
    try:
        with open(f"{BASE_PATH}/entities/Company.json", "r") as f:
            tableData = json.loads(f.read())

        for data in tableData:
            query = f"""
                    INSERT INTO COMPANY VALUES 
                    ({data["Company_ID"]}, "{data["Name"]}")
                """
            con.execute(query)

        print("Added data to company table")

    except Exception as e:
        print("Error while adding data to company table: ", e)


def loadCourseData():
    try:
        with open(f"{BASE_PATH}/entities/Course.json", "r") as f:
            tableData = json.loads(f.read())

        for data in tableData:
            query = f"""
                    INSERT INTO COURSE VALUES 
                    ("{data["course_ID"]}", "{data["course_name"]}", "{data["course_description"]}")
                """
            con.execute(query)

        print("Added data to course table")

    except Exception as e:
        print("Error while adding data to course table: ", e)


def loadFacilityData():
    try:
        with open(f"{BASE_PATH}/entities/Facility.json", "r") as f:
            tableData = json.loads(f.read())

        for data in tableData:
            query = f"""
                    INSERT INTO FACILITY VALUES 
                    ({data["Facility_ID"]}, {data["Company_ID"]}, "{data["street"]}", "{data["city"]}", "{data["unit_number"]}", "{data["building_name"]}")
                """
            con.execute(query)

        print("Added data to facility table")
    except Exception as e:
        print("Error while adding data to facility table: ", e)


def loadInterestedData():
    try:
        with open(f"{BASE_PATH}/relations/Interested.json", "r") as f:
            tableData = json.loads(f.read())

        for data in tableData:
            query = f"""
                    INSERT INTO INTERESTED VALUES 
                    ({data["student_id"]}, {data["interest_id"]})
                """
            con.execute(query)

        print("Added data to interested table")
    except Exception as e:
        print("Error while adding data to interested table: ", e)



def loadInterestsData():
    try:
        with open(f"{BASE_PATH}/entities/Interests.json", "r") as f:
            tableData = json.loads(f.read())

        for data in tableData:
            query = f"""
                    INSERT INTO INTERESTS VALUES 
                    ({data["ID"]}, "{data["tag"]}")
                """
            con.execute(query)

        print("Added data to interests table")
    except Exception as e:
        print("Error while adding data to interests table: ", e)


def loadJobData():
    try:
        with open(f"{BASE_PATH}/entities/Job.json", "r") as f:
            tableData = json.loads(f.read())

        for data in tableData:
            query = f"""
                    INSERT INTO JOB VALUES 
                    ({data["job_ID"]}, "{data["position_name"]}", "{data["is_full_time?"]}", {data["facility_ID"]}, {data["company_ID"]})
                """
            con.execute(query)

        print("Added data to job table")
    except Exception as e:
        print("Error while adding data to job table: ", e)


def loadSectionData():
    try:
        with open(f"{BASE_PATH}/entities/Section.json", "r") as f:
            tableData = json.loads(f.read())

        for data in tableData:
            query = f"""
                    INSERT INTO SECTION VALUES 
                    ("{data["course_ID"]}", {data["section_ID"]}, "{data["semester"]}", "{data["year"]}")
                """
            con.execute(query)

        print("Added data to section table")
    except Exception as e:
        print("Error while adding data to section table: ", e)



def loadTakesData():
    try:
        with open(f"{BASE_PATH}/relations/Takes.json", "r") as f:
            tableData = json.loads(f.read())

        for data in tableData:
            query = f"""
                    INSERT INTO TAKES VALUES 
                    ({data["ID"]}, "{data["course_ID"]}", {data["section_ID"]}, "{data["semester"]}", {data["year"]}, "{data["term"]}")
                """
            con.execute(query)

        print("Added data to takes table")
    except Exception as e:
        print("Error while adding data to takes table: ", e)

def loadWorksData():
    try:
        with open(f"{BASE_PATH}/relations/Works.json", "r") as f:
            tableData = json.loads(f.read())

        for data in tableData:
            query = f"""
                    INSERT INTO WORKS VALUES 
                    ("{data["term"]}", "{data["start_date"]}", "{data["end_date"]}", {data["student_ID"]},
                    {data["job_ID"]}, {data["company_ID"]}, {data["facility_ID"]})
                """
            con.execute(query)

        print("Added data to works table")
    except Exception as e:
        print("Error while adding data to works table: ", e)

def loadRatesData():
    try:
        with open(f"{BASE_PATH}/relations/Rates.json", "r") as f:
            tableData = json.loads(f.read())

        for data in tableData:
            query = f"""
                    INSERT INTO RATES VALUES 
                    ({data["liked_rating"]}, {data["useful_rating"]}, "{data["course_ID"]}", {data["student_ID"]})
                """
            con.execute(query)

        print("Added data to rates table")
    except Exception as e:
        print("Error while adding data to rates table: ", e)

#Spaces
def loadSpacesData():
    try:
        with open(f"{BASE_PATH}/entities/Spaces.json", "r") as f:
            tableData = json.loads(f.read())

        for data in tableData:
            query = f"""
                    INSERT INTO SPACES VALUES 
                    ({data["space_ID"]}, "{data["name"]}", "{data["description"]}")
                """
            con.execute(query)

        print("Added data to spaces table")
    except Exception as e:
        print("Error while adding data to spaces table: ", e)

#IsMember
def loadIsMemberData():
    try:
        with open(f"{BASE_PATH}/relations/IsMember.json", "r") as f:
            tableData = json.loads(f.read())

        for data in tableData:
            query = f"""
                    INSERT INTO ISMEMBER VALUES 
                    ({data["space_ID"]}, {data["student_ID"]})
                """
            con.execute(query)

        print("Added data to isMember table")
    except Exception as e:
        print("Error while adding data to isMember table: ", e)

def loadAuthorisationData():
    try:
        with open(f"{BASE_PATH}/entities/Authorisation.json", "r") as f:
            tableData = json.loads(f.read())

        for data in tableData:
            query = f"""
                    INSERT INTO AUTHORISATION VALUES 
                    ({data["student_ID"]}, "{data["uw_email"]}", "{data["password"]}")
                """
            con.execute(query)

        print("Added data to Authorisation table")
    except Exception as e:
        print("Error while adding data to Authorisation table: ", e)


def loadData():
    loadStudentData()
    loadCompanyData()
    loadCourseData()
    loadInterestsData()
    loadFacilityData()
    loadJobData()
    loadWorksData()
    loadInterestedData()
    loadSectionData()
    loadTakesData()
    loadSpacesData()
    loadRatesData()
    loadIsMemberData()
    loadAuthorisationData()


createTables()
loadData()
con.commit()

