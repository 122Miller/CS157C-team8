import React from 'react';
import ReactDOM, { render } from 'react-dom';
import initialData from './initial-data'
import Column from './column'
import SemesterColumn from './semesterColumn'
import InsertModal from './InsertModal'
import DeleteModal from './DeleteModal'
import UpdateModal from './UpdateModal'
import InfoModal from './InfoModal'
import styled from 'styled-components'
import {DragDropContext} from 'react-beautiful-dnd'
import axios from 'axios'
import Title from './Title'

import './index.css'


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

    let GECourses = null
    let GECourseNames = []

    
    axios.get('http://localhost:5000/api/courses')
    .then((response) => {
      // handle success
      console.log("courses api: ", response.data);
      //console.log("task",newState.tasks)
      
      for(var i=0; i < response.data.length; i++){
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
        obj.url = item.url
        //obj.title = item.title
        if(i === 0){
          requiredCourseNames.push(course)
          requirementsCourses ={
          ...requirementsCourses,
          [course]:obj
          }
        }else if(i === 1){
          selectiveCourseNames.push(course)
          selectiveCourses ={
          ...selectiveCourses,
          [course]:obj
          }
        }else if(i === 2){
          deepCourseNames.push(course)
          deepCourses ={
          ...deepCourses,
          [course]:obj
          }
        }else{
          GECourseNames.push(course)
          GECourses ={
          ...GECourses,
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
        "title":"Selectives",
        "taskIds" : selectiveCourseNames
      }

      const columnObj3 = {
        "id":"column-3",
        "title":"Deep Course",
        "taskIds" : deepCourseNames
      }

      const columnObj4 = {
        "id":"column-4",
        "title":"Upper Division G.E.",
        "taskIds" : GECourseNames
      }

      


      newState.columns['column-1'] = columnObj1
      newState.columns['column-2'] = columnObj2
      newState.columns['column-3'] = columnObj3

      console.log("col 4", columnObj4)
      console.log("col 3", columnObj3)
      newState.columns['column-4'] = columnObj4

      const allCourses ={
        ...requirementsCourses,
        ...selectiveCourses,
        ...deepCourses,
        ...GECourses
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
    console.log("result", result)
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

    let newState = {
      ...this.state,
      columns:{
        ...this.state.columns,
        [newStart.id]:newStart,
        [newFinish.id]: newFinish,
        
      }
    }

    const taskValues = Object.values(this.state.tasks)
    const columnValues = Object.values(this.state.columns)

    let course = null
    taskValues.map( (item, index) =>{
      if(item.id === draggableId){
        console.log(index)
        course = item
        console.log(course.prerequisite)
      }
    })

    let currentColumn = null
    let currentColumnIndex = null
    columnValues.map( (element, index) => {
      if(element.id === finish.id){
        currentColumn = element
        currentColumnIndex = index
      }
    })

    console.log("currentColumn", currentColumn)
    console.log("currentColumnIndex", currentColumnIndex)

    const takenClasses = []
    var i;
    for(i = 4; i < currentColumnIndex; i++){
      columnValues[i].taskIds.forEach( task => takenClasses.push(task))
    }
    console.log("takenClasses", takenClasses)

    for(i = 0; i < course.prerequisite.length; i++){
      if(takenClasses.includes(course.prerequisite[i])){
        //console.log("satisfied")
      }
      else{
        alert(`prereq not satisfied ${course.prerequisite[i]}` )
        return;
      }
    }

    console.log("After onDragEnd", newState)
    console.log("After OnDragEnd source index", source.index)
    console.log("After OnDragEnd destination index", destination.index)

    const newStateColumnValues = Object.values(newState.columns)
    console.log("new state column",newStateColumnValues[currentColumnIndex])
    var newUnits = 0
    console.log("column task ids length",newStateColumnValues[currentColumnIndex].taskIds.length)

    var taskID = null
    for(i = 0; i < newStateColumnValues[currentColumnIndex].taskIds.length; i++){
      taskID = newStateColumnValues[currentColumnIndex].taskIds[i]
      taskValues.map( (item, index) =>{
        if(item.id === taskID){
          console.log("item units", item)
          newUnits += item.credit
          //console.log(course.prerequisite)
        }
      })
    }

    console.log("new units", newUnits)

    //newStateColumnValues[currentColumnIndex].taskIds.forEach( task => takenClasses.push(task))
    //newStateColumnValues[currentColumnIndex].units = units + course.units


    console.log("new state", newState)
    newStateColumnValues[currentColumnIndex].units = newUnits
    console.log("check updated units", newStateColumnValues[currentColumnIndex])
    //newState.columns = newStateColumnValues

    // const newState = {
    //   ...this.state,
    //   columns:{
    //     ...this.state.columns,
    //     [newStart.id]:newStart,
    //     [newFinish.id]: newFinish,
        
    //   }

    // newState = {
    //   ...newState,
    //   columns:{
    //     ...newStateColumnValues
    //   }
    // }

    console.log("newnewState", newState)

    this.setState(newState)
  }

  render(){
    return (
      <div className = "grid-container" >
      <div className="title-div"> <Title/> </div>
      {this.state.showCourseModal? (<InfoModal selectedCourse = {this.state.selectedCourse}></InfoModal>):(null)}
      <DragDropContext 
        onDragStart={this.onDragStart}
        onDragUpdate={this.onDragUpdate}
        onDragEnd={this.onDragEnd}
      >
        <Container className= "course-containers1">

          {this.state.columnOrder.map((columnId)=>{
            //console.log("columnId",columnId)
            let theIdNum = columnId.match(/\d/g);
            theIdNum = parseInt(theIdNum.join(""));
            
            //console.log("theIdNum",theIdNum);
            const column = this.state.columns[columnId];
            //console.log("column",column)

            if(theIdNum <=2){
              const tasks = column.taskIds.map(taskId => this.state.tasks[taskId])
              return <Column className="course-col" key={column.id} column={column} tasks={tasks} data={this.state} setNewState={this.setNewState} setSelectedCourse={this.setSelectedCourse} />
            }else{
              return;
            }
            
          })}
        </Container>

        <Container className= "course-containers2">

          {this.state.columnOrder.map((columnId)=>{
            //console.log("columnId",columnId)
            let theIdNum = columnId.match(/\d/g);
            theIdNum = parseInt(theIdNum.join(""));
            
            //console.log("theIdNum",theIdNum);
            const column = this.state.columns[columnId];
            //console.log("column",column)

            if(theIdNum <= 4 && theIdNum >2){
              const tasks = column.taskIds.map(taskId => this.state.tasks[taskId])
              return <Column className="course-col" key={column.id} column={column} tasks={tasks} data={this.state} setNewState={this.setNewState} setSelectedCourse={this.setSelectedCourse} />
            }else{
              return;
            }
            
          })}
        </Container>

        <Container className="semester-containers1">
        {this.state.columnOrder.map((columnId)=>{
            //console.log("columnId",columnId)
            let theIdNum = columnId.match(/\d/g);
            theIdNum = parseInt(theIdNum.join(""));
            
            //console.log("theIdNum",theIdNum);
            const column = this.state.columns[columnId];
            //console.log("column",column)

            if(theIdNum > 4 && theIdNum <=6){
              const tasks = column.taskIds.map(taskId => this.state.tasks[taskId])
              return <SemesterColumn  key={column.id} column={column} tasks={tasks}/>
            }else{
              return;
            }
            
          })}

        </Container>

        <Container className="semester-containers2">
        {this.state.columnOrder.map((columnId)=>{
            //console.log("columnId",columnId)
            let theIdNum = columnId.match(/\d/g);
            theIdNum = parseInt(theIdNum.join(""));
            
            //console.log("theIdNum",theIdNum);
            const column = this.state.columns[columnId];
            //console.log("column",column)

            if(theIdNum > 6){
              const tasks = column.taskIds.map(taskId => this.state.tasks[taskId])
              return <SemesterColumn  key={column.id} column={column} tasks={tasks}/>
            }else{
              return;
            }
            
          })}

        </Container>

        <Container className="btns-container">
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