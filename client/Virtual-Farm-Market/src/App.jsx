import React from 'react'
import SignUp from "./pages/Authentication/SignUp";
import SignInSide from "./pages/Authentication/SignIn";
import PublicRoute from "./auth/PublicRoute";

import ResetPassword from './pages/Authentication/ResetPassword'
import IndexForRoutes from './Routes/IndexForRoutes';

function App() {
  return (
    <>
      
   <IndexForRoutes/>
    
    </>
    // <div>
    //   <Switch>
    //   <Route exact path="/register" component={SignUp}>
    //   <Route exact path="/login" component={SignInSide} />
        
    //     {/* <PublicRoute>
    //       <Route exact path="/signup"  />
    //     </PublicRoute> */}
    //   </Route>
    // </Switch>
    // </div>
  )
}

export default App
