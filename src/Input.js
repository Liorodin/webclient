const Input = ({ inputName, inputType }) => {
    return (
        <div className="row mb-3">
            <label className="col-sm-2 col-form-label" htmlFor={inputName}>{inputName}</label>
            <div className="col-sm-10">
                <input className="form-control" htmlFor={inputType} id={inputName}></input>
            </div>
        </div>
    );
}
export default Input;
