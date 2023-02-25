# CS348Proj
## Overview of the Project
The purpose of the app is to allow UW students to connect with each other over their common courses and interests. 

Users will be able to make profiles and include details such as their program, academic term, courses (per term), co-op journey info, and external links such as linkedin, email, discord, personal website etc. 

Users will be able to search for students by name, program, term, courses per term etc. 

## Features

Additionally there will be features such as "find me a mentor", "find me a study group", and “find me a co-op group” which will group students together based on commonalities and facilitate interaction.

Users can apply to create their own clubs or events. Users will be able to search currently running clubs.


## User Privileges
1. A user can create a club (if approved by some administrator), the user that has created the club is the owner. An owner of a club has access to all data involved with the club. 
2. Administrators (that's us), have access to everything. 
3. Users will have public data (such as name and maybe email) and private data (date of birth, current courses taken, etc). Individual users will not be able to access other people's private data but can access their own. 
4. Users can make both public and private posts, private pots can only be seen by friends of the user. 


## Users and Admins

The users of this application are the students of UW across all programs. 

The administrators of the database systems are us (the group making the project).


## Technologies used

Front End Technologies: React.JS, JavaScript/TypeScript, HTML, CSS

Back End Technologies: Node.JS, Express.js, JavaScript/TypeScript

Database Support Technologies: MySQL


## ER diagram
<img width="798" alt="Screenshot 2023-02-25 at 6 27 28 PM" src="https://user-images.githubusercontent.com/66628544/221384236-b0702a77-abc9-4ce2-9196-a6e4ee168c33.png">

## Fields of the database

- First Name
- Last Name
- UW Email Address
- Program
- Term
- Coop or non-coop ----> If coop, then coop info (company name, roll, location, dates)
- Description
- Interests ---> tags from a list of predetermined options that the user selects to associate themselves with.
- Courses per term ---> Optional, but if included, we need course name/number, section, term taken
- External Links ---> Other Email, Linkedin, GitHub, Discord, Instagram etc.
- Friends —> [ids] where each id is the id of another user

