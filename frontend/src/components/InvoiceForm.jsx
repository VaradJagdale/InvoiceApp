const InvoiceForm = ({ handleFileChange, handleSubmit, loading }) => {
  return (
    <form onSubmit={handleSubmit} className="invoice-form">
      <h2>Upload Invoice</h2>

      <input
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={handleFileChange}
        className="file-input"
      />

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


