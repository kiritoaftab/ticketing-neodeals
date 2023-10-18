import React, { useContext, useEffect } from 'react';
import { stateContext } from '../context/stateContext';
import { useNavigate } from 'react-router-dom';

function Home() {
  const { signedUser, setSignedUser } = useContext(stateContext);
  console.log(`Signed user ${JSON.stringify(signedUser)}`);
  const navigate = useNavigate();

  useEffect(() => {
    if (signedUser) {
      navigate('/dashboard');
    }
  }, [signedUser]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      {/* Welcome Message */}
      <h1 className="font-serif text-5xl text-yellow-500 mb-8">Welcome to Ticketing System</h1>

      <div className="max-w-screen-lg mx-auto flex justify-center">
        {/* Customer Signup Card */}
        <a href="/customer" className="hover:scale-200">
          <div className="w-120 h-120 p-6 m-4 bg-opacity-80 bg-yellow-200 border border-yellow-600 rounded-lg shadow-lg backdrop-blur-lg transform transition-transform hover:shadow-xl dark-bg-opacity-80 dark-bg-yellow-700 dark-border-yellow-700">
            <div className="flex flex-col justify-between h-full">
              <img className="rounded-t-lg h-64 object-cover object-center" src="https://content.presentermedia.com/content/clipart/00007000/7684/business_icon_woman_300_nwm.jpg" alt="" />
              <div className="p-5">
                <a href="/customer">
                  <h5 className="font-serif mb-2 text-2xl font-bold tracking-tight text-gray-900 dark-text-white">
                    Customer Sign up
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark-text-gray-400">Sign up as a customer.</p>
                <a
                  href="/customer"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-yellow-500 rounded-lg hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-700 dark-bg-yellow-600 dark-hover-bg-yellow-700 dark-focus-ring-yellow-700"
                >
                  Let's Start
                </a>
              </div>
            </div>
          </div>
        </a>

        {/* Employee Signup Card */}
        <a href="/employee" className="hover:scale-105">
          <div className="w-120 h-120 p-6 m-4 bg-opacity-80 bg-yellow-200 border border-yellow-600 rounded-lg shadow-lg backdrop-blur-lg transform transition-transform hover:shadow-xl dark-bg-opacity-80 dark-bg-yellow-700 dark-border-yellow-700">
            <div className="flex flex-col justify-between h-full">
              <img className="rounded-t-lg h-64 object-cover object-center" src="https://content.presentermedia.com/files/clipart/00008000/8211/customer_service_icon_800_wht.jpg" alt="" />
              <div className="p-5">
                <a href="/employee">
                  <h5 className="font-serif mb-2 text-2xl font-bold tracking-tight text-gray-900 dark-text-white">
                    Employee Sign up
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark-text-gray-400">Sign up as an employee.</p>
                <a
                  href="/employee"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-yellow-500 rounded-lg hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-600 dark-bg-yellow-700 dark-hover-bg-yellow-700 dark-focus-ring-yello-700"
                >
                  Let's Start
                </a>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}

export default Home;
