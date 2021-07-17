import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loginError, setloginError] = useState(null);
  const [isLoggedIn, setisLoggedIn] = useState(false);


  const logOut = () => {
    setisLoggedIn(false)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    let userEmail = document.getElementById('emailInput').value
    let userPassword = document.getElementById('passwordInput').value
    const data = {
      email: userEmail,
      password: userPassword
    };

    fetch('https://reqres.in/api/login', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        if (data.error) {
          console.log("there is a error: " + data.error)
          setloginError(data.error)
        }
        if (data.token) {
          setloginError(null)
          setisLoggedIn(true)
          console.log("the Email was - " + userEmail)
          console.log("the Password was - " + userPassword)

        }
      })
      .catch((error) => {
        console.error('Error: is', error);
      });
  }

  useEffect(() => {
    fetch("https://reqres.in/api/login")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="container">
        {isLoggedIn ?
          <div>
            <h2>
              Welcome!
            </h2>
            <button onClick={logOut}>Log Out</button>
          </div>
          :
          <form onSubmit={handleSubmit}>
            <h2> Please Log In to the system</h2>
            {loginError && <div> {loginError}</div>}
            <input id="emailInput" autoComplete="off" type="text" name="email" placeholder="type your email" />
            <input id="passwordInput" autoComplete="off" type="password" name="password" placeholder="type your password" />
            <button type="Sumbit" >Submit</button>
          </form>
        }
      </div>
    );
  }
}

