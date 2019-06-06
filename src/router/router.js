import React from "react";
import { Route } from "react-router-dom";
import App from "../components/App";
import Posts from "../components/Posts";
import Locations from "../components/Locations";
import Location from "../components/Location";
import Header from "../header";

class ReactRouter extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Route exact path="/" component={App} />
        <Route path="/posts" component={Posts} />
        <Route exact path="/locations" component={Locations} />
        <Route exact path="/locations/:id" component={Location} />
      </React.Fragment>
    );
  }
}

export default ReactRouter;
