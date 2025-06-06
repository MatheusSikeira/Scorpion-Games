import styles from "./select.module.css";

const Select = ({ text, name, id, handlerChange, options }) => {
  // Define o texto do option placeholder dinamicamente
  const placeholderText = name === "cod_categoria"
    ? "Selecione uma categoria"
    : name === "plataforma"
    ? "Selecione uma plataforma"
    : "Selecione uma opção";

  return (
    <div className={styles.form_control}>
      <label htmlFor={id}>{text}</label>

      <select name={name} id={id} onChange={handlerChange} defaultValue="">
        <option value="" disabled>
          {placeholderText}
        </option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
