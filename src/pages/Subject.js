import { ChapterComponent } from "../components/ChapterComponent";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db, auth } from "../configuration/firebaseConfig";
import { getDoc, doc, collection, getDocs } from "firebase/firestore";

export const SubjectComponent = () => {
  const location = useLocation();
  const subjectName = location.pathname.substring(1);
  const [subjectData, setSubjectData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      // Wait for Firebase to initialize before checking authentication
      await new Promise((resolve) => auth.onAuthStateChanged(resolve));

      const user = auth.currentUser;
      if (!user) {
        alert("Please log in to access the data!!");
        navigate("/");
      } else {
        fetchData();
      }
    };

    checkAuthentication();
  }, [subjectName, navigate]);

  const fetchData = async () => {
    try {
      const subjectRef = doc(db, "subjects", subjectName);
      const docSnapshot = await getDoc(subjectRef);

      if (docSnapshot?.exists()) {
        const data = docSnapshot.data();
        // console.log("Subject Data:", data);

        // Fetch chapters subcollection
        const chaptersQuerySnapshot = await getDocs(
          collection(db, "subjects", subjectName, "chapters")
        );
        const chaptersData = chaptersQuerySnapshot.docs.map((doc) =>
          doc.data()
        );

        setSubjectData({
          ...data,
          chapters: chaptersData,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!subjectData) {
    return null;
  }

  return (
    <>
      <h1 className="subject-name">{subjectData.subjectName}</h1>
      <section className="main-section">
        {subjectData.chapters &&
          subjectData.chapters.map((item) => (
            <ChapterComponent
              key={item.chapterName}
              chapterData={item}
              subjectId={subjectName}
            />
          ))}
      </section>
    </>
  );
};
