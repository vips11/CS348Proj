import axios from "axios";

const base_URL = "http://127.0.0.1:5000";

const executeGet = async (endpoint, params, callback = null) => {
  try {
    // var paramsLst = [];

    // Object.keys(params).forEach(function (key) {
    //   paramsLst.push(key + "=" + params[key]);
    // });

    // const response = await axios.get(
    //   base_URL + endpoint + "?" + paramsLst.join("&")
    // );

    const response = await axios.post(base_URL + endpoint, params);

    if (callback) {
      callback(response);
    }
  } catch (err) {
    console.log("ERROR IN GET REQUEST:");
    console.log(err);
  }
};

const executePost = async (endpoint, params, callback = null) => {
  try {
    console.log("Posting");
    const response = await axios.post("http://127.0.0.1:5000/spaces", params);

    if (callback) {
      callback(response);
    }
  } catch (error) {
    console.log("ERROR IN POST REQUEST:");
    console.log(error);
  }
};

const executePut = async (endpoint, params, callback = null) => {
  try {
    const response = await axios.post(base_URL + endpoint, params);

    if (callback) {
      callback(response);
    }
  } catch (error) {
    console.log("ERROR IN PUT REQUEST:");
    console.log(err);
  }
};

// Accepts username and password as strings
// returns true or false for if verification was succesful or not
export const verifyLogin = async (username, password, callback) => {
  console.log("Verifying");
  const params = {
    username: username,
    password: password,
  };

  await executeGet("/authorize", params, callback);
};

// Put request body is all the info needed to create a new student.
// Returns True if the create was succesful, else returns False
export const createStudent = async (
  firstName,
  lastName,
  email,
  password,
  studentID,
  program,
  callback
) => {
  const params = {
    firstName: firstName,
    lastName: lastName,
    uw_email: email,
    username: email,
    id: studentID,
    program: program,
    password: password,
    currentTerm: "",
    semester: "",
    description: "",
    year: 2023,
  };

  await executeGet("/create-student", params, callback);
};

// This API is to get all the students after applying the
// filter fields. Input fields are the filters on:
// - FirstName, LastName, Program, Term, Companies, Courses
// Return type should be an array of students, where each student
// in the array should be in the following format:
// {
//   firstName: "FIRSTNAME_HERE",
//   lastName: "LASTNAME_HERE",
//   termInfo: "TERMINFO_HERE", ---> either "TERM PROGRAM" or "POSITION @ COMPANY", for ex, "1A Mathematics" or "SWE Intern @ ABC Corp."
//   key: "PRIMARY_KEY" ---> uw_email or student id, whatever you want to use to look up a specific student.
// }
export const getStudents = async (
  firstName,
  lastName,
  program,
  term,
  companies,
  callback
) => {
  const params = {
    key: "",
    firstName: firstName,
    lastName: lastName,
    program: program,
    term: term,
    company: companies,
  };

  await executeGet("/student", params, callback);
};

// Given a student's primary key, either uw_email or studentID or whatever,
// return the JSON object that is that student's entire data. The data should
// look like the following:
// studentData = {
//   firstName: "Devlin",
//   lastName: "Standring",
//   email: "dstandring0@uwaterloo.ca",
//   currentTerm: "2B",
//   program: "Mathematics",
//   timeLine: [
//     {
//       type: "study",
//       term: "1A",
//       termDescription: "Math 135, Math 137, CS 135, Phys 121, SPCOM 100",
//       startDate: "Sept 2020",
//       endDate: "Dec 2020",
//     },
//     {
//       type: "study",
//       term: "1B ",
//       termDescription: "Math 136, Math 138, CS 136, AFM 101, Econ 101",
//       startDate: "Jan 2021",
//       endDate: "Apr 2021",
//     },
//     {
//       type: "work",
//       term: "Coop 1",
//       termDescription: "Testing and QA @ ABC Inc.",
//       startDate: "May 2021",
//       endDate: "Aug 2021",
//     },
//   ],
//   links: [
//     {
//       type: "LinkedIn",
//       link: "https://www.linkedin.com",
//     },
//     {
//       type: "Email",
//       link: "mailto:email@gmail.com",
//     },
//     {
//       type: "GitHub",
//       link: "https://www.github.com",
//     },
//     {
//       type: "Discord",
//       link: "https://www.discord.com",
//     },
//   ],
// }
export const getStudentProfile = async (key, callback) => {
  const params = {
    key: key,
  };

  await executeGet("/student/detail", params, callback);
};

// Given the name of a space, return an array of all the spaces
// that fit. The return should be an array of spaceDetails, where
// each spaceDetail object looks like the following:
// {
//   space_ID: 29,
//   name: "business enthusiasts",
//   description: "we talk about various talks relating to business",
// }
export const getSpaces = async (name, callback) => {
  const params = {
    name: name,
  };

  await executeGet("/spaces", params, callback);
};

// Given a space ID, I want all the data and posts for
// that specific page. Here is what the return should
// look like:
// spaceInfo = {
//   name: "Musical Friday",
//   description: "Every friday, we gather together and do some karoke",
//   posts: [
//     {
//       title: "Photos from Last Week's Musical Fridays",
//       description:
//         "Check out these pictures from our last Musical Fridays event! Thanks to everyone who came out and made it a great night.",
//     },
//     {
//       title: "Karaoke Competition",
//       description:
//         "We're hosting a karaoke competition at Musical Fridays next week. Come show off your skills and compete for a prize!",
//     },
//     {
//       title: "Musical Fridays Cancelled",
//       description:
//         "Unfortunately, we have to cancel this week's Musical Fridays due to unforeseen circumstances. Stay tuned for updates on when we'll be back up and running!",
//     },
//     {
//       title: "Reminder: Musical Fridays Tonight!",
//       description:
//         "Just a friendly reminder that Musical Fridays is happening tonight. Come join us for some great music and good times!",
//     },
//   ],
// };
export const getSpaceInfo = async (spaceID, callback) => {
  const params = {
    key: spaceID,
  };

  console.log("PARAMS: ", params);

  await executeGet("/spaces/detail", params, callback);
};

// Given the key of a student, find a mentor for that student.
// Return the mentor in the following format:
// mentorInfo = {
//   firstName: "FIRSTNAME_HERE",
//   lastName: "LASTNAME_HERE",
//   termInfo: "TERMINFO_HERE", ---> either "TERM PROGRAM" or "POSITION @ COMPANY", for ex, "1A Mathematics" or "SWE Intern @ ABC Corp."
//   key: "PRIMARY_KEY" ---> uw_email or student id, whatever you want to use to look up a specific student.
// }
export const findMentor = async (key, callback) => {
  const params = {
    key: key,
    courseName: "CS 135",
    year: 2023,
    semester: "Fall",
  };

  await executeGet("/find-a-mentor", params, callback);
};

// Given the key of a student, find a study group for that student.
// Return an array of study-partner objects. Each study-partner must be
// in the following format:
// studyPartner = {
//   firstName: "FIRSTNAME_HERE",
//   lastName: "LASTNAME_HERE",
//   termInfo: "TERMINFO_HERE", ---> either "TERM PROGRAM" or "POSITION @ COMPANY", for ex, "1A Mathematics" or "SWE Intern @ ABC Corp."
//   key: "PRIMARY_KEY" ---> uw_email or student id, whatever you want to use to look up a specific student.
// }
export const findStudyGroup = async (key, callback) => {
  const params = {
    key: key,
    semester: "Fall",
    year: 2020,
  };

  await executeGet("/find-a-study-grp", params, callback);
};

// Given the filters for a course, return a list of all courses.
// Each item in the list should look like the collowing:
// course = {
//   name: "CS 246",
//   liked: 4,
//   used: 5,
// };
export const getCourseList = async (name, liked, used, callback) => {
  const params = {
    courseId: "",
    liked: liked,
    useful: used,
    alpha: name,
  };

  await executeGet("/course", params, callback);
};

// Given the name, liked, and used for a new course, uplload
// this information. Return a boolean to indicate whether this
// opration was succesful or not.
export const saveCourseRating = async (name, liked, used, callback) => {
  const params = {
    courseId: name,
    liked: liked,
    useful: used,
    email: localStorage.getItem("userEmail"),
  };

  await executeGet("/course/rate", params, callback);
};

export const editProfile = async (params, callback) => {
  console.log("PARAMS: ");
  console.log(params);
  await executeGet("/update-student", params, callback);
};
