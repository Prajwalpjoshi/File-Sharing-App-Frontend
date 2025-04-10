import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Filepage from "./pages/Filepage";
import DownloadPage from "./pages/DownloadPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/files" element={<Filepage />} />
        <Route path="/download/:id" element={<DownloadPage />} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
