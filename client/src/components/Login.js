import React from 'react'
import signpic from "../images/signup.png";
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
const Login = () => {
  return (
    <>
      <section className="sign-in">
        <div className='container mt-5'>
          <div className='signup-content'>

            <div className='signin-image'>
              <figure>
                <img src={signpic} alt="registration pic" />
              </figure>
              <NavLink to="/Signup" className='signup-image-link'>
                Create an account
              </NavLink>

            </div>
            <div className='signup-form'>
              <h2 className='form-title'>Login In</h2>
              <form className='register-form' id="register-form">

                <div className='form-group'>
                  <lable htmlFor="email">
                    <i className='zmdi zmdi-email material-icon-name'></i>
                  </lable>
                  <input type="email" name="email" id="email" autoComplete='off' placeholder='Your Email Id' />
                </div>


                <div className='form-group'>
                  <lable htmlFor="password">
                    <i className='zmdi zmdi-lock material-icon-name'></i>
                  </lable>
                  <input type="password" name="password" id="password" autoComplete='off' placeholder='Enter Password' />
                </div>

                <div className='form-group form-button'>
                  <input type="submit" name="signin" id="signin" className='form-submit' value="Log In" />
                </div>

              </form>
            </div>
          </div>
        </div>

      </section>

    </>
  );
}

export default Login;
