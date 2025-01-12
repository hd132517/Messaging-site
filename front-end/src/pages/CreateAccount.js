import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateAccount.css';


function CreateAccount() {
  const navigate = useNavigate();
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [status, setStatus] = React.useState(false);

  function handleSubmit() {
    const userDto = {
      userName: userName,
      password: password,
    };
    fetch('/createUser', {
      method: 'POST',
      body: JSON.stringify(userDto),
    })
      .then(res => res.json())
      .then(apiRes => {
        console.log(apiRes);
        if (!apiRes.status) {
          setError(apiRes.message);
        } else {
          navigate('/login');
        }
      })
      .catch(e => {
        console.log(e);
      })
  }

  return (
    <div>
        <h1 class="create"> 
        Create Account Page
        </h1>
      <div>
        <div class="username">username: <input value={userName} onChange={(e) => setUserName(e.target.value)} /></div>
        <br></br>
        <div class="password">password: <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" /></div>
        <br></br>
        <button class="submit"onClick={handleSubmit}>submit</button>
      </div>
      <div>{error}</div>
    </div>
  );
}

export default CreateAccount;