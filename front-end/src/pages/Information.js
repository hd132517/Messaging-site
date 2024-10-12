import React from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import './Information.css';
import './Messages.js';


function Information(props) {
  const [conversation, setConversation] = React.useState([]);
  
  //gonna show every conversations user did
  const cookies = new Cookies();
  fetch('/getMyConversations', {
      method: 'GET',
      headers: {
      auth: cookies.get('auth'), // makes the call authorized
      }
  })
    .then(res => res.json())
    .then(apiRes => {
      // console.log(apiRes);
      if(apiRes.status){
          setConversation(apiRes.data); // list of convos
      }
    })
    .catch(e => {
      console.log(e);
    });

  return (
    <div>
        <h1 class="create"> Information Page </h1>
        <h2 class="welcome"> Username: {props.loggedInUser}</h2>
        <div>
        </div>

        <div class="convo">
          <h2 class="welcome"> Message Log</h2>
          <div class="convoscroll">
          {conversation.map(convo => (
            <div >
              {convo.message}
            </div>
          ))}
          </div>
        </div>
    </div>
  );
}

export default Information;