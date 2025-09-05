import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  extractedData: {
    type: Object,
    required: true,
  },
  aiSummary: {
    type: String,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Invoice", invoiceSchema);
