import { useSelector } from "react-redux";



 //SOUND
 export function playSound(file,volume=0.9){
    
    const sound=new Audio();
    sound.src=file;
    sound.volume=volume;
    sound.autoplay=true;
    return sound;    

}