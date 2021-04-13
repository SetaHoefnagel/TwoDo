import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';
import TotalCompleteItems from './TotalCompleteItems';


export default () => (
    <div className='container bg-white p-4 mt-5'>
        <h1>TwoDo - Sharing lists made easy</h1>
        <AddTodoForm />
        <TodoList />
        <TotalCompleteItems />
    </div>
)
