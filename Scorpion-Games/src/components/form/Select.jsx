import styles from "./select.module.css"

const Select = ({text, name, id, handlerChange, options}) => {
    return(
        <div className={styles.form_control}>

            <label htmlFor={name}>{text}</label>

            <select name={name} id={id} onChange={handlerChange}> 

                <option value="">Selecione uma categoria</option>
                {
                    options.map((option)=>(
                         <option value={option.cod_categoria} key={option.cod_categoria}>{option.nome_categoria}</option>
                    ))
                }

            </select>

        </div>
    );
}

export default Select;