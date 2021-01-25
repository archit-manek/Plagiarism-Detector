import * as React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { HomeOutlined, InfoCircleOutlined } from '@ant-design/icons';

/**
 * This class represents a create component that creates a user in the project. 
 */
export default class Create extends React.Component {

  // initialize variables
  state = {
    firstNameReg: '',
    lastNameReg: '',
    emailReg: '',
    passwordReg: '',
    registerSuccess: false,
    registerError: ''
  }

 /**
  * This function registers new users in the system based on the email, the first and last name and the password. 
  */
  register = () => {
    Axios.post('http://localhost:3001/create',
      {
        email: this.state.emailReg, firstName: this.state.firstNameReg,
        lastName: this.state.lastNameReg, password: this.state.passwordReg
      }).then((response) => {
        console.log(response.data);
        if (response.data.message) {
          this.setState({ registerError: response.data.message })
        }
      }).catch(err => { })
  }

  /**
   * This is a function that validates the user information and ensures that everything is correct
   * when creating a registration into the system.
   */
  handleRegister = () => {
    const pattern = new RegExp("@northeastern.edu$");
    if (!(this.state.emailReg === "" || this.state.firstNameReg === "" || this.state.lastNameReg === "" || this.state.passwordReg === "")) {
      if (pattern.test(this.state.emailReg)) {
        this.register();
        this.setState({ registerSuccess: true })
      } else {
        alert("Invalid Email ID! Try again!")
      }
    }
  }

/**
 * This function renders the component. 
 */
  render() {
    return (
      <div>
        <nav style={{ width: '100%' }}>
          <ul>
            <li>
              <Link to={'/home'}> <HomeOutlined /> </Link>
            </li>
            <li>
              <Link to={'/login'}> Login </Link>
            </li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li>
              <Link to={'/info'}> <InfoCircleOutlined /> </Link>
            </li>
          </ul>
        </nav>
        <div style={{ padding: '20px' }}>
          <div className={"col-md-12 form-wrapper"} >
            <h2 style={{ textAlign: 'center' }}> Sign Up </h2>
            {!this.state.registerSuccess && (
              <div>
                <div className="alert alert-light" role="alert">
                  Fill the form below to register as a new user!
            </div>
                <form id={"create-post-form"} onSubmit={this.handleRegister}>
                  <div className="form-group">
                    <label htmlFor="first_name"> First Name </label>
                    <input type="text" id="first_name" name="first_name" className="form-control" placeholder="Enter your first name" required
                      value={this.state.firstNameReg} onChange={(e) => { this.setState({ firstNameReg: e.target.value }) }} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="last_name"> Last Name </label>
                    <input type="text" id="last_name" name="last_name" className="form-control" placeholder="Enter your last name" required
                      value={this.state.lastNameReg} onChange={(e) => { this.setState({ lastNameReg: e.target.value }) }} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email"> Email </label>
                    <input type="email" id="email" name="email" className="form-control" placeholder="Enter your email address" required
                      value={this.state.emailReg} onChange={(e) => { this.setState({ emailReg: e.target.value }) }} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password"> Password </label>
                    <input type="password" id="password" name="password" className="form-control" placeholder="Enter password" required
                      value={this.state.passwordReg} onChange={(e) => { this.setState({ passwordReg: e.target.value }) }} />
                  </div>
                  <button type="submit"
                    className="btn btn-dark btn-lg btn-block" >Submit</button>
                  <div style={{ float: 'right' }}>
                    Already a user? <Link to={'/login'} style={{ color: 'black' }}>Login Here.</Link>
                  </div>
                </form>

              </div>
            )}
            {this.state.registerSuccess && !this.state.registerError.includes("User already exists!") && (
              <div>
                <div className="alert alert-success" role="alert">
                  The form was successfully submitted!
            </div>
                <Link to={'/login'}>
                  <button className="btn btn-dark btn-lg btn-block">Login</button>
                </Link>
              </div>
            )}

            {this.state.registerError.includes("User already exists!") && (
              <div>
                <div className="alert alert-danger" role="alert">
                  {this.state.registerError} Login instead.
              </div>
                <Link to={'/login'}>
                  <button className="btn btn-dark btn-lg btn-block">Login</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

}