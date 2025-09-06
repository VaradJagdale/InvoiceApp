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
        <label htmlFor="invoiceNumber">Invoice Number</label>
        <input
          type="text"
          id="invoiceNumber"
          name="invoiceNumber"
          value={formData.invoiceNumber || ""}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          type="text"
          id="date"
          name="date"
          value={formData.date || ""}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="customerName">Customer Name</label>
        <input
          type="text"
          id="customerName"
          name="customerName"
          value={formData.customerName || ""}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="totalAmount">Total Amount</label>
        <input
          type="text"
          id="totalAmount"
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


