const initialData ={
    tasks:{
         //"CS146" : {id: "CS146", coruse = "", title = ""     }
        'task-1':{id:'task-1', courseName:'CS146'},
        'task-2':{id:'task-2', courseName:'CS151'},
        'task-3':{id:'task-3', courseName:'CS49J'},
        'task-4':{id:'task-4', courseName:'CS157C'},
        'task-5':{id:'task-5', courseName:'AREA-R'},
        'task-6':{id:'task-6', courseName:'AREA-C'},
        'task-7':{id:'task-7', courseName:'AREA-V'},
    },
    columns:{
        'column-1':{
           id: 'column-1',
           title:'Requirements',
           taskIds:[] 
        },
        'column-2':{
            id: 'column-2',
            title:'Elective Course',
            taskIds:[] 
         },
         'column-3':{
            id: 'column-3',
            title:'Deep-Course',
            taskIds:[] 
         },
         'column-4':{
            id: 'column-4',
            title:'Upper G.E. Course',
            taskIds:[] 
         },
         'column-5':{
            id: 'column-5',
            title:'Fall Semester',
            taskIds:[],
            units: 0
         },
         'column-6':{
            id: 'column-6',
            title:'Spring Semester',
            taskIds:[],
            units: 0
         },
         'column-7':{
            id: 'column-7',
            title:'Fall Semester',
            taskIds:[],
            units: 0
         },
         'column-8':{
            id: 'column-8',
            title:'Spring Semester',
            taskIds:[],
            units: 0
         },
       
    },
    //Facilitate reordering of the columns
    columnOrder:['column-1','column-2','column-3','column-4','column-5','column-6','column-7','column-8'],
};

export default initialData;