import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
  } from "@material-ui/core";
  import React, { useState } from "react";
  import { useLocalContext } from "../../context/context";
  import CreateClass_Form from "./CreateClass_Form";
  import "../../styles/CreateClass.css";

  const CreateClass = () => {
    const { createClassDialog, setCreateClassDialog } = useLocalContext();
    const [check, setChecked] = useState(false);
    const [showCreateClass_Form, setshowCreateClass_Form] = useState(false);

    return (
      <div>
        <Dialog
          onClose={() => setCreateClassDialog(false)}
          aria-labelledby="customized-dialog-title"
          open={createClassDialog}
          maxWidth={showCreateClass_Form ? "lg" : "xs"}
          className="form__dialog"
        >
          {showCreateClass_Form ? (
            <CreateClass_Form />
          ) : (
            <>
              <div className="CreateClass_title">
                Welcome to Create New Class Panel !!
              </div>
              <DialogContent className="CreateClass_content">
                <p className="CreateClass_text">
                  <p>You can create the Class for free and use for imparting</p>
                     education to the students.A-One Classes is 
                    a completely free user friendly platform.
                </p>
                <p className="CreateClass_2_paragraph">
                 <p> A-One is an online platfrom to impart the students quality
                  education.Please make sure you donot use this platform for 
                  any wrong purpose.Bullying , Eve teasing etc. type of  acts are offensicve crimes and A-one classes can take strict Actions if such acts are reported.</p>
                  A-One class reserves all rights to change and modify 
                  the terms and conditions at any moment of time with or without prior notice.
                </p>
  
                <div className="Createclass_checkbox_div">
                  <Checkbox color="primary" onChange={() => setChecked(!check)} />
                  <p className="CreateClass_box_inside_text">
                    I've read all the ablove mentioned conditions and understand the notice, 
                    and I also pledge to abide them.
                    I would be responsible for any sort of act that
                    happens through this class.
                  </p>
                </div>
              </DialogContent>
              <DialogActions>
                <Button title="Close" autoFocus color="dark" onClick={() => setCreateClassDialog(false)}>
                  Close
                </Button>
  
                <Button
                  autoFocus
                  color="primary"
                  disabled={!check}
                  title="Continue"
                  onClick={() => setshowCreateClass_Form(true)}
                >
                  Continue
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </div>
    );
  };

  export default CreateClass;