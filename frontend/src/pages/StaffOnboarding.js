import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function StaffOnboarding() {
  const [toggle, setToggle] = useState(false) // if true --> login, if false --> signup

  const [regEmail, setRegEmail] = useState(null)
  const [regFirstName, setRegFirstName] = useState(null)
  const [regLastName, setRegLastName] = useState(null)
  const [regPhone, setRegPhone] = useState(null)
  const [regLoader, setRegLoader] = useState(false)
  const [loginEmail, setLoginEmail] = useState(null)
  const [loginPassword, setLoginPassword] = useState(null)
  const [loginLoader, setLoginLoader] = useState(false)

  const navigate = useNavigate()

  const regFormData = {
    email: regEmail,
    firstName: regFirstName,
    lastName: regLastName,
    phone: regPhone,
  }

  const loginFormData = {
    email: loginEmail,
    password: loginPassword,
  }

  async function handleLogin() {
    // TODO : form validation later
    //checks -->
    //Password regex

    console.log(`logged in`)
    setLoginLoader(true)
    // if (loginFormData.password != regFormData.confirmPassword) {
    //   alert(`Passwords don't match`)
    //   return
    // }

    const reqqBody = {
      userEmail: loginFormData.email,
      password: loginFormData.password,
    }
    console.log(reqqBody)


  }

  async function handleRegistration() {
    // TODO : form validation later
    //checks -->
    //Password regex

    console.log(`i am here`)
    setRegLoader(true)
    if (regFormData.password !== regFormData.confirmPassword) {
      alert(`Passwords don't match`)
      return
    }

    const reqBody = {
      email: regFormData.email,
      password: regFormData.password,
      phone: regFormData.phone,
      userName: regFormData.firstName + '_' + regFormData.lastName,
    }
    console.log(reqBody)

  }

  return toggle ? (
    <div className="login">
      <h1 className="text-black text-center text-5xl font-bold mt-10">
        Login form

      </h1>

      <form className="mt-10 glassmorphism rounded-xl px-10 py-10">
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-lg font-medium text-black dark:text-black"
          >
            Email Id
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-black text-black text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-black dark:border-black dark:placeholder-white dark:text-white dark:focus:ring-white dark:focus:border-white"
            placeholder="name@gmai.com"
            required
            onChange={(e) => setLoginEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-lg font-medium text-black dark:text-black"
          >
            password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-white text-black text-sm rounded-lg focus:ring-white focus:border-white block w-full p-2.5 dark:bg-white dark:border-green-600 dark:placeholder-white dark:text-white dark:focus:ring-white dark:focus:border-white"
            required
            onChange={(e) => setLoginPassword(e.target.value)}
          />
        </div>

        <button
          type="button"
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={handleLogin}
        >
          Login
        </button>
        <div>
          {loginLoader ? <h1 className='text-white'>Logging You In ....</h1> : ``}

          <button onClick={() => setToggle(false)} className='text-white mt-5'>Create Account</button>
        </div>
      </form>
    </div>
  ) : (
    <div className="bg-gradient">
      <h1 className="text-white text-center text-5xl font-bold mt-10">
        Register form

      </h1>

      <form className="mt-10 form glassmorphism rounded-xl px-10 py-10">
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="email"
            name="floating_email"
            id="floating_email"
            className="mb-5 block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-white"
            placeholder=" "
            required
            onChange={(e) => setRegEmail(e.target.value)}
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-black dark:text-white "
          >
            email
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="password"
            name="floating_password"
            id="floating_password"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300"
            placeholder=" "
            required
          // onChange={(e) => setRegPassword(e.target.value)}
          />
          <label
            htmlFor="floating_password"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-white dark:focus:border-white focus:outline-none focus:ring-0 focus:border-white peer"
            placeholder=" " >
            Password
          </label>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <input
            type="password"
            name="repeat_password"
            id="floating_repeat_password"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-white dark:focus:border-white focus:outline-none focus:ring-0 focus:border-white peer"
            placeholder=" "
            required
          // onChange={(e) => setRegConfirmPassword(e.target.value)}
          />
          <label
            htmlFor="floating_repeat_password"
            className="peer-focus:font-medium absolute text-sm text-black dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Date of Birth
          </label>
        </div>
        {/* {regPassword?.length > 0 &&
          regConfirmPassword?.length > 0 &&
          regPassword !== regConfirmPassword ? (
          <h1>Passwords don't match</h1>
        ) : (
          ``
        )} */}
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_first_name"
              id="floating_first_name"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-white dark:focus:border-white focus:outline-none focus:ring-0 focus:border-white peer"
              placeholder=" "
              required
            // onChange={(e) => setRegFirstName(e.target.value)}
            />
            <label
              htmlFor="floating_first_name"
              className="peer-focus:font-medium absolute text-sm text-black dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              First name
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_last_name"
              id="floating_last_name"
              className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-white dark:focus:border-white focus:outline-none focus:ring-0 focus:border-white peer"
              placeholder=" "
              required
            // onChange={(e) => setRegLastName(e.target.value)}
            />
            <label
              htmlFor="floating_last_name"
              className="peer-focus:font-medium absolute text-sm text-black dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Last name
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              name="floating_phone"
              id="floating_phone"
              className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-white dark:focus:border-white focus:outline-none focus:ring-0 focus:border-white peer"
              placeholder=" "
              required
            // onChange={(e) => setRegPhone(e.target.value)}
            />
            <label
              htmlFor="floating_phone"
              className="peer-focus:font-medium absolute text-sm text-black dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone number
            </label>
          </div>


        </div>
        <button
          type="button"
          className="flex justify-center items-center text-black bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={handleRegistration}
        >
          Submit
        </button>
        <div>


          {regLoader ? <h1 className='text-black'>Processing Registration ....</h1> : ``}
          <button onClick={() => setToggle(true)} className='text-black mt-5'>
            Already have account, login
          </button>
        </div>
      </form>
      {/* {regLoader ? <h1>Processing Registration ....</h1> : ``}
      <button onClick={() => setToggle(true)}>
        Already have account, login
      </button> */}
    </div>
  )
}

export default StaffOnboarding