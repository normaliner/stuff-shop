import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { BASE_URL } from '../../components/utils/constants';

export const getCategories = createAsyncThunk(
	'categories/getCategories',
	async () => {
		try {
			const res = await axios<ICategory[]>(`${BASE_URL}/categories`);
			return res.data;
		} catch (e) {
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			}
		}
	}
);

export interface ICategory {
	id: number;
	name: string;
	image: string;
}

 interface IInitialState {
	list?: ICategory[];
	isLoading: boolean;
}

const initialState: IInitialState = {
	list: [],
	isLoading: false,
};

const categoriesSlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(getCategories.pending, state => {
			{
				state.isLoading = true;
			}
		});
		builder.addCase(getCategories.fulfilled, (state, action) => {
			{
				state.list = action.payload;
				state.isLoading = false;
			}
		});
		builder.addCase(getCategories.rejected, state => {
			{
				state.isLoading = false;
			}
		});
	},
});

export default categoriesSlice.reducer;
