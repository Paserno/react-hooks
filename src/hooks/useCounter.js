import { useState } from 'react';


export const useCounter = ( initialState = 10, ) => {

    const [counter, setCounter] = useState(initialState)

    //factor = 1 Eliminado --- setState( state + factor)
    const increment = () => {
        setCounter( counter + 1);
    }

    //factor = 1 Eliminado --- setState( state - factor)
    const decrement = () => {
        setCounter( counter - 1);
    }
    const reset = () => {
        setCounter( initialState);
    }

    return {
        counter,
        increment,
        decrement,
        reset
    };
}