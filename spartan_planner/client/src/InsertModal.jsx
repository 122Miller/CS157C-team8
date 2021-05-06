import axios from 'axios';
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './InsertModal.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

 
export default  class InsertModal extends React.Component{ 
    constructor(props){
        super(props)
        this.state ={
            course: "",
            prerequisite:[],
            title:"",
            dept_name:"",
            credit:"",
            description: "",
            category:"requirement",
            url:"",
        }
    }

    handleCourseNameChange = (event) =>{
        this.setState({
            course: event.target.value
        })
    }

    handleUrlChange = (event) =>{
        this.setState({
            url: event.target.value
        })
    }

    handleTitleChange = (event) =>{
        this.setState({
            title: event.target.value
        })
    }

    handleDesciptionChange = (event) =>{
        //console.log(event.target.value)
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
        const courseName = this.state.course
        axios.post("http://localhost:5000/api/courses",{
            course: this.state.course,
            prerequisite:this.state.prerequisite,
            title:this.state.title,
            dept_name:this.state.dept_name,
            credit:this.state.credit,
            description: this.state.description,
            category:this.state.category,
            url: this.state.url
        })
        .then(function(response){
            console.log(response)
            alert(`${courseName} is inserted.`)
            //event.preventDefault()
            
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
           
            trigger={<Button  variant="contained" color="primary"> Insert a new Course </Button>}
            modal
            nested
          >
            {close => (
              <div className="modal" >
                <button className="close" onClick={close}>
                  &times;
                </button>
                <div className="header"> Insert a new Course </div>
                <div className="content">
                    <form>
                        <div>
                    
                            <TextField
                            value={this.state.course}
                            onChange={this.handleCourseNameChange}
                            id="filled-full-width"
                            label="Course Name"
                            style={{ margin: 3 , width: "300px"}}
                            placeholder="CS157C"
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
                            style={{ margin: 3 , width: "300px"}}
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
                            style={{ margin: 3 , width: "650px"}}
                            placeholder="This course is...."
                            //helperText="Full width!"
                            multiline
                            rowsMax={3}
                            
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
                            style={{ margin: 3 , width: "300px"}}
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
                            style={{ margin: 3 , width: "300px"}}
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
                            style={{ margin: 3 , width: "300px"}}
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
                            style={{ margin: 3 , width: "300px"}}
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
                            <select  style={{margin:3}} value={this.state.category} onChange={this.handleCategoryChange}>
                                <option value="requirement">Requirement</option>
                                <option value="elective">Elective</option>
                                <option value="deep-course">Deep Course</option>
                            </select>
                        </div>
                        <br/>
            
                        <button className="button" onClick={this.onSubmitClick}> Submit </button>
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