/* 
Searching - Searches for all the students with the names that contain the search string
*/

/* Query 1 */
/* Sample query with "Williams" as the search string*/
select *
from Student
where name like ‘%Williams%’

/* 
Filtering - Filters according to courses taken or taking, company worked at or working in, 
            current term, current program
*/

/* Query 2 */
/* Sample query filtering for term '2A' */
select *
from student
where term = '2A'


/* Query 3 */
/* Sample query filtering for course 'PHYS' */


/* Query 4 */
/* Sample query filtering for program 'Math' */

select *
from student
where program like ‘Math’


/* Query 5 */
/* Sample query filtering for program 'Bank of America' */



/* 
Find a mentor - Finds a student who took the same course before
*/

/* Query 6 */
/* Find a mentor for course for STAT 230 for student who took the course in Spring 2023 */
/* We have the current student ID and course name so we can get current semester and year */
select Student.name
from Takes join Student 
where Takes.course_ID = 'STAT 230'
and Takes.year < 2023



