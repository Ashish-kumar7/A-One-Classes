import { Avatar, Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import db, { storage } from "../../Firebase_library/firebase";
import "../../styles/DetailsPage.css";
import firebase from "firebase";
import { useLocalContext } from "../../context/context";
import { Posted_contents } from "..";


const DetailsPage = ({ classData }) => {
  const { loggedInMail,loggedInUser } = useLocalContext();

  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInput] = useState("");
  const [file, setfile] = useState(null);

  const handleChange = (e) => {
    alert("The associated  picture will be uploaded.");
    if (e.target.files[0]) {
      setfile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadFile = storage.ref(`files/${file.name}`).put(file);

    uploadFile.on("state_changed", () => {
      storage
        .ref("files")
        .child(file.name)
        .getDownloadURL()
        .then((url) => {
          db.collection("announcments")
            .doc("classes")
            .collection(classData.id)
            .add({
              timstamp: firebase.firestore.FieldValue.serverTimestamp(),
              fileurl: url,
              text: inputValue,
              sender: loggedInMail,
              senderImage:loggedInUser.photoURL,
              classcode:classData.id,
              classowner:classData.owner,
              classname:classData.className,
              number : classData.number,
            });
        });
    });
  };
  
  return (
    <div className="detailspage">
      <div className="detailspage_div">
        <div className="detailspage_content">
          <div className="detailspage_container">
            <div className="detailspage_image">
              <div className="detailspage_emptyStyles" />
            </div>
            <div className="detailspage_text">
              <h1 className="detailspage_header detailspage_overflow">
                {classData.className}
              </h1>
              
            
              <div className="detailspage_section detailspage_overflow"> Section: </div>
              <div className="detailspage_id2">{classData.section}</div>
              <br></br>
              <div className="detailspage_tempdiv">
                <em className="detailspage_code">Class Code :</em>
                <br></br>
                <div className="detailspage_id">{classData.id}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="detailspage_announce">
          
          <div className="detailspage_status">
            <h2>Welcome Back!</h2>
            <br/>
            <h2>{loggedInUser.displayName}</h2>
          </div>

          <div className="detailspage_announcements">
            <div className="detailspage_announcementsdiv">
              <div className="detailspage_announce_part">
                {showInput ? (
                  <div className="detailspage_form">
                    <TextField
                      id="filled-multiline-flexible"
                      multiline
                      label="Announce Something to class"
                      variant="filled"
                      value={inputValue}
                      onChange={(e) => setInput(e.target.value)}
                      title="Enter Text here"
                    />
                    <div className="detailspage_buttons">
                      <input
                        onChange={handleChange}
                        variant="outlined"
                        color="primary"
                        type="file"
                      />
                      <p className="caution2">Upload supports the image files only.</p>
                      <div>
                        <Button title="cancel" onClick={() => setShowInput(false)}>
                          Cancel
                        </Button>

                        <Button title="Post" onClick={handleUpload} color="primary" variant="contained" >
                          Post
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className="detailspage_wrapper_special"
                    onClick={() => setShowInput(true)}
                  >
                    <Avatar src={loggedInUser.photoURL}/>
                    <div title="Click here to Post" className="detailspage_initial_text">Post Something to class ...</div>
                  </div>
                )}
              </div>
            </div>
            <Posted_contents classData={classData} />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;