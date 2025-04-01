import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Service from '../Appwrite/Config';

const fetchProduct = createAsyncThunk(
    'product/fetchProduct',
    async (productId, {rejectWithValue})=>{
        try {
             const response = await Service.getProduct(productId)
             
             return response;
        } catch (error) {
            console.log("fetchProduct :: productSlice :: error", error);
            return rejectWithValue(error);
        }
    }
)


const productSlice = createSlice({
    name: 'product',
    initialState: {
        product: null,
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(fetchProduct.pending, (state)=>{
            state.status = 'loading';
        })
        builder.addCase(fetchProduct.fulfilled, (state, action)=>{
            state.status = 'succeeded';
            state.product = action.payload;
        })
        builder.addCase(fetchProduct.rejected, (state, action)=>{
            state.status = 'failed';
            state.error = action.error;
        })

    }
})
export { fetchProduct};
export default productSlice.reducer;