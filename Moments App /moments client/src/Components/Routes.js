import * as React from "react";
import { Switch, Route } from "react-router-dom";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import NewMoment from "./NewMoment";
import Sidebar from "./Sidebar";
import AllMoments from "./AllMoments";

function RoutesHandle(props) {
  return (
    <div>
      <Switch>
        <Route  path='/signup' component={SignUp} />
        <Route  path='/signin' component={SignIn} />
        <Route >
        <Sidebar />
        <Route  path='/new_moment' component={NewMoment} />
        <Route  path='/moments' component={AllMoments} />
        </Route>
      </Switch>
    </div>
  );
}
export default RoutesHandle;
