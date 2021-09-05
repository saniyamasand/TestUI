/* eslint-disable no-unused-expressions */
import React from "react";
import {Switch, Route } from "react-router-dom";
import LandingPage from "./landingpage";
import Appointment from "./appointment";
import Transactions from "./transactions";
import Tailor from "./tailor";
import Client from "./client";
const Main = () =>  (
    <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route path="/appointments" component={Appointment}/>
        <Route path="/transactions" component={Transactions}/>
        <Route path="/tailor" component={Tailor}/>
        <Route path="/clients" component={Client}/>
    </Switch>
)

export default  Main
