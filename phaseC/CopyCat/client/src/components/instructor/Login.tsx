import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Axios from 'axios';
import { HomeOutlined, InfoCircleOutlined } from '@ant-design/icons';


// this interface is not needed/ coming from parent class
interface LoginProps { }

/**
 * In this interface, we define the variables that are required for the login state. 
 */
interface LoginState {
  email: string,
  password: string,
  loginMessage: string,
  loginStatus: boolean,
  f_name: string,
  l_name: string
};

/**
 * This class represents the login class, and extends the react component. In addition, we define the initial values of the variables. 
 * 
 */
export default class Login extends React.Component<LoginProps, LoginState> {
  state: LoginState = {
    email: '',
    password: '',
    loginMessage: '',
    loginStatus: false,
    f_name: '',
    l_name: ''
  }

  /**
   * This function runs the login and sets the correct states for email and password. 
   */
  login = () => {
    Axios.post('http://localhost:3001/login',
      {
        email: this.state.email,
        password: this.state.password
      }).then((response) => {
        console.log(response.data);
        if (response.data.message) {
          this.setState({ loginMessage: response.data.message, loginStatus: false })
        } else {
          this.setState({
            loginStatus: true,
            loginMessage: "Login Successful. Welcome " + response.data[0].FirstName + " " + response.data[0].LastName + "!",
            f_name: response.data[0].FirstName,
            l_name: response.data[0].LastName
          })
        }
      }).catch(err => { console.log(err)})
    
  }

  /**
   * This function renders the component. 
   */
  render() {
    return (
      <div>
        {this.state.loginStatus &&
          <div>
            return <Redirect to={`/profile/${this.state.email}/${this.state.f_name}/${this.state.l_name}`} />
          </div>}
        {!this.state.loginStatus &&
          < nav style={{ width: '100%' }}>
            <ul>
              <li>
                <Link to={'/home'}> <HomeOutlined /> </Link>
              </li>
              <li>
                <Link to={'/create'}> Sign Up </Link>
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
          </nav>}

        {!this.state.loginStatus &&
          <div className={"col-md-12 form-wrapper"}>
            <h2 style={{ textAlign: 'center', padding: '20px' }}> Login </h2>



            {!this.state.loginStatus && this.state.loginMessage.includes("Wrong username/password combination!") &&
              <div className="alert alert-danger" role="alert">
                {this.state.loginMessage}
              </div>}


            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required
                  value={this.state.email} onChange={(e) => { this.setState({ email: e.target.value }) }} />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" required
                  value={this.state.password} onChange={(e) => { this.setState({ password: e.target.value }) }} />
              </div>

            </form>
            <button className="btn btn-dark btn-lg btn-block" onClick={this.login}>Login</button>
            <div style={{ float: 'right' }}>
              Not a user? <Link to={'/create'} style={{ color: 'black' }}>Sign Up Here.</Link>
            </div>
          </div>}
      </div >
    )
  }
}
