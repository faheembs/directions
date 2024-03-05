import React, { useEffect, useLayoutEffect } from 'react';
import { Route, Redirect, browserHistory } from 'react-router';
import { useLocation, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children, ...rest }) => {
  console.log("protected route")
  const location = useLocation()
  const navigate = useNavigate();
  // // console.log(userToken)
  // if (!userToken) {
  //   // console.log("no")
  //   browserHistory.push("/login")
  // }

  // if (userToken && location.pathname === "/login") {
  //   console.log("ok");
  //   browserHistory.push("/dashboard")
  // }
  // console.log(userToken)
  // const navigate = useNavigate()
  useLayoutEffect(() => {
    // // const userToken = localStorage.getItem('userToken');
    const userToken = localStorage.getItem('userToken');
    if (!userToken) {
      browserHistory.push("/login")
    } else if (userToken && location.pathname === "/login") {
      browserHistory.goBack();
      // browserHistory.push("/dashboard")
    }
    // console.log("yes")

  }, [])
  // console.log(children)
  return (<>{children}</>)
  // return (
  //   <Route
  //     {...window.console.log("protected")}
  //     {...rest}
  //     render={props =>
  //       userToken ? (
  //         children ? (
  //           <Component {...props}>
  //             {children}
  //           </Component>
  //         ) : (
  //           <Component {...props} />
  //         )
  //       ) : (
  //         <Redirect to="/login" />
  //       )
  //     }
  //   />
  // );
};

export default ProtectedRoute;

