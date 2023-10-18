import React from "react";
import { stateContext } from "../context/stateContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function StaffDashboard() {
  const { signedUser, setSignedUser } = useContext(stateContext);
  console.log(`Signed user ${JSON.stringify(signedUser)}`);

  const [userData, setUserData] = useState(null);

  const [ticketList, setTicketList] = useState(null);

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const checkLoginStatus = async () => {
    try {
      const response = await fetch('http://localhost:4000/loginStaff', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        console.log(`Failed to check login status`)
      }
  
      const data = await response.json();
      if (data.valid) {
        // User is logged in, proceed to the next API call
        // setUserData(data.userData)
        console.log(data.userData)
        callSecondAPI(data.userData.department);
      } else {
        //Navigate to Login page
        // navigate('/employee')
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };
  
  const callSecondAPI = async (department) => {
    console.log(`Calling Second api`)
    try {
      const response = await fetch('http://localhost:4000/getDeptTickets', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { department: department },
      });
  
      if (!response.ok) {
        console.log(`Unable to get Tickets for department`)
      }
  
      const data = await response.json();
      console.log(data+"some data") 

    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };
  
  useEffect( ()=>{

    checkLoginStatus();
    
  },[])



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

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg ml-10 mr-10">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Ticket No
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Category
                  <a href="#">
                    <svg
                      className="w-3 h-3 ml-1.5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </a>
                </div>
              </th>

              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Assigned
              </th>
            </tr>
          </thead>
          {/* <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Dev1010
              </th>
              <th>
                ....
              </th>
              <th>
                ....
              </th>
              <th>
                ....
              </th>
              <th>
                ....
              </th>
              <th>
                <div>
                  <a href="#" className="text-white block w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:focus:ring-blue-700">Unassigned</a>
                </div>
              </th>

            </tr>
          </tbody> */}
        </table>
      </div>
    </>
  );
}

export default StaffDashboard;
