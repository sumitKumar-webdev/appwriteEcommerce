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
        const { items } = getState().cart
        const userId = getState().auth.userData.$id;
        if (!userId || items.length === 0) return;
        await Promise.all(
            items.map(async(item) =>{    
                if (item.$id) {
                    const updatingItem = {
                        documentId: item.$id,
                        user_id : userId,
                        product_id: item.product_id,
                        price: item.price,
                        quantity: item.quantity,
                        size: item.size,
                        color: item.color
                    }
                    return Service.updateProduct(updatingItem)
                    
                }else {
                    console.log('Adding to cart ');
                    const itemdetails = {
                        user_id : userId,
                        product_id: item.product_id,
                        price: item.price,
                        quantity: item.quantity,
                        size: item.size,
                        color: item.color
                    }
                    const addedItem = await Service.addToCart(itemdetails);
                    return addedItem
                    
                    
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
            return documentId;
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
            return [];
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
        checkoutItems: [],
        totalAmount: 0,
        totalItem: 0
    },

    reducers:{

        addToCart: (state, action)=>{
            const newItem = action.payload;
            const existingItem = state.items.find(item=>( item.product_id === newItem.product_id) && (item.size === newItem.size) && (item.color === newItem.color));
            state.totalItem++;
            state.totalAmount += newItem.price;
            

            if(!existingItem){
                state.items.push({ ...action.payload, quantity: 1, color: action.payload.color});
            }else{
                existingItem.quantity++;
            }
        },
   

    removeFromCart: (state, action)=>{
        const productId = action.payload.product_id
        const Item = state.items.find(item=>item.product_id === productId);
        console.log('Item in cart Slice',Item);
        if (Item) {
            
            state.items = state.items.filter(item=> !(item.product_id === productId && item.size === action.payload.size && item.color === action.payload.color));
            
            
            state.totalAmount -= Item.price*Item.quantity;
            state.totalItem -= Item.quantity;
        }
    },

    incQuantity: (state, action)=>{
        const item = state.items.find(item=>item.product_id === action.payload.product_id);
       if (item) {
        item.quantity++;
        state.totalAmount += item.price;
        state.totalItem++;
       }
    },

    decQuantity: (state, action)=>{
        const item = state.items.find(item=>item.product_id === action.payload.product_id);
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
    },

    setCheckoutItem: (state, action) => {
        const newProducts = action.payload;
        newProducts.map((newProduct)=>{const existingProduct = state.checkoutItems.find(item=>( item.product_id === newProduct.product_id) && (item.size === newProduct.size) && (item.color === newProduct.color));
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            state.checkoutItems.push({ ...newProduct, quantity: 1, color: newProduct.color, size: newProduct.size });
        }})
        
      }
 },
 extraReducers: (builder) =>{
    builder
    .addCase(fetchCart.fulfilled, (state,action) =>{
       action.payload.forEach((newItem)=>{
       const existingItem = state.items.find((item)=>item.product_id === newItem.product_id && item.color === newItem.color && item.size === newItem.size);
       if (existingItem) {
        existingItem.quantity += newItem.quantity
       }else{
        state.items.push(newItem)
       }
       state.totalItem += newItem.quantity;
       state.totalAmount += newItem.price * newItem.quantity;
        })
       })
    .addCase(deleteFromAppwrite.fulfilled, (state,action)=>{
        state.items = state.items.filter(item=>item.$id != action.payload);
        state.totalItem -= action.payload.quantity
        state.totalAmount -+ action.payload.price*action.payload.quantity
    })
    .addCase(clearCartFromAppwrite.fulfilled, (state)=>{
        state.items=[];
    });
 }
});

export const {addToCart, removeFromCart, incQuantity, decQuantity, emptyCart, setCheckoutItem} = cartSlice.actions;
export default cartSlice.reducer;