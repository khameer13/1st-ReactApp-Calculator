import { ACTIONS } from "./App";

export default function OperationButton({dispatch,operation,style}){
    return        <button style={style} onClick={()=>dispatch({ type:ACTIONS.CHOOSE_OPERATION, payload:{operation} })} >{operation}</button>
}