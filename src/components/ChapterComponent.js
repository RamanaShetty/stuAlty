import { useEffect } from "react";
import { db } from "../configuration/firebaseConfig";
import {
  getDoc,
  doc,
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";

export const ChapterComponent = ({ chapterData, subjectId }) => {
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
