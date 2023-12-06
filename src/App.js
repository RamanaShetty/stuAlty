import "./styling/App.css";
import { HashRouter as Router } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Rout } from "./components/Routing";

function App() {
  return (
    <Router>
      <Navbar />
      <Rout />
    </Router>
  );
}

export default App;
