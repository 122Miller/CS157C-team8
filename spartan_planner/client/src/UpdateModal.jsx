import axios from 'axios';
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './InsertModal.css'
import Button from '@material-ui/core/Button';
 
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
                            <label>Course name you want to update</label>
                            <input type="text" value={this.state.oldCourse} onChange={this.handleOldCourseNameChange}/>
                           
                        </div>
                        <br/>
                        <div>
                            <label>New Course Name</label>
                            <input type="text" value={this.state.newCourse} onChange={this.handleNewCourseNameChange}/>
                        </div>
                        <br/>
                        <div>
                            <label>Title</label>
                            <input type="text" value={this.state.title} onChange={this.handleTitleChange}/>
                        </div>
                        <br/>
                        <div>
                            <label>Description</label>
                            <textarea  rows="4" cols = "50" value ={this.state.description} onChange={this.handleDesciptionChange}></textarea>
                        </div>
                        <br/>
                        <div>
                            <label>Prerequisite</label>
                            <input type="text" value={this.state.prerequisite} onChange={this.handlePrerequisitementChange}/>
                        </div>
                        <br/>
                        <div>
                            <label>Department</label>
                            <input type="text" value={this.state.dept_name} onChange={this.handleDepartmentChange}/>
                        </div>
                        <br/>
                        <div>
                            <label>Credit</label>
                            <input type="text" value={this.state.credit} onChange={this.handleCreditChange}/>
                        </div>
                        <br/>
                        <div>
                            <select  value={this.state.category} onChange={this.handleCategoryChange}>
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