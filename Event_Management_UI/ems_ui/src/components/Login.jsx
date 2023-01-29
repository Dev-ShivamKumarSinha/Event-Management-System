import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import loginimg from "../static/login-reg.jpg";

const Login = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function login(){
    //console.warn(username, password);
    if (!username || !password){
        alert('PLease enter Username and Password');
    }
    else{
        const requestOptions = {
            method : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username : username,
                password : password,
            }),
        };
        try{
          await fetch("http://127.0.0.1:8000/api/login", requestOptions)
                  .then((response) => response.json())
                  .then((data) => {
                      //console.log(data);
                      //console.log(data["Bearer"]);
                      if (data['Error']){
                          alert(data['Error']);
                      }
                      else{
                          sessionStorage.setItem("token", data["Bearer"]);
                          sessionStorage.setItem("username", data["Username"]);
                          sessionStorage.setItem("IsLoggedIn", true);
                          navigate('/user');
                          window.location.reload(false);
                      }    
                  });
        }
        catch(e){
          alert(e);
        }
    }
  }

  return (
    <div className='base-container'>
      <div className='header'>Login</div>
      <div className='content'>
        <div className='image'>
            <img className='logImg' src={loginimg} alt='Login/Register' />
        </div>
        <div className='form'>
            <div className='form-group'>
                <label htmlFor='username'>Username</label>
                <input type="text" name='username' placeholder='Username' 
                    onChange={(e)=>setUsername(e.target.value)} />
            </div>
            <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input type="password" name='password' placeholder='Password'
                    onChange={(e)=>setPassword(e.target.value)} />
            </div>
        </div>
      </div>
      <div className='footer'>
        <button onClick={login} type="button" className='btn'>Login</button>
      </div>
    </div>
  )
}

export default Login