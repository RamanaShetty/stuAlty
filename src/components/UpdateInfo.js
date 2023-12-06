import { useLocation } from "react-router-dom";
import { useState,useEffect } from "react";
import { db } from "../configuration/firebaseConfig";
import { addDoc, doc, collection, getDoc } from "firebase/firestore";
import { auth } from "../configuration/firebaseConfig";
import { useNavigate } from "react-router-dom";

export const UpdateInfo = () => {
  const [chapterName, setChapterName] = useState("");
  const [chapterLink, setChapterLink] = useState("");
  const [subjectName,setSubjectName] = useState("");
  const navigate = useNavigate();

  const { state } = useLocation();
  const currentLocation = state?.currentLocation || "unkown";

  const collectionName = "subjects";
  const subjectID = currentLocation.slice(1);

  useEffect(() => {
    const fetchSubjectData = async () => {
      try {
        const subjectRef = doc(db, collectionName, subjectID);
        const docSnapshot = await getDoc(subjectRef);

        if (docSnapshot?.exists()) {
          const data = docSnapshot.data();
          setSubjectName(data.subjectName);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchSubjectData();
  }, [subjectID]);

  const handleSubmit = async () => {
    try {
      const user = auth.currentUser;

      const emaill = user.email.slice(0, user.email.indexOf("@"));

      const chapter = {
        chapterName: chapterName,
        chapterLink: chapterLink,
        chapterStatus: "0",
        uploadBy: emaill,
      };

      console.log("Chapter to be added:", chapter);

      const chapterCollectionRef = collection(
        doc(db, collectionName, subjectID),
        "chapters"
      );

      await addDoc(chapterCollectionRef, chapter);

      console.log("Data uploaded successfully");

      navigate(currentLocation);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="forms">
      <h2>New topic for {subjectName}</h2>
      <div className="updateForm">
        <label>
          <input
            type="text"
            onChange={(e) => setChapterName(e.target.value)}
            placeholder="Topic Name"
          />
        </label>
        <label>
          <input
            type="text"
            onChange={(e) => setChapterLink(e.target.value)}
            placeholder="Link"
          />
        </label>
        <button type="submit" className="submitForm" onClick={handleSubmit}>
          ADD
        </button>
      </div>
    </div>
  );
};
