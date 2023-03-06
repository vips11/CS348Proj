import sqlite3 as sl
import json


con = sl.connect('my-test.db')

dataFileMapping = {
    "student.json": "STUDENT",
    "company.json": "COMPANY",
    "course.json": "COURSE",
    "facility.json": "FACILITY",
    "interested.json": "INTERESTED",
    "interests.json": "INTERESTS",
    "job.json": "JOB",
    "section.json": "SECTION",
    "social.json": "SOCIAL",
    "takes.json": "TAKES",
    "time_slot.json": "TIME_SLOT",
    "works.json": "WORKS",
}


def createTables():
    tableQueries = []

    # Student table
    tableQueries.append("""
        CREATE TABLE IF NOT EXISTS STUDENT (
            id INTEGER PRIMARY KEY,
            first_name varchar(255),
            last_name varchar(255),
            uw_email varchar(255) UNIQUE,
            program varchar(255),
            description varchar(255)
        )
    """)

    # Social Table
    tableQueries.append("""
        CREATE TABLE IF NOT EXISTS SOCIAL (
            id INTEGER,
            platform varchar(255),
            link varchar(255),
            PRIMARY KEY (id, platform, link),
            FOREIGN KEY (id) REFERENCES STUDENT(ID)
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
            course_id INTEGER PRIMARY KEY,
            course_name varchar(255),
            course_description varchar(255)
        )
    """)

    # Time slot
    tableQueries.append("""
        CREATE TABLE IF NOT EXISTS TIME_SLOT (
            time_slot_id INTEGER,
            day_of_week varchar(255),
            start_time time,
            end_time time,
            PRIMARY KEY (time_slot_id)
        )
    """)

    # Takes Table
    tableQueries.append("""
        CREATE TABLE IF NOT EXISTS SECTION (
            course_id INTEGER,
            section_id INTEGER,
            semester varchar(255),
            year varchar(255),
            time_slot_id varchar(255),
            PRIMARY KEY (course_id, section_id, semester, year),
            FOREIGN KEY (course_id) REFERENCES COURSE(course_id),
            FOREIGN KEY (time_slot_id) REFERENCES TIME_SLOT(time_slot_id)
        )
    """)

    # Takes Table
    tableQueries.append("""
        CREATE TABLE IF NOT EXISTS TAKES (
            student_id INTEGER,
            course_id INTEGER,
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
            PRIMARY KEY (job_id),
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
            PRIMARY KEY (student_id, job_id),
            FOREIGN KEY (student_id) REFERENCES STUDENT(id),
            FOREIGN KEY (job_id) REFERENCES JOB(job_id)
        )
    """)

    for tableQuery in tableQueries:
        con.execute(tableQuery)


def loadStudentData():
    try:
        with open("student.json", "r") as f:
            tableData = json.loads(f.read())

        for data in tableData:
            query = f"""
                    INSERT INTO STUDENT VALUES 
                    ({data["id"]}, "{data["first_name"]}", "{data["last_name"]}", "{data["uw_email"]}", "{data["program"]}", "{data["description"]}")
                """
            con.execute(query)

        print("Added data to student table")
    except Exception as e:
        print("Error while adding data to student table: ", e)


def loadCompanyData():
    try:
        with open("company.json", "r") as f:
            tableData = json.loads(f.read())

        for data in tableData:
            query = f"""
                    INSERT INTO COMPANY VALUES 
                    ({data["company_id"]}, "{data["name"]}")
                """
            con.execute(query)

        print("Added data to company table")

    except Exception as e:
        print("Error while adding data to company table: ", e)


def loadCourseData():
    try:
        with open("course.json", "r") as f:
            tableData = json.loads(f.read())

        for data in tableData:
            query = f"""
                    INSERT INTO COURSE VALUES 
                    ({data["course_id"]}, "{data["course_name"]}", "{data["course_description"]}")
                """
            con.execute(query)

        print("Added data to course table")

    except Exception as e:
        print("Error while adding data to course table: ", e)


def loadFacilityData():
    try:
        with open("facility.json", "r") as f:
            tableData = json.loads(f.read())

        for data in tableData:
            query = f"""
                    INSERT INTO FACILITY VALUES 
                    ({data["facility_id"]}, {data["company_id"]}, "{data["street"]}", "{data["city"]}", "{data["country"]}", "{data["building_name"]}")
                """
            con.execute(query)

        print("Added data to facility table")
    except Exception as e:
        print("Error while adding data to facility table: ", e)


def loadInterestedData():
    try:
        with open("interested.json", "r") as f:
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
        with open("interests.json", "r") as f:
            tableData = json.loads(f.read())

        for data in tableData:
            query = f"""
                    INSERT INTO INTERESTS VALUES 
                    ({data["id"]}, "{data["name"]}")
                """
            con.execute(query)

        print("Added data to interests table")
    except Exception as e:
        print("Error while adding data to interests table: ", e)


def loadJobData():
    try:
        with open("job.json", "r") as f:
            tableData = json.loads(f.read())

        for data in tableData:
            query = f"""
                    INSERT INTO JOB VALUES 
                    ({data["job_id"]}, "{data["position_name"]}", "{data["is_full_time"]}", {data["facility_id"]}, {data["company_id"]})
                """
            con.execute(query)

        print("Added data to job table")
    except Exception as e:
        print("Error while adding data to job table: ", e)


def loadSectionData():
    try:
        with open("facility.json", "r") as f:
            tableData = json.loads(f.read())

        for data in tableData:
            query = f"""
                    INSERT INTO SECTION VALUES 
                    ({data["course_id"]}, {data["section_id"]}, "{data["semester"]}", "{data["year"]}", {data["time_slot_id"]})
                """
            con.execute(query)

        print("Added data to section table")
    except Exception as e:
        print("Error while adding data to section table: ", e)


def loadSocialData():
    try:
        with open("social.json", "r") as f:
            tableData = json.loads(f.read())

        for data in tableData:
            query = f"""
                    INSERT INTO SOCIAL VALUES 
                    ({data["id"]}, "{data["platform"]}", "{data["link"]}")
                """
            con.execute(query)

        print("Added data to social table")
    except Exception as e:
        print("Error while adding data to social table: ", e)


def loadTakesData():
    try:
        with open("takes.json", "r") as f:
            tableData = json.loads(f.read())

        for data in tableData:
            query = f"""
                    INSERT INTO TAKES VALUES 
                    ({data["student_id"]}, {data["course_id"]}, {data["section_id"]}, "{data["semester"]}", {data["year"]}, "{data["term"]}")
                """
            con.execute(query)

        print("Added data to takes table")
    except Exception as e:
        print("Error while adding data to takes table: ", e)


def loadTime_slotData():
    try:
        with open("time_slot.json", "r") as f:
            tableData = json.loads(f.read())

        for data in tableData:
            query = f"""
                    INSERT INTO TIME_SLOT VALUES 
                    ({data["time_slot_id"]}, "{data["day_of_week"]}", "{data["start_time"]}", "{data["end_time"]}")
                """
            con.execute(query)

        print("Added data to time_slot table")
    except Exception as e:
        print("Error while adding data to time_slot table: ", e)


def loadWorksData():
    try:
        with open("works.json", "r") as f:
            tableData = json.loads(f.read())

        for data in tableData:
            query = f"""
                    INSERT INTO WORKS VALUES 
                    ("{data["term"]}", "{data["start_date"]}", "{data["end_date"]}", {data["student_id"]}, {data["job_id"]})
                """
            con.execute(query)

        print("Added data to works table")
    except Exception as e:
        print("Error while adding data to works table: ", e)


def loadData():
    loadStudentData()
    loadCompanyData()
    loadCourseData()
    loadInterestsData()
    loadSocialData()
    loadFacilityData()
    loadJobData()
    loadWorksData()
    loadInterestedData()
    loadTime_slotData()
    loadSectionData()
    loadTakesData()


createTables()
loadData()

