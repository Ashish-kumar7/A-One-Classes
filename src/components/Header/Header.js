import { AppBar, Avatar, Menu, MenuItem, Toolbar, Typography, } from "@material-ui/core";
import { Add, Apps, Email } from "@material-ui/icons";
import React from "react";
import { CreateClass, JoinClassOption } from "..";
import { useLocalContext } from "../../context/context";
import { useStyles } from "./style";

const Header = ({ children }) => {
  const stylecomp = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const onAppsclickaction = () => {
    window.location.assign("https://www.gmail.com");
  }

  const onDraftssclickaction = () => {
    window.location.assign("https://www.gmail.com");
  }

  const handleTitleClick = () =>{
    window.location.assign("http://localhost:3000/");
  }
  const {
    setCreateClassDialog,
    setJoinClassDialog,
    loggedInUser,
    logout,
  } = useLocalContext();

  const handleCreate = () => {
    handleClose();
    setCreateClassDialog(true);
  };

  const handleJoin = () => {
    handleClose();
    setJoinClassDialog(true);
  };
  return (
    <div className={stylecomp.main}>
      <AppBar className={stylecomp.App_Menu_Bar} position="static">
        <Toolbar className={stylecomp.toolbar}>
          <div className={stylecomp.header_div}>
            {children}
            <img src="https://img.icons8.com/office/40/000000/code.png" alt="header_image" />
            <Typography title="Home" variant="h6" className={stylecomp.head} onClick={handleTitleClick}> 
              A-One Classes
            </Typography>
          </div>
          <div className={stylecomp.header_div_right}>
            <Add onClick={handleClick} className={stylecomp.pic} />
            <Apps title="Apps" onClick={onAppsclickaction} className={stylecomp.pic} />
            <Email title="Email" onClick={onDraftssclickaction} className={stylecomp.pic} />
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem title="Join Class" onClick={handleJoin}>Join Class</MenuItem>
              <MenuItem title="Create Class" onClick={handleCreate}>Create Class</MenuItem>
            </Menu>
            <div>
              <Avatar
                onClick={() => logout()}
                src={loggedInUser?.photoURL}
                className={stylecomp.pic}
                title="LogOut"
              />
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <CreateClass />
      <JoinClassOption />
    </div>
  );
};

export default Header;