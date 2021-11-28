import { Button } from "@material-ui/core";
import React from "react";
import homegif from "../../assets/homegif.gif";
import { useLocalContext } from "../../context/context";
import "../../styles/LoginPage.css";

const LoginPage = () => {

    const { login, loggedInUser } = useLocalContext();

    return (
        <div className="login_page">
            <img className="logo_homepage" src={homegif} alt="MS-Class-logo" />
            <div className="login_text" >A-One Classes</div>
            <Button title="Login Now" variant="contained" color="default" onClick={() => login()}>
                Login Now-Google!
            </Button>
        </div>
    )
}

export default LoginPage;
