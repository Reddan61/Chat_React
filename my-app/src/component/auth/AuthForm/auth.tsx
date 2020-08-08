import React from "react"
import css from './stylesAuthForm.module.css'
import {compose} from "redux";
import {connect} from "react-redux";
import {StateType} from "../../redux/store";
import {formDataLoginType} from "../../Types/Types";
import {registerUserThunk} from "../../redux/authReducer";
import { Redirect } from "react-router-dom";
import RegisterFormRedux from "../LoginForm/LoginForm";



const AuthForm: React.FC<mapStateToProps & mapDispatchToProps> = (props) => {
    let SubmitRegister = (formdata:formDataLoginType) => {
        props.registerUserThunk(formdata);
    };
    if(props.isAuth){
        return <Redirect to = {'/'} />
    }
    return <div className={css.MainAuthForm}>
        <div className={css.InsideMainAuthForm}>
                <div className={css.auth}>
                    <RegisterFormRedux onSubmit = {SubmitRegister}/>
                </div>
        </div>
    </div>
};

let mapStateToProps = (state:StateType) => {
    return {
        isAuth: state.authPage.isAuth
    }
};

export default React.memo(compose(
    connect(mapStateToProps,{registerUserThunk } )
)(AuthForm));



type mapStateToProps = ReturnType<typeof mapStateToProps>
type mapDispatchToProps = {
    registerUserThunk: (formdata:formDataLoginType) => void
};
