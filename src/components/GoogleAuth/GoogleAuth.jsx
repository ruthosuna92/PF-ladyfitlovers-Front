import { useDispatch, useSelector } from "react-redux";
import style from "./GoogleAuth.module.css";
import authUser from "../../redux/Actions/User/authUser";
import getCart from "../../redux/Actions/ShoppingCart/getCart";
import { useEffect, useState } from "react";
import { LoginSocialGoogle } from "reactjs-social-login";
import { GoogleLoginButton } from "react-social-login-buttons";



const clientId =
  "64033468835-sjfdv56e8hvmp4dauh8tm2ljg86f8fja.apps.googleusercontent.com";

const GoogleAuth = ({ onGoogleLoginSuccess }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id)
  const accessToken2 = useSelector((state) => state.accessToken)

  useEffect(() => {
    if (userId && accessToken2) {
      dispatch(getCart(userId, accessToken2));
    }
  }, [userId]);
  const onSuccess = (data) => {
    console.log(data)
    let profileObj = data;
    let accessToken = data.access_token;
    if (profileObj.family_name == undefined) {
      profileObj.family_name = "No definido";
    }
    //userId, token, profileObj
    dispatch(authUser(profileObj, accessToken))
    onGoogleLoginSuccess();
  };

  const onFailure = (res) => {
    console.log("Login Failed: res: ", res);
  };


  // const onLogoutSuccess = useCallback(() => {
  //   setProfile(null)
  //   setProvider('')
  // }, [])
  return (
    <LoginSocialGoogle
      client_id={clientId}
      scope="email profile openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile"
      onResolve={({ provider, data }) => {
        onSuccess(data)
      }}
      onReject={(err) => {
        console.log(err)
      }}
    >
      <GoogleLoginButton text="Ingresar con Google" className={style.containerButton} />
    </LoginSocialGoogle>
  );
};

export default GoogleAuth;
