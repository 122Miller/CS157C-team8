const initialData ={
    tasks:{
        'task-1':{id:'task-1', content:'CS146'},
        'task-2':{id:'task-2', content:'CS151'},
        'task-3':{id:'task-3', content:'CS49J'},
        'task-4':{id:'task-4', content:'CS157C'},
    },
    columns:{
        'column-1':{
           id: 'column-1',
           title:'Upper Division Course',
           taskIds:['task-1','task-2','task-3','task-4'] 
        },
        'column-2':{
            id: 'column-2',
            title:'Fall Semester',
            taskIds:[] 
         },
         'column-3':{
            id: 'column-3',
            title:'Spring Semester',
            taskIds:[] 
         },
    },
    //Facilitate reordering of the columns
    columnOrder:['column-1','column-2','column-3'],
};

export default initialData;