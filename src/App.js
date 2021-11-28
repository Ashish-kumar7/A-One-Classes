import React, { useEffect, useState } from "react";
import { Drawer, JoinedClasses, LoginPage, DetailsPage } from "./components";
import { BrowserRouter as Router, Switch, Route ,Redirect  } from "react-router-dom";
import { IsUserRedirect, ProtectedRoute } from "./route/Routes";
import { useLocalContext } from "./context/context";
import db from "./Firebase_library/firebase";
function App() {
  const { loggedInMail } = useLocalContext();

  const [createdClasses, setCreatedClasses] = useState([]);
  const [joinedClasses, setJoinedClasses] = useState([]);

  useEffect(() => {
    if (loggedInMail) {
      let unsubscribe = db
        .collection("CreatedClasses")
        .doc(loggedInMail)
        .collection("classes")
        .onSnapshot((snapshot) => {
          setCreatedClasses(snapshot.docs.map((doc) => doc.data()));
        });
      return () => unsubscribe();
    }
  }, [loggedInMail]);

  useEffect(() => {
    if (loggedInMail) {
      let unsubscribe = db
        .collection("JoinedClasses")
        .doc(loggedInMail)
        .collection("classes")
        .onSnapshot((snapshot) => {
          setJoinedClasses(snapshot.docs.map((doc) => doc.data().joinedData));
        });

      return () => unsubscribe();
    }
  }, [loggedInMail]);
  return (
    <Router>
      <Switch>
        <IsUserRedirect
          user={loggedInMail}
          loggedInPath="/"
          path="/SignIn"
          exact
        >
          <LoginPage />
        </IsUserRedirect>
        <ProtectedRoute user={loggedInMail} path="/" exact>
          <Drawer />
          <ol className="joined">
            {createdClasses.map((item) => (
              <JoinedClasses classData={item} />
            ))}

            {joinedClasses.map((item) => (
              <JoinedClasses classData={item} />
            ))}
          </ol>
        </ProtectedRoute>

        
        {createdClasses.map((item, index) => (
          <ProtectedRoute key={index} exact path={`/${item.id}`} user={loggedInMail}>
            <Drawer />
            <DetailsPage classData={item} />
          </ProtectedRoute>
        ))}
        {joinedClasses.map((item, index) => (
          <ProtectedRoute key={index} exact path={`/${item.id}`} user={loggedInMail}>
            <Drawer />
            <DetailsPage classData={item} />
          </ProtectedRoute>
        ))}


      </Switch>
    </Router>
  );
}

export default App;