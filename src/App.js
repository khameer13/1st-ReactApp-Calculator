import './App.css';
import { useReducer } from "react";
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';



export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALVATE: "evalvate",
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      return {
        ...state,
        currentState: `${state.currentState || ""}${payload.digit}`,
      }
    case ACTIONS.CHOOSE_OPERATION:
      if (state.previousState == null && state.currentState==null) return state
      if (state.previousState != null && state.currentState!=null) return {
        ...state,
        currentState: null,
        previousState:evalvate(state) ,
        operation: payload.operation,
      }

      if(state.operation!=null){
        return {
          ...state,
          operation: payload.operation,
        }
      }

      return {
        ...state,
        previousState: state.currentState,
        currentState: null,
        operation: payload.operation,
      }
    case ACTIONS.CLEAR:
      return {
        //null state
      }
    case ACTIONS.DELETE_DIGIT:
      if(state.currentState==null) return state
      return {
        ...state,
        currentState: state.currentState.slice(0, -1)
      }
    case ACTIONS.EVALVATE:

      return {
        ...state,
        currentState: evalvate(state),
        previousState:null ,
        operation: null,
      }
  }
  // return state
}

const evalvate = ({ currentState, previousState, operation }) => {
  const curr = parseFloat(currentState)
  const prev = parseFloat(previousState)
  let result = ""
  switch (operation) {
    case "+":
      result = curr + prev
      break

    case "-":
      result = prev - curr
      break

    case "%":
      result = prev % curr
      break

    case "/":
      result = prev / curr
      break

    case "*":
      result = curr * prev
      break
  }

  return result.toString()
}



function App() {

  const [{ currentState, previousState, operation }, dispatch] = useReducer(reducer, {});

  return (
    <>
      <div className="header"><h1>My React-Calculator</h1></div>

      <div className="main-container">
        <div className="output">
          <div style={{ gridRow: '1', gridColumn: '1 / span 6' }} className="previous-output">{previousState}{operation}</div>
          <div style={{ gridRow: '2', gridColumn: '1 / span 6' }} className="current-output">{currentState}</div>

          <button onClick={() => dispatch({ type: ACTIONS.CLEAR })} style={{ gridRow: '3' }}>AC</button>
          <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })} style={{ gridRow: '3' }}>DEL</button>
          <OperationButton operation="/" dispatch={dispatch} style={{ gridRow: '3' }}></OperationButton>
          <OperationButton operation="%" dispatch={dispatch} style={{ gridRow: '3' }}></OperationButton>

          <DigitButton digit="1" dispatch={dispatch} style={{ gridRow: '4' }}></DigitButton>
          <DigitButton digit="2" dispatch={dispatch} style={{ gridRow: '4' }}></DigitButton>
          <DigitButton digit="3" dispatch={dispatch} style={{ gridRow: '4' }}></DigitButton>
          <OperationButton operation="+" dispatch={dispatch} style={{ gridRow: '4' }}></OperationButton>

          <DigitButton digit="4" dispatch={dispatch} style={{ gridRow: '5' }}></DigitButton>
          <DigitButton digit="5" dispatch={dispatch} style={{ gridRow: '5' }}></DigitButton>
          <DigitButton digit="6" dispatch={dispatch} style={{ gridRow: '5' }}></DigitButton>
          <OperationButton operation="-" dispatch={dispatch} style={{ gridRow: '5' }}></OperationButton>

          <DigitButton digit="7" dispatch={dispatch} style={{ gridRow: '6' }}></DigitButton>
          <DigitButton digit="8" dispatch={dispatch} style={{ gridRow: '6' }}></DigitButton>
          <DigitButton digit="9" dispatch={dispatch} style={{ gridRow: '6' }}></DigitButton>
          <button onClick={() => dispatch({ type: ACTIONS.EVALVATE })} style={{ gridRow: '6' }}>=</button>
        </div>
      </div>

    </>
  );
}

export default App;
