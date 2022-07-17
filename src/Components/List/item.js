
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './style.module.css';

import { playSound } from '../../Media/media';
import newItem from '../../Sound/del.mp3';
import delItem from '../../Sound/del2.mp3';

import newItem2 from '../../Sound/add.mp3';
import finish1 from '../../Sound/ready.mp3';
import alarm from '../../Sound/alarm.mp3';
import {TbAlarm,TbAlarmOff} from 'react-icons/tb';

import {MdAlarmOn} from 'react-icons/md';

import {HiOutlineCheckCircle} from 'react-icons/hi';

import {AiOutlineIssuesClose} from 'react-icons/ai';
import {IoCloseCircle} from 'react-icons/io5';
import {IoCog} from 'react-icons/io5';
import {VscWorkspaceTrusted} from 'react-icons/vsc';
import {ImSpinner11} from 'react-icons/im';


import { useCallback } from 'react';

export default function Item({ id,task, index, delTask, finish, finishTaggle, date, toDate ,alarmStatus}) {

    const itemRef = useRef(null);
    const timerInterval = useRef();

     //THEME COLOR
    const {theme}=useSelector(state=>state.app);
  

    // FINISH STATUS
    const finishRef=useRef();
    useEffect(()=>{finishRef.current=finish},[finish]);

    
    //SOUND STATUS ? 
    let soundStatus = useRef(true);
    let { sound:soundSelector } = useSelector(state => state.app);
    useEffect(() => {
        soundStatus.current = soundSelector;
    }, [soundSelector]);



    //FUNCS
    const onDel = () => {
        console.log('DELITING');
        soundStatus.current && playSound(delItem);
        delTask();
    };


    //------TASK FINISH ICO    

    const onFinish = () => {
        finishTaggle();
        soundStatus.current && playSound(!finish ? finish1 : newItem2,0.1);
        sound.current&&sound.current.pause();
        alarmStatus('cancel');
    }

    //------TIMER
    const [timer, setTimer] = useState({});


    //ALARM PLAY FUNC

    const alarmBlock = useRef();

    const [alarmIco,setAlarmIco]=useState(MdAlarmOn());
    
    const alarmIcons={
        'alarm':TbAlarm(),
        'warning':AiOutlineIssuesClose(),
        'cancel':TbAlarmOff(),
    }
    const alarmSelector=useSelector(state=>state.tasks.todo.filter(el=>el.id===id)[0]?.alarmStatus);
    useEffect(()=>{
        console.log('ALARMSTATUS',alarmSelector);
        setAlarmIco(alarmIcons[alarmSelector]);
    },[alarmSelector])
    
   //alarm play
   const sound =useRef();
    const alarmPlay = () => {
        console.log('MUST BE READY');
        if ((((new Date(toDate).getTime() - Date.now()) / 1000).toFixed() > -2)&&!finishRef.current) {
            //--------------------ALARM PLAYING   
            console.log('FINISH',finish);       
                //START PLAY
                 sound.current = playSound(alarm);               
                alarmStatus('alarm');

                alarmBlock.current.classList.add(styles.alarmOn);

                //CLICK TO DISABLE SOUND
                function alertClick() {
                    sound.current.pause();
                    alarmBlock.current.classList='';
                    alarmBlock.current.classList.add(styles.alarm);              
                    
                    alarmStatus('cancel');
                }
                alarmBlock.current.addEventListener('click',alertClick , { once: true});

                //END PLAY  
                sound.current.addEventListener('ended', function soundEnd() {
                    
                    alarmBlock.current.classList=''; 
                    alarmBlock.current.classList.add(styles.alarm);                    
                    
                    alarmStatus('warning');
                    sound.current.removeEventListener('ended', soundEnd);
                    alarmBlock.current.removeEventListener('click',alertClick);
                })
            
        }

    }
    useEffect(()=>()=>{sound.current&&sound.current.pause()},[]);

    // ALERT INTERVAL
    const timerFunc = useCallback(() => {
        timerInterval.current = setTimeout(() => {

            let timeLeft = ((new Date(toDate).getTime() - Date.now()) / 1000).toFixed();// ДО НАЗНАЧЕННОГО ВРЕМЕНИ
            const timeOut = ((Date.now() - new Date(date).getTime()) / 1000).toFixed() // C МОМЕНТА ДОБАВЛЕНИЯ            

            setTimer({ timeOut, timeLeft });
            //ALARM
            timeLeft > 0 ? timerFunc() : alarmPlay();
        }, 500);
    }, [])

    useEffect(() => {
        timerFunc();
        return () => {
            clearTimeout(timerInterval.current)
        };
    }, [])






    //TOUCHES
    useEffect(() => {
        let start, end = 0;
        const ref = itemRef.current;

        soundStatus.current && playSound(newItem);

        //--------------------------FUNCS
        function touchStart(e) {
            
            start = e.changedTouches[0].screenX;
        }

        function touchMove(e) {
            // console.log(Math.floor(Math.abs(start - e.changedTouches[0].screenX)));
            e.preventDefault();
            e.stopPropagation();
            end = e.changedTouches[0].screenX;
            itemRef.current.style.transform = `translateX(${Math.floor(e.changedTouches[0].screenX - start)}px)`;            
        }

        function touchEnd(e) {

            if (start && end) {
                if (end - start > 250)
                    onDel();
                else
                    itemRef.current.style.transform = `translateX(0)`;
                end = 0;

            }
        }
        if ('ontouchstart' in window) {
            //----------------------START
            itemRef.current.addEventListener('touchstart', touchStart);
            //-----------------------MOVE
            itemRef.current.addEventListener('touchmove', touchMove);
            //-----------------------END
            itemRef.current.addEventListener('touchend', touchEnd);
        }

        //-----------------------ON EXIT
        return () => {
            // console.log('DEL COMPONENT');
            ref.removeEventListener('touchstart', touchStart);
            ref.removeEventListener('touchmove', touchMove);
            ref.removeEventListener('touchend', touchEnd);
            clearInterval(timerInterval.current);

        }
    }, []);





    return (
        <div ref={itemRef} className={styles[theme?'item':'itemBlack']}>

            <div className={styles.index}>
                {index}
            </div>

            <div className={styles.midBlock}>

                <div className={styles.task}>
                    {task}                        
                        <div onClick={onFinish} style={{color:finish?'lightgreen':'gold'}}className={!finish?styles.finishSpin:styles.finish} >
                            {/* {finish ? HiOutlineCheckCircle() : IoCog()} */}
                            {finish ? VscWorkspaceTrusted() : ImSpinner11()}
                        </div>                   
                </div>

                <div className={styles.time}>
                    {(!!toDate&&!finish) && <div>{timer.timeOut}</div>}

                    <div > {new Date(date).toLocaleString()}
                        {!!toDate && <>➡ {new Date(toDate).toLocaleString()}</>}
                    </div>
                    {(!!toDate&&!finish) && <div className={styles.alarm} ref={alarmBlock} style={{color:(timer.timeLeft<10&&timer.timeLeft>0)?'tomato':timer.timeLeft<=0?alarmSelector==='alarm'?'red':'green':'gray'}}> {timer.timeLeft > 0 ? timer.timeLeft : alarmIco}</div>}
                </div>

            </div>

            {!('ontouchstart' in window) && <div onClick={onDel} className={styles.close}>{IoCloseCircle()}</div>/*❌*/}




        </div>
    )
}