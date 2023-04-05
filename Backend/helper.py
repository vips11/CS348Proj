import sqlite3 as sl


months = {
    "Fall": {
        True: "Sept",
        False: "Dec"
    },
    "Spring": {
        True: "May",
        False: "Aug",
    },
    "Winter": {
        True: "Jan",
        False: "Apr"
    }
}


def getTermInfo(term, programOrPos):
    if term == "COOP":
        return term + " @ " + programOrPos
    return term + " " + programOrPos


def executeQuery(query):
    con = sl.connect('applicationDb.db')
    cursor = con.cursor()
    cursor.execute(query)
    rows = cursor.fetchall()

    con.close()
    return rows


def compareTerms(t1, t2):
    t = ["Winter", "Spring", "Fall"]
    t1_index = t.index(t1)
    t2_index = t.index(t2)

    return t1_index < t2_index


def getDates(term, year, isStart):
    return months[term][isStart] + " " + str(year)


def sortTimeline(timeline):
    sortedTimeline = []
    for termId in timeline:
        term = timeline[termId]
        index = 0
        for time in sortedTimeline:
            if time["year"] > term["year"]:
                break
            elif time["year"] > term["year"] and compareTerms(term["semester"], time["semester"]):
                break
            index += 1

        sortedTimeline.insert(index, term)

    return sortedTimeline


def getTimeline(terms):
    print(terms)
    TERM_INDEX = 1
    COURSE_ID_INDEX = 4
    YEAR_INDEX = 3
    SEMESTER_INDEX = 2
    COMPANY_INDEX = 4
    POSITION_INDEX = 5
    timeline = {}

    for term in terms:
        print(timeline)
        termId = term[TERM_INDEX]
        # print(termId)
        if termId in timeline:
            timeline[termId]["termDescription"] += ", " + term[COURSE_ID_INDEX]
        else:
            if "Coop" in termId:
                timeline[termId] = {
                    "type": "work",
                    "term": termId,
                    "termDescription": term[POSITION_INDEX] + " @ " + term[COMPANY_INDEX],
                    "startDate": getDates(term[SEMESTER_INDEX], term[YEAR_INDEX], True),
                    "endDate": getDates(term[SEMESTER_INDEX], term[YEAR_INDEX], False),
                    "semester": term[SEMESTER_INDEX],
                    "year": term[YEAR_INDEX]
                }
            elif "Off" in termId:
                timeline[termId] = {
                    "type": "off",
                    "term": termId,
                    "termDescription": "Off term",
                    "startDate": getDates(term[SEMESTER_INDEX], term[YEAR_INDEX], True),
                    "endDate": getDates(term[SEMESTER_INDEX], term[YEAR_INDEX], False),
                    "semester": term[SEMESTER_INDEX],
                    "year": term[YEAR_INDEX]
                }
            else:
                timeline[termId] = {
                    "type": "study",
                    "term": termId,
                    "termDescription": term[COURSE_ID_INDEX],
                    "startDate": getDates(term[SEMESTER_INDEX], term[YEAR_INDEX], True),
                    "endDate": getDates(term[SEMESTER_INDEX], term[YEAR_INDEX], False),
                    "semester": term[SEMESTER_INDEX],
                    "year": term[YEAR_INDEX]
                }

    print(timeline)

    return sortTimeline(timeline)
