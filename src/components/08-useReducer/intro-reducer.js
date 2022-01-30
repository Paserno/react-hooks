

const initialState = [{
    id:1,
    todo: 'Comprar PC',
    done: false
}];

const todoReducer = ( state = initialState, action ) => {
    
    if ( action?.type === 'agregar'){
        return [ ...state, action.payload ];
    }
    
    return state;
}

let todos = todoReducer();

//! no usar .push() (muta el objeto)

const newTodo = {
    id: 2,
    todo: 'Comprar Xbox',
    done: false
}

//? La acción es un simple objeto literario que es necesario mandar el type.
//! payload estandar nombre
const agregarTodoAction = {
    type: 'agregar',
    payload: newTodo
}

todos = todoReducer( todos, agregarTodoAction );



console.log(todos);