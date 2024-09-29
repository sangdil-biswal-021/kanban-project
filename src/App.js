import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import KanbanTicket from "./components/KanbanTickets";
import Navbar from "./components/Navbar";
import Header from "./components/GroupHeader";
import "./App.css";

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [groupBy, setGroupBy] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  const groupByRef = useRef(localStorage.getItem("groupBy") || null);
  const sortByRef = useRef(localStorage.getItem("sortBy") || null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        setTickets(response.data.tickets);
        setUsers(response.data.users);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  const handleGroupChange = (group) => {
    setGroupBy(group);
    groupByRef.current = group;
    localStorage.setItem("groupBy", group);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    sortByRef.current = sort;
    localStorage.setItem("sortBy", sort);
  };

  const groupTickets = (tickets) => {
    switch (groupByRef.current) {
      case "status":
        return tickets.reduce((groups, ticket) => {
          const status = ticket.status;
          if (!groups[status]) {
            groups[status] = [];
          }
          groups[status].push(ticket);
          return groups;
        }, {});
      case "user":
        return tickets.reduce((groups, ticket) => {
          const user =
            users.find((u) => u.id === ticket.userId)?.name || "Unassigned";
          if (!groups[user]) {
            groups[user] = [];
          }
          groups[user].push(ticket);
          return groups;
        }, {});
      case "priority":
        return tickets.reduce((groups, ticket) => {
          const priority = ticket.priority;
          if (!groups[priority]) {
            groups[priority] = [];
          }
          groups[priority].push(ticket);
          return groups;
        }, {});
      default:
        return { All: tickets };
    }
  };

  const sortTickets = (tickets) => {
    if (sortByRef.current === "priority") {
      return tickets.sort((a, b) => b.priority - a.priority);
    }
    if (sortByRef.current === "title") {
      return tickets.sort((a, b) => a.title.localeCompare(b.title));
    }
    return tickets;
  };

  const renderGroupedTickets = () => {
    const groupedTickets = groupTickets(tickets);
    return Object.keys(groupedTickets).map((group) => (
      // this conditional statement is because the card was during initial load loading in the same line looking ulgy hence.....
      <div
        key={group}
        className={
          groupBy === null && sortBy === null && groupByRef.current === null
            ? "ticketGroup"
            : ""
        }
      >
        <div className="groupHeader">
          <Header name={group} count={groupedTickets[group].length} />
        </div>
        {sortTickets(groupedTickets[group]).map((ticket, index) => (
          <KanbanTicket key={index} ticket={ticket} users={users} />
        ))}
      </div>
    ));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Navbar
        onGroupChange={handleGroupChange}
        onSortChange={handleSortChange}
      />
      <div className="tickets">{renderGroupedTickets()}</div>
    </>
  );
};

export default App;
