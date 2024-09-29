import React from "react";
import classes from "./index.module.css";

import HighPriorityIcon from "../../assets/priorityIcons/HighPriority.svg";
import MediumPriorityIcon from "../../assets/priorityIcons/MediumPriority.svg";
import LowPriorityIcon from "../../assets/priorityIcons/LowPriority.svg";
import UrgentPriorityIcon from "../../assets/priorityIcons/UrgentPriority.svg";
import NoPriorityIcon from "../../assets/priorityIcons/NoPriority.svg";

import BacklogIcon from "../../assets/statusIcons/Backlog.svg";
import InProgressIcon from "../../assets/statusIcons/InProgress.svg";
import DoneIcon from "../../assets/statusIcons/Done.svg";
import ToDoIcon from "../../assets/statusIcons/ToDo.svg";
import CancelledIcon from "../../assets/statusIcons/Cancelled.svg";

import DefaultUserAvatar from "../../assets/user/User.svg";

export const getStatusIcon = (status) => {
  switch (status) {
    case "Backlog":
      return BacklogIcon;
    case "In progress":
      return InProgressIcon;
    case "Todo":
      return ToDoIcon;
    case "Done":
      return DoneIcon;
    case "Cancelled":
      return CancelledIcon;
    default:
      return null;
  }
};

export const getPriorityIcon = (priority) => {
  switch (priority) {
    case 0:
      return NoPriorityIcon;
    case 1:
      return LowPriorityIcon;
    case 2:
      return MediumPriorityIcon;
    case 3:
      return HighPriorityIcon;
    case 4:
      return UrgentPriorityIcon;
    default:
      return null;
  }
};

const KanbanTicket = ({ ticket, users }) => {
  const assignedUser = users.find((user) => user.id === ticket.userId);
  const userName = assignedUser ? assignedUser.name : "Unassigned";

  const truncateTitle = (title, maxLength) => {
    return title.length > maxLength
      ? `${title.substring(0, maxLength)}...`
      : title;
  };
  const MAXLEN = 50;

  return (
    <div className={classes.ticket}>
      {/* firstline */}
      <div className={classes.ticketHeader}>
        <span className={classes.ticketId}>{ticket.id}</span>
      </div>
      <div className={classes.userImage}>
        <img
          src={DefaultUserAvatar}
          alt={userName}
          className={classes.userAvatar}
        />
      </div>
      <div className={classes.ticketBody}>
        {/* 2nd line */}
        <div className={classes.secondLine}>
          {/* status  */}
          <div className={classes.ticketStatus}>
            <img
              src={getStatusIcon(ticket.status)}
              alt={ticket.status}
              className={classes.statusIcon}
            />
          </div>
          {/* title */}
          <div className={classes.ticketTitleContainer}>
            <h3 className={classes.ticketTitle}>
              {" "}
              {truncateTitle(ticket.title, MAXLEN)}
            </h3>
          </div>
        </div>
        {/* thirdline */}
        <div className={classes.ticketFooter}>
          <div className={classes.priorityContainer}>
            <img
              src={getPriorityIcon(ticket.priority)}
              alt={`Priority: ${ticket.priority}`}
              className={classes.priorityIcon}
            />
          </div>
          <div className={classes.tagContainer}>
            {ticket.tag.map((tag, index) => (
              <span key={index} className={classes.ticketTag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KanbanTicket;
