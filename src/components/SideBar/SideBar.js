import React from "react";
import clsx from "clsx";
import { makeStyles, SwipeableDrawer, List, Divider, ListItem, ListItemIcon, ListItemText } from "@material-ui/core/";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { Header } from "..";
import { Menu, Drafts, Send, RestoreFromTrash, Archive } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";



const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function SwipeableTemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
  });

  const handleonclick_drafts = (e) => {
    window.location.assign("https://www.gmail.com");
  }
  
  const handleonclick_Inbox = (e) => {
    window.location.assign("https://www.gmail.com");
  }
  
  const handleonclick_Trash = (e) => {
    window.location.assign("https://www.gmail.com");
  }
  
  const handleonclick_All_mail = (e) => {
    window.location.assign("https://www.gmail.com");
  }
  
  const handleonclick_Spam = (e) => {
    window.location.assign("https://www.gmail.com");
  }
  
  const handleonclick_Send_email = (e) => {
    window.location.assign("https://www.gmail.com");
  }

  const toggleSideBar = (anchor, open) => (event) => {
    if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleSideBar(anchor, false)}
      onKeyDown={toggleSideBar(anchor, false)}
    >
      <List>
        {["Inbox", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {(index + 1) % 3 === 0 ? <Drafts onClick={() => handleonclick_drafts()} /> : (((index + 1) % 2 === 0) ? <Send onClick={() => handleonclick_Send_email()} /> : <MailIcon onClick={() => handleonclick_Send_email()} />)}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {(index + 1) % 3 === 0 ? <RestoreFromTrash onClick={() => handleonclick_Trash()} /> : (((index + 1) % 2 === 0) ? <Archive onClick={() => handleonclick_Spam()} /> : <InboxIcon onClick={() => handleonclick_All_mail()} />)}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Header>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={toggleSideBar(anchor, true)}
            >
              <Menu />
            </IconButton>
          </Header>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleSideBar(anchor, false)}
            onOpen={toggleSideBar(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}