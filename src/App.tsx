import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./components/AppRouter/AppRouter";
import "./App.scss";

const App = () => {
  return (
    <div className="App">
      <Router>
        <AppRouter />
      </Router>
    </div>
  );
};

export default App;
