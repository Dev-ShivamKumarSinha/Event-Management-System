import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import loginimg from "../static/login-reg.jpg";

const Register = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    username:"", phoneno:"", password:"", repassword:""
  });

  const handleInput = (e) => {
    //console.log(e);
    let name = e.target.name;
    let value = e.target.value;
    setUser({...user, [name]:value});
  }

  async function register(){
      let { username, phoneno, password, repassword } = user;
      if(password!==repassword){
          alert("passwords do not match !!!");
      }
      else{
          //console.log(user.username, user.phoneno, user.password, user.repassword);
          const requestOptions = {
            method : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username, phoneno, password 
            }),
          };
          await fetch("http://127.0.0.1:8000/api/register-User", requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    //console.log(data);
                    if (data['Error']){
                        alert(JSON.stringify(data['Error']));
                    }
                    else{
                        navigate('/login');
                    }    
                });
      }
  }

  return (
    <div className='base-container'>
      <div className='header'>Register</div>
      <div className='content'>
        <div className='image'>
            <img className='logImg' src={loginimg} alt='Login/Register' />
        </div>
        <div className='form'>
            <div className='form-group'>
                <label htmlFor='username'>Username</label>
                <input value={user.username} onChange={handleInput} type="text" name='username' placeholder='Username'/>
            </div>
            <div className='form-group'>
                <label htmlFor='phoneno'>Phone Number</label>
                <input value={user.phoneno} onChange={handleInput} type="tel" min={10} name='phoneno' placeholder='Phone Number'/>
            </div>
            <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input value={user.password} onChange={handleInput} type="password" name='password' placeholder='Password'/>
            </div>
            <div className='form-group'>
                <label htmlFor='repassword'>Confirm Password</label>
                <input value={user.repassword} onChange={handleInput} type="password" name='repassword' placeholder='Confirm Password'/>
            </div>
        </div>
      </div>
      <div className='footer'>
        <button onClick={register} type="button" className='btn'>Register</button>
      </div>
    </div>
  )
}

export default Register