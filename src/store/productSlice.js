import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Service from '../Appwrite/Config';

const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (category, {rejectWithValue})=>{
        try {
             const response = await Service.getAllProducts(category);
             return response.documents;
        } catch (error) {
            console.log("fetchProducts :: productSlice :: error", error);
            return rejectWithValue(error);
        }
    }
)

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        status: 'idle',
        error: ''
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(fetchProducts.pending, (state)=>{
            state.status = 'loading';
        })
        builder.addCase(fetchProducts.fulfilled, (state, action)=>{
            state.status = 'succeeded';
            state.products = action.payload;
        })
        builder.addCase(fetchProducts.rejected, (state, action)=>{
            state.status = 'failed';
            state.error = action.error.message;
        })

    }
})

export default productSlice.reducer;