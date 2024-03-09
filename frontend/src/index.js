
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import "bootstrap/scss/bootstrap.scss";
import "assets/scss/paper-kit.scss?v=1.3.0";
import "assets/demo/demo.css?v=1.3.0";
import StudentDash from "UIs/StudentDash";
import StudentLogin from "UIs/StudentLogin";
import AddComplaint from "UIs/AddComplaint";
import ComplaintDetail from "UIs/ComplaintDetail";
import DepartmentDash from "UIs/DepartmentDash";
import AdminDash from "UIs/AdminDash";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Switch>
      <Route
        path="/student"
        render={(props) => <StudentDash {...props} />}
      />
      <Route
        path="/dept"
        render={(props) => <DepartmentDash {...props} />}
      />
      <Route
        path="/admin"
        render={(props) => <AdminDash {...props} />}
      />
      <Route
        path="/addcomplaint"
        render={(props) => <AddComplaint {...props} />}
      />
      <Route
        path="/complaintdetail"
        render={(props) => <ComplaintDetail {...props} />}
      />
      <Route
        path="/stud-login"
        render={(props) => <StudentLogin {...props} />}
      />
      <Redirect to="/stud-login" />
    </Switch>
  </BrowserRouter>
);
