import React, { FormEvent } from 'react';
import '../todoList.css';

type TodoType = {
    id: number,
    text: string,
    done : boolean
}

type TodoListType = TodoType[]

const initialState = [
    {id: 1, text: 'node.js 공부하기', done: false},
    {id: 2, text: 'npx create-react-app --template typescript', done: false},
    {id: 3, text: 'React TodoList 만들기', done: false},
]
const TodoList = () => {
    const [todos, setTodos] = React.useState(initialState)
    const inputEl = React.useRef<HTMLInputElement>(null)
    React.useEffect(()=> {

    })
    
    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        setTodos(
            [...todos,{
                id:Math.max(...todos.map(todo => todo.id)) + 1,   // TODO: hard coding
                text: String(inputEl.current?.value),
                done: false
            }
        ]
        )
    }

    const onToggle = (id: number) => () => {
        setTodos(
            todos.map(todo => todo.id === id? {...todo, done : !todo.done} : todo),
        )
    }

    const onRemove = (id: number) => () => {
        setTodos(todos.filter(todo => todo.id !== id))
    }
    return (
        <div>
            
        </div>
    )
}

export default TodoList