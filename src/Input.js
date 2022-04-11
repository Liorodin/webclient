import React from 'react';
import GetError from './GetError';
import ValidityErrors from './ValidityErrors';

export default function Input({ inputName, inputType, text }) {
    return (
        <div className="row mb-3">
            <label className="col-sm-3 col-form-label" htmlFor={inputName}>{text}</label>
            <div className="col-sm-6">
                <input className="form-control" id={inputName} type={inputType}></input>
                <div className="hidden"><GetError inputName={inputName} /></div>
                <div className="hidden1"><ValidityErrors inputName={inputName} /></div>
            </div>
        </div>
    )
}