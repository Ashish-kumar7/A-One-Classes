import { Avatar } from "@material-ui/core";
import { FolderOpen, PermContactCalendar,InsertDriveFile,Drafts} from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import "../../styles/JoinedClasses.css";

const JoinedClasses = ({ classData }) => {
  return (
    <li className="joined_Classes_list">
      <div className="joined__wrapper">
        <div className="joined_Classes_container">
          <div className="joined_Classes_imgWrapper" />
          <div className="joined_Classes_image" />
          <div className="joined_Classes_content">

            <Link className="joined_Classes_title" to={`/${classData.id}`}>
              <h1 title="Click to open Class">{classData.className} </h1>
            </Link>
            <p className="joined_Classes_teacher">Teacher : {classData.displayName}</p>
            <p className="joined_Classes_Owner">{classData.owner}</p>
          </div>
        </div>
        
        <Avatar
          className="joined_Classes_avatar"
          src={classData.userpic}
          title={classData.owner}
        />
      </div>

      <div className="joined_Classes_icons">
        <PermContactCalendar />
        <FolderOpen />
        <Drafts />
        <InsertDriveFile />
      </div>
    </li>
  );
};

export default JoinedClasses;