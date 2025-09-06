import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import InvoiceDetails from "../components/InvoiceDetails";
import "../App.css";

const Summary = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [summary, setSummary] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await axios.get(`https://invoiceapp-backend-ja3d.onrender.com/api/v1/invoice/${id}`);
        setInvoice(res.data.invoice);
      } catch (err) {
        console.error("Error fetching invoice:", err);
      }
    };
    fetchInvoice();
  }, [id]);

  const generateSummary = async () => {
    try {
      const res = await axios.post(`https://invoiceapp-backend-ja3d.onrender.com/api/v1/invoice/${id}/summary`);
      setSummary(res.data.summary);
    } catch (err) {
      console.error("Error generating summary:", err);
    }
  };

  return (
    <div className="summary-page">
      <h2>Invoice Summary</h2>

      {invoice && (
        <div className="summary-card">
          <InvoiceDetails invoice={invoice.extractedData} onSave={() => { }} />
        </div>
      )}

      <div className="summary-actions">
        <button className="generate-btn" onClick={generateSummary}>
          Generate Summary
        </button>
        <button className="back-btn" onClick={() => navigate("/")}>
          Back to Upload
        </button>
      </div>

      {summary && (
        <div className="summary-box">
          <h3>AI Generated Summary</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default Summary;


