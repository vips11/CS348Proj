import React, { useState } from "react";

import "./People.css";
import Student from "../../components/Student/Student";
import profileData from "../../data/profileData.json";
import SearchBar from "../../components/SearchBar/SearchBar";

const People = () => {
  const [search, setSearch] = useState("");

  function handleSearch(event) {
    setSearch(event.target.value);
  }

  return (
    <div className="App">
      <SearchBar />

      {profileData
        .filter((val) => {
          if (search === "") {
            return val;
          } else if (
            val.firstName.toLowerCase().includes(search.toLowerCase())
          ) {
            return val;
          }
        })
        .map((val) => {
          return (
            <Student
              id={val.id}
              firstName={val.firstName}
              lastName={val.lastName}
              program={val.program}
              term={val.term}
            />
          );
        })}
    </div>
  );
};

export default People;
