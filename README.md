# Hook App


#
### 1.- UseState - Multiples Estados
Se creo un archivo Counter App, para probar el __Hook useState__.
* Aqui se muestra el uso normal que se le puede dar a un useState, con un contador que incrementa.
````
const [counter,setCounter] = useState( 10 );

return (
        <>
            <h1> Counter { counter} <h1>
            <hr/>

            <button
            onClick={ () => {
              setCounter( counter + 1 )
            }}
            >
            +1
            </button>
        </>
   )
````
* Pero aquí surge la problematica, cuando se quiere incrementar mas de 1 estado.
````
const [ counter, setCounter] = useState({
        counter1: 10,
        counter2: 20
    });
````
* En esta solución se utilizó el __operador spread__ para solucionar el problema de incrementar 1 solo estado de los multiples que puedan existir.
* Ya que en el caso de no usar el operador spread, los demas estados desaparecerian y solo exisitiria 1 solo. 
````
const [ state, setState] = useState({
        counter1: 10,
        counter2: 20
    });

    const { counter1, counter2 } = state;

    return (
        <>
            <h1>Counter1 { counter1 }</h1>
            <h1>Counter2 { counter2 }</h1>
            <hr/>

            <button 
            className='btn btn-primary'
            onClick={ () => {
                setState({
                    ...state,
                    counter1: counter1 + 1
                });
            }}
            >
                +1
            </button>
        </>
    )
````
#
### 2.- UseCounter - CustomHook
Crearemos un __Custom Hook__ que sea un contador la cual se utilizará:

Creamos los siguientes archivos
* hooks/useCounter.js
* components/01-useState/CounterWithCustomHook

En el `index.js`
* Realizamos la importación y lo usamos.
````
import { CounterWithCustomHook } from './components/01-useState/CounterWithCustomHook';

ReactDOM.render(
  
    <CounterWithCustomHook />,
````
En `hooks/useCounter.js`
* En nuestro CustomHook importamos `useState`.
````
import { useState } from 'react';
````
* Creamos el __CustomHook__, recibimos un parametro, que le damos un valor por defecto.
* Lo usamos en el `useState`, para luego usarlo en las funciones.
* Creamos la funcion incremento y decremento, lo que hará es recibir el factor que es una propiedad a la que se le sumará o restará dependiendo la función.
* Finalmente tenemos la función reset, que es dejar __state__ en el valor inicial.
* Retornamos todas las funciónes y el state.
````
export const useCounter = ( initialState = 10, ) => {
    const [state, setState] = useState(initialState)

    const increment = (factor = 1) => {
        setState( state + factor);
    }

    const decrement = (factor = 1) => {
        setState( state - factor);
    }
    const reset = () => {
        setState( initialState);
    }

    return {
        state,
        increment,
        decrement,
        reset
    };
}
````
En `components/01-useState/CounterWithCustomHook`
* Realizamos las importaciones de react, el CustomHook y el css.
````
import React from 'react';
import { useCounter } from '../../hooks/useCounter';

import './counter.css';
````
* Creamos la función donde se usará el contador.
* Desestructuramos los elementos del useCounter y le pasamos un valor de 10.
* Realizamos el retorno de los elementos HTML que se mostrarán, por ejemplo el valor por defecto, los botones de incremento, decremento y reset.
````
export const CounterWithCustomHook = () => {
    const { state, increment, decrement, reset } = useCounter(10);

    return (
        <>
            <h1>Counter with Hook: { state }</h1>
            <hr/>

            <button onClick={ () =>  increment(200)} className='btn btn-primary'> + 1</button>
            <button onClick={reset} className='btn btn-primary'> Reset</button>
            <button onClick={() =>  decrement(2)} className='btn btn-primary'> - 1</button>
        </>
    )
}
````
#
### 3.- useEffect - SimpleForm
Ahora se demostrará el uso de __useEffect__ con un simple form:
Se crea el archivo
* `02-useEffect/SimpleForm.js`
En `index.js`
* Hacemos uso de la importación del nuevo elemento que se creo.
````
import { SimpleForm } from './components/02-useEffect/SimpleForm';


ReactDOM.render(
  
    <SimpleForm />,
````
En `components/02-useEffect/SimpleForm`
* Importamos el useEffect y useState propios de __react__, ademas de crear la nueva función `SimpleForm()`.
````
import React, { useEffect, useState } from 'react'
import './effects.css'

export const SimpleForm = () => {...}
````
* Creamos el __useState__ y le damos algunas propiedades como el nombre y el mail.
* Le hacemos la desestructuración en el `formState`.
````
const [formState, setFormState] = useState({
        name: '',
        email: ''
    });

const { name, email } = formState;
````
* Creamos 3 useEffect para ver el funcionamiento, le ponemos algunas impresiones por consola que se ejecutarán la primera vez.
* El primero se ejecutará 1 sola vez.
* El segundo se ejecutará cada vez que se escribá en cualquiera de los dos input que se crearán.
* El tercero se ejecutará cada vez que se escriba en el input del email.
````
 useEffect( () => {
        console.log('hey!')
    }, [] );

    useEffect( () => {
        console.log('formState cambió!')
    }, [formState] );

    useEffect( () => {
        console.log('email cambió!')
    }, [email] );
````
* Esta función detectará cada cambio del formulario y lo mandará al `state` segun el nombre del input. _(existe los imput name y email)_
````
const handleInputChange = ({ target }) => {
        setFormState({
            ...formState,
            [ target.name ]: target.value
        });
    }
````
* Aqui esta el formulario en html que se renderizará, primero tiene un titulo y luego 2 input con sus propiedades.
* Cada input tiene la función `onChange` que detectará los cambios y su value.
````
    return (
        <>
           <h1>useEffect</h1>
           <hr/>

           <div className='form-group'>
               <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Tu Nombre"
                    autoComplete="off"
                    value={ name }
                    onChange={ handleInputChange }
               />
           </div>

           <div className='form-group'>
               <input
                    type="text"
                    name="email"
                    className="form-control"
                    placeholder="email@gmail.com"
                    autoComplete="off"
                    value={ email }
                    onChange={ handleInputChange }
               />
           </div>

        </>
````
#