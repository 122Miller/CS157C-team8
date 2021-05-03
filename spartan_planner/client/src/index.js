import React from 'react';
import ReactDOM, { render } from 'react-dom';
import initialData from './initial-data'
import Column from './column'
import InsertModal from './InsertModal'
import DeleteModal from './DeleteModal'
import UpdateModal from './UpdateModal'
import InfoModal from './InfoModal'
import styled from 'styled-components'
import {DragDropContext} from 'react-beautiful-dnd'
import axios from 'axios'



const Container = styled.div`
  display: flex
`;

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = initialData;
    //console.log(initialData)
  }


  componentDidMount(){
    //console.log("componentDidMount")
    //console.log("old state",initialData)
    const newState  = {
      ...this.state,
      showCourseModal: false,
      selectedCourse: null,
    }


    let requirementsCourses = null
    let requiredCourseNames = []  

    let selectiveCourses = null
    let selectiveCourseNames = []

    let deepCourses = null
    let deepCourseNames = []
    
    axios.get('http://localhost:5000/api/courses')
    .then((response) => {
      // handle success
      console.log("courses api: ", response.data);
      //console.log("task",newState.tasks)
      
      for(var i=0; i < 3; i++){
        response.data[i].map((item)=>{
        //console.log(item.course)
        const course = item.course
        
        const obj = new Object()
        obj.id = item.course
        obj.courseName = item.course
        obj.title = item.title
        obj.category = item.category
        obj.dept_name = item.dept_name
        obj.description = item.description
        obj.credit = item.credit
        obj.prerequisite = item.prerequisite
        //obj.title = item.title
        if(i === 0){
          requiredCourseNames.push(course)
          requirementsCourses ={
          ...requirementsCourses,
          [course]:obj
          }
        }else if(i === 1){
          deepCourseNames.push(course)
          deepCourses ={
          ...deepCourses,
          [course]:obj
          }
        }else{
          selectiveCourseNames.push(course)
          selectiveCourses ={
          ...selectiveCourses,
          [course]:obj
          }
        }
     
        })
      }

      //console.log("requirmentObj: ", requirementsCourses)
      
      //newState.tasks = Object.assign({},requirementsCourses)


      const columnObj1 = {
        "id":"column-1",
        "title":"Requirements",
        "taskIds" : requiredCourseNames
      }

      const columnObj2 = {
        "id":"column-2",
        "title":"Deep Course",
        "taskIds" : deepCourseNames
      }

      const columnObj3 = {
        "id":"column-3",
        "title":"Selectives",
        "taskIds" : selectiveCourseNames
      }
      newState.columns['column-1'] = columnObj1
      newState.columns['column-2'] = columnObj2
      newState.columns['column-3'] = columnObj3

      const allCourses ={
        ...requirementsCourses,
        ...selectiveCourses,
        ...deepCourses
      }

      console.log(allCourses)
      console.log(requirementsCourses)
      newState.tasks = allCourses

      this.setState(newState,()=>{
        console.log("update complete", this.state)
      })
      
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });

    

    
        
  }


  setSelectedCourse = (course) =>{
      const newState = {
        ...this.state,
        selectedCourse: course,
        showCourseModal: true,
      }

      this.setState(newState, ()=>{
        console.log("from setSelectedCourse func", this.state)
      })
  }
  
  setNewState = (newState) =>{
      this.setState(newState, ()=>{
        console.log("from index", this.state)
      })
  }

  toggleInfoModal = () =>{
    const newState = {
      ...this.state,
      showCourseModal: !this.state.showCourseModal
    }
  }
  

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

    console.log("from ondrag end", this.state)

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
      <div>
      {this.state.showCourseModal? (<InfoModal selectedCourse = {this.state.selectedCourse}></InfoModal>):(null)}
      <DragDropContext 
        onDragStart={this.onDragStart}
        onDragUpdate={this.onDragUpdate}
        onDragEnd={this.onDragEnd}
      >
        <Container>
          {this.state.columnOrder.map((columnId)=>{
            //console.log("columnId",columnId)
            let theIdNum = columnId.match(/\d/g);
            theIdNum = parseInt(theIdNum.join(""));
            
            //console.log("theIdNum",theIdNum);
            const column = this.state.columns[columnId];
            //console.log("column",column)

            if(theIdNum <= 4){
              const tasks = column.taskIds.map(taskId => this.state.tasks[taskId])
              return <Column key={column.id} column={column} tasks={tasks} data={this.state} setNewState={this.setNewState} setSelectedCourse={this.setSelectedCourse} />
            }else{
              return;
            }
            
          })}
        </Container>


        <Container>
        {this.state.columnOrder.map((columnId)=>{
            //console.log("columnId",columnId)
            let theIdNum = columnId.match(/\d/g);
            theIdNum = parseInt(theIdNum.join(""));
            
            //console.log("theIdNum",theIdNum);
            const column = this.state.columns[columnId];
            //console.log("column",column)

            if(theIdNum > 4){
              const tasks = column.taskIds.map(taskId => this.state.tasks[taskId])
              return <Column key={column.id} column={column} tasks={tasks}/>
            }else{
              return;
            }
            
          })}

        </Container>

        <Container>
        <InsertModal></InsertModal>
        <DeleteModal></DeleteModal>
        <UpdateModal></UpdateModal>
       
        </Container>
      
      </DragDropContext>

     
      </div>
      

    
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




/**

1. call an api /courses


1st[] = requirments
2nd[] = eletives
3rd[] = Deep course


[  [{....}] , [{....}] , [{....}]  ] 


 */