import React from 'react'
import { useContext,useEffect } from 'react'
import {stateContext} from '../context/stateContext'
import { useNavigate } from "react-router-dom";

function Home() {
  const {signedUser,setSignedUser} = useContext(stateContext);
  console.log(`Signed user ${JSON.stringify(signedUser)}`)
  const navigate = useNavigate();
  useEffect(() => {
    if(signedUser){
      navigate('/dashboard')
    }
  }, [signedUser])
  
  return (
    <div>
        <a href='/customer'>Go to Customer Signup Login page</a>
        <a href='/employee'>Go to Employee Singup Login</a>
    </div>
  )
}

export default Home