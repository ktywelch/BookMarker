import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [msg, setMsg] = useState(<Fragment >
                                    <h5 style={{padding: 4}}>Please complete the form bleow to register</h5>
                                  </Fragment> );

  const [form, setForm] = useState();

  const history = useHistory();

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    console.log('here');

          try {
            const newUser = await axios.post("http://localhost:3030/users/register", form);
            history.push('/Login')
            console.log(newUser);
          } catch (err) {
            console.log(err.response);
            setMsg(<Fragment> <h5 style={{padding: 4,color: 'red'}}>Registration failed pleas try again</h5></Fragment>)
            setTimeout(() =>  window.location.reload(), 3000)
          }
   
  };

  return (
    <div className="container" style={{maxWidth: 600}}>
      {msg}
      <form onSubmit={submit}>
      <label>Email</label>
        <input onChange={onChange} type="text" name="email" />
        <label>Password</label>
        <input onChange={onChange} type="password" name="password" />
        <label>Password Check</label>
        <input onChange={onChange} type="password" name="passwordCheck" />
        <label>Display Name</label>
        <input onChange={onChange} type="text" name="displayName" />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Register;
