# CS348Proj
## Overview of the Project
This is a web driven application exclusively for UWaterloo students to connect with each other on their common interests, courses and coop indo. <br>

Users will be able to make profiles and include details such as their program, academic term, courses (per term), co-op journey info, and social media links such as LinkedIn, email, discord, personal website.
 
## How to create the sample database

## How to load the sample database

## Running the application
The application is written in React. The commands to run the program are given below: <br><br>
` cd frontend && npm install
  npm start ` <br> <br>
The first line is to get to the directory with the code for the application. <br>
The second line is to run the application.

## Features
<ol>
<li>Search for students using their name
<li>Filter students based on their courses, companies worked at, current term and/or current program
<li> Update their personal information
<li> Find a study/coop group
<li> Find a mentor
<li> Creating spaces
<li> Creating clubs
<li> Creating accounts and login 
<li> Creating private and public posts
</ol>

## Features that are currently implemented
The application currently supports features 1 and 2.


## User Privileges
<ol>
<li> A user can create a club (if approved by some administrator), the user that has created the club is the owner. An owner of a club has access to all data involved with the club. 
<li> Administrators (that's us), have access to everything. 
<li> Users will have public data (such as name and email) and private data (date of birth, current courses taken). Individual users will not be able to access other people's private data but can access their own. 
<li>  Users can make both public and private posts, private posts can only be seen by friends of the user. 
</ol>

## Users and Admins

The users of this application are the students of UW across all programs. 

The administrators of the database systems are group 20(Anshpreet, Eric, Vansh, Saikrishna, Vipasha)


## Technologies used

Front End Technologies: React.JS, JavaScript/TypeScript, HTML, CSS

Back End Technologies: Node.JS, Express.js, JavaScript/TypeScript

Database Support Technologies: MySQL


## ER diagram
<img width="600" height="700" alt="Screenshot 2023-02-25 at 6 27 28 PM" src="https://user-images.githubusercontent.com/66628544/223244623-422c6ab2-3320-49d3-b656-4a78c0bf9d3d.png">


## Relational Model

Student(ID, first_name, last_name, uw_email, program, description)


Social(ID, platform, link)
FK: Social.ID references Student.ID

Interested(student_ID, interest_ID) <br>
FK: Interested.student_ID references Student 
       Interested.interest_ID references Interests 

Interests(ID, name)

Course(course_ID, course_name, course_description)

Takes(student_ID, course_ID, section_ID, semester, year, term) <br>
FK: Takes.student_ID references Student<br>
       &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;Takes.{course_ID, section_ID, semester, year} references Section

Section(course_ID, section_ID, semester, year, time_slot_ID)<br>
FK: Section.course_ID references Course<br>
       &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;Section.time_slot_ID references Time_slot

Time_slot(time_slot_ID, day_of_week, start_time, end_time)

Works(term, start_date, end_date, student_ID, job_ID)<br>
FK: Works.student_ID references Student<br>
     &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;Works.job_IDreferences Position

Job(job_ID, position_name, is_full_time, facility_ID, company_ID)<br>
FK: Job.facility_ID references Facility

Facility(facility_ID, company_ID, street, city, country, building_name)<br>
FK: Facility.company_ID references Company

Company(company_ID, name)

