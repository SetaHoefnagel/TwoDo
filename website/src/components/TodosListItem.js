import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleCompleteAsync, deleteTodoAsync } from '../redux/todoListSlice';

const TodoListItem = ({ item }) => {
	const dispatch = useDispatch();

	// const handleCheckboxClick = () => {
	// 	dispatch(toggleCompleteAsync({ id, completed: !completed }));
	// };

	// const handleDeleteClick = () => {
	// 	dispatch(deleteTodoAsync({ id }));
	// };

	return (
		<li className={`list-group-item`}>
			<div className='d-flex justify-content-between'>
				<span className='d-flex align-items-center'>
					{item.title}
				</span>
				<button className='btn btn-danger'>
					Delete
				</button>
			</div>
		</li>
	);
};

export default TodoListItem;
