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
where course_id like '%CS%';


/* Query 6 */
/* Find a mentor for course for STAT 230 for student who took the course in Spring 2023 */
/* We have the current student ID and course name so we can get current semester and year */
select S.id, first_name, last_name, term, semester, year, uw_email, program, description
from STUDENT as S, TAKES as T
where course_id = 'MATH 135'
      and ((T.year < S.year)
             or  (T.year = S.year
                      and ((S.semester = 'Spring' and T.semester = 'Winter')
                               or (S.semester = 'Fall'
                                       and (T.semester = 'Winter' or T.semester = 'Spring')))));

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
select distinct first_name, last_name
from TAKES as T2, (select course_id, first_name, last_name
            from STUDENT as S, TAKES as T
            where T.student_id = 22779613) as Temp
where T2.course_id = Temp.course_id;

/* Query 10 */
/* Finding spaces */


/* Query 11 */
/* Authorisation for login/logout */

/* Query 12  */
/* Find me a friend */

/* Query 13 */
/* find the course with the highest course rating */

/* Query 14 */

