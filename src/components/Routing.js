import { Routes, Route } from "react-router-dom";
import { SubjectComponent } from "../pages/Subject";

export const Rout = () => {
  return (
    <Routes>
      <Route path="/and" element={<SubjectComponent />}></Route>
      <Route path="/coa" element={<SubjectComponent />}></Route>
      <Route path="/dbms" element={<SubjectComponent />}></Route>
      <Route path="/dm" element={<SubjectComponent />}></Route>
      <Route path="/oops" element={<SubjectComponent />}></Route>
      <Route path="/acd" element={<SubjectComponent />}></Route>
      <Route path="/cn" element={<SubjectComponent />}></Route>
      <Route path="/os" element={<SubjectComponent />}></Route>
      <Route path="/ai" element={<SubjectComponent />}></Route>
      <Route path="/datastructures" element={<SubjectComponent />}></Route>
    </Routes>
  );
};
