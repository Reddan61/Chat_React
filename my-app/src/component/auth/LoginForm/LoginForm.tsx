import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {ComponentForForm} from "../../ComponentForForm/ComponentForForm";
import {required} from "../../validate/validate";



const RegisterForm: React.FC<InjectedFormProps<loginFormDataType,anotherLoginFormDataType> & anotherLoginFormDataType> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <Field placeholder = 'Ваше имя' name = 'Name' component = {ComponentForForm} type = 'text'  validate = {[
            required
        ]}/>
        <button>Отправить</button>
    </form>
};

const RegisterFormRedux = reduxForm<loginFormDataType,anotherLoginFormDataType>({
    form: 'register'
})(RegisterForm);


export default RegisterFormRedux;

type loginFormDataType = {
    Name : string
}
type anotherLoginFormDataType = {

}