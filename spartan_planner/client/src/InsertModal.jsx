import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './InsertModal.css'
 
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
        }
    }

    handleCourseNameChange = (event) =>{
        this.setState({
            course: event.target.value
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
        console.log("course: ", this.state)
        event.preventDefault()        
    }

    render(){
        return(
            <Popup
            trigger={<button className="button"> Insert a new Course </button>}
            modal
            nested
          >
            {close => (
              <div className="modal">
                <button className="close" onClick={close}>
                  &times;
                </button>
                <div className="header"> Insert a new Course </div>
                <div className="content">
                    <form>
                        <div>
                            <label>Course Name</label>
                            <input type="text" value={this.state.course} onChange={this.handleCourseNameChange}/>
                        </div>
                        <div>
                            <label>Title</label>
                            <input type="text" value={this.state.title} onChange={this.handleTitleChange}/>
                        </div>
                        <div>
                            <label>Description</label>
                            <textarea value ={this.state.description} onChange={this.handleDesciptionChange}></textarea>
                        </div>
                        <div>
                            <label>Prerequisite</label>
                            <input type="text" value={this.state.prerequisite} onChange={this.handlePrerequisitementChange}/>
                        </div>

                        <div>
                            <label>Department</label>
                            <input type="text" value={this.state.dept_name} onChange={this.handleDepartmentChange}/>
                        </div>
                        <div>
                            <label>Credit</label>
                            <input type="text" value={this.state.credit} onChange={this.handleCreditChange}/>
                        </div>

                        <div>
                            <select  value={this.state.category} onChange={this.handleCategoryChange}>
                                <option value="requirement">Requirement</option>
                                <option value="elective">Elective</option>
                                <option value="deep-course">Deep Course</option>
                            </select>
                        </div>
            
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