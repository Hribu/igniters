import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OrganizationCard from "./OrganizationCard";

// import { AuthContext } from "./../contexts/auth.context";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [orgs, setOrgs] = useState([]);
  const storedToken = localStorage.getItem("authToken");

  // const [userCountry, setUserCountry] = useState("");
  // const {
  //   userToken: { _id: userId },
  // } = useContext(AuthContext);

  // const getUser = (userId) => {
  //   // Get the token from the localStorage
  //   const storedToken = localStorage.getItem("authToken");

  //   // Send the token through the request "Authorization" Headers
  //   axios
  //     .get(`${API_URL}/users/${userId}`, {
  //       headers: {
  //         Authorization: `Bearer ${storedToken}`,
  //       },
  //     })
  //     .then((response) => {
  //       console.log("data from user", response.data.country);
  //       setUserCountry(response.data.country);
  //     })
  //     .catch((error) => console.log(error));
  // };

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };
  const handleSelectChange = (e) => {
    e.preventDefault();
    setCategoryInput(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    axios
      .get(`${API_URL}/search?q=${searchInput}&category=${categoryInput}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        setOrgs(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllOrgs = () => {
    // if (userLocation === "unknown") {
    axios
      .get(`${API_URL}/orgs`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        setOrgs(response.data);
      })
      .catch((error) => console.log(error));
    // } else {
    // axios
    //   .get(`${API_URL}/search/?q=${userLocation}`, {
    //     headers: {
    //       Authorization: `Bearer ${storedToken}`,
    //     },
    //   })
    //   .then((response) => {
    //     setOrgs(response.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // }
  };

  // useEffect(() => {
  //   getUser(userId);
  // }, [userId]);

  useEffect(() => {
    getAllOrgs();
  }, []);

  return (
    <div>
      <form onSubmit={handleClick}>
        <div>
          <label htmlFor="nameOrLocation">Search by Name or Location:</label>
          <input
            type="text"
            placeholder="Search here"
            name="nameOrLocation"
            value={searchInput}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="categories">Search by Category:</label>
          <select
            name="categories"
            id="categories"
            onChange={handleSelectChange}
          >
            <option disable="true" value="">
              Select a category from the list
            </option>
            <option value="Activism">Activism</option>
            <option value="Gender Discrimination">Gender Discrimination</option>
            <option value="Human Rights">Human Rights</option>
            <option value="Inequality">Inequality</option>
            <option value="Malnutrition">Malnutrition</option>
            <option value="Maternal Health">Maternal Health</option>
            <option value="Reproductive Rights">Reproductive Rights</option>
            <option value="Social Solidarity">Social Solidarity</option>
            <option value="Victim Support">Victim Support</option>
            <option value="Victim Protection">Victim Protection</option>
            <option value="Women in Tech">Women in Tech</option>
          </select>
        </div>
        <button type="submit">Search</button>
      </form>
      {orgs.length ? (
        orgs.map((organization) => (
          <OrganizationCard key={organization._id} {...organization} />
        ))
      ) : (
        <div>
          <p>No organizations found.</p>
          <p>
            Would you like to create a page for an organization at this
            location?
          </p>
          <Link to="/orgs/create">
            <button>Create an organization</button>
          </Link>
        </div>
      )}
    </div>
  );
}
