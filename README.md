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