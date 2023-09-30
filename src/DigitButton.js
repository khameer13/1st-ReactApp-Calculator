import { ACTIONS } from "./App";

export default function DigitButton({dispatch,digit,style}){
    return        <button style={style} onClick={()=>dispatch({ type:ACTIONS.ADD_DIGIT, payload:{digit} })} >{digit}</button>
}