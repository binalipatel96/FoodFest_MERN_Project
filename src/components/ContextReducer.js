import React, { createContext, useContext, useReducer } from 'react'

const cartStateContext = createContext();
const cartDispatchContext = createContext();

const reducer = (state, action) => {

    switch(action.type){
        case "ADD":
            return [...state, { id: action.id, name: action.name, price: action.price, quantity: action.quantity, 
                size: action.size, img: action.img}]
        case "REMOVE": 
            let newArray = [...state]
            newArray.splice(action.index, 1)
            return newArray;
        case "UPDATE":
            let arrray = [...state]
            arrray.find((food, index) => {
                if(food.id === action.id){
                    console.log(food.quantity, parseInt(action.quantity), action.price + food.price)
                    arrray[index] = { ...food, quantity: parseInt(action.quantity) + food.quantity, price: action.price + food.price}
                }
                return arrray
            })
            return arrray
        case "DROP":
            let emptyArray = []
            return emptyArray
        default:
            console.log("Error in reducer");
    }

}

export const CartProvider = ({children}) => {
    const[state, dispatch] = useReducer(reducer, []);
    return(
        <cartDispatchContext.Provider value={dispatch}>
            <cartStateContext.Provider value={state}>
                {children}
            </cartStateContext.Provider>
        </cartDispatchContext.Provider>
    )
}

export const useCart = () => useContext(cartStateContext);
export const useDispatchCart = () => useContext(cartDispatchContext);
