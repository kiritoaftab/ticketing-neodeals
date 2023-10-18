import React, { useState } from 'react'
import {stateContext} from '../context/stateContext'
import { useContext,useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
function StaffDashboard() {
    const {signedUser,setSignedUser} = useContext(stateContext);
    console.log(`Signed user ${JSON.stringify(signedUser)}`)

    const [userData,setUserData] = useState(null)

    const navigate = useNavigate()
    axios.defaults.withCredentials=true
    useEffect(() => {
        axios.get("http://localhost:4000/loginStaff")
        .then(res => {
          console.log(res)
          if(res.data.valid){
            setUserData(res.data.userData)
          }else{
            navigate('/employee')
          }
        })
        .catch(err => console.log(err))
      }, [])

  return (
    <div>{JSON.stringify(userData)}</div>
  )
}

export default StaffDashboard