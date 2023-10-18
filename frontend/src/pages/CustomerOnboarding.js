import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginSignup() {
  const [toggle, setToggle] = useState(true); // Start with the login form

  // Login Form State
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginLoader, setLoginLoader] = useState(false);

  // Registration Form State
  const [regUsername, setRegUsername] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhoneNumber, setRegPhoneNumber] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regAddress, setRegAddress] = useState('');
  const [regLoader, setRegLoader] = useState(false);

  const navigate = useNavigate();

  const regFormData = {
    username: regUsername,
    name: regName,
    email: regEmail,
    phone: regPhoneNumber,
    password: regPassword,
    confirmPassword: regConfirmPassword,
    address: regAddress,
  };

  async function handleLogin() {
    // Form validation (you can add more validation as needed)
    if (!loginUsername || !loginPassword) {
      alert('Please fill in all required fields.');
      return;
    }

    setLoginLoader(true);

    const reqBody = {
      username: loginUsername,
      password: loginPassword,
    };

    console.log(reqBody);
    // try {
    //   const response = await axios.post('http://your-api-url.com/login', reqBody);

    //   if (response.data.status === 200) {
    //     // Successful login
    //     navigate('/dashboard'); // Redirect to the dashboard or desired page
    //   } else {
    //     alert('Login failed. Please check your credentials.');
    //   }
    // } catch (error) {
    //   console.error('Error logging in', error);
    //   alert('An error occurred while logging in.');
    // }

    setLoginLoader(false);
  }

  async function handleRegistration() {
    // Form validation
    if (!regUsername || !regName || !regEmail || !regPhoneNumber || !regPassword || !regConfirmPassword || !regAddress) {
      alert('Please fill in all required fields.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    console.log(regFormData);

    setRegLoader(true);

    const reqBody = {
      username: regUsername,
      name: regName,
      email: regEmail,
      phone: regPhoneNumber,
      password: regPassword,
      address: regAddress,
    };

    await axios
    .post('http://localhost:4000/register', reqBody)
    .then((response) => {
      console.log(response)
      
      const respData = response.data;
      const status = respData.status
      if(status === 200 ){
        console.log(`Registered User successfull`)
        alert(`User Account registered. Please login`)
        setToggle(true)
      }else if(status === 401){
        console.log('Username is already registered')
      }else{
        console.log('Something went wrong')
      }
      setRegLoader(false)
    })
    .catch((error) => {
      console.error('Error logging in', error)
      setRegLoader(false)
    })

    setRegLoader(false);
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        {/* Login Form */}
        {toggle ? (
          <div>
            <h1 className="text-3xl font-semibold font-serif mb-4">Login Form</h1>
            <form className="space-y-4">
              <div>
                <label className="block font-medium text-gray-900 dark:text-white">Username</label>
                <input
                  type="text"
                  className="form-input rounded-md border border-gray-300 shadow-sm w-full py-3 px-4"
                  placeholder="Enter your username"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-medium text-gray-900 dark:text-white">Password</label>
                <input
                  type="password"
                  className="form-input rounded-md border border-gray-300 shadow-sm w-full py-3 px-4"
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="bg-yellow-500 text-white rounded-md py-2 px-4 hover:bg-yellow-600 focus:outline-none w-full"
                onClick={handleLogin}
              >
                Login
              </button>
            </form>
            {loginLoader && <p>Loading...</p>}
            <p className="mt-4 text-yellow-500 cursor-pointer" onClick={() => setToggle(false)}>
              Create Account
            </p>
          </div>
        ) : (
          // Registration Form
          <div className='mt-24'>
            <h1 className="text-3xl  font-semibold font-serif mb-4">Signup Form</h1>
            <form className="space-y-4">
              <div>
                <label className="block font-medium text-gray-900 dark:text-white">Username</label>
                <input
                  type="text"
                  className="form-input rounded-md border border-gray-300 shadow-sm w-full py-3 px-4"
                  placeholder="create a username"
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-medium text-gray-900 dark:text-white">Name</label>
                <input
                  type="text"
                  className="form-input rounded-md border border-gray-300 shadow-sm w-full py-3 px-4"
                  placeholder="Enter your Full name"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-medium text-gray-900 dark:text-white">Email</label>
                <input
                  type="email"
                  className="form-input rounded-md border border-gray-300 shadow-sm w-full py-3 px-4"
                  placeholder="name@gmail.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-medium text-gray-900 dark:text-white">Phone Number</label>
                <input
                  type="text"
                  className="form-input rounded-md border border-gray-300 shadow-sm w-full py-3 px-4"
                  placeholder="Enter your Phone number"
                  value={regPhoneNumber}
                  onChange={(e) => setRegPhoneNumber(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-medium text-gray-900 dark:text-white">Password</label>
                <input
                  type="password"
                  className="form-input rounded-md border border-gray-300 shadow-sm w-full py-3 px-4"
                  placeholder="Create password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-medium text-gray-900 dark:text-white">Confirm Password</label>
                <input
                  type="password"
                  className="form-input rounded-md border border-gray-300 shadow-sm w-full py-3 px-4"
                  placeholder="Confirm your created password"
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-medium text-gray-900 dark:text-white">Address</label>
                <input
                  type="text"
                  className="form-input rounded-md border border-gray-300 shadow-sm w-full py-3 px-4"
                  placeholder="Enter your address"
                  value={regAddress}
                  onChange={(e) => setRegAddress(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="bg-yellow-500 text-white rounded-md py-2 px-4 hover:bg-yellow-600 focus:outline-none w-full"
                onClick={handleRegistration}
              >
                Submit
              </button>
            </form>
            {regLoader && <p>Loading...</p>}
            <p className="mt-4 text-yellow-500 cursor-pointer" onClick={() => setToggle(true)}>
              Already have an account, login
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginSignup;
