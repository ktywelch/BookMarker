import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

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
     if(form.password === form.passwordCheck){
          try {
            const newUser = await axios.post("/users/register", form);
            history.push('/Login')
          } catch (err) {
            console.log(err.response);
            setMsg(<Fragment> <h5 style={{padding: 4,color: 'red'}}>Registration failed pleas try again</h5></Fragment>)
            setTimeout(() =>  window.location.reload(), 3000)
            setForm({email: '', password: '', passwordCheck: '', displayName: ''})
          }
      } else {
        setMsg(<Fragment> <h5 style={{padding: 4,color: 'red'}}>Passwords do not match please try again</h5></Fragment>)
        setTimeout(() =>  setForm({...form, password: '', passwordCheck: ''}), 3000)
      }
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
        <input type="submit" />
      </form>
    </div>
  );
};

export default Register;
