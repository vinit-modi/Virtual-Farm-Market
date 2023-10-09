import React from "react";
import { GoogleLoginButton } from "react-social-login-buttons";

const clientId =
  "394386949405-3al49a6v8la0v3233o191h3gg8rlvdqr.apps.googleusercontent.com";

function OAuthGoogleLogin() {
  const onSuccess = (res) => {
    console.log("onSuccess==>", res);
  };
  const onFailure = (res) => {
    console.log("onFailure==>", res);
  };
  return (
    <div>
      <GoogleLoginButton
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
}

export default OAuthGoogleLogin;
