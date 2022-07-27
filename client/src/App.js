import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import New from "./components/New";
import Show from "./components/Show";
import Requests from "./components/Requests";
import RequestNew from "./components/RequestNew";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/campaign/new" element={<New />} />
        <Route path="/campaign/:address" element={<Show />} />
        <Route path="/campaign/:address/requests" element={<Requests />} />
        <Route
          path="/campaign/:address/requests/new"
          element={<RequestNew />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
