import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Key } from "../components/Navbar";

const ChapterComponent = (chapterData, subjectId) => {
  const setProgressOfChapter = (progress) => {
    try {
      const data = JSON.parse(localStorage.getItem(Key));

      for (let i = 0; i < data.length; i++) {
        if (data[i].subjectId === subjectId) {
          for (let j = 0; j < data[i].chapters.length; j++) {
            if (data[i].chapters[j].chapterName === chapterData.chapterName) {
              data[i].chapters[j].chapterStatus = progress;
            }
          }
        }
      }
      localStorage.setItem(Key, JSON.stringify(data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const setValue = chapterData.chapterStatus;
    const selectElement = document.getElementById(chapterData.chapterName);

    console.log(chapterData);
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
                <img src="https://takeuforward.org/wp-content/uploads/2022/08/youtube-icon-42001-300x300.png.webp" />
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
  const subjectData = JSON.parse(localStorage.getItem(Key));
  const data = subjectData.filter(
    (record) => record.subjectId === subjectName
  )[0];

  return (
    <>
      <h1>{data.subjectName}</h1>
      <section className="main-section">
        {data.chapters.map((item) => ChapterComponent(item, subjectName))}
      </section>
    </>
  );
};
