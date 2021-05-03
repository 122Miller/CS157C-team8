import React from 'react'
import styled from 'styled-components'
import Task from './task'
import {Droppable} from 'react-beautiful-dnd'

const Container = styled.div`
    margin:8px;
    border: 1px solid lightgray;
    border-radius:2px;
    width: 350px;

    display: flex;
    flex-direction: column
`;

const Title = styled.h3`
    padding:8px
`;
const TaskList = styled.div`
    padding: 8px;
    transition: background-color 0.2 ease;
    background-color: ${props=> (props.isDraggingOver? 'skyblue': 'white')};
    flex-grow:1;
    min-height:100px;
`;


export default class Column extends React.Component{

    constructor(props){
        super(props)
        //console.log("from Column", props)
    }
    render(){
        return(
            <Container>
           <Title>{this.props.column.title}</Title>
           <Droppable 
                droppableId={this.props.column.id} 
                //type={"Task"}
                isDropDisabled={false}
            >
                {(provided, snapshot)=>(
                    <TaskList
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        isDraggingOver={snapshot.isDraggingOver}
                    >
                    {this.props.tasks.map((task, index) => <Task key={task.id} task={task} index={index}  setSelectedCourse={this.props.setSelectedCourse}/>
                    )}
                    {provided.placeholder}
                    </TaskList>
                )}
           </Droppable>
       </Container>
        )
       
    }
}
