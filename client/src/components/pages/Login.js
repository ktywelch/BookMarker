import React, { useState, useContext, useEffect } from "react";
import UserContext from "../Context/UserContext.js";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [form, setForm] = useState();
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitLoginForm = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3030/users/login", form);

      setUserData({
        token: data.token,
        user: data.user,
      });

      localStorage.setItem("auth-token", data.token);
      history.push("/");
    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    if (userData.user) history.push("/");
  }, [userData.user, history]);

  return (
    <div className="container" style={{maxWidth: 600}}>
      <form onSubmit={submitLoginForm}>
        <label>Email</label>
        <input onChange={onChange} type="text" name="email" />
        <label>Password</label>
        <input onChange={onChange} type="password" name="password" />
        <input  type="submit" />
        <button style={{ margin: 20}} onClick={() => history.push('/Register')}>Register</button>
      </form>
  
    </div>
  );
};

export default Login;
