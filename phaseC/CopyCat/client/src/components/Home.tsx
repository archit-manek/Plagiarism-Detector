import { HomeOutlined, InfoCircleOutlined } from '@ant-design/icons';
import * as React from 'react';
import { Link } from 'react-router-dom';

/**
 * This is a class that represents the home component of the UI for our CopyCat 
 * plagairism detector. 
 */
export default class Home extends React.Component {

    /**
     * This function renders the home component and displays it. 
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
                            <p className="mb-0" style={{ fontSize: '30px' }}>Welcome to </p>
                            <p className="mb-0" style={{ fontSize: '40px' }}> <strong>COPYCAT</strong></p>
                            <p className="mb-0" style={{ fontSize: '30px' }}>Plagiarism Detector Tool!</p>
                        </blockquote>
                        <div className='container'>
                            <div className="row justify-content-md-center">
                                <div className="col col-lg-2" >
                                    <Link to={'/login'}>
                                        <button type="button" className="btn btn-dark btn-lg btn-block">Login</button>
                                    </Link>
                                </div>
                                <div className="col col-lg-2" >
                                    <Link to={'/info'}>
                                        <button type="button" className="btn btn-dark btn-lg btn-block">About</button>
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
