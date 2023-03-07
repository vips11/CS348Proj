import React from "react";
import "./Student.css";

const Student = ({ id, firstName, lastName, program, term }) => {
  return (
    <div className="student" key={id}>
      <p className="studentDetails">
        {firstName + " " + lastName + " | " + program + " | " + term}
      </p>
    </div>
  );
};

export default Student;
