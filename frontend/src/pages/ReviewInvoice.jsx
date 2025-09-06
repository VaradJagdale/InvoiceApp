import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import InvoiceDetails from "../components/InvoiceDetails";
import "../App.css";

const ReviewInvoice = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await axios.get(`https://invoiceapp-backend-ja3d.onrender.com/api/v1/invoice/${id}`);
        setInvoice(res.data.invoice);
      } catch (err) {
        console.error("Error fetching invoice:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoice();
  }, [id]);

  const handleSave = async (updatedData) => {
    try {
      const res = await axios.put(`https://invoiceapp-backend-ja3d.onrender.com/api/v1/invoice/${id}`, updatedData);
      alert("Invoice updated successfully!");
      navigate(`/summary/${id}`);
    } catch (err) {
      console.error("Error updating invoice:", err);
      alert("Update failed!");
    }
  };

  if (loading) return <p className="loading">Loading invoice...</p>;

  return (
    <div className="review-page">
      <h2>Review & Edit Invoice</h2>
      <InvoiceDetails invoice={invoice.extractedData} onSave={handleSave} />
    </div>
  );
};

export default ReviewInvoice;



