import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  main: {
    flexGrow: 1,
    backgroundColor: "#040430",
    color: "white",
  },
  App_Menu_Bar: {
    backgroundColor: "#040430",
    color: "white",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuButton: {
    marginRight: theme.spacing(1),
    color: "black",
  },
  head: {
    fontSize: "1.38rem",
    color: "white",
    marginLeft: "5px",
    cursor: "pointer",
  },
  pic: {
    marginRight: "25px",
    cursor: "pointer",
  },
  header_div: {
    display: "flex",
    alignItems: "center",
  },
  header_div_right: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));