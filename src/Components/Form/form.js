import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../Redux/todoSlice";
import styles from './form.module.css';
import {FcPlus} from 'react-icons/fc';
import addClick from '../../Sound/click.mp3';
import {MdAddTask} from 'react-icons/md';

import { playSound } from "../../Media/media";
import {AiOutlineSound} from 'react-icons/ai';



export default function Form(){
    const [input,setInput]=useState('');
    const [valid,setValid]=useState(false);
    const [date,setDate]=useState('');
    const dispatch=useDispatch();
    
    const withSound=useSelector(state=>state.app.sound);

     //THEME COLOR
     const {theme}=useSelector(state=>state.app);
   
    

    //CHANGE INPUT
    const onChange=({target:{value}})=>{
        if(!/^ /.test(value)&&value.length<22){
            setInput(value);
        }       
    };
    //VALIDATE
    useEffect(()=>{
        setValid(input.length>2);
    },[input])

    //ADD TASK
    const onClick=()=>{
        dispatch(addTask({input,date}));
        withSound&&playSound(addClick);
        setInput('');
        setDate('');
    }

    const onKeyDown=(e)=>{
        if(e.code==='Enter'){
            console.log('ENTER');
            onClick();
        }
    }
   
    


    return(
        <div>            
            <input type={'text'} {...{onChange}} {...{onKeyDown}} value={input} placeholder={'enter text'} className={styles[theme?'input':'inputBlack']}/>
            <button disabled={!valid} {...{onClick}} className={styles[theme?'addTask':'addTaskBlack']} style={{color:valid?'green':'gray'}}>{MdAddTask()}
           
            </button>
            <h6>min 3 - max 30 chars</h6>
            <br/>
            {valid&&<input type={'datetime-local'} onChange={e=>{setDate(e.target.value);}} onClick={e=>e.stopPropagation()} value={date} disabled={!valid} className={styles[theme?'dateInput':'dateInputBlack']}></input> }  
            {date&&<button onClick={e=>{setDate('');e.stopPropagation()}} disabled={!valid} className={styles[theme?'clearDateBtn':'clearDateBtnBlack']}>❌</button>} 
            
        </div>
    )
}