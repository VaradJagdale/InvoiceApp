import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
    </Router>
  );
}

export default App;


