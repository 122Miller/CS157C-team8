import React from 'react';
import ReactDOM, { render } from 'react-dom';
import initialData from './initial-data'
import Column from './column'
import styled from 'styled-components'
import {DragDropContext} from 'react-beautiful-dnd'


const Container = styled.div`
  display: flex
`;

class App extends React.Component{
  state = initialData;

  onDragStart = () =>{
    /*
    document.body.style.color = 'Orange'
    document.body.style.transition = 'background-color 0.3s ease'
    */
  }

  onDragUpdate = update =>{
    /*
    const {destination} = update;
    const opacity = destination? destination.index / Object.keys(this.state.tasks).length:0
    document.body.style.backgroundColor = `rgba(153,141,217, ${opacity})`
    */
  }

  onDragEnd = result =>{
    const {destination, source, draggableId} = result;
    document.body.style.color = 'inherit'
    document.body.style.backgroundColor = 'inherit'
    console.log("destination",destination);
    console.log("source",source)
    console.log("draggableId",draggableId)
    console.log("\n\n")
  
    

    if(!destination){
      
      return;
      
    }

    if(destination.droppableId === source.droppableId && destination.index === source.index){
      console.log("hit0")
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    console.log("start",start)
    console.log("finish", finish)
    
    if(start === finish){
   
    const newTaskIds = Array.from(start.taskIds);
    newTaskIds.splice(source.index,1);
    newTaskIds.splice(destination.index,0,draggableId);

    const newColumn={
      ...start,
      taskIds:newTaskIds,
    };

    const newState={
      ...this.state,
      columns:{
        ...this.state.columns,
        [newColumn.id]: newColumn,
      }
    }

    this.setState(newState)
    return;
   }


    // Moving from one list to another
    console.log("hit")
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds
    }

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId); //insert
    const newFinish = {
      ...finish,
      taskIds:finishTaskIds
    }

    const newState = {
      ...this.state,
      columns:{
        ...this.state.columns,
        [newStart.id]:newStart,
        [newFinish.id]: newFinish,
        
      }
    }

    this.setState(newState)
  }

  render(){
    return (
      <DragDropContext 
        onDragStart={this.onDragStart}
        onDragUpdate={this.onDragUpdate}
        onDragEnd={this.onDragEnd}
      >
        <Container>
          {this.state.columnOrder.map((columnId)=>{
            const column = this.state.columns[columnId];
            const tasks = column.taskIds.map(taskId => this.state.tasks[taskId])

            return <Column key={column.id} column={column} tasks={tasks}/>
          })}
        </Container>
        
      </DragDropContext>
      
    )

  }
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

