import { useState } from "react";
import "../App.css";

const InvoiceDetails = ({ invoice, onSave }) => {
  const [formData, setFormData] = useState(invoice || {});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form className="invoice-details" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Invoice Number</label>
        <input
          type="text"
          name="invoiceNumber"
          value={formData.invoiceNumber || ""}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Date</label>
        <input
          type="text"
          name="date"
          value={formData.date || ""}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Customer Name</label>
        <input
          type="text"
          name="customerName"
          value={formData.customerName || ""}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Total Amount</label>
        <input
          type="text"
          name="totalAmount"
          value={formData.totalAmount || ""}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="save-btn">
        Save & Continue
      </button>
    </form>
  );
};

export default InvoiceDetails;

