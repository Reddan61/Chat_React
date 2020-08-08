import React, {Suspense} from 'react';
import css from './stylesApp.module.css'
import AuthForm from "./component/auth/AuthForm/auth";
import {Route, Switch, withRouter} from "react-router-dom";
import {compose} from "redux";
import Header from "./component/header/header";
import Loader from "./component/loader/loader";


const ChatMain = React.lazy(() => import("./component/chatMain/ChatMain"));

function App() {
    return (
        <div className={css.body}>
            <div>
                <Header />
            </div>
        <div>
            <Switch>
                <Route exact path='/auth' render={() => <AuthForm/>}/>
                <Suspense fallback={<Loader />}>
                    <Route exact path = '/' render = {() => <ChatMain />} />
                </Suspense>
            </Switch>
        </div>
        </div>
    );
}

export default compose(
    withRouter
)(App);
