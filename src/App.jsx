import { useReducer } from 'react';
import './App.css';


const initialState = {
  input: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_INPUT":
      if (
        "+/*-".includes(state.input.slice(-1)) &&
        "+/*-".includes(action.payload)
      ) {
        return { ...state, input: state.input.slice(0, -1) + action.payload };
      } else {
        return { ...state, input: state.input + action.payload };
      }
    case "CALCULATE":
      try {
        return {
          ...state,
          input: eval(state.input).toString(),
        };
      } catch (error) {
        return { ...state, input: "Error" };
      }
    case "CLEAR":
      return initialState;
    case "DELETE":
      return { ...state, input: state.input.slice(0, -1) };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleClick = (btnVal) => {
    if (btnVal == "=") {
      dispatch({ type: "CALCULATE" });
    } else if (btnVal == "AC") {
      dispatch({ type: "CLEAR" });
    } else if (btnVal === "Del") {
      dispatch({ type: "DELETE" });
    } else {
      if (state.input == "" && ["+", "/", "*", "-"].includes(btnVal)) {
        return;
      } else {
        dispatch({ type: "ADD_INPUT", payload: btnVal });
      }
    }
  };

  return (
    <div className="container">
      <h1>Calculator App</h1>
      <div>
        <input
          type='text'
          placeholder='0'
          readOnly
          value={state.input}
        />
      </div>
      <div className="button-container">
        <button onClick={() => handleClick(0)}>0</button>
        <button onClick={() => handleClick(1)}>1</button>
        <button onClick={() => handleClick(2)}>2</button>
        <button onClick={() => handleClick(3)}>3</button>
        <button onClick={() => handleClick(4)}>4</button>
        <button onClick={() => handleClick(5)}>5</button>
        <button onClick={() => handleClick(6)}>6</button>
        <button onClick={() => handleClick(7)}>7</button>
        <button onClick={() => handleClick(8)} className='center'>8</button>
        <button onClick={() => handleClick(9)} className='center'>9</button>
      </div>
      <div className="button-container">
        <button onClick={() => handleClick(".")} className="operation-button">.</button>
        <button onClick={() => handleClick("+")} className="operation-button">+</button>
        <button onClick={() => handleClick("-")} className="operation-button">-</button>
        <button onClick={() => handleClick("*")} className="operation-button">*</button>
        <button onClick={() => handleClick("/")} className="operation-button">/</button>
        <button onClick={() => handleClick("=")} className="operation-button">=</button>
        <button onClick={() => handleClick("Del")} className="del-button">Del</button>
        <button onClick={() => handleClick("AC")} className="clear-button">AC</button>
      </div>
    </div>
  );
}

export default App;
