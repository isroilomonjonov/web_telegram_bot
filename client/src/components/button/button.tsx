import "./button.css";
const Button = ({
  type,
  title,
  onClick,
  disable
}: {
  type: string;
  title: string;
  onClick?: ()=>void,
  disable?:boolean
}) => {
  return (
    <button
      className={`btn ${
        (type === "add" && "add") ||
        (type === "remove" && "remove") ||
        (type === "checkout" && "checkout")
      } ${disable?"disabled":""}`}
      onClick={onClick}
      disabled={disable}
    >
      {title}
    </button>
  );
};

export default Button;
