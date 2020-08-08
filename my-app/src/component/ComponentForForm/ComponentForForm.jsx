import React from "react";
import css from "./ComponentForComponentStyle.module.css"


export const ComponentForForm = ({input,meta, ...props}) => {
    let hasError =  meta.touched && meta.error && meta.submitFailed;
    return  <>
        <>
            <input className={css.area + ' ' + (hasError?css.errortext:'')} type = {props.type} {...input} {...props}/>
        </>
        <div className={css.divArea}>
            {hasError?<span className={css.spanarea}>{meta.error}</span>:null}
        </div>
    </>
};

