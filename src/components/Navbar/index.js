import React, { useState, useRef } from "react";
import displayIcon from "../../assets/random/Display.svg";
import downIcon from "../../assets/random/down.svg";
import classes from "./index.module.css";




const Dropdown = ({ onGroupChange, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isGroupingOpen, setIsGroupingOpen] = useState(false);
  const [isSortingOpen, setIsSortingOpen] = useState(false);

  const groupByRef = useRef(localStorage.getItem("groupBy") || null);
  const sortByRef = useRef(localStorage.getItem("sortBy") || null);

  // States for selected grouping and sorting
  const [selectedGrouping, setSelectedGrouping] = useState(
    groupByRef.current || "Select Grouping"
  );
  const [selectedSorting, setSelectedSorting] = useState(
    sortByRef.current || "Select Ordering"
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setIsSortingOpen(false);
    setIsGroupingOpen(false);
  };

  const toggleGroupingDropdown = () => {
    setIsGroupingOpen(!isGroupingOpen);
    setIsSortingOpen(false);
  };

  const toggleSortingDropdown = () => {
    setIsSortingOpen(!isSortingOpen);
    setIsGroupingOpen(false);
  };

  
  const handleGroupChange = (groupBy) => {
    setSelectedGrouping(groupBy.charAt(0).toUpperCase() + groupBy.slice(1)); // Capitalize first letter
    groupByRef.current = groupBy;
    onGroupChange(groupBy);
    setIsGroupingOpen(false);
    localStorage.setItem("groupBy", groupBy);
  };

 
  const handleSortChange = (sortBy) => {
    setSelectedSorting(sortBy.charAt(0).toUpperCase() + sortBy.slice(1)); 
    sortByRef.current = sortBy;
    onSortChange(sortBy);
    setIsSortingOpen(false);
    localStorage.setItem("sortBy", sortBy);
  };

  return (
    <div className={classes.dropdown}>
      <div className={classes.dropbtn} onClick={toggleDropdown}>
        <img
          className={classes.displayIcon}
          src={displayIcon}
          alt="Display Icon"
        />
        <button className={classes.displaybtn}>Display</button>
        <img className={classes.downIcon} src={downIcon} alt="Down Icon" />
      </div>
      {isOpen && (
        <div className={classes.dropdownContent}>
          {/* Grouping Section */}
          <div className={classes.row}>
            <div className={classes.label}>Grouping</div>
            <div className={classes.groupingDropdown}>
              <div className={classes.dropbtnSmall} onClick={toggleGroupingDropdown}>
                <span>{selectedGrouping}</span> 
                <img className={classes.downIconSmall} src={downIcon} alt="Down Icon" />
              </div>
              {isGroupingOpen && (
                <div className={classes.dropdownInnerContent}>
                  <div
                    className={classes.dropElements}
                    onClick={() => handleGroupChange("status")}
                  >
                    Status
                  </div>
                  <div
                    className={classes.dropElements}
                    onClick={() => handleGroupChange("user")}
                  >
                    User
                  </div>
                  <div
                    className={classes.dropElements}
                    onClick={() => handleGroupChange("priority")}
                  >
                    Priority
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sorting Section */}
          <div className={classes.row}>
            <div className={classes.label}>Ordering</div>
            <div className={classes.sortingDropdown}>
              <div className={classes.dropbtnSmall} onClick={toggleSortingDropdown}>
                <span>{selectedSorting}</span> 
                <img className={classes.downIconSmall} src={downIcon} alt="Down Icon" />
              </div>
              {isSortingOpen && (
                <div className={classes.dropdownInnerContent}>
                  <div
                    className={classes.dropElements}
                    onClick={() => handleSortChange("priority")}
                  >
                    Priority
                  </div>
                  <div
                    className={classes.dropElements}
                    onClick={() => handleSortChange("title")}
                  >
                    Title
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Navbar = ({ onGroupChange, onSortChange }) => {
  return (
    <div className={classes.container}>
      <Dropdown onGroupChange={onGroupChange} onSortChange={onSortChange} />
    </div>
  );
};

export default Navbar;
