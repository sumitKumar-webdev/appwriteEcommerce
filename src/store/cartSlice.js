import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Service from "../Appwrite/Config";

export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
  
        async (userId, {rejectWithValue}) => {
            try {
                const response = await Service.getAllCartProduct(userId);
                return response.documents
            } catch (error) {
                console.log("fetchCart :: cartSlice :: error", error);
                return rejectWithValue(error)
            }

        }
)

//tthere its need a useeffect and an interval so that its  sync itslef after every 10s

//TODO:use it in cart componet and give delay
export const syncCart = createAsyncThunk(
    'cart/syncCart',
    async (_, {getState}) => {
        const { cartItem } = getState().cart
        //FIXME:there check if its providing id in what manner and fix this
        const userId = getState().auth.userData.$id;
        console.log("chech cart slice sync cart",userdata);

        if (!userId || cartItem.length === 0) return;
        await Promise.all(
            cartItem.map((item) =>{
                if (item.$id) {
                    return Service.updateProdouct(item.$id, item)
                }else {
                    return Service.addToCart(userId,item.productId,item.size)
                }
            })
        )
    }
)

export const deleteFromAppwrite = createAsyncThunk(
    'cart/deleteFromAppwrite',
    async(documentId, {rejectWithValue}) =>{
        try {
            await Service.removeFromCart(documentId);
            return documentId 
        } catch (error) {
            console.log("deleteFromAppwrite :: cartSlice :: error", error);
            
            return rejectWithValue(error);
        }

    }
)

export const clearCartFromAppwrite = createAsyncThunk(
    'cart/clearCartFromAppwrite',
    async(userId, {rejectWithValue}) =>{
        try {
            const cartItems = await Service.getAllCartProduct(userId);
            Promise.all(cartItems.documents.map((item)=>{
                Service.removeFromCart(item.$id)
            }))
        } catch (error) {
            console.log("clearCartFromAppwrite :: cartSlice :: error", error);
            
            return rejectWithValue(error);
        }
    }
)

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalAmount: 0,
        totalItem: 0
    },

    reducers:{
        addToCart: (state, action)=>{
            const newItem = action.payload;
            const existingItem = state.items.find(item=>item.id === newItem.id);
            state.totalItem++;
            state.totalAmount += newItem.price;

            if(!existingItem){
                state.items.push({ ...action.payload, quantity: 1});
            }else{
                existingItem.quantity++;
            }
        },
   

    removeFromCart: (state, action)=>{
        const Item = state.items.find(item=>item.id === action.payload.id);
        if (Item) {
            state.items = state.items.filter(item=>item.id != action.payload.id);
            state.totalAmount -= Item.price*Item.quantity;
            state.totalItem -= Item.quantity;
        }
    },

    incQuantity: (state, action)=>{
        const item = state.items.find(item=>item.id === action.payload.id);
       if (item) {
        item.quantity++;
        state.totalAmount += item.price;
        state.totalItem++;
       }
    },

    decQuantity: (state, action)=>{
        const item = state.items.find(item=>item.id === action.payload.id);
       if (item && item.quantity > 1) {
        item.quantity--;
        state.totalAmount -= item.price;
        state.totalItem--;
       }
    },
    
    emptyCart: (state)=>{
        state.items = [];
        state.totalAmount = 0;
        state.totalItem = 0;
    }
 },
 extraReducers: (builder) =>{
    builder
    .addCase(fetchCart.fulfilled, (state,action) =>{
        state.items = action.payload
    })
    .addCase()
    .addCase(deleteFromAppwrite.fulfilled, (state,action)=>{
        state.items = state.items.filter(item=>item.id != action.payload.id);
    })
    .addCase(clearCartFromAppwrite, (state)=>{
        state.items=[];
    });
 }
});

export const {addToCart, removeFromCart, incQuantity, decQuantity, emptyCart} = cartSlice.actions;
export default cartSlice.reducer;