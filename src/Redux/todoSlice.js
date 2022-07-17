import {createSlice,nanoid} from '@reduxjs/toolkit'

const initialState={
    todo:JSON.parse(localStorage.getItem('todo'))||[],   
}

const todoSlice=createSlice({
    name:'todo',    
    initialState,
    reducers:{
        //TODO
        addTask:(state,action)=>{state.todo.push({
            id:nanoid(),
            task:action.payload.input,
            finish:false,
            //date:new Date().toISOString().slice(0,-8),  
            date:Date.now(),        
            toDate:action.payload.date,
            alarmStatus:null          
        
        })},
        delTask:(state,action)=>{state.todo=state.todo.filter(el=>el.id!==action.payload)},
        clearTodo:(state)=>{state.todo=[]},
        finishToggle:(state,action)=>{
            const index =state.todo.findIndex(el=>el.id===action.payload);
            state.todo[index].finish=!state.todo[index].finish;
        },
        changeAlarmStatus:(state,action)=>{
            const index =state.todo.findIndex(el=>el.id===action.payload.id);
            state.todo[index].alarmStatus=action.payload.status;
        }
     

    }   
});

export const {actions:{addTask,delTask,clearTodo,finishToggle,changeAlarmStatus},reducer:todoReducer}=todoSlice;
