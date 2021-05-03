import React from 'react'
import styled from 'styled-components'
import {Draggable} from 'react-beautiful-dnd'
import InfoModal from './InfoModal'


const Container = styled.div`
    border: 1px solid lightgray;
    border-radius: 2px;
    padding: 8px;
    margin-bottom:8px;
    background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
    display : flex;

`;


const Handle = styled.div`
    width: 20px;
    height: 20px;
    background-color :orange;
    border-radius: 4px;
    margin-right: 8px;
`


export default class Task extends React.Component{
    constructor(props){
        super(props)
        //this.state = props
        //console.log("from task class",props)
        //this.onClickHandler = this.onClickHandler.bind(this)
    
    }


    
    render(){
        
        return (
        <Draggable 
            draggableId={this.props.task.id} 
            index={this.props.index}
        >
            {(provided, snapshot)=>(
                
            
                <Container
                {...provided.draggableProps}
                
                ref={provided.innerRef}
                isDragging={snapshot.isDragging}
                >
                <Handle  {...provided.dragHandleProps}/>
                <InfoModal task={this.props.task}></InfoModal>
                
                </Container>
               
                
            )}
            
        </Draggable>
        
        )
    }
}