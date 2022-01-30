> __Elemento Anterior 👀:__ __[Gif App ⚛️](https://github.com/Paserno/react-gif-app)__
# Hook App
Uso de diferentes Hooks:
* useState
* CustomHooks - useCounter
* useEffect
* CustomHook - useForm
* CustomHook - useFetch
* useRef
* useLayoutEffect
* Memo
* useMemo
* useCallback
* __[Hook - useReducer](https://github.com/Paserno/react-hooks#hook---usereducer)__

#
Recordar que si se desea ejecutar esta aplicación, deben de reconstruir los módulos de node así:
````
npm install
````
Y luego para hacerla correr.
````
npm start
````
<br>

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
### 4.- UseEffect - Precauciones
Puede existir algunos problemas con el uso de __useEffect__ es necesario el uso de un callback para eliminar un efecto en este ejemplo se verá: 

Se crea los siguientes elementos
* `components/02-useEffect/Message.js`

En `components/02-useEffect/Message.js`
* Importamos el `useEffect` y `useState` de react.
````
import React, { useEffect, useState } from 'react'
````
* Creamos la función y establecimos un __useState__ con las cordenadas.
* Y luego le pasamos las propiedades del __state__ a los objetos `x` e `y`.
````
export const Message = () => {

    const [coords, setCoords] = useState({x: 0, y: 0})
    const { x, y } = coords;
    ...
}
````
* Aqui tenemos el uso del __useEffect__, el cual tenemos una función que toma el evento del mouse, el cual al recibirlo lo almacena en la constante y se lo pasamos al __setCoords__ para modificar su estado.
* Tenemos la creación del evento `mousemove` el cual con la función `mouseMove()` recien mencionada hara el registro de `x` e `y`.
* Despues tenemos el retonrno al __callback__, en el caso de no tenerlo nunca se cerraria el registro del evento y cada vez que es usada la función `Message` se estará acumulando y terminará usando mucha memoria, por esto es necesario hacerle un `removeEventListener`, para que no pase esto y solo se use una vez y que se elimine el evento.
````
useEffect(() => {
        const mouseMove = (e) => {
            const coord = { x: e.x, y: e.y };
            setCoords( coord );
        }
        window.addEventListener('mousemove', mouseMove);

        return () => {
            window.removeEventListener('mousemove', mouseMove );
        }
    }, [])
````
* Finalmente tenemos el retorno de la función `Message` que es el dibujado de un `<h3>` con un parrafo que le pasamos los valores del __state__.
````
return (
        <div>
            <h3>Eres Genial</h3>
            <p>
                x: { x } y: { y }
            </p>
        </div>
    )
````
En `components/02-useEffect/SimpleForm.js`
* Al final del formulario de `SimpleForm` colocamos una condicion, en el caso que `name` _(el primer input)_ tenga los valores `123` se invocará la función `Message` _(no olvidar hacer la importación del componente)_
````
{ (name === '123') && <Message /> }
````
#
### 5.- Formulario con Custom Hooks - useForm
Creamos un Custom Hooks para capturar los eventos que se produzcan en el formulario:

Creamos los siguientes archivos
* FormWithCustomHook en `components/02.useEffect/FormWithCustomHook.js`
* Creamos un nuevo Custom Hook en `hooks/useForm.js`

En `index.js`
* Importamos `FormWithCustomHook` que es el elemento que creamos, que se renderizará.
````
import { FormWithCustomHook } from './components/02-useEffect/FormWithCustomHook';

ReactDOM.render(
  
    <FormWithCustomHook />,
````
En `hooks/useForm.js`
* Realizamos la importación de state.
````
import { useState } from 'react';
````
* Creamos la función exportandola, la que recibirá como paramentro `inicialState` como un objeto vacío.
* Invocamos el __useState__ pasandole el parametro de la función.
* En la función `handleInputChange` le entregamos como parametro el `target`, aqui utilizaremos el `setValues`, para recibir los valores que se almacenarán en el `useState`.
* Finalmente retornamos un arreglo, con el `values` que corresponde al useState y la función `handleInputChange` que realizará los cambios al __useState__.
````
export const useForm = ( inicialState = {} ) => {

    const [values, setValues] = useState(inicialState);

    const handleInputChange = ({ target }) => {

        setValues({
            ...values,
            [ target.name ]: target.value
        });
    }

    return [ values, handleInputChange ];
};
````

En `components/02.useEffect/FormWithCustomHook.js`
* Importamos los elementos que utilizaremos, como el useEffect, el Custom Hook y un elemento de css.
````
import React, { useEffect } from 'react'
import { useForm } from '../../hooks/useForm';
import './effects.css'
````
* Creamos la función `FormWithCustomHook`.
````
export const FormWithCustomHook = () => {...}
````
* Utilizamos el Custom Hook y le pasamos por parametro algunos objetos.
* Y desestructuramos el __useState__ con los objetos que le habiamos pasado. 
````
const [formValues, handleInputChange] = useForm({
        name: '',
        email: '',
        password: ''
    });

    const { name, email, password } = formValues;
````
* Creamos un efecto que escuche los cambios del email. 
````
useEffect( () => {
        console.log('emial cambió');
        
    }, [ email ])
````
* Creamos un evento que cuando se presion un boton en el formulario se envíe por consola los valores del __useState__.
````
const handleSubmit = (e) => {
        e.preventDefault();

        console.log( formValues );   
    }
````
* Finalmente tenemos el retorno del formulario __HTML__, que cuenta con 3 input _(textbox)_ y un boton.
* Le pasamos los valores que corresponde a la desestructuración del __useState__ del __Custom Hook__ y le pasamos la función de la misma.
````
return (
        <form onSubmit={ handleSubmit }>
           <h1>FormWithCustomHook</h1>
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
    <br/>

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
           <br/>
           <div className='form-group'>
               <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="********"
                    value={ password }
                    onChange={ handleInputChange }
               />
               
           </div>
           <br/>

            <button type="submit" className='btn btn-primary'>
                Guardar

            </button>

        </form>
    )
````
#
### 6.- CustomHook - useFetch 
Se realizará un __Custom Hook__ del uso de `fetch` para utilizar una API externa:

Se creara lo siguiente
* `MultipleCustomHooks` en `components/03-examples/MultipleCustomHooks.js` se utilizará el elemento para renderizar los elementos que se mostraran en pantalla.
* `useFetch` en `hooks/useFetch.js` se creará el __Custom Hoook__ para enviar los elementos de la API.

En `index.js`
* Importamos el elemento que utilizaremos para la renderización.
````
import { MultipleCustomHooks } from './components/03-examples/MultipleCustomHooks';

ReactDOM.render(
  
    <MultipleCustomHooks />,
````

En `hooks/useFetch.js` 
* Importamos los elementos que utilizarán como el 
````
import { useState ,useEffect } from 'react';
````
* Creamos la función `useFetch` que recibirá como parametro el `url`.
* Invocamos el __useState__ y los estados iniciales que tendrá sera la `data` en null ya que no se tiene datos, `loading` en true ya que cuando se llame la función se tendra la carga y `error` en null, para manejar los errores.
* Encerramos nuesto metodo `fetch` en un __useEffect__ que se ejecutará cuando la url cambie.
* El fetch lo que hace es recibir el url, y en la promesa trae la respuesta con `.json()`, luego en la segunda promesa teniendo la data llama al __setState__ y cambia el `loading` en false, el `error` en null _(faltaria poner una validación de si viene error o no)_ y finalmente la data.
* Al final de __Custom Hook__ se retornará el `state` del useState.
````
export const useFetch = ( url ) => {
    const [state, setState] = useState({ data:null, loading:true, error:null })

    useEffect(() => {
        fetch( url )
            .then( resp => resp.json() )
            .then( data => {

                setState({
                    loading: false,
                    error: null,
                    data
                })
            });
    }, [url]);
    return state;
};
````

En `components/03-examples/MultipleCustomHooks.js`
* Imporamos algunos elementos como React, el __Custom Hook__ llamado useFetch y un elemento css.
````
import React from 'react';
import { useFetch } from '../../hooks/useFetch';

import '../02-useEffect/effects.css'
````
* Creamos la función.
* Le mandamos al __Custom Hook__ `useFetch` el url de la API.
* Retornamos el `state` con los elementos son retornados en el __useFecth__.
* Finalmente retornamos un `<h1>`.
````
export const MultipleCustomHooks = () => {

    const state = useFetch( `https://www.breakingbadapi.com/api/quotes/1` );
    console.log(state);

    return (
        <div>
            <h1>Custom Hooks!!</h1>
        </div>
    )
};
````
#
### 7.- Uso de CustomHooks useFetch - useCounter
Lo que se hará es mostrar __Citas__ de __BrakingBad__ por pantalla con el autor, ademas de implementar un botón que incrementará, para mostrar la siguiente __Cita__, en ese punto se utilizará el useCouter, que se hizo en el __Punto 2__:

Pasos a seguir
* Modificar `components/03-examples/MultipleCustomHooks.js`, adaptarlo para mostrar las citas y un botón, ya que este será el elemento a rednerizar.
* Modificar el CustomHook `hooks/useCounter.js`.
* Modificar el CustomHook `hooks/useFetch.js`.

En `hooks/useCounter.js`
* Los cambios que se realizaron fue, cambiar el nombre de `state` a `couter` en el __useState__.
* Ademas se quito la propiedad `factor` que se tenia en la función `incement()` y `decrement()`, ademas de cambiarle los valores de las operaciones de `factor` a `1`.
````
export const useCounter = ( initialState = 10, ) => {
    const [counter, setCounter] = useState(initialState)

    const increment = () => {
        setCounter( counter + 1);
    }
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
````
En `hooks/useFetch`
* En el __useEffect__ se le agrego un el `setState` con los valores por defectos antes del metodo `fetch`, esto servirá cuando se utilize el botón para cambiar la __Cita__, para que pueda salir el _"loading..."_.
````
useEffect(() => {
        setState({ data: null, loading: true, error: null});
      
        fetch( url )
            .then( resp => resp.json() )
            .then( data => {

                setState({
                    loading: false,
                    error: null,
                    data
                })
            });
    }, [url]);
````
En `components/03-examples/MultipleCustomHooks.js`
* Se agrega la importación del __CustomHook__ `useCounter`.
````
import React from 'react';
import { useFetch } from '../../hooks/useFetch';
import { useCounter } from '../../hooks/useCounter';

import '../02-useEffect/effects.css';
````
* Se utiliza el __CustomHook__ pasandole la propiedad de `1` y trayendo el estado del __Hook__ con `counter` y la función `increment()` para luego utilizarlos.
* En el __CustomHook__ del `useFetch` se le pasa el url con el estado del __Hook__ que seria el `counter`, adicionalmente se desestructura el `loading` y la `data`.
* Finalmente realizamos una condición de la `data` en el caso que sea __true__ traerá los datos del arreglo en la posición `[0]`, desestructurando el `author` y `quote`, en el caso que sea __null__ el contenido de la `data` no se cumplirá la condición y no pasará nada. _(Se cumple la lógica booleana, en el caso que `data` tenga datos sera __true__)_
````
const { counter, increment } = useCounter(1);

const { loading, data } = useFetch(`https://www.breakingbadapi.com/api/quotes/${ counter }`);
    
const { author, quote } = !!data && data[0];
````
* El return de la función que se renderizará, comienza con un `<h1>` y una operación ternaria si `loading` es `true` se mostrará un `Loading...`, en el caso que sea `false` se motrará la __Cita__ con el __autor__.
* Finalmente un botón que si se le hace clic, se utilizará la función `increment()` del __useCounter__, de esta manera mostrando otra __Cita__.
````
return (
        <div>
            <h1>Breaking Bad Quotes</h1>
            <hr />
        {
            loading
                ?
                    (
                        <div className='alert alert-info text-center'>
                            Loading...
                        </div>
                    )
                :
                    (
                        <blockquote className='blockquote text-end'>
                        <p className='mb-0'> { quote } </p>
                        <p/>
                        <footer className='blockquote-footer'>{ author }</footer>
                        </blockquote>
                    )
        }
            <button 
                className='btn btn-primary'
                onClick={ increment }>
                Siguiente Quote
            </button>
        </div>
    )
````
#
### 8.- Uso basico de useRef
El primer ejemplo del uso de __useRef__, será un auto focus en un input:

Se crea el elemento 
* FocusScreen en `04-useRef/FocusScreen.js`

En `components/04-useRef/FocusScreen.js`
* Se realiza la importación de __React__ y __useRef__.
* Se crea la función `FocusScreen`.
````
import React, { useRef } from 'react';

export const FocusScreen = () => {...}
````    
* Utilizamos el __useRef__, esto lo utilizaremos para dar referencia a un input.
* Creamos la función `handleClick()` y utilizamos el `inputRef.current.` para hacer referencia al elemento y `.select()` para hacer el auto focus y seleccionar el contenido del input. _(esto será equivalente a `document.querySelector()`)_
````
const inputRef = useRef();

const handleClick = () => {
    // document.querySelector('input').select();
    inputRef.current.select();
    console.log(inputRef);
}
````
* Finalmente renderizamos un `<h1>` con un input dando la referenica al __Hook__ `ref={ inputRef }` y un botón que hará el llamado de la función `handleClcik()` que hará el auto focus.
````
return (
        <div>
            <h1>Focus Screen</h1>
            <hr />

            <input 
                ref={ inputRef }
                className='form-control'
                placeholder='Su Nombre'
            />

            <button 
                className='btn btn-outline-primary mt-3'
                onClick={ handleClick }
            >
                Focus
            </button>
        </div>
    )
````
#
### 9.- Caso de uso Real - useRef
Lo utilizamos esta vez el __useRef__ en un uso mas cotidiano, ya que en el anterior punto se utilizaba de una forma menos comun, al menos por la comunidad ya que se puede hacer lo mismo de una manera mas simple sin estar referenciando el __Hook__, esta vez lo utilizaremos en el caso de no tener respuesta de nuestro __CustomHook__ `useFetch`:

Para esto se modificará lo siguiente
* index de la aplicación, haciendo referencia al nuevo componente
* Utilizar el componente `MultipleCustomHooks` en la nueva referencia.
* Adaptar el __useFetch__ con el uso de __useRef__.

En `index.js`
* Hacemos la importación de `RealExampleRef` el nuevo componente que se renderizará.
````
import { RealExampleRef } from './components/04-useRef/RealExampleRef';

ReactDOM.render(
  
    <RealExampleRef />,
````
En `components/04-useRef/RealExampleRef.js`
* Realizamos la importación de __React__, __useState__, el componente que utilizaremos y css.
* Creamos la función `RealExampleRef`.
````
import React, { useState } from 'react';
import { MultipleCustomHooks } from '../03-examples/MultipleCustomHooks';

import '../02-useEffect/effects.css';

export const RealExampleRef = () => {...}
````
* Utilizamos el __useState__, esto para mostrar los elementos html en pantalla.
* Retornamos un `<h1>`, creamos una condición con el componente `<MultipleCustomHooks />` y mostramos un botón.
* En el botón cada vez que se presione se cambiará el estado del __useState__.
````
const [show, setShow] = useState(false);

    return (
        <div>
            <h1> Real Example Ref </h1>
            <hr />
            { show && <MultipleCustomHooks /> }

            <button
                className='btn btn-primary mt-3'
                onClick={ () => {
                    setShow( !show );
                } }
            >
                { 
                show ? 'Hide' : 'Show' 
                 }
            </button>
        </div>
    )
````
En `hooks/useFetch`
* Importamos el __useRef__ en el CustomHook.
````
import { useState, useEffect, useRef } from 'react';
````
* Le agregamos al inicio el __useRef__ y le asignamos una propiedad booleana en true.
````
const isMounted = useRef(true);
````
* Creamos un nuevo __useEffect__ con el retorno de un __callback__ que termine el evento, en este caso es para cambiar el valor booleano del __useRef__ `isMounted.current = false`.
* Le damos un arreglo vacío, para que cada vez qu se llame al __CustomHook__ se ejecute y se cierre cuando se deje de utilizar.
````
 useEffect(() => {
        return () => {
            isMounted.current = false;
        }
    }, []);
````
* Encerramos nuestra segunda promesa del __fetch__ en una condición, en el caso que `isMounted.current` sea __true__ se modificará el __useState__ con los datos que traiga el url, en el caso que sea __false__ no hará nada, pero en este caso le ponemos una impresión por consola para mostrar cuando se cumple la condición.
````
if (isMounted.current) {
        setState({
            loading: false,
        });
            error: null,
            data
} else {
        console.log('setState no se llamó');
    }
````
De esta manera evitamos que cuando apretamos muchas veces el botón de mostrar y ocultar, no salga el error por consola, evitando fugas de memoria con el uso del __useState__ o no llamar el componente si no esta montado en este caso, así se da una protección mayor a nuestra aplicación usando el __useRef__.
#
### 10.- useLayoutEffect
Este __Hook__ es similar al __useEffect__, pero con la diferencia que se dispara al final, cuando el __DOM__ ya se haya manipulado _(reconmendado usarlo para leer el diseño del DOM)_:

Pasos a seguir
* Crear archivo Layout en `components/05-useLayoutEffect/Layout` y copiamos todo el contenido de `componentrs/03-examples/MultipleCustomHooks.js` para luego modificarlo.
* Modificar el index para que renderice el componente.
* Crear el archivo css, para agregar algunas propiedades.

En `index.js`
* Importamos el componente que se utilizará para luego renderizarlo.
````
import { Layout } from './components/05-useLayoutEffect/Layout';

ReactDOM.render(
  
    <Layout />,
````
En `components/05-useLayoutEffect/Layout`
* Eliminamos el `author` ya que no lo utilizaremos.
* Agregamos el __useRef__ para hacer referencia a un parrafo `<p>` y agregamos un __useState__ que registrará el tamaño del Box.
````
const { quote } = !!data && data[0];

const pTag = useRef();
const [boxSize, setBoxSize] = useState({});
````
* Invocamos el `useLayoutEffect` lo que hará es detectar los camibos de las citas `quote` y cuando pase eso registrará el tamaño en el __useState__ con ayuda de la refencia del __useRef__ y con la propiedad de JavaSrcipt `.getBoundingClientRect()`.
````
useLayoutEffect(() => {
    setBoxSize( pTag.current.getBoundingClientRect() );

    }, [quote]);
````
* Se retornará en el componente un `<h1>`, un `<blockquote>` con la __Cita__, un `<pre>` que mostrará los cambios del Box y finalmente un botón que hará el cambio de las citas.
````
 return (
        <div>
            <h1>LayoutEffect</h1>
            <hr />

            <blockquote className='blockquote text-end'>
                <p 
                    className='mb-0'
                    ref={ pTag }
                > {quote} </p>
                <p />
            </blockquote>

            <pre>
                { JSON.stringify( boxSize, null, 3) }
            </pre>

            <button
                className='btn btn-primary'
                onClick={increment}>
                Siguiente Quote
            </button>
        </div>
    )
````
En `components/05-useLayoutEffect/layout.css`
* Con el `display: flex` se podrá ver los camibos del tamaño del Box de las __Citas__.
````
body{
    padding: 70px;
}
.blockquote{
    display: flex;
}
````
#
### 11.- Memo
Este es un metodo de React, lo que hará es memorizar el componente, de esta manera no redibujará el componente siempre, solo cuando la propiedad del componente cambie:

Se hará lo siguiente
* Referenciar el nuevo componente en el `index.js`.
* Crear el componente Memorize en `components/06-memos/Memorize.js`.
* Crear el componente Small en `components/06-memos/Small.js`.

En `index.js`
* Importamos el nuevo componente para ser renderizado.
````
import { Memorize } from './components/06-memos/Memorize';

ReactDOM.render(
  
    <Memorize />,
````
En `components/06-memos/Small.js`
* Se importa React.
````
import React from 'react';
````
* Se crea la función, encerrandola en el metodo de __React memo__ y recibimos un valor en la propiedad. _(En el caso de no usar el metodo memo, se redibujaria siempre el componente si es llamado, en este caso solo cuando la propiedad cambie se disparará)_
* Utilizamos una impresión por consola para mostrar cuando se dispara y el componente que retornará un `<small>`.
````
export const Small = React.memo(({ value }) => {

    console.log('volví a llamar Small');

    return (
        <small> {value} </small>
  )
})
````
En `components/06-memos/Memorize.js`
* Imporamos el __useState__, __CustomHook__ y el componente __Small__.
````
import React, { useState } from 'react';
import { useCounter } from '../../hooks/useCounter';
import { Small } from './Small';

import '../02-useEffect/effects.css';
````
* Creamos el componente `Memorize`.
* Utilizamos el __CustomHook__ `useCounter` y le asignamos un valor, ademas de traer el estado del hook `counter` y su función `increment`.
* Utilizamos el __useState__ que le asignamos un valor true. 
````
export const Memorize = () => {

    const { counter, increment } = useCounter( 10 );
    const [ show, setShow ] = useState(true);
    ...
}
````
* Retornamos en el componente un `<h1>` con el componente __Small__ pasandole el valor de `counter`, un botón de incremento y otro botón que servirá para el ejemplo, para demostrar como actua __React__, en el caso de no usar el metodo __memo__ en el componente __Small__. 
````
return (
        <div>
            <h1>Counter: <Small value={ counter }/></h1>
            <hr />

            <button
                className='btn btn-primary'
                onClick={ increment }
            >
                +1
            </button>

            <button
                className='btn btn-outline-primary ms-2'
                onClick={ () => {
                    setShow( !show );
                }}
            >
                Show/Hide { JSON.stringify( show )}
            </button>
        </div>
    )
````
#
### 12.- UseMemo
Esta vez usaremos el __useMemo__, la diferencia de __React.memo__, radica en que en el primero es un __Hook__  y se puede momorizar una función y su estado, y en el segundo se puede memorizar un componente y que cambiará cuando se cambien sus propiedades:

Pasos a seguir
* Referenciamos el nuevo componente en el `index.js`.
* Creamos el componente __MemoHook__, en `components/06-memos/MemoHook` y copiamos del componente Memorize en `components/06-memos/Memorize.js` para luego adaptarlo.
* Creamos la función `procesoPesado` en `helpers/procesoPesado.js`.

En `index.js`
* Importamos el componente y lo renderizamos.
````
import { MemoHook } from './components/06-memos/MemoHook';


ReactDOM.render(
  
    <MemoHook />,
````
En `helpers/procesoPesado.js`
* Creamos una función basica con un __for__, que será el proceso pesado.
````
export const procesoPesado = ( iteraciones ) => {

    for (let i = 0; i < iteraciones; i++) {
        console.log('Ahí vamos ...');
        
    }
    return `${ iteraciones } iteraciones Realizadas.`
}
````
En `components/06-memos/MemoHook`
* Agegamos la importaciones de useMemo y la función recien creado en `procesoPesado`.
````
import React, { useMemo, useState } from 'react';
import { useCounter } from '../../hooks/useCounter';
import { procesoPesado } from '../../helpers/procesoPesado';

import '../02-useEffect/effects.css';
```` 
* Utilizamos el CustomHook y le asignamos un valor alto, ademas del __useState__ que ya teniamos en el componente `Memorize.js` que es para evaluar el uso de __useMemo__.
* Uitilizamos el __useMemo__ y le agregamos en el __callback del Hook__ la función que importamos `procesoPesado()`, le pasamos el counter y finalmente le pasamos como dependencia el `[ counter ]` en el caso q cambie se memorizará.
````
const { counter, increment } = useCounter( 1000 );
const [ show, setShow ] = useState(true);

const memoProcesoPesado = useMemo(() => procesoPesado(counter), [ counter ]);
````
* En el return del componente tenemos el `<h1>`, `<h3>` con el contador, `<p>` con lo que recibimos en el __useMemo__, ademas de 2 botones uno que incrementa y otro que es para probar el __useMemo__. _(En el caso que no se habría utilizado el useMemo se dispararía con los 2 botones la función, ya que react redibuja los componentes)_
````
 return (
        <div>
            <h1>Memo Hook</h1>
            <h3>Counter: <small>{ counter }</small></h3>
            <hr />

            <p> { memoProcesoPesado } </p>

            <button
                className='btn btn-primary'
                onClick={ increment }
            >
                +1
            </button>

            <button
                className='btn btn-outline-primary ms-2'
                onClick={ () => {
                    setShow( !show );
                }}
            >
                Show/Hide { JSON.stringify( show )}
            </button>
        </div>
    )
````
#
### 13.- useCallback
En este ejemplo se utilizará el __useCallback__ que es muy similar al useMemo ya que almacena en memoria, pero en este caso una fucnión que cambia un estado:

Pasos a seguir:
* Cambiar la referencia en `index.js`.
* Crear archivo `CallbackHooks` en `components/06-memos/CallbackHooks.js`.
* Crear archivo `ShowIncrement` en `components/06-memos/ShowIncrement.js`.

En `index.js`
* Importamos el componente que se utilizará.
````
import { CallbackHook } from './components/06-memos/CallbackHook';

ReactDOM.render(
  
    <CallbackHook />,
````
En `components/06-memos/CallbackHooks.js`
* Importar los elementos de React que se utilizará, el componente `ShowIncrement` y css. 
````
import React, { useCallback, useState } from 'react';
import { ShowIncrement } from './ShowIncrement';

import '../02-useEffect/effects.css';
````
* Creamos el componente `CallbackHook`, con un estado __useState__ y le asignamos un valor.
* Creamos el primer __useCallback__ el cual le recibiremos una propiedad llamada `num` y lo que hacemos es un increment que lo guardaremos en el estado y finalmente le pasamos como dependencia el `setCounter`.
````
export const CallbackHook = () => {

    const [counter, setCounter] = useState( 10 );

    const increment = useCallback((num) => {
        setCounter( c => c + num );
      
    }, [ setCounter ]);
    ...
}
````
* Renderizamos el contador con un `<h1>` y invocamos el componente hijo y le pasamos como parametro la funcion del __useCallback__. _(En el caso que fuera un función normal sin el uso de useCallback que cambia el estado se crearia la funcion nuevamente y se renderizaría nuevamente el componente y obviamente que se pase por paramentro, para evitar esto se utiliza el callback )_
````
return (
        <div>
            <h1>useCallback Hook: { counter }</h1>
            <hr/>

            <ShowIncrement increment={ increment }/>

        </div>
    )
````
En `components/06-memos/ShowIncrement.js`
* Importamos React.
````
import React from 'react';
````
* Creamos el nuevo componente `ShowIncrement` y le agregamos `React.memo` para memorizar el componente y recibimos la propiedad _(función)_ `increment`, agregamos una impresión por consola para ver el ejemplo del uso de __useCallback__.
* Retornamos un botón que hará uso de la función que se pase por los parametros, asignandole un valor a la función.

````
export const ShowIncrement = React.memo(({ increment }) => {
    console.log('Me volví a generar');

    return (
        <div>
            <button
                className='btn btn-primary'
                onClick={ () => {
                    increment(5);
                } }
            >
                Increment
            </button>
        </div>
    )
})
````
#

# Hook - useReducer 
Esta vez se verá un hook en particular el cual es el useReducer, para poder entender el concepto de Reducer y en el futuro conocer Redux

Reducer:
* Es una función sincrona.
* La función debe resolverse de manera interna. _(función pura)_
    * No debe de tener efectos secundarios.
    * No debe tener tareas asíncronas.
    * Debe retornar siempre un estado nuevo.
    * No debe de llamar __localStorage__ o __sessionStorage__ en el reducer _(ya que son efectos secundarios y existe la posibilidad de devuelva un error)_
    * Para modificar el __state__, no debe requerise mas de un acción.
* Debe retornar un nuevo estado.
* Usualmente recibe dos argumentos. _(Un valor inicial y la acción a ejecutar)_

# 
### 1.- Reducer generla
Se mostrará la idea general de un __Reducer__

Primeros pasos
* Cremos el archivo `intro-reducer` en `components/08-useReducer/intro-reducer.js`.
* Hacemos referencia en el `index.js` para ejecutar.

En `index.js`
* Comentamos temporalmente todo el codigo que tenemos en el index, para poder ver el ejemplo que se realizará.
````
import './components/08-useReducer/intro-reducer';
````
En `components/08-useReducer/intro-reducer.js`
* Le damos un valor inicial con un arreglo que tiene un objeto en su interior.
````
const initialState = [{
    id:1,
    todo: 'Comprar PC',
    done: false
}];
````
* Creamos nuestro __Reducer__ que en los atributos le pasamos el estado y la acción.
* Dentro del __Reducer__ agregamos la acción, que le preguntamos si en `action?.type` es igual a una acción que definimos, retornara el estado, con la ejecución de la acción, en este caso es agregar y lo agregamos en el arreglo el nuevo objeto.
* En el caso que no entre en la condición solo se retornará el estado.
````
const todoReducer = ( state = initialState, action ) => {
    
    if ( action?.type === 'agregar'){
        return [ ...state, action.payload ];
    }
    
    return state;
}
````
* Lo guardamos en una variable, en el caso que pongamos una impresión por consola en este punto del `todos`, solo se mostrará el valor inicial de __state__.
````
let todos = todoReducer();
````
* Aqui tenemos el segundo objeto que queremos agregar en el __state__, para esto haremos la ejecución de una acción.
````
const newTodo = {
    id: 2,
    todo: 'Comprar Xbox',
    done: false
}
````
* La acción es un simple objeto literario, el cual necesita un `type` el cual se evaluará en el __Reducer__, ademas se usa como un estandar el `payload`, el cual tendra el contenido.
* En este caso la acción es agregar y con el contenido del objeto litarario de `newTodo`, mostrado anteriormente.
````
const agregarTodoAction = {
    type: 'agregar',
    payload: newTodo
}
````
* Aquí le pasamos el estado anterior y la acción, luego lo imprimimos por consola.
````
todos = todoReducer( todos, agregarTodoAction );

console.log(todos);
````
#
### 2.- useReducer - Todo List
Crearemos la app de un To Do, con el uso de __useReducer__:

Pasos a seguir
* Crear componente __TodoApp__ en `components/08-useReducer/TodoApp.js`.
* Crear función __todoReducer__ en `components/08-useReducer/todoReducer.js`.
* Referencia en el `index.js` para renderizar el nuevo componente.

En `index.js`
* Realizamos la importación y renderizamos el componente.
````
import { TodoApp } from './components/08-useReducer/TodoApp';

ReactDOM.render(
    <TodoApp />,

  document.getElementById('root')
);
````
En `components/08-useReducer/todoReducer.js`
* Creamos la función del __Reducer__, el cual tiene como atributo el state con un arrelgo vacío y una acción.
* Agregamos un __switch__ donde estarán las acciones, y agregamos el resultado por default que retornará el estado.
````
export const todoReducer = ( state = [], action ) => {
    switch ( action.type ) {
        // case 'add':
            
        //     break;
    
        default:
            return state;
    }
}
````
En `components/08-useReducer/TodoApp.js`
* Importamos __useReducer__, la función del Reducer y estilos CSS.
````
import React, { useReducer } from 'react';
import { todoReducer } from './todoReducer';

import './styles.css'; 
````
* Antes de crear el componente inicializamos un estado, con id, descripción y done.
````
const initialState = [{
  id: new Date().getTime(),
  desc: 'Aprender React',
  done: false
}];
````
* Creamos la función con un __useReducer__ simple.
* En nuestro __useReducer__, le enviamos la función __Reducer__ y el estado inicial, para luego imprimir por consola el contenido, este imprime el estado inicial.
* Finalmente agregamos un return del componente que cuenta con un `<h1>` y una lista desordenada `<ul>`.
````
export const TodoApp = () => {
  const [ todos ] = useReducer(todoReducer, initialState);

  console.log(todos);

  return (
  <div>
      <h1>Todo App</h1>
      <hr/>

    <ul>
      <li>Hola</li>
      <li>Mundo</li>
      <li>Hola de nuevo</li>
    </ul>
  </div>
  )
};
````
#
### 3.- Crear cascaron en Todo list
Agregamos contenido HTML en nuestro componente con clases de boostrap para darle forma a lo que se mostrará en el Todo list:

Pasos a seguir
* Agregar contenido al return del componente __TodoApp__ en `components/08-useReducer/TodoApp.js`
* Agregar CSS en  `components/08-useReducer/styles.css`

En `components/08-useReducer/styles.css`
* Le agregamos un padding al body.
* En el parrafo del componente le cambiamos el cursor y le eliminamos el margin.
* En la clase `list-group-item` le agregamos algunas propiedades de flexbox para mostrar la lista de los TODOs.
* Agregamos una clase para las tareas ya terminadas.
````
body{
    padding: 50px;
}
p{
    cursor: pointer;
    margin: 0px;
}
.list-group-item{
    align-items: center;
    display: flex;
    justify-content: space-between;
}
.complete{
    text-decoration: line-through;
}
````
En `components/08-useReducer/TodoApp.js`
* En el return del componente agregamos un numero total de Todos.
````
      <h1>Todo App ( {todos.length} )</h1>
      <hr />
````
* Encerramos los 2 div principales en un div con la clase `row` de boostrap, el div con la clase `col-7` tendra el listado y el `col-5` tendra el formulario para agregar mas.
* En la lista desordenada, se tendran los diferentes TODOs, para esto se creo un `.map()`, que tendra los resultados con la `desc` y un botón.
````
<div className='col-7'>
    <ul className='list-group list-group-flush'>
    {
        todos.map((todo, i) => (
        <li
            key={todo.id}
            className='list-group-item'
        >
            <p className='text-center '> {i + 1}. {todo.desc} </p>
            <button
            className='btn btn-danger'
            >
            Borrar
            </button>
        </li>
        ))
    }
    </ul>
</div>
````
*  En este punto tenemos un formulario para agregar nuevos TODOs, con una caja de texto y un botón.
````
<div className='col-5'>
    <h4>Agregar TODO</h4>
    <hr />

    <form>
    <input 
        type='text'
        name='description'
        className='form-control'
        placeholder='Aprender ...'
        autoComplete='off'
    />

    <div className="d-grid gap-2">
    <button
        className='btn btn-outline-primary mt-1 btn-block'
    >
        Agregar
    </button>
    </div>
    </form>
</div>
````
#
### 4.- Agregar un nuevo TODO
En este punto haremos el evento que haga la accion de agregar un nuevo TODO con ayuda de __useReducer__:

Pasos a seguir
* Agregar la opción de agregar en la función reducer.
* Crear el evento en el componente.

En `components/08-useReducer/todoReducer.js`
* Agregamos la opción en el __switch__ de la función, y retornamos un arreglo, usando el operador spread y el payload.
````
case 'add':
return [ ...state, action.payload];
````
En `components/08-useReducer/TodoApp.js`
* Agregamos el `dispatch` en el __useReducer__.
````
const [todos, dispatch] = useReducer(todoReducer, initialState);
````
* Agregamos el nuevo evento, usando `.preventDefault()` para no recargar la página.
* Creamos el nuevo Todo y la acción de agregar.
* Finalmente agregamos la función __dispatch__ y le mandamos la acción.
````
const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      desc: 'Nueva Tarea',
      done: false
    };

    const action = {
      type: 'add',
      payload: newTodo
    }
    dispatch( action );
  }
````
* Agregamos el evento en el formulario y el `type` en el botón.
````
<form onSubmit={ handleSubmit }>
    ...
    <button
        type='submit'
        className='btn btn-outline-primary mt-1 btn-block'
    >
        Agregar
    </button>
</form>
````
#
### 5.- Guardar TODOs en LocalStorage
En este punto ya tenemos la caja de texto para utilizar, pero esta vez haremos uso del __CustomHook__ `useForm` para recibir el contenido del input para luego guardarlo en el `localStorage`:

Pasos a seguir
* Modificar el CustomHook en `hooks/useForm.js`
* Adaptar el uso del localStorage en __TodoApp__.

En `hooks/useForm.js`
* En el __Hook__ le agregamos una función adicional, para que limpie el input cuando se haya utilizado.
* No olvidar retornar la nueva función del __CustomHook__.
````
const reset = () => {
        setValues( inicialState );
    }
````
En `components/08-useReducer/TodoApp.js`
* En las importaciones agregamos el __useEffect__ y el CustomHook __useForm__.
````
import React, { useEffect, useReducer } from 'react';
import { todoReducer } from './todoReducer';
import { useForm } from '../../hooks/useForm';

import './styles.css';
````
* Eliminamos el __initialState__ para dejar el __init__ que seria el estado inicial del __useReducer__, en este caso todo lo que esta con comentario _(//)_ era el estado inicial.
* Pero ya que usaremos el __localStorage__, tenemos que sacar el contenido de ahí y para eso es necesario convertirlo a un objeto el contenido que esta en el localStorage usando `JSON.parse`, obteniendolo con el `.getItem()` en el caso que no se tenga nada en el __localStorage__ se mandará un arreglo vacío.
````
const init = () => {

  return JSON.parse(localStorage.getItem('todos')) || [];
  // return [{
  //   id: new Date().getTime(),
  //   desc: 'Aprender React',
  //   done: false
  // }];
}
````
* Ahora dentro del componente __TodoApp__, modificamos el __useReducer__, agregandole el __dispatch__, que seria el disparador de la acción, ademas de el __initialState__ ahora es un arreglo vacío y le agregamos finalmente un tercer argumento que será la función __init__.
* Utilizamos el CustomHook __useForm__, recibiendo todas sus funciónes y el estado `{description}`, ademas mandando el initialState del __useForm__ como `description` vacío.
* Luego tenemos el __useEffect__ que cada vez que se reciba un cambio en el `todos` lo registrará en el __localStorage__ con `.setItem()`.
````
const [todos, dispatch] = useReducer(todoReducer, [], init);

  const [ { description }, handleInputChange, reset ] = useForm({
    description: ''
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify( todos ))
  }, [todos]);
````
* En el evento `handleSubmit` le agregamos una condición, en el caso que se mande un caracter menor o igual a 1 se retornará.
* En el __newTodo__ le enviamos el contenido que tendra `description`. _(value del input)_
* Agregamos el __dispatch__ con la acción y finalmente utilizamos la función del CustomHook que es limpiar el input.
````
const handleSubmit = (e) => {
    e.preventDefault();
    if ( description.trim().length <= 1){
      return;
    }

    const newTodo = {
      id: new Date().getTime(),
      desc: description,
      done: false
    };

    const action = {
      type: 'add',
      payload: newTodo
    }
    dispatch( action );
    reset();
  }
````
* En el input le agregamos el __value__ con `description` y __onChange__ con el evento del CustomHook `handleInputChange`.
````
 <input 
    type='text'
    name='description'
    className='form-control'
    placeholder='Aprender ...'
    autoComplete='off'
    value={ description }
    onChange={ handleInputChange }
/>
````
#
### 6.- Borrar un TODO
En este punto creamos en la función del __Reducer__ una opción mas, para luego crear el evento en el componente para que borre el TODO del __useReducer__:

Pasos a seguir
* Agregar un case al switch de la función `todoReducer`.
* Agregar el evento al botón borrar y crear la función del evento en el componente __TodoApp__.

En `hooks/todoReducer.js`
* Agregamos el nuevo `case` de eliminar, usando el `.filter` lo que hará es regresar un nuevo arreglo, en esta caso devolverá todo menos el `action.payload` que seria el elemento a eliminar.
````
case 'delete':
    return state.filter( todo => todo.id !== action.payload );
````
En `components/08-useReducer/TodoApp.js`
* Creamos el evento que hará la eliminación recibiendo en sus parametros el `todoId`.
* Creamos la acción con su `type` y mandandole la id en el payload.
* Finalmente disparamos la acción hacia el useReducer, esto lo que hará es recibir un nuevo estado y tambien lo detectará el __useEffect__, lo que hará eliminar el registro en el __localStorage__.
````
const handleDelete = ( todoId ) => {

    const action = {
      type: 'delete',
      payload: todoId
    }

    dispatch( action );
  }
````
* En el botón del `.map()` que servirá para la eliminación, agregamos el evento __onClick__, como necesitamos un argumento, le agregamos una función de flecha y agregamos el evento `handleDelete` con su argumento `todo.id`.
````
<button
    className='btn btn-danger'
    onClick={ () => handleDelete(todo.id) }
>
````
#
### 7.- Marcar como Completado o Pendiente un TODO
Esta vez agregaremos una nueva `case` en el __switch__ de la función del __Reducer__, para luego crear el evento en __TodoApp__:

Pasos a seguir
* Crear `case` en `todoReducer.js`
* Crear evento que dispare la acción nueva y agregar evento al parrafo del __TodoApp__.

En `hooks/todoReducer.js`
* Creamos el nuevo `case` en el __switch__, retornamos un `.map` y utilizamos el __operador ternario__ con la condición de que si el id del todo es igual al payload entra en la condición, cambiando el `done`. _(realizando un return implecito)_
````
case 'toggle':
    return state.map( todo => 
        ( todo.id === action.payload )
            ? { ...todo, done: !todo.done }
            : todo
        )
````
En `components/08-useReducer/TodoApp.js`
* Creamos el nuevo evento `handleToggle` recibiendo como argumento `todoId`, agregando la acción en el __dispatch__.
````
const handleToggle = ( todoId ) => {
    
    dispatch({
      type: 'toggle',
      payload: todoId
    })
  }
````
* Agregando en el parrafo `<p>` del `.map()` una condición, en el caso que `todo.done` sea __true__ agregar la clase `complete` que subraya el texto.
* Ademas le agregamos el evento __onClick__, ya que recibiremos un argumento `todo.id`, necesitamos agregar una función de flecha que dispare el evento `handleToggle`.
````
<p
    className={ `${ todo.done && 'complete' }` }
    onClick={ () => handleToggle( todo.id )}
>
{i + 1}. {todo.desc} </p>
````
De esta manera logramos realizar el clic en el parrafo y cambia de estado el `done`, en el caso que este en true se subraya. _(simulando que se completo la tarea en el TODO)_
#
### 8.- Optimización del código
Para que sea facil de leer el componente principal __TodoApp__, se separará en diferentes componentes faciles de leer, de esta manera se tiene el código mas optimizado y limpio:

Pasos a seguir
* Optimizar __TodoApp__, analizando y extrayendo parte del contenido HTML y sus funciones.
* Crear Componente __TodoList__ en `components/08-useReducer/TodoList.js` para invocar el listado de los TODOs.
* Crear Componente __TodoListItem__ en `components/08-useReducer/TodoListItem.js` para invocar cada item de los TODOs.
* Crear Componente __TodoAdd__ en `components/08-useReducer/TodoAdd.js` para invocar el formulario para agregar un nuevo TODO.

En `components/08-useReducer/TodoListItem.js`
* Importamos React.
* Creamos el componente __TodoListItem__ el cual necesitará diferentes propiedades como `todo` que viene del `.map()` del componente __TodoList__, `index`, `handleDelete` corresponde al evento de eliminar y `handleToggle` para subrayar.
* Finalmente extraemos el contenido interior del `.map()` que estaba en __TodoApp__, para retornarlo en este nuevo componente hijo llamado __TodoListItem__.
````
import React from 'react';

export const TodoListItem = ({ todo, index, handleDelete, handleToggle }) => {
    return (
        <li
            key={todo.id}
            className='list-group-item'
        >
            <p
                className={`${todo.done && 'complete'}`}
                onClick={() => handleToggle(todo.id)}
            >
                {index + 1}. {todo.desc} </p>
            <button
                className='btn btn-danger'
                onClick={() => handleDelete(todo.id)}
            >
                Borrar
            </button>
        </li>
    )
};
````
En `components/08-useReducer/TodoList.js`
* Realizamos la importación de React y el componente __TodoListItem__.
````
import React from 'react';
import { TodoListItem } from './TodoListItem';
````
* Creamos el componente __TodoList__, el cual necesita algunos parametros como `todos`, `handleDelete` y `handleToggle`.
* Extraemos el `<ul>` del componente padre __TodoApp__.
* En el `.map()` agregamos el componente __TodoListItem__, le pasamos el `key` ya que es solicitado para su identificación, `todo` del `.map()`, `index`, la función `handleDelete` y `handleToggle` que esta en el componente padre __TodoApp__.
````
export const TodoList = ({ todos, handleDelete, handleToggle }) => {
    return (
        <ul className='list-group list-group-flush'>
            {
                todos.map((todo, i) => (
                    
                    <TodoListItem 
                        key={ todo.id }
                        todo={ todo }
                        index={ i }
                        handleDelete={ handleDelete }
                        handleToggle={ handleToggle }
                    />
                ))
            }
        </ul>
    )
};
````
En `components/08-useReducer/TodoAdd.js`
* Realizamos la importación de React y del CustomHook __useForm__.
````
import React from 'react';
import { useForm } from '../../hooks/useForm';
````
* Creamos el componente __TodoAdd__ y necesita un parametro `handleAddTodo` que será la función creada en el componente padre __TodoApp__.
* Extraemos el __useForm__ del componente padre __TodoApp__.
````
export const TodoAdd = ({ handleAddTodo }) => {

    const [{ description }, handleInputChange, reset] = useForm({
        description: ''
    });
    ...
}
````
* Extreames el `handleSubmit` del componente padre __TodoApp__.
* Le eliminamos la acción y el dispatch, para replazarle por `handleAddTodo()` enviandole el `newTodo`. _(El dispatch se encontrará en el componente padre, en su nueva función `handleAddTodo`)_ 
````
const handleSubmit = (e) => {
        e.preventDefault();

        if ( description.trim().length <= 1){
            return;
          }

          const newTodo = {
            id: new Date().getTime(),
            desc: description,
            done: false
          };

          handleAddTodo( newTodo );
          reset();
    }
````
* Finalmente extraemos el formulario con el `<h4>` del componente padre __TodoApp__.
````
return (
    <>
        <h4>Agregar TODO</h4>
        <hr />

        <form onSubmit={handleSubmit}>

            <input
                type='text'
                name='description'
                className='form-control'
                placeholder='Aprender ...'
                autoComplete='off'
                value={description}
                onChange={handleInputChange}
            />

            <div className="d-grid gap-2">
                <button
                    type='submit'
                    className='btn btn-outline-primary mt-1 btn-block'
                >
                    Agregar
                </button>
            </div>
        </form>
    </>
    )
````
En `components/08-useReducer/TodoApp.js`
* Eliminamos el CustomHook __useForm__ en las importaciones y agregamos dos nuevas importaciones de los 2 componentes nuevos __TodoList__ y __TodoAdd__.
````
import React, { useEffect, useReducer } from 'react';
import { todoReducer } from './todoReducer';
import { TodoList } from './TodoList';
import { TodoAdd } from './TodoAdd';

import './styles.css';
````
* Agregamos la nueva función `handleAddTodo` que le pasamos por parametro el `newTodo` para activar el __dispatch__ con su acción.
````
const handleAddTodo = ( newTodo ) => {

    dispatch({
      type: 'add',
      payload: newTodo
    })
  }
````
* El return ahora es mas limpio, agregamos los dos nuevos componentes con sus propiedades.
* Componente __TodoList__ necesitando `todos`, las funciones `handleDelete` y `handleToggle`.
* Componente __TodoAdd__ necesitando la nueva función `handleAddTodo`.
````
return (
    <div>
      <h1>Todo App ( {todos.length} )</h1>
      <hr />

      <div className='row'>
        <div className='col-7'>

          <TodoList 
            todos={ todos }
            handleDelete={ handleDelete }
            handleToggle={ handleToggle }
          />

        </div>

        <div className='col-5'>

          <TodoAdd
            handleAddTodo={ handleAddTodo }
          />

        </div>
      </div>
    </div>
  )
````
De esta manera el código se encuentra mas modularizado y limpio, para una facil lectura y funcionando de la misma forma.
#

# Hook - useContext
En esta oportunidad veremos un Hook llamado __useContext__, ademas de un pequeño uso de __React Router__.

* En el ejemplo anterior del __useReducer__ contabamos con 3 componentes, el componente padre __TodoApp__ contiene un componente hijo que era el __TodoList__ y así mismo en su interior estaba el __TodoListItem__, el que el padre tenia dos funciones llamadas `handleDelete` y `handleToggle`, el cual el contenedor hijo __TodoList__ no usaba, pero si el contenedor "nieto" __TodoListItem__, para que sea usado tenia que pasar por __TodoList__ para llegar al contenedor "menor".
* En esta situación se usará __Context__, para un caso diferente, de dos componentes que no tengan relación de herencia, pero que se necesite pasar información de un lugar a otro, aquí tendremos el uso de este elemento. 

Se utilizo el siguiente elemento.

* __[React Router](https://reactrouter.com/docs/en/v6/getting-started/overview)__

#
### 1.- Preparar Rutas 
Creamos la base de cada componente que utilizaremos en este ejercicio:

Pasos a seguir
* Crear __MainApp__ en `components/09-useContext/MainApp.js`.
* Crear __HomeScreen__ en `components/09-useContext/HomeScreen.js`.
* Crear __LoginScreen__ en `components/09-useContext/LoginScreen.js`.
* Crear __AboutScreen__ en `components/09-useContext/AboutScreen.js`.

En `components/09-useContext/MainApp.js`
* Utilizamos el snippet `rafc` para crear el componente y agregamos algunos elementos como un `<h1>`, así mismo para los otros 3 nuevos componentes que se creearon.
````
import React from 'react';

export const MainApp = () => {
  return (
    <div>
        <h1>MainApp</h1>
        <hr/>
    </div>
)
};
````
En `index.js`
* Importamos __MainApp__ y lo renderizamos.
````
import { MainApp } from './components/09-useContext/MainApp';

ReactDOM.render(
  
    <MainApp />,

  document.getElementById('root')
);
````
#
### 2.- Configuración Router en React
En este punto se instala __React Router__ para su uso, y se crea un archivo para dejar la configuración:

Pasos a seguir
* Crear AppRouter.js en `components/09-useContext/AppRouter.js` para la configuración de este.
* Modificar el MainApp.

En `components/09-useContext/AppRouter.js`
* Realizar la importación de React y la necesaria para utilizar Router, como `BrowserRouter`, `Routes` _(antes Switch)_ y `Route`.
* Luego importamos los componentes que se utilizarán.
````
import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
  } from 'react-router-dom';
import { AboutScreen } from './AboutScreen';
import { HomeScreen } from './HomeScreen';
import { LoginScreen } from './LoginScreen';
````
* Creamos el componente __AppRouter__ y Retornamos los elementos que utilizaremos con ayuda de React Router, para su uso.
* Definimos los `path` y `element` que se utilizará para mostrar el componente.
````
export const AppRouter = () => {
  return  (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={ <HomeScreen /> }/>
          <Route path="/about" element={ <AboutScreen /> }/>
          <Route path="/login" element={ <LoginScreen /> }/>
            
        </Routes>
      </div>
    </Router>
  );
};
````
En `components/09-useContext/MainApp.js`
* Importamos el componente __AppRouter__ y lo retornamos para su uso. 
````
import React from 'react';
import { AppRouter } from './AppRouter';

export const MainApp = () => {
  return (
        <AppRouter />
)
};
````
#