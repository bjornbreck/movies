/* eslint-disable import/no-named-as-default */
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NodeList from "../containers/nodeList";
import NotFoundPage from "./NotFoundPage";
import PropTypes from "prop-types";
import React from "react";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={NodeList} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

App.propTypes = {
  children: PropTypes.element,
};

export default App;
