import { HomeOutlined, InfoCircleOutlined } from '@ant-design/icons';
import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
export default class About extends React.Component<RouteComponentProps> {


  /**
   * This function renders the info component that provides more information about our team, the class and the specifics of the project.
   */
  public render() {
    return (
      <div>
                <nav style={{ width: '100%' }}>
          <ul>
            <li>
              <Link to={'/home'}> <HomeOutlined /> </Link>
            </li>
            <li>
              <Link to={'/create'}> Sign Up </Link>
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
            <li>
              <Link to={'/info'}> <InfoCircleOutlined /> </Link>
            </li>
          </ul>
        </nav>
        <div className='card' style={{ padding: '40px 80px', margin: '60px 60px' }}>
          <div className='card-body'>
            <blockquote className="blockquote text-center">
              <p className="mb-0"> This plagiarism detector is a class project for CS:5500 Foundations of Software Engineering 
              at Northeastern University. This project was completed by Archit Manek, Shebna Mathew, Devina Raithatha 
              and Nikhita Singh. <br />
                <br />
                Through developing a web-based tool for plagiarism prevention tool which helps instructors 
              detect situations where two or more students submit similar solutions, we have demonstrated
               our understanding and application of classroom concepts. <br />Throughout the project, we have adopted the 
               Waterfall SDLC as a methodology to guide our development. In the first phase, we began by writing
                a set of use cases that describe the behavior of the system, as well as UI mockups that represent 
                how the user would interact with the plagiarism tool. <br /> In the next phase, we created a UML diagram 
                that helped our team visually represent the architecture and design of the system. In the last 
                stage of the process, we began the actual development and testing process. <br />
</p>
              <footer className="blockquote-footer">Fall 2020: <cite title="Source Title">Team 06</cite></footer>

            </blockquote>
            <div className='container'>
              <div className="row justify-content-md-center">
                <div className="col col-lg-2" >
                  <Link to={'/home'}>
                    <button type="button" className="btn btn-dark btn-lg btn-block">Back To Home</button>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div >
      </div>
    )
  }
}
