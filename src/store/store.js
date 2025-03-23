import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import productSlice from './productSlice';
import cartSlice from './cartSlice'


export const store = configureStore({
    reducer:{
       auth: authSlice,
       product: productSlice,
       cart: cartSlice

    }
})
