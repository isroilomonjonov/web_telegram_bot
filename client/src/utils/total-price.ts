import { CartData } from "../interface";

export const totalPrice = (arr:CartData[])=>{
    return arr.reduce((a,c)=>a+c.price*c.quantity,0)
}