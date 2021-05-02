import axios from 'axios';
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './InsertModal.css'
 
export default  class InfoModal extends React.Component{ 
    constructor(props){
        super(props)
        this.state =props
        console.log("from infoModal", this.state)
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