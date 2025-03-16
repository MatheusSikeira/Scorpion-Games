import styles from "./select.module.css"

const Select = ({text, name, id, handlerChange}) => {
    return(
        <div className={styles.form_control}>

            <label htmlFor={name}>{text}</label>

            <select name={name} id={id} onChange={handlerChange}> 

                <option value="">Selecione um genêro</option>

                <option value="">Ação</option>

                <option value="">Mundo Aberto</option>

                <option value="">Luta</option>

                <option value="">Terror</option>

            </select>

        </div>
    );
}

export default Select;