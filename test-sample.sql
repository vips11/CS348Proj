/* Query 1 */
/* Sample query with "Williams" as the search string*/
/* Primarily for spaces(name) and people(name) */
select *
from Student
where first_name like '%Williams%' or last_name like '%Williams%';

/* 
Filtering - Filters according to courses taken or taking, company worked at or working in, 
            current term, current program.
*/
/* Query 2
   Sample query filtering according to Bank of America
 */
select STUDENT.id, first_name, last_name, uw_email, program, description
from STUDENT, COMPANY natural join WORKS
where COMPANY.name like '%Bank%';

/* Query 3 */
/* Sample query filtering for term '2A' */
select *
from STUDENT
where term like '2%';

/* Query 4 */
/* Sample query filtering for program 'Math' */
select STUDENT.id, first_name, last_name, uw_email, program, description
from STUDENT
where program = 'Math' or program = 'Physics' or program = 'Engineering';


/* Query 5 */
/* Sample query filtering for any course with 'CS' */
select distinct STUDENT.id, first_name, last_name, term, semester, year, uw_email, program, description
from STUDENT, COURSE
where course_id like '%CS%' limit 10;


/* Query 6 */
/* Find a mentor for course for STAT 230 for student who took the course in Spring 2023 */
/* We have the current student ID and course name so we can get current semester and year  */
/* We look for mentors for a student with ID 96667175 */
select *, course_id
from (select distinct T.student_id, course_id, T.year, T.semester
            from TAKES as T, (select * from STUDENT where  id = 96667175) as S
            where T.course_id = 'STAT 230'
                  and T.student_id <> S.id
                  and ((T.year < S.year)
                         or  (T.year = S.year
                                  and ((S.semester = 'Spring' and T.semester = 'Winter')
                                           or (S.semester = 'Fall'
                                                   and (T.semester = 'Winter' or T.semester = 'Spring')))))), STUDENT
where student_id = STUDENT.id;

/* 
Updating the name
*/

/* Query 7 */
/* Update the first name */
Update Student
Set first_name = 'Jen'
Where ID = 67496942;

/* Query 8 */
/* Update the last name */
Update Student 
Set last_name = 'Smith'
Where ID = 51458338;


/* Query 9 */
/* Find a study group */
select distinct first_name, last_name, T2.course_id, T2.student_id
from TAKES as T2, (select course_id, first_name, last_name
            from STUDENT as S, TAKES as T
            where T.student_id = 96667175) as Temp
where T2.course_id = Temp.course_id and T2.student_id != 96667175;


/* Query 10 */
/* Finding spaces */


/* Query 11 */
/* Authorisation for login/logout */

/* Query 12 */
/* Find a friend for the student with student_ID 96667175 */
/* depending on students who have similar interests */
SELECT DISTINCT first_name, last_name
FROM Student s
JOIN Interested i1 ON s.id = i1.student_id
JOIN Interested i2 ON i1.interest_id = i2.interest_id AND i2.student_id = 96667175
WHERE s.id <> 96667175
group by s.id
having count(DISTINCT i1.interest_id) >= 1;

/* Query 13 */
/* find the courses with the highest liked course rating */
select RATES.course_id
from (select max(liked_rating) as maxLikedRating
        from RATES as R), RATES
where RATES.liked_rating = maxLikedRating;

/* Query 14 */
/* find the course with the highest useful course rating */
select course_id
from (select max(useful_rating) as maxUsefulRating
        from RATES as R), RATES
where RATES.useful_rating = maxUsefulRating;

/* Query 15 */
/* find the course with the highest useful and liked course rating */
select course_id
from (select max(useful_rating) as maxUsefulRating, max(liked_rating) as maxLikedRating
        from RATES as R), RATES
where RATES.useful_rating = maxUsefulRating
    and RATES.liked_rating = maxLikedRating;

/* Query 16 */
/* Find a friend for the student with student_ID 96667175 */
/* depending on students who have similar interests */
SELECT DISTINCT first_name, last_name
FROM Student s
JOIN Interested i1 ON s.id = i1.student_id
JOIN Interested i2 ON i1.interest_id = i2.interest_id AND i2.student_id = 96667175
WHERE s.id <> 96667175
group by s.id
having count(DISTINCT i1.interest_id) >= 1


/* Query 17 */
/* Authoriza user login credentials */
SELECT * from AUTHORISATION WHERE
    uw_email = "milsmith@uwaterloo.ca" and
    password = "uA&y2KsPmT$!vJ8Q"
