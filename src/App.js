import React from 'react';
import './App.css';
import { Layout, Header , Navigation, Drawer , Content} from "react-mdl";
import Main from "./components/main";
import {Link} from "react-router-dom";

function App() {
  return (
      <div>
          <div className="demo-big-content">
              <Layout>
                  <Header title="Designs"  style={{color: 'white', backgroundColor:'#FF8C94'}} scroll>
                      <Navigation>
                          <Link to="/appointments">Appointment</Link>
                          <Link to="/transactions">Orders</Link>
                          <Link to="/tailor">Tailors</Link>
                          <Link to="/clients">Clients</Link>
                      </Navigation>
                  </Header>
                  <Drawer title="Title">
                      <Navigation>
                          <Link to="/appointments">Appointment</Link>
                          <Link to="/transactions">Orders</Link>
                          <Link to="/tailor">Tailors</Link>
                          <Link to="/clients">Clients</Link>
                      </Navigation>
                  </Drawer>
                  <Content>
                      <div className="page-content" />
                      <Main/>
                  </Content>
              </Layout>
          </div>
      </div>
  );
}

export default App;
