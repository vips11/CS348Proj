import axios from "axios";

const host = "http://127.0.0.1:5000";

const student = axios.create({
  baseURL: `${host}/student`,
});

const studentDetail = axios.create({
  baseURL: `${host}/student/detail`,
});

const findMentor = axios.create({
  baseURL: `${host}/find-a-mentor`,
});

const authorize = axios.create({
  baseURL: `${host}/authorize`,
});

const spaces = axios.create({
  baseURL: `${host}/spaces`,
});

const spacesDetail = axios.create({
  baseURL: `${host}/spaces/detail`,
});

const findStudyGrp = axios.create({
  baseURL: `${host}/find-a-study-grp`,
});

const course = axios.create({
  baseURL: `${host}/course`,
});

const company = axios.create({
  baseURL: `${host}/company`,
});

const executeGet = async (api, request, callback = null) => {
  try {
    if (callback) {
      api
        .get("", request)
        .then((response) => {
          callback(response.data);
        })
        .catch((error) => {});
    }
  } catch (error) {
    return {
      error: error,
    };
  }
};

const executePost = async (api, request, callback = null) => {
  try {
    if (callback) {
      api
        .post("", request)
        .then((response) => {
          callback(response.data);
        })
        .catch((error) => {});
    }
  } catch (error) {
    return {
      error: error,
    };
  }
};

const executePut = async (api, request, callback = null) => {
  try {
    if (callback) {
      api
        .put("", request)
        .then((response) => {
          callback(response.data);
        })
        .catch((error) => {});
    }
  } catch (error) {
    return {
      error: error,
    };
  }
};

export const getStudent = (request, callback) => {
  executeGet(student, request, callback);
};

export const updateStudent = (request, callback) => {
  executePost(student, request, callback);
};

export const createStudent = (request, callback) => {
  executePut(student, request, callback);
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

export const verifyLogin = async (credentials, callback) => {
  //executeGet(authorize, request, callback);

  //   const fetchData = async () => {
  //     try {
  //       // Make the GET request with query parameters
  //       const response = await axios.get(
  //         host +
  //           `/authorize?username=${credentials.username}&password=${credentials.password}`
  //       );

  //       console.log(response.data);
  //       return response;
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  try {
    const qs = require('qs');
    const response = await axios.get(
      host + `/authorize`, qs.stringify(credentials)
    );

    console.log("1: " + response);
    callback(response);
  } catch (error) {
    console.log(error);
  }

  //   axios
  //     .get(
  //       host +
  //         `/authorize?username=${credentials.username}&password=${credentials.password}`
  //     )
  //     .then((response) => console.log(response))
  //     .catch((error) => console.log(error));

  //   const res = await fetchData();
  //   callback(res);
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
