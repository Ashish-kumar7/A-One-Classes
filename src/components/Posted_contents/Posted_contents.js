import { Avatar, Button } from '@material-ui/core';
import React, { useState, useEffect } from "react";
import db from "../../Firebase_library/firebase";
import "../../styles/Posted_contents.css";

const Posted_contents = ({ classData }) => {

    const onEmailclickaction = (email, subject, body) => {
        alert(`You are procedding to send email to ${email} !`)
        window.open(`mailto:${email}?subject=Submission for ${subject}&body=Please find the attachment for ${body}`, "_blank");
    }

    const onWhatsAppclickaction = (message, phone) => {
        alert(`You are procedding to WhatsApp to ${phone} !`)
        const link = `https://api.whatsapp.com/send?phone=${phone}${message && `&text=${encodeURIComponent(message)}`}`;
        window.location.assign(link, "_blank");
    }

    const onimageClick = (e)=>{
        window.location.assign(e, "_blank");
        console.log(e);
    }

    const [announcment, setAnnouncment] = useState([]);

    useEffect(() => {
        if (classData) {
            let unsubscribe_func = db
                .collection("announcments")
                .doc("classes")
                .collection(classData.id)
                .onSnapshot((snap) => {
                    setAnnouncment(snap.docs.map((doc) => doc.data()));
                });
            return () => unsubscribe_func();
        }
    }, [classData]);

    return (
        <div>
            {announcment.map((item) => (
                <div className="Posted_contents">
                    <div className="Posted_contents_Cnt">
                        <div className="Posted_contents_top">
                            <Avatar src={item.senderImage} />
                            <div className="Posted_contents_name">{item.sender}</div>
                        </div>
                        <p className="Posted_contents_txt">{item.text}</p>
                        <div className="button-case">

                            <div className="btn2" >
                                <Button variant="contained" color="primary" title= "Email" onClick={() => onEmailclickaction(item.sender, "abc")}>Email
                                </Button>
                            </div>

                            <div className="btn2" >
                                <Button variant="contained" color="primary" onClick={() => onWhatsAppclickaction("Hello Sir! This is my submission of the assigment given to us.", item.number)} title= "WhatsApp">WhatsApp
                                </Button>
                            </div>

                        </div>

                        <img className="Posted_contents_img" src={item.fileurl} onClick={() => onimageClick(item.fileurl)} alt={item.text} title= "Click to Open Image"/>

                        <p className="caution1">*Click the Email/WhatsApp Button and send the Assignment to your teacher.</p>
                        
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Posted_contents;
