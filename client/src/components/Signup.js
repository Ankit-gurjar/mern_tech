import React, { useState } from 'react'
import signpic from "../images/signup.png";
import { NavLink, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const Signup = () => {

  const history = useHistory();
  const [user, setuser] = useState({
    name: "", email_Id: "", mobile_Number: "", password: "", cpassword: ""
  });
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setuser({ ...user, [name]: value });
  }

  const Postdata = async (e) => {
    e.preventDefault();
    const { name, email_Id, mobile_Number, password, cpassword } = user;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email_Id, mobile_Number, password, cpassword
      })
    });
    const data = await res.json();
    if (data.status === 422 || !data) {
      window.alert("Not registered");
      console.log("Not registered");
    }
    else {
      window.alert("registered");
      console.log("registered");

      history.push("/Login");

    }

  }

  return (
    <>
      <section className="signup">
        <div className='container mt-5'>
          <div className='signup-content'>
            <div className='signup-form'>
              <h2 className='form-title'>Sign up</h2>
              <form method="POST" className='register-form' id="register-form">

                <div className='form-group'>
                  <lable htmlFor="name">
                    <i className='zmdi zmdi-account material-icon-name'></i>
                  </lable>
                  <input type="text" name="name" id="name" autoComplete='off'
                    value={user.name}
                    onChange={handleInputs}
                    placeholder='Your Name' />
                </div>

                <div className='form-group'>
                  <lable htmlFor="email">
                    <i className='zmdi zmdi-email material-icon-name'></i>
                  </lable>
                  <input type="email" name="email" id="email" autoComplete='off' placeholder='Your Email Id' />
                </div>

                <div className='form-group'>
                  <lable htmlFor="phone">
                    <i className='zmdi zmdi-phone-in-talk material-icon-name'></i>
                  </lable>
                  <input type="number" name="phone" id="phone" autoComplete='off' placeholder='Your Mobile No' />
                </div>

                <div className='form-group'>
                  <lable htmlFor="password">
                    <i className='zmdi zmdi-lock material-icon-name'></i>
                  </lable>
                  <input type="password" name="password" id="password" autoComplete='off' placeholder='Enter Password' />
                </div>

                <div className='form-group'>
                  <lable htmlFor="cpassword">
                    <i className='zmdi zmdi-lock material-icon-name'></i>
                  </lable>
                  <input type="password" name="cpassword" id="cpassword" autoComplete='off' placeholder='Confirm Password' />
                </div>

                <div className='form-group form-button'>
                  <input type="submit" name="signup" id="signup" className='form-submit' value="Register" onClick={Postdata} />
                </div>

              </form>
            </div>

            <div className='signup-image'>
              <figure>
                <img src={signpic} alt="registration pic" />
              </figure>
              <NavLink to="/Login" className='signup-image-link'>
                I am Already Registered
              </NavLink>
            </div>
          </div>
        </div>

      </section>
    </>
  );
}

export default Signup;
