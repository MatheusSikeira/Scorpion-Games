import styles from "./input.module.css"

const Input = ({ type, name, id, placeholder, text, value, handlerChange, style }) => (
  <label htmlFor={id}>
    {text}
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={handlerChange}
      style={style} // <-- ESSENCIAL para destacar o campo!
    />
  </label>
);

export default Input;

