import axios from 'axios';
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './InsertModal.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
 
export default  class UpdateModal extends React.Component{ 
    constructor(props){
        super(props)
        this.state ={
            newCourse: "",
            oldCourse: "",
            prerequisite:[],
            title:"",
            dept_name:"",
            credit:"",
            description: "",
            category:"requirement",
        }
    }

    handleOldCourseNameChange = (event) =>{
        this.setState({
            oldCourse: event.target.value
        })
    }

    handleNewCourseNameChange = (event) =>{
        this.setState({
            newCourse: event.target.value
        })
    }

    handleTitleChange = (event) =>{
        this.setState({
            title: event.target.value
        })
    }

    handleDesciptionChange = (event) =>{
        this.setState({
            description: event.target.value
        })
    }

    handleDepartmentChange = (event) =>{
        this.setState({
            dept_name: event.target.value
        })
    }
    handlePrerequisitementChange = (event) =>{
        
        let prereq = event.target.value.split(",")
        this.setState({
            prerequisite: prereq
        })
    }
    handleCreditChange = (event) =>{
        this.setState({
            credit: event.target.value
        })
    }

    handleCategoryChange = (event) =>{
        this.setState({
            category: event.target.value
        })
    }

    onSubmitClick = (event) =>{
        let input = prompt("Enter password to proceed:")
        if(input !== "CS157C"){
            alert("Wrong password")
            return
        }
        console.log("course: ", this.state)
        const OldCourseName = this.state.oldCourse
        axios.put(`http://localhost:5000/api/courses/${OldCourseName}`,{
            course: this.state.newCourse,
            prerequisite:this.state.prerequisite,
            title:this.state.title,
            dept_name:this.state.dept_name,
            credit:this.state.credit,
            description: this.state.description,
            category:this.state.category,
        })
        .then(function(response){
            console.log(response)
            alert(`${OldCourseName} is updated.`)
        })
        .catch(function(error){
            alert("Something went wrong")
            console.log(error)
        })
        //event.preventDefault()
        
        
        
    }

    render(){
        return(
            <Popup
            trigger={<Button variant="contained"> Update a current course </Button>}
            modal
            nested
          >
            {close => (
              <div className="modal">
                <button className="close" onClick={close}>
                  &times;
                </button>
                <div className="header"> Update a current course </div>
                <div className="content">
                    <form>
                        <div>
           
                            <TextField
                            value={this.state.oldCourse} 
                            onChange={this.handleOldCourseNameChange}
                            id="filled-full-width"
                            label="Course you want to change"
                            style={{ margin: 1 , width: "300px"}}
                            placeholder="CS123"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            ></TextField>   
                           
                        </div>
                        <br/>
                        <div>
                           
                            <TextField
                            value={this.state.newCourse} onChange={this.handleNewCourseNameChange}
                            id="filled-full-width"
                            label="New Course Name"
                            style={{ margin: 1 , width: "300px"}}
                            placeholder="CS321"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            ></TextField>   
                        </div>
                        <br/>
                        <div>
                            
                            <TextField
                             value={this.state.title} 
                             onChange={this.handleTitleChange}
                            id="filled-full-width"
                            label="Title"
                            style={{ margin: 1 , width: "300px"}}
                            placeholder="NoSQL"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            ></TextField>   
                        </div>
                        <br/>
                        <div>
                            
                            <TextField
                            value ={this.state.description}
                            onChange={this.handleDesciptionChange}
                            id="filled-full-width"
                            label="Description"
                            style={{ margin: 1 , width: "650px"}}
                            placeholder="This course is...."
                            //helperText="Full width!"
                            multiline
                            rowsMax={2}
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            ></TextField>
                        </div>
                        <br/>
                        <div>
         
                            <TextField
                            value={this.state.prerequisite} 
                            onChange={this.handlePrerequisitementChange}
                            id="filled-full-width"
                            label="Prerequisite"
                            style={{ margin: 1 , width: "300px"}}
                            placeholder="CS146,CS157a"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            ></TextField>   
                            
                        </div>
                        <br/>
                        <div>
                         
                            <TextField
                            value={this.state.url} 
                            onChange={this.handleUrlChange}
                            id="filled-full-width"
                            label="Url"
                            style={{ margin: 1 , width: "300px"}}
                            placeholder="https://www.....sjsu"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            ></TextField>   
                        </div>
                        <br/>
                        <div>
                   
                            <TextField
                            value={this.state.dept_name} 
                            onChange={this.handleDepartmentChange}
                            id="filled-full-width"
                            label="Department"
                            style={{ margin: 1 , width: "300px"}}
                            placeholder="CS"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            ></TextField>   
                        </div>
                        <br/>
                        <div>
                            
                            <TextField
                            value={this.state.credit} onChange={this.handleCreditChange}
                            id="filled-full-width"
                            label="Credit"
                            style={{ margin: 1 , width: "300px"}}
                            placeholder="3"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            ></TextField>   
                        </div>
                        <br/>


                        <div>
                            <select  style={{margin:1}} value={this.state.category} onChange={this.handleCategoryChange}>
                                <option value="requirement">Requirement</option>
                                <option value="elective">Elective</option>
                                <option value="deep-course">Deep Course</option>
                            </select>
                        </div>
                        <br/>
            
                        <button className="button"  onClick={this.onSubmitClick}> Update </button>
                        <button
                            className="button"
                            onClick={() => {
                            console.log('modal closed ');
                            close();
                            }}
                        >
                            Close
                        </button>
                    </form>
                </div>


        
                
              </div>
            )}
          </Popup>
        )
    }
  
};