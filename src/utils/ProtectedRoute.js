import React, { useEffect } from 'react';
import { Route, Redirect, browserHistory } from 'react-router';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, children, ...rest }) => {
  const userToken = localStorage.getItem('userToken');
  // console.log(userToken)
  const navigate = useNavigate()
  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (!userToken) {
      console.log("no")
      browserHistory.push("/login")
      // navigate("/login")
      // window.reload()
    }
    console.log("yes")

  })

  return (
    <Route
      {...rest}
      render={props =>
        userToken ? (
          children ? (
            <Component {...props}>
              {children}
            </Component>
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;

