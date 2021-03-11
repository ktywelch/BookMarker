import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const ConfirmAccount = (props) => {
  const history = useHistory();
  console.log(props)

  useEffect(() => {
    (async () => {
      try {
        alert(props)
        await axios.post("/confirm", {
          token: props.match.params.token,
        });
        toast.success(
          "The account has been confirmed! Log in to use keep track of your logs."
        );
        history.push("/");
      } catch (err) {
        console.log(err);
      }
    })();
  }, [history, props.match.params.token]);
  return (
    <div>
      <h1>Congrats you've confirmed your account</h1>
    </div>
  );
};

export default ConfirmAccount;
