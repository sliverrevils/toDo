
import { useSelector, useDispatch } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { changeAlarmStatus, clearTodo, delTask, finishToggle } from '../../Redux/todoSlice';
import Item from './item';
import '../Ui/Animation/itemAnim.css';
import { useEffect, useMemo } from 'react';
import styles from './style.module.css';
import { FcDeleteDatabase } from 'react-icons/fc';
import { playSound } from '../../Media/media';
import {VscClearAll} from 'react-icons/vsc';


export default function List() {
     //THEME COLOR
     const {theme}=useSelector(state=>state.app);

    const todo = useSelector(state => state.tasks.todo);
    const dispath = useDispatch();

    const items = useMemo(
        () => todo.map((el, index) =>
            <CSSTransition key={el.id} timeout={500} classNames={'item'} onEnter={() => console.log('ENTER')} >
                <Item  {...{
                    ...el,
                    index,
                    delTask: () => { dispath(delTask(el.id)) },
                    finishTaggle: () => dispath(finishToggle(el.id)),
                    alarmStatus:(status)=>dispath(changeAlarmStatus({id:el.id,status}))
                }} />
            </CSSTransition>)
        , [todo]);

    useEffect(() => {
        localStorage.setItem('todo', JSON.stringify(todo))
    }, [todo])

    return (
        <div className={styles[theme?'list':'listBlack']}>
            <div className={styles.clearListBtn}>{todo.length > 0 && <span onClick={() => {
                let ask=window.confirm('Clear task-list ?');
                if(ask)
                dispath(clearTodo());
            }}>
                {VscClearAll()}
            </span>}</div>
            <TransitionGroup>
                {items}
            </TransitionGroup>

        </div>
    )
}