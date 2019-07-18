import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import MiniDrawer from '../Drawer'
import {useSelector} from 'react-redux'

export default function AppRoutes() {
    const data = useSelector(res => res);
    return (
        <Router>
            <div>
                <Route path="/" exact component={MiniDrawer} />
                <Route path="/home" component={MiniDrawer}/>
                <Route path="/deleted" component={MiniDrawer} />
                <Route path="/done" component={MiniDrawer} />
                <Route path="/favorites" component={MiniDrawer} />
                {data.urlRender === 1 && <Redirect to='/home' />}
                {data.urlRender === 2 && <Redirect to='/deleted' />}
                {data.urlRender === 3 && <Redirect to='/done' />}
                {data.urlRender === 4 && <Redirect to='/favorites' />}
            </div>
        </Router>
    )
}