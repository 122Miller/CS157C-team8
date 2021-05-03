import axios from 'axios';
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './InsertModal.css'
 
export default  class InfoModal extends React.Component{ 
    constructor(props){
        super(props)
        //this.state =props
        //console.log("from infoModal", props)
    }





    render(){
        return(
            <Popup
            trigger={<button className="button"> {this.props.task.id} </button>}
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
                            <label>Course Name: {this.props.task.id}</label>
                            <br/>
                            <br/>
                            <label>Title: {this.props.task.title} </label>
                            <br/>
                            <br/>
                            <label>Category: {this.props.task.category} </label>
                            <br/>
                            <br/>
                            <label>Description: {this.props.task.description} </label>
                            <br/>
                            <br/>
                            <label>Prerequisite: {this.props.task.prerequisite} </label>
                            <br/>
                            <br/>
                            <label>Department: {this.props.task.dept_name} </label>
                            <br/>
                            <br/>
                            <label>Credit: {this.props.task.credit} </label>
                            <br/>
                            <br/>
                            <button><a href={this.props.task.url}>Url for more details</a> </button>
                            <br/>
                
                            <br/>
                        </div>
                        
            
            
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