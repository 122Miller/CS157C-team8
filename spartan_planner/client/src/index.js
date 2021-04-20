import React from 'react';
import ReactDOM, { render } from 'react-dom';
import initialData from './initial-data'
import Column from './column'
import {DragDropContext} from 'react-beautiful-dnd'

class App extends React.Component{
  state = initialData;

  onDragEnd = result =>{
    const {destination, source, draggableId} = result;
    

    if(!destination){
      return;
    }

    if(destination.draggableId === source.draggableId && destination.index === source.index){
      return;
    }

    const column = this.state.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index,1);
    newTaskIds.splice(destination.index,0,draggableId);

    const newColumn={
      ...column,
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
  }

  render(){
    return (
      <DragDropContext

        onDragEnd={this.onDragEnd}
      >
        {this.state.columnOrder.map((columnId)=>{
          const column = this.state.columns[columnId];
          const tasks = column.taskIds.map(taskId => this.state.tasks[taskId])

          return <Column key={column.id} column={column} tasks={tasks}/>
        })}
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

