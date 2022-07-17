
import { createSlice } from "@reduxjs/toolkit";

let initialState={
    sound:true,
    volume:0.9,
    theme:true,
};

localStorage.getItem('sound')==='off'&&(initialState.sound=false);
localStorage.getItem('theme')==='dark'&&(initialState.theme=false);


const app=createSlice({
    name:'app',
    initialState,
    reducers:{
        soundToggle:(state)=>{
            state.sound=!state.sound;
            localStorage.setItem('sound',state.sound?'on':'off');
        },
        themeToggle:(state)=>{
            state.theme=!state.theme;
            localStorage.setItem('theme',state.theme?'light':'dark');
        }
    }
    
});

export const {actions:{soundToggle,themeToggle},reducer:appReducer}=app;