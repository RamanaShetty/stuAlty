import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../configuratoin/firebaseConfig";
import {
  getDoc,
  doc,
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const ChapterComponent = ({ chapterData, subjectId }) => {
  const setProgressOfChapter = async (progress) => {
    try {
      const docRef = doc(db, "subjects", subjectId);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        const chaptersQuerySnapshot = await getDocs(
          collection(db, "subjects", subjectId, "chapters")
        );

        // console.log(chaptersQuerySnapshot);

        const chaptersData = chaptersQuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const chapterIndex = chaptersData.findIndex(
          (chapter) => chapter.chapterName === chapterData.chapterName
        );

        if (chapterIndex !== -1) {
          chaptersData[chapterIndex] = {
            ...chaptersData[chapterIndex],
            chapterStatus: progress,
          };

          console.log(chaptersData);

          const chapterDocId = chaptersQuerySnapshot.docs[chapterIndex].id;
          const chapterDocRef = doc(
            db,
            "subjects",
            subjectId,
            "chapters",
            chapterDocId
          );

          await updateDoc(chapterDocRef, {
            chapterStatus: progress,
          });

          // Update the entire 'chapters' array in the Firestore document
          await updateDoc(docRef, {
            chapters: chaptersData.map(({ id, ...rest }) => rest),
          });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const setValue = chapterData.chapterStatus;
    const selectElement = document.getElementById(chapterData.chapterName);

    selectElement.selectedIndex = setValue.toString();
  }, []);

  return (
    <table>
      <tbody>
        <tr>
          <td>
            <select
              id={chapterData.chapterName}
              onChange={(e) => setProgressOfChapter(e.target.value)}
            >
              <option value="0">Pending</option>
              <option value="1">Done</option>
              <option value="2">ReDo</option>
            </select>
          </td>
          <td>{chapterData.chapterName}</td>
          <td>
            <button className="img-button">
              <a
                href={chapterData.chapterLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://takeuforward.org/wp-content/uploads/2022/08/youtube-icon-42001-300x300.png.webp"
                  alt="youtube"
                />
              </a>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

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

  // console.log("Subject Data:", subjectData);

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
