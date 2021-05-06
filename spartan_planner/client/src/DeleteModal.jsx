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
            trigger={<Button  variant="outlined" color="secondary"> Delete a Course </Button>}
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
                            
                            <TextField
                            value={this.state.course} onChange={this.handleCourseNameChange}
                            id="filled-full-width"
                            label="Course you want to delete"
                            style={{ margin: 5 , width: "300px"}}
                            placeholder="CS123"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            ></TextField>   
                        </div>
                        <br/>
                        
            
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