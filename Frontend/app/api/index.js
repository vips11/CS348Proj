import axios from "axios";

const host = "http://127.0.0.1:5000"

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
    executeGet(student, request, callback)
}

export const updateStudent = (request, callback) => {
    executePost(student, request, callback)
}

export const createStudent = (request, callback) => {
    executePut(student, request, callback)
}

export const getStudentDetail = (request, callback) => {
    executeGet(studentDetail, request, callback)
}

export const getSpaces = (request, callback) => {
    executeGet(spaces, request, callback)
}

export const getSpacesDetail = (request, callback) => {
    executeGet(spacesDetail, request, callback)
}

export const findAMentor = (request, callback) => {
    executeGet(findMentor, request, callback)
}

export const verifyLogin = (request, callback) => {
    executeGet(authorize, request, callback)
}

export const findAStudyGrp = (request, callback) => {
    executeGet(findStudyGrp, request, callback)
}

export const getCourses = (request, callback) => {
    executeGet(course, request, callback)
}

export const rateCourse = (request, callback) => {
    executePost(course, request, callback)
}

export const getCompany = (request, callback) => {
    executePost(company, request, callback)
}
