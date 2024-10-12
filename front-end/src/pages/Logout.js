import React from "react";
import { useNavigate } from "react-router-dom";

function Logout(props) {
  const navigate = useNavigate();
  const [error, setError] = React.useState("");
  const [status, setStatus] = React.useState(false);

  function handleSubmit() {
    fetch("/logOut", {})
      //.then(res => res.json())
      .then((apiRes) => {
        console.log(apiRes);
        if (apiRes.status === 200) {
          // todo login logic
          props.setIsLoggedIn(false);
          props.setLoggedInUser("");
          navigate("/");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
}

export default Logout;
