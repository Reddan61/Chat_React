import React, {ComponentType, useEffect} from "react";
import {connect} from "react-redux";
import {StateType} from "../redux/store";
import { Redirect } from "react-router-dom";

let mapStateToProps = (state:StateType) => {
    return {
        isAuth: state.authPage.isAuth
    }
};

export function WithAuthRedirect<WP> (Component:ComponentType<WP>)  {
    const withComponent:React.FC<MapStateToPropsType> = (props) => {
        let {isAuth,...restProps} = props;
        if(!isAuth) {
                return <Redirect to = '/auth' />
            }
        return <Component {...restProps as WP} />
    }


    return connect<MapStateToPropsType,{},{},StateType>
    (mapStateToProps)
    (withComponent)
};

type MapStateToPropsType = ReturnType<typeof mapStateToProps>;