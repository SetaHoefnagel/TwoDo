import React, { useEffect } from 'react';
import TodoListItem from './TodosListItem';
import { useSelector, useDispatch } from 'react-redux';
import { getTodosAsync } from '../redux/todoListSlice';

export default () => {
	// const dispatch = useDispatch();
	// let todos = useSelector((state) => state.todoLists);
	const todos = {todoLists: []};
	console.log(todos);

	// useEffect(() => {
	// 	dispatch(getTodosAsync());
	// }, [dispatch]);

	return (
		<ul className='list-group'>
			{todos.todoLists.map((todo) => (
				<TodoListItem item={todo} />
			))}
		</ul>
	);
};
