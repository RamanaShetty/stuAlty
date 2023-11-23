import { ChapterComponent } from "../components/ChapterComponent";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../configuration/firebaseConfig";
import { getDoc, doc, collection, getDocs } from "firebase/firestore";

export const SubjectComponent = () => {
  const location = useLocation();
  const subjectName = location.pathname.substring(1);
  const [subjectData, setSubjectData] = useState(null);

  useEffect(() => {
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
    fetchData();
  }, [subjectName]);

  if (!subjectData) {
    return null;
  }

  return (
    <>
      <h1>{subjectData.subjectName}</h1>
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
