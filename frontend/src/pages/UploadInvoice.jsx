import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InvoiceForm from "../components/InvoiceForm";
import "../App.css"

function UploadInvoice() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const response = await fetch("http://localhost:4000/api/v1/invoice/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        alert("Invoice uploaded successfully!");
        navigate(`/review/${data.invoice._id}`);
      } else {
        alert("Upload failed, try again.");
      }
    } catch (error) {
      console.error("Error uploading invoice:", error);
      alert("Error uploading invoice.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-page">
      <InvoiceForm
        handleFileChange={handleFileChange}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}

export default UploadInvoice;


