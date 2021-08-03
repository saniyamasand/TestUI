/* eslint-disable no-unused-expressions */
import React from "react";
import {Switch, Route } from "react-router-dom";
import LandingPage from "./landingpage";
import Aboutme from "./aboutme";
import Contacts from "./contacts";
import Tailor from "./tailor";
import Resume from "./resume";
import Person from "./Person";
const Main = () =>  (
    <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route path="/aboutme" component={Aboutme}/>
        <Route path="/contacts" component={Contacts}/>
        <Route path="/tailor" component={Tailor}/>
        <Route path="/resume" component={Resume}/>
        <Route path="/authors" component={Person}/>
    </Switch>
)

export default  Main
