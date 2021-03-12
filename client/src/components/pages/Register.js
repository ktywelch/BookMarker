import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const [msg, setMsg] = useState(<Fragment >
                                    <h5 style={{padding: 4}}>Please complete the form bleow to register</h5>
                                  </Fragment> );

  const [form, setForm] = useState({email: '', password: '', passwordCheck: '', displayName: ''});

  const history = useHistory();

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    console.log('here');
     if(validEmail(form.email) && validPassword(form.password) &&   passCheck(form.password,form.passwordCheck)){
          try {
            console.log(form);
            const newUser = await axios.post("/users/register", form);
            history.push('/confirmation')
          } catch (err) {
            toast.error(err.response);
          }
      } 
  };

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  const validEmail = (str) => {
    if (validateEmail(str)) {
      return true;
    }
    toast.error('Password is less than 8 characters');
    setTimeout(() =>  setForm({...form, email: ''}), 3000);
     return false;
  };


  const validPassword = (str) => {
    if (str.length >= 8) {
      return true;
    }
    toast.error('Password is less than 8 characters');
    setTimeout(() =>  setForm({...form, password: '', passwordCheck: ''}), 3000);
    return false;
  };


  
  const passCheck = (str1,str2) => {
    if (str1 === str2) {
      return true;
    }
    toast.error('Passwords do not match please try again');
    setTimeout(() =>  setForm({...form, password: '', passwordCheck: ''}), 3000);
    return false;
  };



  return (
    <div className="container" style={{maxWidth: 600}}>
      {msg}
      <form onSubmit={submit}>
      <label>Email</label>
        <input onChange={onChange} type="text" name="email" value={form.email} />
        <label>Password</label>
        <input onChange={onChange} type="password" name="password"  value={form.password}/>
        <label>Password Check</label>
        <input onChange={onChange} type="password" name="passwordCheck"  value={form.passwordCheck}/>
        <label>Display Name</label>
        <input onChange={onChange} type="text" name="displayName"  value={form.displayName}/>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
