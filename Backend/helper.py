import sqlite3 as sl


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


def getTimeline(terms):
    timeline = {}

    for term in terms:
        termId = term["term"]
        if termId in timeline:
            timeline[termId]["description"] += ", " + term[""]
