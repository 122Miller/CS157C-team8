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
           title:'Requirements',
           taskIds:['task-1','task-2','task-3','task-4'] 
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
            title:'Fall Semester',
            taskIds:[] 
         },
         'column-5':{
            id: 'column-5',
            title:'Spring Semester',
            taskIds:[] 
         },
         'column-6':{
            id: 'column-6',
            title:'Fall Semester',
            taskIds:[] 
         },
         'column-7':{
            id: 'column-7',
            title:'Spring Semester',
            taskIds:[] 
         },
    },
    //Facilitate reordering of the columns
    columnOrder:['column-1','column-2','column-3','column-4','column-5','column-6','column-7'],
};

export default initialData;