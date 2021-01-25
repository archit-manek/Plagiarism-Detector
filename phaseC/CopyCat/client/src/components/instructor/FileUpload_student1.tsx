import * as React from "react";
import axios from "axios";

/**
 * This is the interface component for FileUploadProps and the parent is profile component. 
 */
interface FileUploadProps {
  student1_upload(): void;
}

/**
 * This interface defines the variables in the file upload state. 
 */
interface FileUploadState {
  file: string;
  fileName: string;
  uploadedFile: Object;
  message?: string;
  alert: boolean;
}

/**
 * This class extends the react components and is the file upload class for the first student. 
 * In this class, we also set the intial states for the variables that are defined for the class. 
 */
export default class FileUpload_student1 extends React.Component<
  FileUploadProps,
  FileUploadState
  > {
  state: FileUploadState = {
    file: "",
    fileName: "Choose File",
    uploadedFile: {},
    alert: false,
  };

  /**
   * React function that is called every time the component is rendered if there are any changes that must be displayed.  
   * @param prevProps determines the previous props of the component
   * @param prevState determines the previous state of the component.
   */
  componentDidUpdate(
    prevProps: FileUploadProps,
    prevState: FileUploadState
  ): void {
    if (prevState.file !== this.state.file) {
      console.log(this.state.file);
      console.log(this.state.fileName);
    }
  }

  /**
   * This function is called when a file is selected for upload. 
   * @param e is an event that triggers a change based on the file name. 
   */
  onChange = (e: any) => {
    this.setState({
      file: e.target.files[0],
      fileName: e.target.files[0].name.replace(".js", ".txt"),
    });
    
  };

  /**
   * This function is called when the file is uploaded and submitted, sends the file to server. 
   * @param e is a trigger that sends the file to the server for comparison purposes. 
   */
  onSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    //const reader = new FileReader();
    //reader.readAsText(this.state.file);
    //const fileSource = ""
    //reader.onload = () => { }
    
    formData.append("file", this.state.file);

    try {
      const res = await axios.post(
        "http://localhost:3001/upload/student1",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      
      const { fileName, filePath } = res.data;
      this.setState({
        uploadedFile: { fileName, filePath },
      });
      this.setState({
        message: "File Uploaded!",
        alert: true,
      });
      this.props.student1_upload();
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
        this.setState({
          message: "There was a problem with the server!",
          alert: true,
        });
      } else {
        console.log(err.response.data.message);
        this.setState({
          message: err.response.data.message,
          alert: true,
        });
      }
    }
  };

  /**
   * This function closes the alert that is displayed in choose file. 
   */
  closeAlert = () => {
    this.setState({
      alert: false,
      fileName: 'Choose File'
    });
  };

  /**
   * This function renders the component. 
   */
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        {this.state.message && this.state.alert && (
          <div
            className="alert alert-info alert-dismissible fade show"
            role="alert"
          >
            {this.state.message}
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={this.closeAlert}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}
        <div className="custom-file mt-2">
          <input
            type="file"
            className="custom-file-input"
            accept=".js"
            id="customFile"
            onChange={this.onChange}
            style={{ textAlign: "center" }}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {!this.state.alert && <div>{this.state.fileName}</div>}
          </label>
        </div>        
        <input type="submit" value="Upload" className="btn btn-dark mt-4" />
      </form>
    );
  }
}
