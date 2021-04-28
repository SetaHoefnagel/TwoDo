import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';
import ToDoOverview from './ToDoOverview';
// import TotalCompleteItems from './TotalCompleteItems';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
  } from "react-router-dom";
import CreateTodo from './CreateTodo';


export default () => (
    <div className='container  p-4'>
        <div className='card m-4'>
            <div className='card-header'>
                <h1>TwoDo - Sharing lists made easy</h1>
            </div>
            <div className='card-body'>
                <Switch>
                    <Route exact path="/todos/create/">
                        <CreateTodo />
                    </Route>

                    <Route exact path='/'>
                        <ToDoOverview/>
                    </Route>
                    <Route>
                        404
                    </Route>
                </Switch>
                
            </div>
        </div>
    </div>
)
