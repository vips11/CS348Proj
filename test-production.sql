/* Query 1 */
/* Sample query with "Smith" as the search string*/
/* Primarily for spaces(name) and people(name) */
SELECT *
from STUDENT
where first_name like '%Smith%' or last_name like '%Smith';
/*
Filtering - Filters according to courses taken or taking, company worked at or working in,
            current term, current program.
*/
/* Query 2
   Sample query filtering according to Bank of America
 */
select DISTINCT STUDENT.id, first_name, last_name, uw_email, program, description
from STUDENT, COMPANY, WORKS
where COMPANY.name like '%Bank%';

/* Query 3 */
/* Sample query filtering for term '2A' */
select *
from STUDENT
where term like '2%' limit 10;

/* Query 4 */
/* Sample query filtering for program 'Math', physics or engineering  */
select STUDENT.id, first_name, last_name, uw_email, program, description
from STUDENT
where program = 'Math' or program = 'Physics' or program = 'Engineering';


/* Query 5 */
/* Sample query filtering for any course with 'CS' */
select distinct STUDENT.id, first_name, last_name, term, semester, year, uw_email, program, description
from STUDENT, COURSE
where course_id like '%CS%';


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
SELECT DISTINCT s2.first_name, s2.last_name
FROM Student s1
JOIN Takes t1 ON s1.ID = t1.student_ID
JOIN Takes t2 ON t1.course_ID = t2.course_ID AND t1.section_ID = t2.section_ID AND t1.semester = t2.semester AND t1.year = t2.year
JOIN Student s2 ON t2.student_ID = s2.ID
WHERE s1.ID = 29384617 AND s1.program = s2.program AND s2.ID <> 29384617
GROUP BY s2.ID
HAVING COUNT(DISTINCT t2.course_ID) >= 3;


/* Query 10 */
/* Find a friend for the student with student_ID 96667175 */
/* depending on students who have similar interests */
SELECT DISTINCT first_name, last_name
FROM Student s
JOIN Interested i1 ON s.id = i1.student_id
JOIN Interested i2 ON i1.interest_id = i2.interest_id AND i2.student_id = 96667175
WHERE s.id <> 96667175
group by s.id
having count(DISTINCT i1.interest_id) >= 1;

/* Query 11 */
/* find the courses with the highest liked course rating */
select RATES.course_id
from (select max(liked_rating) as maxLikedRating
        from RATES as R), RATES
where RATES.liked_rating = maxLikedRating;

/* Query 12 */
/* find the course with the highest useful course rating */
select course_id
from (select max(useful_rating) as maxUsefulRating
        from RATES as R), RATES
where RATES.useful_rating = maxUsefulRating;

/* Query 13 */
/* find the course with the highest useful and liked course rating */
select course_id
from (select max(useful_rating) as maxUsefulRating, max(liked_rating) as maxLikedRating
        from RATES as R), RATES
where RATES.useful_rating = maxUsefulRating
    and RATES.liked_rating = maxLikedRating;

/* Query 14 */
/* find the CS courses with the highest liked rating */
select distinct course_ID, course_description
from RATES R natural join COURSE C
natural join SECTION
where course_ID LIKE '%CS%' order by liked_rating desc


/* Query 15 */
/* Finding spaces */
select *
from SPACES
where name like '%Music%';

/* Query 16 */
/* Authorisation for login/logout */
SELECT * from AUTHORISATION WHERE
    uw_email = 'milsmith@uwaterloo.ca' and
    password = 'uAy2KsPmT$!vJ8Q';

/* Query 17
   Retrieving posts data from spaces
 */

select Posts.title, Posts.description
from SPACES join POSTS on SPACES.space_id = Posts.space_id
where SPACES.space_id = 1;

/* Query 18
   Adding a new course rating
 */

INSERT INTO RATES VALUES
                    (5, 2, 'ASL 101', 96667175);
SELECT *
FROM RATES
