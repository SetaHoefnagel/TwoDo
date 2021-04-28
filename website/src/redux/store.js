import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import todoListReducer from './todoListSlice';

export default configureStore({
	reducer: {
		todos: todoReducer,
		todoLists: todoListReducer,
	},
});
