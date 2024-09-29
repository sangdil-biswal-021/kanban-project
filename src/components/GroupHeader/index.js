import React from "react";
import classes from "./index.module.css";
import addIcon from "../../assets/random/add.svg"
import dotIcon from "../../assets/random/3dotmenu.svg"
import { getPriorityIcon, getStatusIcon } from "../KanbanTickets";

const validStatuses = ["In progress", "Todo", "Backlog", "Done", "Cancelled"];
const validPriorities = ["1", "2", "3", "4", "0"];
const validPrioritiesName = ["No priority", "low", "medium", "high", "urgent"];

const Header = ({ name, count =0 }) => {
  return (
    <div className={name === "all" ? classes.block : classes.container}>
      <div className={classes.head}>
        {validStatuses.includes(name) && <img src={getStatusIcon(name)} alt={`${name} icon`} className={classes.icon} />}
        {validPriorities.includes(name) && <img src={getPriorityIcon(name-"0")} alt={`${name} icon`} className={classes.icon} />}
        {validPriorities.includes(name) ? <div className={classes.headerText}>{validPrioritiesName[name-"0"]}</div>: <div className={classes.headerText}>{name}</div> }
        
        <div className={classes.counts}> {count}</div>
      </div>
      <div className={classes.icons}>
        <img src={addIcon} alt={`${name} icon`} className={classes.icon} />
        <img src={dotIcon} alt={`${name} icon`} className={classes.icon} />
      </div>
    </div>
  );
};

export default Header;
