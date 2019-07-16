import React from 'react'
import { BrowserRouter as Router, Route, Link, Prompt } from "react-router-dom";
import Home from '../Home'

export default function AppRoutes() {
    return (
        <Router>
            <div>
                <Route path="/" exact component={Home} />
                <Route path="/one" render={() => <h3>One</h3>} />
                <Route path="/two" render={() => <h3>Two</h3>} />
            </div>
        </Router>
    )
}
