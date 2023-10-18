import React from 'react'
import {stateContext} from '../context/stateContext'
import { useContext,useEffect } from 'react'
import { useNavigate } from "react-router-dom";

function StaffDashboard() {
    const {signedUser,setSignedUser} = useContext(stateContext);
    console.log(`Signed user ${JSON.stringify(signedUser)}`)

    const navigate = useNavigate()

    // useEffect(() => {
    //     if(!signedUser){
    //       alert('Please login')
    //       navigate('/')
    //     }
    //   }, [signedUser])

  return (
    <div>StaffDashboard</div>
  )
}

export default StaffDashboard