import axios from 'axios';
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './InsertModal.css'
 
export default  class InsertModal extends React.Component{ 
    constructor(props){
        super(props)
        this.state ={
            course: "",

        }
    }

    handleCourseNameChange = (event) =>{
        this.setState({
            course: event.target.value
        })
    }


    onDeleteClick = (event) =>{
        let input = prompt("Enter password to proceed:")
        if(input !== "CS157C"){
            alert("Wrong password")
            return
        }
        const courseName =  this.state.course
        axios.delete(`http://localhost:5000/api/courses/${courseName}`)
        .then(function(response){
            console.log(response)
            this.setState({course:""})
            alert(`Deleted ${courseName}`)
            
        })
        .catch(function(error){
            console.log(error)
            alert("Something went wrong.")
        })
        //event.preventDefault()
    }

    render(){
        return(
            <Popup
            trigger={<button className="button"> Delete a Course </button>}
            modal
            nested
          >
            {close => (
              <div className="modal">
                <button className="close" onClick={close}>
                  &times;
                </button>
                <div className="header"> Delete a Course </div>
                <div className="content">
                    <form onSubmit={this.onDeleteClick}>
                        <div>
                            <label>Course Name</label>
                            <input type="text" value={this.state.course} onChange={this.handleCourseNameChange}/>
                        </div>
                        
            
                        <button className="button"> Delete </button>
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