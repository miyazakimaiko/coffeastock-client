import { LoginIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';

const Login = ({setAuth}) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const {email, password} = inputs;

  const onSetInputs = (e) => {
    setInputs({...inputs, [e.target.name] : e.target.value})
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {email, password};
      const response = await fetch(
        "http://localhost:4000/api/v1/login",
        {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(body)
        }
      );
      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("Logged in successfully!")
      } 
      else toast.error(parseRes,  {
        position: toast.POSITION.TOP_CENTER
      });

    } catch (error) {
      toast.error(error.message,  {
        position: toast.POSITION.TOP_CENTER
      });
    }
  }

  return (
    <div className="h-full">
      <div className="
        h-24 w-full max-w-screen-xl mx-auto px-3
        flex items-center justify-between"
      >
        <h2 className="text-2xl">Coffee Journal</h2>
        <Link to="/register">
          <div className="px-8 py-2 rounded-3xl sinenna-button-transition">Create New Account</div>
        </Link>
      </div>

      <div className="w-full flex justify-center mt-20">
        <form 
          method="#" 
          action="#"
          className="w-96"
          onSubmit={onSubmitForm}
        >
          <div className="bg-white p-6 shadow-sm rounded-md">
            <div>
              <h3 className="text-2xl font-light">Login</h3>
            </div>
            <div className="card-content pt-3">
              <div className="pb-3">
                <label className="font-bold">Email address</label>
                <input type="email" name="email" placeholder="Enter email" className="blue-outline-transition bg-creme block w-full text-base py-2 px-3 rounded-md"
                  value={email}
                  onChange={e => onSetInputs(e)}
                />
              </div>
              <div className="pb-3">
                <label className="font-bold">Password</label>
                <input type="password" name="password" placeholder="Password" className="blue-outline-transition bg-creme block w-full text-base py-2 px-3 rounded-md"
                  value={password}
                  onChange={e => onSetInputs(e)}
                />
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="shadow-sm rounded-3xl pl-6 pr-8 py-2 my-2 mx-auto bg-blue button-transition text-white text-base flex"
              >
                <LoginIcon className="h-5 w-5 my-auto"/>
                <span className="ml-1">Login</span>
                </button>
              <div className="forgot">
                <a href="#pablo">Forgot your password?</a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
