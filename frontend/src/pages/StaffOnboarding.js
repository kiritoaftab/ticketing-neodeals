import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function StaffOnboarding() {
  const [toggle, setToggle] = useState(false); // if true --> login, if false --> signup

  const [regFirstName, setRegFirstName] = useState(null);
  const [regEmail, setRegEmail] = useState(null);
  const [regDateofBirth, setRegDateofBirth] = useState(null);
  const [regPhone, setRegPhone] = useState(null);
  const [regDepartment, setRegDepartment] = useState(null);
  const [regEducationLevel, setRegEducationLevel] = useState(null);
  const [regPassword, setRegPassword] = useState(null);
  const [regConfirmPassword, setRegConfirmPassword] = useState(null);
  const [regLoader, setRegLoader] = useState(false);
  const [loginEmail, setLoginEmail] = useState(null);
  const [loginPassword, setLoginPassword] = useState(null);
  const [loginLoader, setLoginLoader] = useState(false);

  const navigate = useNavigate();

  const regFormData = {
    name: regFirstName,
    email: regEmail,
    birth: regDateofBirth,
    department: regDepartment,
    education: regEducationLevel,
    password:regPassword,
    confirmPassword:regConfirmPassword,
    phone: regPhone,
  };

  const loginFormData = {
    email: loginEmail,
    password: loginPassword,
  };

  async function handleLogin() {
    // TODO : form validation later
    //checks -->
    //Password regex

    
    setLoginLoader(true);
    
    console.log(loginFormData)


    await axios
    .post('http://localhost:4000/loginStaff', loginFormData)
    .then((response) => {
      console.log(response)
      
      const respData = response.data;
      const status = respData.status
      if(status === 200 ){
        console.log(` Staff logged in successfull ${JSON.stringify(respData)}`)
      }else if(status === 401){
        console.log('Password entered is incorrect')
      }else if(status === 301){
        console.log('staff does not exist, please register')
      }else{
        console.log("Something went wrong during login")
      }
      setLoginLoader(false)
    })
    .catch((error) => {
      console.error('Error logging in', error)
      setLoginLoader(false)
    })

  }

  async function handleRegistration() {
    // TODO : form validation later
    //checks -->
    //Password regex

    // console.log(`i am here`)
    setRegLoader(true)
    if (regFormData.password !== regFormData.confirmPassword) {
      alert(`Passwords don't match`)
      return
    }
    console.log(regFormData)

    const reqBody = {
      name: regFormData.name,
      email: regFormData.email,
      phone: regFormData.phone,
      password: regFormData.password,
      department: regFormData.department,
      education: regFormData.education,
      dateOfBirth: regFormData.birth
  }
    console.log(reqBody);

    await axios
    .post('http://localhost:4000/registerStaff', reqBody)
    .then((response) => {
      console.log(response)
      
      const respData = response.data;
      const status = respData.status
      if(status === 200 ){
        console.log(`Registered Staff successfull`)
      }else if(status === 401){
        console.log('Email is already registered')
      }else{
        console.log('Something went wrong')
      }
      setRegLoader(false)
    })
    .catch((error) => {
      console.error('Error logging in', error)
      setRegLoader(false)
    })

  }

  return toggle ? (
    <div className="flex justify-center">
      <form className="mt-20 rounded-2xl shadow-2xl px-16 py-10">
        <h1 className="text-black text-center text-3xl font-bold mt-7">
          Login form
        </h1>
        <div className="mb-6 mt-7">
          <label
            htmlFor="email"
            className="block mb-2 text-lg font-medium text-black dark:text-black"
          >
            Email Id
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-black text-black text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-black dark:border-black dark:placeholder-black dark:text-black dark:focus:ring-black dark:focus:border-black"
            placeholder="name@gmail.com"
            required
            onChange={(e) => setLoginEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-lg font-medium text-black dark:text-black"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-black text-black text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-white dark:border-black dark:placeholder-white dark:text-black dark:focus:ring-black dark:focus:border-black"
            required
            onChange={(e) => setLoginPassword(e.target.value)}
          />
        </div>

        <button
          type="button"
          className="text-white bg-orange-400 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-600 dark:focus:ring-orange-800"
          onClick={handleLogin}
        >
          Login
        </button>
        <div>
          {/* {loginLoader ? <h1 className='text-black'>Logging You In ....</h1> : ``} */}

          <button onClick={() => setToggle(false)} className="text-black mt-5">
            Create Account
          </button>
        </div>
      </form>
    </div>
  ) : (
    <div className="flex justify-center">
      <form className="mt-10 rounded-2xl shadow-2xl px-10 py-10">
        <h1 className="text-black text-center text-4xl font-bold mt-4 mb-5">
          Staff Registration form
        </h1>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="floating_first_name"
            id="floating_first_name"
            className="mb-5 block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-black dark:focus:border-black focus:outline-none focus:ring-0 focus:border-black peer"
            placeholder=" "
            required
            onChange={(e) => setRegFirstName(e.target.value)}
          />
          <label
            htmlFor="floating_first_name"
            className="peer-focus:font-medium absolute text-sm text-black dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Name
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="email"
            name="floating_email"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-black dark:focus:border-black focus:outline-none focus:ring-0 focus:border-black peer"
            placeholder=""
            required
            onChange={(e) => setRegEmail(e.target.value)}
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-black dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="date"
              name="floating_birth"
              id="floating_birth"
              className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-black dark:focus:border-black focus:outline-none focus:ring-0 focus:border-black peer"
              placeholder=" "
              required
              onChange={(e) => setRegDateofBirth(e.target.value)}
            />
            <label
              htmlFor="floating_birth"
              className="peer-focus:font-medium absolute text-sm text-black dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Date of Birth
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              name="floating_phone"
              id="floating_phone"
              className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-black dark:focus:border-black focus:outline-none focus:ring-0 focus:border-black peer"
              placeholder=" "
              required
              onChange={(e) => setRegPhone(e.target.value)}
            />
            <label
              htmlFor="floating_phone"
              className="peer-focus:font-medium absolute text-sm text-black dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone number
            </label>
          </div>
        </div>
        {/* TODO : Select and option ( Cloud, Development, Digital Marketing, Hosting, Deployment, Infrastructure, Support ) */}
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="repeat_department"
            id="floating_repeat_department"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-black dark:focus:border-black focus:outline-none focus:ring-0 focus:border-black peer"
            placeholder=" "
            required
            onChange={(e) => setRegDepartment(e.target.value)}
          />
          <label
            htmlFor="floating_repeat_department"
            className="peer-focus:font-medium absolute text-sm text-black dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Department
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="repeat_department"
            id="floating_repeat_department"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-black dark:focus:border-black focus:outline-none focus:ring-0 focus:border-black peer"
            placeholder=" "
            required
            onChange={(e) => setRegEducationLevel(e.target.value)}
          />
          <label
            htmlFor="floating_repeat_department"
            className="peer-focus:font-medium absolute text-sm text-black dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Education Level
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="password"
            name="repeat_department"
            id="floating_repeat_department"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-black dark:focus:border-black focus:outline-none focus:ring-0 focus:border-black peer"
            placeholder=" "
            required
            onChange={(e) => setRegPassword(e.target.value)}
          />
          <label
            htmlFor="floating_repeat_department"
            className="peer-focus:font-medium absolute text-sm text-black dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="password"
            name="repeat_department"
            id="floating_repeat_department"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-black dark:focus:border-black focus:outline-none focus:ring-0 focus:border-black peer"
            placeholder=" "
            required
            onChange={(e) => setRegConfirmPassword(e.target.value)}
          />
          <label
            htmlFor="floating_repeat_department"
            className="peer-focus:font-medium absolute text-sm text-black dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm Password
          </label>
        </div>

        <button
          type="button"
          className="text-white bg-orange-400 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-600 dark:focus:ring-orange-800"
          onClick={handleRegistration}
        >
          Submit
        </button>
        <div>
          {regLoader ? <h1 className='text-white'>Processing Registration ....</h1> : ``}
          <button onClick={() => setToggle(true)} className="text-black mt-5">
            Already have account, login
          </button>
        </div>
      </form>
    </div>
  );
}

export default StaffOnboarding;
