import styles from "./button.module.css";

    // function saveBooks(){
    //     console.log("Olá mundo")
    // }
    
    //onclick para adicionar um evento no botão
const Button = ({ label, onClick }) => {
  return (
    <button onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;