const Input = ({ inputName, inputType }) => {
    return (
        <div className="row mb-3">
            <label class="col-sm-2 col-form-label" htmlFor={inputName}>{inputName}</label>
            <div class="col-sm-10">
                <input class="form-control" htmlFor={inputType} id={inputName}></input>
            </div>
        </div>
    );
}
export default Input;
