# CS348Proj
## Overview of the Project
This is a web driven application exclusively for UWaterloo students to connect with each other on their common interests, courses and coop indo. <br>

Users will be able to make profiles and include details such as their program, academic term, courses (per term), co-op journey info, and social media links such as LinkedIn, email, discord, personal website.
 
## How to create the sample dataset
<ol>
<li> Put all the data in excel files.
<li> Convert the XLSX files to JSON using https://products.aspose.app/cells/conversion/xlsx-to-json.
</ol>

## How to create the production dataset
<ol>
<li> Give the relational model to ChatGPT with the data specifications.
</ol>

## How to load the sample database
<ol>
 <li>Make sure you have all the sample data json files.</li>
 <li>cd into the Backend directory and run "python3 loadDatabase.py" </li>
 <li>A sql database, named applicationDB.db, should be created in the Backend folder containing all the tables and the sample database.</li>
</ol>

NOTE: The production database is loaded the same way. We just added additional queries for the new tables.

## Running the application
The frontend is written in React. The commands to run the program are given below: <br><br>
` cd frontend && npm install
  npm start ` <br> <br>
The first line is to get to the directory with the code for the application. <br>
The second line is to run the application.

The backend is written in python. To run the backend cd into the Backend directory and run the following: <br>
pip3 install flask <br>
pip3 install flask_restful <br>
pip3 install flask_cors <br>
python3 api.py

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
New supported faeatures: 4, 7.
Files that have the implemenation: 


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

![image](https://user-images.githubusercontent.com/66628544/228086815-9de0c533-c3bf-46be-bdd8-230b70620220.png)

