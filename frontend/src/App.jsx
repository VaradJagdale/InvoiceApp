import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import UploadInvoice from "./pages/UploadInvoice";
import ReviewInvoice from "./pages/ReviewInvoice";
import Summary from "./pages/Summary";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>

        <Route path="/" element={<UploadInvoice />} />

        <Route path="/review/:id" element={<ReviewInvoice />} />

        <Route path="/summary/:id" element={<Summary />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;


