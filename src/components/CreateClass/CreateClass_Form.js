import { Button, DialogActions, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useLocalContext } from "../../context/context";
import { v4 as uuidV4 } from "uuid";
import db from "../../Firebase_library/firebase";

const CreateClass_Form = () => {
  const [className, setClassName] = useState("");
  const [Section, setSection] = useState("");
  const [Room, setRoom] = useState("");
  const [Subject, setSubject] = useState("");
  const [WhatsApp,setWhatsApp] = useState("");

  const { loggedInMail, setCreateClassDialog ,loggedInUser } = useLocalContext();

  const addNewClass = (e) => {
    e.preventDefault();
    alert(`A new Class will be created with entered details!`);
    const id = uuidV4();

    db.collection("CreatedClasses")
      .doc(loggedInMail)
      .collection("classes")
      .doc(id)
      .set({
        owner: loggedInMail,
        className: className,
        section: Section,
        room: Room,
        id: id,
        userpic : loggedInUser.photoURL,
        displayName : loggedInUser.displayName,
        number:WhatsApp,
      })
      .then(() => {
        setCreateClassDialog(false);
      });
  };
  return (
    <div className="form">
      <p className="CreateClass_Formtitle">Create Class</p>

      <div className="CreateClass_Form_inputs">
        <TextField
          title= "ClassName"
          id="filled-basic"
          label="Class Name"
          className="CreateClass_form_input"
          variant="filled"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
        <TextField
          title= "Section"
          id="filled-basic"
          label="Section"
          className="CreateClass_form_input"
          variant="filled"
          value={Section}
          onChange={(e) => setSection(e.target.value)}
        />
        <TextField
          title= "Subject Name"
          id="filled-basic"
          label="Subject"
          className="CreateClass_form_input"
          variant="filled"
          value={Subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <TextField
          title= "Room Number"
          id="filled-basic"
          label="Room"
          className="CreateClass_form_input"
          variant="filled"
          value={Room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <TextField
          title= "WhatsApp Number"
          id="filled-basic"
          label="WhatsApp"
          className="CreateClass_form_input"
          variant="filled"
          value={WhatsApp}
          onChange={(e) => setWhatsApp(e.target.value)}
        />
      </div>
      <DialogActions>
        <Button onClick={addNewClass} color="primary" title= "Create Class">
          Create
        </Button>
      </DialogActions>
    </div>
  );
};

export default CreateClass_Form;