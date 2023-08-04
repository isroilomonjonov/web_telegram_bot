import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Card from "./components/card/card";
import Cart from "./components/cart/cart";
import getData from "./constants/db";
import { Data, CartData } from "./interface/index";
const courses = getData();

const telegram = (window as any).Telegram.WebApp;
function App() {
  console.log(telegram);

  const [cartItems, setCartItems] = useState<CartData[]>([]);
  useEffect(() => {
    telegram.ready();
  });
  // useEffect(() => {
  //   onCheckout();
  // }, [cartItems]);
  const onAddItem = (item: Data) => {
    const existItem = cartItems.find((c) => c.id === item.id);
    if (existItem) {
      const newData = cartItems.map((c) =>
        c.id === item.id
          ? { ...existItem, quantity: existItem.quantity + 1 }
          : c
      );
      setCartItems(newData);
    } else {
      const newData = [...cartItems, { ...item, quantity: 1 }];
      setCartItems(newData);
    }
  };
  const onRemoveItem = (item: Data) => {
    const existItem = cartItems.find((c) => c.id === item.id);
    if (existItem) {
      if (existItem.quantity === 1) {
        const newData = cartItems.filter((c) => c.id !== item.id);
        setCartItems(newData);
      } else {
        const newData = cartItems.map((c) =>
          c.id === item.id
            ? { ...existItem, quantity: existItem.quantity - 1 }
            : c
        );
        setCartItems(newData);
      }
    }
  };
  const onCheckout = () => {
    telegram.MainButton.text = "Sotib olish";
    telegram.MainButton.show();
  };
  const onSendData = useCallback(() => {
    const queryId = telegram.initDataUnsave?.query_id;
    if(queryId) {
      fetch("http://localhost:8000/web-data",{
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify(cartItems)
      })
    }else{
    telegram.sendData(JSON.stringify(cartItems));}
   }, [cartItems]);
  useEffect(() => {
    telegram.onEvent("mainButtonClicked", onSendData);
    return () => telegram.offEvent("mainButtonClicked", onSendData);
  }, [onSendData]);
  return (
    <>
      <h1 className="heading">Sammi kurslar</h1>
      <Cart cartItems={cartItems} onCheckout={onCheckout} />
      <div className="cards__container">
        {courses.map((c) => (
          <Card
            key={c.id}
            course={c}
            onAddItem={onAddItem}
            onRemoveItem={onRemoveItem}
          />
        ))}
      </div>
    </>
  );
}

export default App;
