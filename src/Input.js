const Input = ({ inputName, inputType }) => {
    return (
        <div>
            <label htmlFor={inputName}>{inputName}</label>
            <input htmlFor={inputType} id={inputName}></input>
        </div>
    );
}
export default Input;
