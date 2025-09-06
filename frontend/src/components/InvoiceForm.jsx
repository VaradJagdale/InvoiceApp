const InvoiceForm = ({ handleFileChange, handleSubmit, loading }) => {
  return (
    <form onSubmit={handleSubmit} className="invoice-form">
      <h2>Upload Invoice</h2>

      <div className="form-group">
        <label htmlFor="invoiceFile">Select Invoice File</label>
        <input
          type="file"
          id="invoiceFile"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          className="file-input"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="upload-btn"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
};

export default InvoiceForm;



