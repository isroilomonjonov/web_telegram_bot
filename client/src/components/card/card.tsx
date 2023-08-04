import { useState } from "react";
import { Data } from "../../interface";
import Button from "../button/button";
import "./card.css";
const Card = ({ course,onAddItem,onRemoveItem }: { course: Data,onAddItem:(item:Data)=>void,onRemoveItem:(item:Data)=>void }) => {
  const [count,setCount]=useState<number>(0)
  const handleIncriment=()=>{
    setCount(prev=>prev+1)
    onAddItem(course)
  }
  const handleDicrement=()=>{
    setCount(prev=>prev-1)
    onRemoveItem(course)
    
  }
  return (
    <div className="card">
      <span className={`${count!==0?"card__badge":"card__badge-hidden"}`}>{count}</span>
      <div className="image__container">
        <img
          src={course.Image}
          alt={course.title}
          width={"100%"}
          height={"230px"}
        />
      </div>
      <div className="card__body">
        <h2 className="card__title">{course.title}</h2>
        <div className="card__price">
          {course.price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </div>
      </div>
      <div className="hr"></div>
      <div className="btn__container">
        <Button title="+" onClick={handleIncriment} type="add"/>
        {count!==0&&(
          <Button title="-" onClick={handleDicrement} type="remove"/>
        )}
      </div>
    </div>
  );
};

export default Card;
