import { Todo } from "../todos/models/todo.models";

export const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending',
};

const state = {
    todos: [
        new Todo('Gema del alma'),
        new Todo('Gema del infinito'),
        new Todo('Gema del tiempo'),
        new Todo('Gema del poder'),
        new Todo('Gema de la realidad'),
    ],
    filter: Filters.All,
}

const initStore = () => {
    loadStorage();
    console.log(state);
    console.log('Init Store')
}

const loadStore = () => {
    throw new Error('Not implemented')
}

const saveStateToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state));
}

const loadStorage = () => {
    const localState= localStorage.getItem('state');
    if (!localState) return;
    const {todos = [], filter = Filters.All} = JSON.parse(localState);
    state.todos = todos;
    state.filter = filter;
}

/**
 * 
 * @param {String} filter 
 */
const getTodos = (filter = Filters.All) => {
    switch (filter) {
        case Filters.All:
            return [...state.todos];
        case Filters.Completed:
            return state.todos.filter(todo => todo.done)
        case Filters.Pending:
            return state.todos.filter(todo => !todo.done)
        default:
            throw new Error(`Option ${filter} is not valid.`)
    }
}

/**
 * 
 * @param {String} description 
 */
const addTodo = (description) => {
    if (!description) throw new Error('Description is required.')
    state.todos.push(new Todo(description));
    saveStateToLocalStorage();
}

/**
 * 
 * @param {import("uuid").UUIDTypes} todoId 
 */
const toggleTodo = (todoId) => {
    state.todos = state.todos.map(todo => {
        if (todo.id === todoId) todo.done = !todo.done;
        saveStateToLocalStorage();
        return todo;
    });
}

/**
 * 
 * @param {import("uuid").UUIDTypes} todoId 
 */
const deleteTodo = (todoId) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId);
    saveStateToLocalStorage();
}

const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done);
    saveStateToLocalStorage();
}

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = (newFilter = Filters.All) => {
    state.filter = newFilter;
    saveStateToLocalStorage();
}

const getCurrentFilter = () => state.filter;

export default {
    initStore,
    loadStore,
    getTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    deleteCompleted,
    setFilter,
    getCurrentFilter,
}