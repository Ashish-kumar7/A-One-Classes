import React, { useState } from "react";
import { Avatar, Button, Dialog, Slide, TextField } from "@material-ui/core";
import { useLocalContext } from "../../context/context";
import { Close } from "@material-ui/icons";
import "../../styles/JoinClassOption.css";
import db from "../../Firebase_library/firebase";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const JoinClassOption = () => {
  const [error, setError] = useState();
  const [joinedData, setJoinedData] = useState();
  const [classExists, setClassExists] = useState(false);
  const { joinClassDialog, setJoinClassDialog, loggedInUser, logout } = useLocalContext();
  const [classCode, setClassCode] = useState("");
  const [email, setemail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    db.collection("CreatedClasses")
      .doc(email)
      .collection("classes")
      .doc(classCode)
      .get()
      .then((doc) => {
        if (doc.exists && doc.owner !== loggedInUser.email) {
          setClassExists(true);
          setJoinedData(doc.data());
          setError(false);
        } else {
          setError(true);
          setClassExists(false);
          return;
        }
      });

    if (classExists === true) {
      db.collection("JoinedClasses")
        .doc(loggedInUser.email)
        .collection("classes")
        .doc(classCode)
        .set({
          joinedData,
        })
        .then(() => {
          setJoinClassDialog(false);
        });
    }
  };

  return (
    <div>
      <Dialog
        fullScreen={true}
        open={joinClassDialog}
        TransitionComponent={Transition}
        onClose={() => setJoinClassDialog(false)}
      >
        <div className="join_Class">
          <div className="join_Class_first">
            <div
              className="join_Class_second"
              onClick={() => setJoinClassDialog(false)}
            >
              <Close className="join_Class_cross" />
              <div className="join_Class_header" >Join Class</div>
            </div>
            <Button title="LogOut" className="join_class_button" variant="contained" color="default" onClick={() => logout()}>LOGOUT</Button>
          </div>
          <div className="join_Class_Form">
            <h2>Welcome {loggedInUser?.displayName} !</h2>
            <p className="join_Class_inside_formText">
              You are signed in as {loggedInUser?.email}
            </p>
            <div className="join_Class_Login_info">
              <div className="join_Class_Class_left">
                <Avatar src={loggedInUser?.photoURL} />
                <div className="join_Class_Login_text">
                  <div className="join_Class_Login_Name">{loggedInUser?.displayName}</div>
                  <div className="join_Class_LoggedUser_Email"> {loggedInUser?.email}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="join_Class_Form">
            <div style={{ fontSize: "1.25rem", color: "#3c4043" }} className="join_Class_inside_formText">Enter the Details:</div>
            <div className="join_Class_Login_info">
              <TextField
                id="outlined-basic"
                label="Class Code"
                variant="outlined"
                value={classCode}
                onChange={(e) => setClassCode(e.target.value)}
                error={error}
                helperText={error && "No class was found"}
                autofocus
                className="tooltip"
                alt="Please Enter Code"
              />
              <TextField
                id="outlined-basic"
                label="Owner's email"
                variant="outlined"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                className="tooltip"
                alt="Please Enter Email"
              />
            </div>

            <Button variant="contained" color="primary" onClick={handleSubmit} title="Join" >
              Join Now
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default JoinClassOption;

