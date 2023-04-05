import axios from "axios";

const host = "http://127.0.0.1:5000";

export const getStudent = (request, callback) => {
  executeGet(student, request, callback);
};

export const updateStudent = (request, callback) => {
  executePost(student, request, callback);
};

export const getStudentDetail = (request, callback) => {
  executeGet(studentDetail, request, callback);
};

export const getSpaces = (request, callback) => {
  executeGet(spaces, request, callback);
};

export const getSpacesDetail = (request, callback) => {
  executeGet(spacesDetail, request, callback);
};

export const findAMentor = (request, callback) => {
  executeGet(findMentor, request, callback);
};

export const findAStudyGrp = (request, callback) => {
  executeGet(findStudyGrp, request, callback);
};

export const getCourses = (request, callback) => {
  executeGet(course, request, callback);
};

export const rateCourse = (request, callback) => {
  executePost(course, request, callback);
};

export const getCompany = (request, callback) => {
  executePost(company, request, callback);
};
