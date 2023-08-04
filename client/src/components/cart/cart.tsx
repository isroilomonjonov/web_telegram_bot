import { CartData } from "../../interface"
import { totalPrice } from "../../utils/total-price"
import Button from "../button/button"
import "./cart.css"
const Cart = ({cartItems,onCheckout}:{cartItems:CartData[],onCheckout:()=>void}) => {
  return (
    <div className="cart__container">
        <p>Umumiy narx: {totalPrice(cartItems).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}</p>
        <Button type="checkout" onClick={onCheckout} disable={cartItems.length===0?true:false} title={`${cartItems.length===0?"Buyurtma berish":"To'lov"}`}/>
    </div>
  )
}

export default Cart