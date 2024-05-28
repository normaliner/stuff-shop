import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { BASE_URL } from '../../components/utils/constants';
import { IProduct } from '../products/productsSlice';

export interface IUser {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
}

export interface ICart extends IProduct {
  quantity: number;
}

export interface IFavourites extends IProduct {
  favourites: number;
}

interface IInitialState {
  currentUser: IUser | null;
  isLoading: boolean;
  cart: ICart[];
  favourites: IFavourites[];
  formType: string;
  showForm: boolean;
}

export const createUser = createAsyncThunk(
  'users/createUser',
  async (userData: {
    name: string;
    email: string;
    password: string;
    avatar: string;
  }) => {
    try {
      const res = await axios.post(`${BASE_URL}/users`, userData);
      return res.data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  }
);

export interface ILogin {
  access_token: string;
  refresh_token: string;
}

export const loginUser = createAsyncThunk(
  'users/loginUser',
  async (userData: { email: string; password: string }) => {
    try {
      const res = await axios.post<ILogin>(`${BASE_URL}/auth/login`, userData);
      const login = await axios(`${BASE_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${res.data.access_token}` },
      });
      return login.data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (payload: IUser) => {
    try {
      const res = await axios.put(`${BASE_URL}/users/${payload.id}`, payload);
      return res.data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  }
);

const addCurrentUser = (state: IInitialState, action: PayloadAction<IUser>) => {
  {
    if (action.payload) {
      state.currentUser = action.payload;
    }
  }
};

const initialState: IInitialState = {
  currentUser: null,
  isLoading: false,
  cart: [],
  favourites: [],
  formType: 'signup',
  showForm: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<IProduct>) => {
      let newCart = [...state.cart];
      const found = state.cart?.find(c => c.id === action.payload.id);
      if (found) {
        newCart = newCart.map(item => {
          return item.id === action.payload.id
            ? {
                ...item,
                quantity: action.payload.quantity || item.quantity + 1,
                // eslint-disable-next-line no-mixed-spaces-and-tabs
              }
            : item;
        });
      } else {
        newCart.push({ ...action.payload, quantity: 1 });
      }
      state.cart = newCart;
    },
    toggleForm: (state, action) => {
      state.showForm = action.payload;
    },
    toggleFormType: (state, action) => {
      state.formType = action.payload;
    },
    removeItemFromCart: (state, action) => {
      state.cart = state.cart.filter(c => c.id !== action.payload.id);
    },
    addItemToFav: (state, action: PayloadAction<IProduct>) => {
      let newFavs = [...state.favourites];
      const found = state.favourites?.find(c => c.id === action.payload.id);
      if (found) {
        newFavs = newFavs.map(item => {
          return item.id === action.payload.id
            ? {
                ...item,
                favourites: action.payload.favourites || item.favourites + 1,
                // eslint-disable-next-line no-mixed-spaces-and-tabs
              }
            : item;
        });
      } else {
        newFavs.push({ ...action.payload, favourites: 1 });
      }
      state.favourites = newFavs;
    },
    removeItemFromFav: (state, action) => {
      state.favourites = state.favourites.filter(f => f.id !== action.payload.id);
    },
    addItemsToCart: (state, action: PayloadAction<IFavourites[]>) => {
      action.payload.forEach(favItem => {
        const found = state.cart.find(item => item.id === favItem.id);
        if (found) {
          found.quantity += favItem.favourites;
        } else {
          state.cart.push({ ...favItem, quantity: favItem.favourites });
        }
      });
      state.favourites = state.favourites.filter(
        favItem => !action.payload.find(item => item.id === favItem.id)
      );
    },
  },
  extraReducers: builder => {
    builder.addCase(createUser.fulfilled, addCurrentUser);
    builder.addCase(loginUser.fulfilled, addCurrentUser);
    builder.addCase(updateUser.fulfilled, addCurrentUser);
  },
});

export const {
  addItemToCart,
  toggleForm,
  toggleFormType,
  removeItemFromCart,
  addItemToFav,
  removeItemFromFav,
  addItemsToCart,
} = userSlice.actions;
export default userSlice.reducer;
