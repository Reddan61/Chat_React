import React from "react";
import {Field, reduxForm, InjectedFormProps} from "redux-form";
import {ComponentForForm} from "../../../ComponentForForm/ComponentForForm";
import css from "./CreateRoomFormStyles.module.css"
import {required} from "../../../validate/validate";

const CreateRoomForm: React.FC<InjectedFormProps<CreateRoomFormType, OtherCreateRoomPropsType> & OtherCreateRoomPropsType> = (props) => {
    return <form onSubmit={props.handleSubmit} className={css.CreateRoomForm}>
        <div className={css.CreateRoomForm__Input}>
            <Field name="NameRoom" component={ComponentForForm} required/>
            <label>Название комнаты</label>
        </div>
        <div className={css.CreateRoomForm__Submit}>
            <button>Создать</button>
        </div>
    </form>
};


const CreateRoomReduxForm = reduxForm<CreateRoomFormType, OtherCreateRoomPropsType>({
    form: "createRoom"
})(CreateRoomForm);


export default CreateRoomReduxForm;

type CreateRoomFormType = {
    NameRoom: string
};

type OtherCreateRoomPropsType = {}