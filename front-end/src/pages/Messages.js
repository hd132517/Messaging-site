import React from 'react';
import Cookies from 'universal-cookie';
import './Messages.css';
function Messages(props) {
  const [toUser, setToUser] = React.useState('');
  const [text, setText] = React.useState('');
  const [error, setError] = React.useState('');

  // conversation logic
  // current conversation Im in
  const [conversationId, setConversationId] = React.useState('');
  // full list of messages
  const [conversation, setConversation] = React.useState([]);

  function sendMessage(){
    console.log('Sending ' + text + 'to ' + toUser);
    const messageDto = {
      fromId: props.loggedInUser,
      toId: toUser,
      message: text,
    };
    console.log(messageDto); // to java side
    const cookies = new Cookies();
    
    if(props.loggedInUser != toUser){
      fetch('/createMessage', {
        method: 'POST',
        body: JSON.stringify({
          fromId: props.loggedInUser,
          toId: props.loggedInUser,
          message: text,
        }),
        headers: {
          auth: cookies.get('auth'), // makes the call authorized
        }
      })
        .then(res => res.json())
        .then(apiRes => {
          console.log(apiRes);
          if(apiRes.status){
            setConversationId(apiRes.data[0].conversationId); // from java
          } else {
            setError(apiRes.message);
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
    fetch('/createMessage', {
      method: 'POST',
      body: JSON.stringify(messageDto),
      headers: {
        auth: cookies.get('auth'), // makes the call authorized
      }
    })
      .then(res => res.json())
      .then(apiRes => {
        console.log(apiRes);
        if(apiRes.status){
          // message was added
          setText('');
          setError('');
          setConversationId(apiRes.data[0].conversationId); // from java
          getConversation();
        } else {
          setError(apiRes.message);
        }
      })
      .catch(e => {
        console.log(e);
      });
    
  }

  
  

  // Fetch conversations anytime the conversationId is updated
  React.useEffect(getConversation, [conversationId]);

  // Use to refresh current list of conversations
  function getConversation(){
    if(!conversationId) return; // skip if no conversation selected
    const cookies = new Cookies();
    fetch('/getConversation?conversationId=' + conversationId, {
      method: 'GET',
      headers: {
        auth: cookies.get('auth'), // makes the call authorized
      }
    })
      .then(res => res.json())
      .then(apiRes => {
        console.log(apiRes);
        if(apiRes.status){
          setConversation(apiRes.data); // list of convos
        }
      })
      .catch(e => {
        console.log(e);
      });
  }
  
  function clear(){

    if(text.length < 1){
      console.log('conversationId: ' + conversationId);
      const messageclearDto = {
        fromId: props.loggedInUser,
        toId: toUser,
      };
      const cookies = new Cookies();
      fetch('/messageClear?conversationId=' + conversationId, {
        method: 'POST',
        body: JSON.stringify(messageclearDto),
        headers: {
          auth: cookies.get('auth'),
        }
      })
        .then(res => res.json())
        .then(apiRes => {
          console.log(apiRes);
        })
        .catch(e => {
          console.log(e);
        })
        alert("Messages have been cleared!");

        sendMessage();
    }
    else{
      alert("Text box must be empty to clear");
    }
  }

  return (
    <div>
      <h1 class="messages"> Messages Page</h1>
      <h2 class="welcome">Welcome {props.loggedInUser}</h2>
      <div>
        <div>
          To:
          <input value={toUser} onChange={(e) => setToUser(e.target.value)}/>
        </div>
        <br></br>
        <input type="text" class="text" placeholder="Enter message here"value={text} onChange={(e) => setText(e.target.value)}/>
        <br></br>
        <br></br>
        <div>
            <button class="send"onClick={sendMessage}>Send</button>
        </div>

        <div>
            <button class="clear"onClick={clear}>Clear</button>
        </div>

        {error}

        <div class="convo">
          <div class="convoscroll">
          {conversation.map(convo => (
            <div >
              {convo.message}
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;
