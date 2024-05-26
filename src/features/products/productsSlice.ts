import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { BASE_URL } from '../../components/utils/constants';
import { ICategory } from '../categories/categoriesSlice';

export interface IProduct {
	id: number;
	title: string;
	price: number;
	description: string;
	category: ICategory;
	images: string[];
}

export const getProducts = createAsyncThunk(
	'products/getProducts',
	async () => {
		try {
			const res = await axios<IProduct[]>(`${BASE_URL}/products`);
			return res.data;
		} catch (e) {
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			}
		}
	}
);

export interface IInitialState {
	list?: IProduct[];
	isLoading: boolean;
	filtered?: IProduct[];
	related?: IProduct[];
}

const initialState: IInitialState = {
	list: [],
	isLoading: false,
	filtered: [],
	related: [],
};

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		filterByPrice: (state, action) => {
			state.filtered = state.list?.filter(p => p.price < action.payload);
		},
	},
	extraReducers: builder => {
		builder.addCase(getProducts.pending, state => {
			{
				state.isLoading = true;
			}
		});
		builder.addCase(getProducts.fulfilled, (state, action) => {
			{
				state.list = action.payload;
				state.isLoading = false;
			}
		});
		builder.addCase(getProducts.rejected, state => {
			{
				state.isLoading = false;
			}
		});
	},
});

export default productsSlice.reducer;
export const { filterByPrice } = productsSlice.actions;
