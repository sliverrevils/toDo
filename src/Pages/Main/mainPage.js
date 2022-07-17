
import Form from '../../Components/Form/form';
import List from '../../Components/List/list';
import styles from  './main.module.css';
import { useSelector,useDispatch } from 'react-redux';
import { soundToggle, themeToggle } from '../../Redux/appSlice';
import { playSound } from '../../Media/media';
import soundOn from '../../Sound/soundOn.mp3';
import soundOff from '../../Sound/soundOff.mp3';


export default function MainPage(){
    //const [theme,setTheme]=useState(true);
    const dispatch=useDispatch();  
    
    //THEME COLOR
    const {theme}=useSelector(state=>state.app)
    const onThemeToggle=()=>{
        dispatch(themeToggle());
    }

    //SOUND TOGGLE
    const withSound=useSelector(state=>state.app.sound);
    const onSoundToggle=()=>{
        dispatch(soundToggle());
        playSound(!withSound?soundOn:soundOff,!withSound?0.9:0.2);
    }


    return(
        <div className={styles[theme?'main':'mainDark']}>            
            <h1>ToDo</h1>
            <h4 onClick={onSoundToggle} className={styles.sound}> {withSound?'🔊':'🔈'} </h4>
            <h4 onClick={onThemeToggle} className={styles.theme}> {!theme?'🔘':'⚫'}</h4>
            
            <Form/>
            <List/>
        </div>
    )
}