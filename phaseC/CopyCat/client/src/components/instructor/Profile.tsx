import Axios from 'axios';
import * as React from 'react';
import { Link } from 'react-router-dom';
import Code_Student1 from "./Code_Student1";
import Code_Student2 from './Code_Student2';
import FileUpload_student1 from './FileUpload_student1';
import FileUpload_student2 from './FileUpload_student2';
import "./scrollable.css"


/**
 * There are no properties that are transferred from the parent class. 
 */
interface ProfileProps { }

/**
 * This interface represents all of the properties that are defined in a profile
 * in any state. 
 */
interface ProfileState {
  fileUpload_1: boolean,
  textUpload_1: boolean,
  fileUpload_2: boolean,
  textUpload_2: boolean,
  name: string,
  compare: boolean,
  runCompare: boolean,
  analysis: boolean,
  inputCodeOne?: string,
  inputCodeTwo?: string,
  student1_upload: boolean,
  student2_upload: boolean,
  finalPercentage?: number,
  showPercentage: boolean,
  ignoreVar: boolean,
  ignoreLiteral: boolean,
  showSimilarity: boolean,
  code1: string[]
  code2: string[],
  linesToHighlight1: string[],
  linesToHighlight2: string[],
  message1?: string,
  message2?: string,
  alert1: boolean,
  alert2: boolean,
  error?: string,
  showError: boolean
}


/**
 * This react class represents a profile, all of the properties are set to the initial state 
 * in this class. 
 */
export default class Profile extends React.Component<ProfileProps, ProfileState> {

  // initialize the variables to the initial state
  state: ProfileState = {
    fileUpload_1: false,
    textUpload_1: true,
    fileUpload_2: false,
    textUpload_2: true,
    name: '',
    compare: true,
    runCompare: false,
    analysis: false,
    student1_upload: false,
    student2_upload: false,
    ignoreVar: false,
    ignoreLiteral: false,
    showSimilarity: false,
    showPercentage: false,
    code1: [],
    code2: [],
    alert1: false,
    alert2: false,
    linesToHighlight1: [],
    linesToHighlight2: [],
    showError: false
  }


  /**
   * This constructor constructs a profile object. 
   * @param props these are the props from the Profile component
   */
  constructor(props: ProfileProps) {
    super(props);
    var str = window.location.pathname
    var arr = str.split('/')
    this.state.name = arr[3] + " " + arr[4]

  }


  /**
   * This function modifies the first student upload and sets the state depending on the 
   * status of the file upload.
   */
  setStudentUpload_1 = () => {
    this.setState({
      student1_upload: true
    })
  }

  /**
   * This function modifies the second student upload and sets the state depending on the 
   * status of the file upload.
   */
  setStudentUpload_2 = () => {
    this.setState({
      student2_upload: true
    })
  }

  /**
   * This function runs the comparison for plagarism between the two files that have been uploaded 
   * by connecting to the server. 
   */
  compare = () => {
    Axios.post('http://localhost:3001/compare',
      {
        filter1: this.state.ignoreLiteral,
        filter2: this.state.ignoreVar
      }
    ).then((response) => {
      if (response.data.finalResult) {
        this.setState({
          finalPercentage: response.data.finalResult,
          runCompare: true,
          showPercentage: true
        })
      } else if (response.data.err) {
        this.setState({
          error: response.data.err,
          showError: true
        })
        console.log(this.state.error)
      }
    })
  }

  /**
   * Function to upload code through text area for student one
   */
  uploadTextOne = () => {
    Axios.post('http://localhost:3001/uploadTextOne',
      {
        text: this.state.inputCodeOne
      })
    this.setState({ student1_upload: true, message1: "Uploaded!", alert1: true })

  }

  /**
   * Function to upload code through text area for student two
   */
  uploadTextTwo = () => {
    Axios.post('http://localhost:3001/uploadTextTwo',
      {
        text: this.state.inputCodeTwo
      })
    this.setState({ student2_upload: true, message2: "Uploaded!", alert2: true })

  }

  /**
   * This function closes the alert that is displayed on upload. 
   */
  closeAlertOne = () => {
    this.setState({
      alert1: false
    });
  };

  /**
   * This function closes the alert that is displayed on upload. 
   */

  closeAlertTwo = () => {
    this.setState({
      alert2: false
    });
  };

  /**
   * This function shows the similarity between the two files.
   */
  review = () => {
    Axios.post('http://localhost:3001/review'
    ).then((response) => {
      if (response.data.linesStudent1) {
        this.setState({
          code1: response.data.codeStudent1,
          code2: response.data.codeStudent2,
          linesToHighlight1: response.data.linesStudent1,
          linesToHighlight2: response.data.linesStudent2,
          showSimilarity: true
        })
      } else {
        this.setState({
          code1: response.data.codeStudent1,
          code2: response.data.codeStudent2,
          showSimilarity: true
        })
      }
    })
  }

  /**
   * This is a logout function that supports the user logging out of the system and 
   * deleting the files in the upload folder.
   */
  logout = () => {
    Axios.post('http://localhost:3001/logout')
  }

  comparison_tool = () => {
    this.setState({
      fileUpload_1: false,
      textUpload_1: true,
      fileUpload_2: false,
      textUpload_2: true,
      compare: true,
      runCompare: false,
      analysis: false,
      student1_upload: false,
      student2_upload: false,
      ignoreVar: false,
      ignoreLiteral: false,
      showSimilarity: false,
      code1: [],
      code2: [],
      linesToHighlight1: [],
      linesToHighlight2: [],
      showPercentage: false,
      alert1: false,
      alert2: false,
      showError: false
    })
    this.logout()
  }




  /**
   * This function renders the component. 
   */
  render() {
    return (
      <div >
        <div>
          <nav style={{ width: '100%' }}>
            <ul>

              <li>
                <Link to={'/home'} onClick={this.logout}> Logout </Link>
              </li>
            </ul>
          </nav>
        </div>


        <div id="wrapper" className="d-flex">
          <div className="bg-light border-right col-sm-3 p-3" >
            <div className="card bg-light container-fluid p-3">
              <ul className="list-group">
                <li className="list-group-item"
                  style={{ textAlign: 'center', fontSize: '22px', fontFamily: 'fantasy' }}>{this.state.name}
                </li>
              </ul>
            </div>
            <div className="list-group list-group-flush p-3">
              <button className={`list-group-item ${this.state.compare && !this.state.analysis ? 'active' : ''} list-group-item-action`}
                onClick={this.comparison_tool}>
                <strong>Comparison Tool</strong>
              </button>
              <button className={`list-group-item ${!this.state.compare && this.state.analysis ? 'active' : 'disabled'} list-group-item-action`}
              >
                <strong>Analysis</strong>
              </button>
            </div>
          </div>
          {this.state.compare &&
            <div className='col p-5'>
              <h1 style={{ fontFamily: 'fantasy' }}>Comparison Tool:</h1>
              <h5 style={{ color: '#0c5460' }}>Select JavaScript files to compare</h5>
              <div className="row justify-content-around p-5">
                <div className="col-sm-6">
                  <div className="card text-center">
                    <div className="card-header">
                      Student 1
                  </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <div className="">
                          <button className='btn btn-dark' style={{ float: 'left' }}
                            onClick={(e) => {
                              this.setState(
                                { textUpload_1: true, fileUpload_1: false }
                              )
                            }}>
                            Enter Text
                          </button>
                          <button className='btn btn-dark' style={{ float: 'right' }}
                            onClick={(e) => {
                              this.setState(
                                { textUpload_1: false, fileUpload_1: true }
                              )
                            }}>
                            File Upload
                          </button>
                        </div>
                      </li>
                    </ul>
                    <div className="card-body">
                      {this.state.textUpload_1 &&
                        <div>
                          {this.state.message1 && this.state.alert1 && (
                            <div
                              className="alert alert-info alert-dismissible fade show"
                              role="alert"
                            >
                              {this.state.message1}
                              <button
                                type="button"
                                className="close"
                                data-dismiss="alert"
                                aria-label="Close"
                                onClick={this.closeAlertOne}
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                          )}
                          <textarea className='form-control' rows={6}
                            onChange={(e) => {
                              this.setState(
                                { inputCodeOne: e.target.value }
                              )
                            }}> </textarea>
                          <button className='btn btn-dark mt-4' onClick={this.uploadTextOne}>Upload</button>
                        </div>}
                      {this.state.fileUpload_1 &&
                        <FileUpload_student1 student1_upload={this.setStudentUpload_1} />}
                      <br />
                    </div>

                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="card text-center">
                    <div className="card-header">
                      Student 2
                  </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <div className="">
                          <button className='btn btn-dark' style={{ float: 'left' }}
                            onClick={(e) => {
                              this.setState(
                                { textUpload_2: true, fileUpload_2: false }
                              )
                            }}>
                            Enter Text
                          </button>
                          <button className='btn btn-dark' style={{ float: 'right' }}
                            onClick={(e) => {
                              this.setState(
                                { textUpload_2: false, fileUpload_2: true }
                              )
                            }}>
                            File Upload
                          </button>
                        </div>
                      </li>
                    </ul>
                    <div className="card-body">
                      {this.state.textUpload_2 &&
                        <div>
                          {this.state.message2 && this.state.alert2 && (
                            <div
                              className="alert alert-info alert-dismissible fade show"
                              role="alert"
                            >
                              {this.state.message2}
                              <button
                                type="button"
                                className="close"
                                data-dismiss="alert"
                                aria-label="Close"
                                onClick={this.closeAlertTwo}
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                          )}
                          <textarea className='form-control' rows={6}
                            onChange={(e) => {
                              this.setState(
                                { inputCodeTwo: e.target.value }
                              )
                            }}> </textarea>
                          <button className='btn btn-dark mt-4' onClick={this.uploadTextTwo}>Upload</button>
                        </div>}
                      {this.state.fileUpload_2 &&
                        <FileUpload_student2 student2_upload={this.setStudentUpload_2} />}
                      <br />
                    </div>

                  </div>
                </div>
                <button
                  className={`btn btn-dark mt-4 ${this.state.student1_upload && this.state.student2_upload ? '' : 'disabled'}`}
                  onClick={(e) => {
                    this.setState(
                      { compare: false, analysis: true }
                    )
                  }}> Next </button>
              </div>
            </div>}
          {
            this.state.analysis &&
            <div className='col p-5'>
              <h1 style={{ fontFamily: 'fantasy' }}>Analysis:</h1>
              <h3 >Match Overview</h3>
              <h5 className='mt-4'>Filter Criteria:</h5>
              <form className="row justify-content-around p-3">
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="customCheck1"
                    onChange={(e) => {
                      this.setState(
                        { ignoreLiteral: !this.state.ignoreLiteral }
                      )
                    }} />
                  <label className="custom-control-label" htmlFor="customCheck1">
                    <h6>Ignore Literals</h6>
                  </label>
                </div>
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="customCheck2"
                    onChange={(e) => {
                      this.setState(
                        { ignoreVar: !this.state.ignoreVar }
                      )
                    }} />
                  <label className="custom-control-label" htmlFor="customCheck2">
                    <h6> Ignore Variables</h6>
                  </label>
                </div>
                <button className="btn btn-dark btn-lg btn-block  mt-2" type="button" onClick={this.compare}>Compare</button>

              </form>
              {this.state.finalPercentage && this.state.showPercentage &&
                <h2>
                  <div className="alert alert-danger" role="alert">
                    Percentage Plagiarism found: {this.state.finalPercentage}%
                </div></h2>}
                {this.state.error && this.state.showError &&
                <h2>
                  <div className="alert alert-danger" role="alert">
                    {this.state.error}
                </div></h2>}
              <h3 className='mt-4'>Similarity Overview</h3>
              <div className="input-group mt-2">
                <button className={`btn btn-dark btn-lg btn-block mt-2 ${this.state.runCompare ? '' : 'disabled'}`} type="button" onClick={this.review}>Show Similarity</button>
              </div>
              {
                this.state.showSimilarity &&
                <div className="row justify-content-around p-5">
                  <div className="col-sm-6">
                    <div className="card text-center">
                      <div className="card-header">
                        Student 1
                    </div>
                      <div className="card-body scroll">
                        <Code_Student1
                          code1={this.state.code1}
                          lines1={this.state.linesToHighlight1} />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="card text-center" >
                      <div className="card-header">
                        Student 2
                    </div>
                      <div className="card-body scroll">
                        <Code_Student2
                          code2={this.state.code2}
                          lines2={this.state.linesToHighlight2} />
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          }
        </div>
      </div>
    )
  }
}