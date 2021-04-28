import TodosList from './TodosList'
import { Link } from "react-router-dom";

export default () => (
    <>
        <h2>Todo list overview</h2>
        <hr/>
        <button className='btn btn-success'><Link to='/todos/create/'>Add new TodoList</Link></button>
        {/* <AddTodoForm /> */}
        <TodosList />
        {/* <TotalCompleteItems /> */}  
    </>
)
