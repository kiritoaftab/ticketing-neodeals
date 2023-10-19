import React from "react";
import { stateContext } from "../context/stateContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const styles = {
  tableWrapper: `relative overflow-x-auto shadow-md sm:rounded-lg flex justify-center mt-20`,
  table: `relative overflow-x-auto shadow-md sm:rounded-lg  basis-auto`,
  tableHeader: `text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400`,
  tableHeadData: `px-6 py-3`,
  tableRow: `bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`,
  link: `font-medium text-blue-600 dark:text-blue-500 hover:underline`,
};

function StaffDashboard() {
  const { signedUser, setSignedUser } = useContext(stateContext);
  console.log(`Signed user ${JSON.stringify(signedUser)}`);

  const [userData, setUserData] = useState(null);

  const [ticketList, setTicketList] = useState(null);

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const checkLoginStatus = async () => {
    try {
      const response = await axios.get("http://localhost:4000/loginStaff", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.data.valid) {
        navigate("/employee");
        console.log("Failed to check login status");
        return;
      }

      const department = response.data.userData.department;
      await callSecondAPI(department);
      setUserData(response.data.userData);
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  };

  const callSecondAPI = async (department) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/getDeptTickets`,
        {
          department: department,
        }
      );

      if (!response.data) {
        console.log("Unable to get Tickets for department");
        return;
      }

      console.log(response.data); // Log the data received from the second API
      setTicketList(response.data.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <>
      <div>
        <h4 className="text-center text-4xl mt-10 mb-5">Staff Dashboard</h4>
      </div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 mt-5 mb-5">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Welcome , {userData?.name}
            </span>
          </a>
          <p>{userData?.department}</p>
          <p>{userData?.email}</p>
          <p>{userData?.phone}</p>
          <div className="flex md:order-2">
            <button
              type="button"
              data-collapse-toggle="navbar-search"
              aria-controls="navbar-search"
              aria-expanded="false"
              className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
            <div className="relative md:block">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search icon</span>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
              />
            </div>
          </div>
          <div
            className="items-center justify-between  w-full md:flex md:w-auto md:order-1"
            id="navbar-search"
          >
            <div className="relative mt-3">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                {/* <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg> */}
              </div>
              {/* <input type="text" id="search-navbar" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." /> */}
            </div>
          </div>
        </div>
      </nav>

      {/* Table wrapper */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th scope="col" className={styles.tableHeadData}>
                Ticket No
              </th>
              <th scope="col" className={styles.tableHeadData}>
                Title
              </th>
              <th scope="col" className={styles.tableHeadData}>
                Category
              </th>
              <th scope="col" className={styles.tableHeadData}>
                Date
              </th>
              <th scope="col" className={styles.tableHeadData}>
                Assigned
              </th>
              <th scope="col" className={styles.tableHeadData}>
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(ticketList) ? (
              ticketList.map((ticket, index) => {
                let tixNo = Object.keys(ticket)[0];
                return (
                  <tr key={index} className={styles.tableRow}>
                    <th scope="row" className={styles.link}>
                     <a href={`/ticket/${tixNo}`}> {tixNo}</a>
                    </th>
                    <td className={styles.tableHeadData}>
                      {ticket[tixNo]?.title}
                    </td>
                    <td className={styles.tableHeadData}>
                      {ticket[tixNo]?.category}
                    </td>
                    <td className={styles.tableHeadData}>
                      {ticket[tixNo]?.date}
                    </td>

                    {ticket[tixNo]?.assigned ? (
                      <th className={styles.link}>ticket[tixNo].assigned</th>
                    ) : (
                      <th className={styles.link}>Unassigned</th>
                    )}

                    <th className={styles.link}>{ticket[tixNo]?.STATUS}</th>
                  </tr>
                );
              })
            ) : (
              <tr className={styles.tableRow}>
                <th scope="row">
                  <a href="#" className={styles.link}>
                    Loading Tickets
                  </a>
                </th>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default StaffDashboard;
