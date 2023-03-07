import React, { useState } from "react";
import "./SearchBar.css";

function SearchBar() {
  const [expanded, setExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    courses: "",
    term: "",
    companies: "",
    program: "",
  });

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setSelectedFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // do something with searchTerm and selectedFilters
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          className="main-search"
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <div
          className={`filter-section${expanded ? " expanded" : ""}`}
          onClick={() => setExpanded((prevExpanded) => !prevExpanded)}
        >
          Filter
        </div>
        {expanded && (
          <div className="filter-options">
            <label>
              Courses:
              <input
                type="text"
                name="courses"
                value={selectedFilters.courses}
                onChange={handleFilterChange}
              />
            </label>
            <label>
              Term:
              <input
                type="text"
                name="term"
                value={selectedFilters.term}
                onChange={handleFilterChange}
              />
            </label>
            <label>
              Companies:
              <input
                type="text"
                name="companies"
                value={selectedFilters.companies}
                onChange={handleFilterChange}
              />
            </label>
            <label>
              Program:
              <input
                type="text"
                name="program"
                value={selectedFilters.program}
                onChange={handleFilterChange}
              />
            </label>
          </div>
        )}
      </form>
    </div>
  );
}

export default SearchBar;
