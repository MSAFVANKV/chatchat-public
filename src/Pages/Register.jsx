import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import styled from "styled-components"
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

import Logo from '../assets/logo.svg'
import { RegisterRoute } from '../utils/APIRoutes';

function Register() {
    const [values, setValues] = useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    })
    // =====
    const toastOptions = {
        position: "bottom-right",
        autoClose: "8000",
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
    }

    const handleSubmit = async (event)=>{
        event.preventDefault();
        if(handleValidation()){
            const { username, email, password, confirmPassword } = values; 
            const {data} = await axios.post(RegisterRoute,{
                username,
                email,
                password,
                confirmPassword
            })
        }
    }

    // validation ***************
    const handleValidation = () => {
        const { username, email, password, confirmPassword } = values;
        if (password !== confirmPassword) {
            toast.error("password and confirmPassword should be same",
             toastOptions);
             return false;
        } else if (username.length < 3 ){
            toast.error("Username must be at least 3 characters long!",
            toastOptions);
            return false;
        } else if (password.length < 8 ){
            toast.error("password should be equal or greater than 8 charecters",
            toastOptions);
            return false;
        } else if (email === "" ){
            toast.error("email is required",
            toastOptions);
            return false;
        }
        return true
    }
    

    const handleChange = (e)=>{
        setValues({...values, [e.target.name]: e.target.value});
    }
  return (
    <>
     <ToastContainer />
    <FormContainer>
        <form onSubmit={(event) =>handleSubmit(event)}>
            <div className="brand">
                <img src={Logo} alt="" />
                <h1>ChatChat</h1>
            </div>
            <input type="text" 
            placeholder='Username' 
            name='username'
            onChange={(e) => handleChange(e)}
            />
            {/*  */}
            <input type="email" 
            placeholder='Email' 
            name='email'
            onChange={(e) => handleChange(e)}
            />
            {/*  */}
            <input type="password" 
            placeholder='Password' 
            name='password'
            onChange={(e) => handleChange(e)}
            />
            {/*  */}
            <input type="password" 
            placeholder='Confirm password' 
            name='confirmPassword'
            onChange={(e) => handleChange(e)}
            />
            <button type='Submit'>Create User</button>
            <span>
                Already have an account ? <Link to="/login">Login</Link> 
            </span>
        </form>
    </FormContainer>
    </>
  )
}


const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 4rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 2rem 4rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Register