import express from "express";
import multer from "multer";
import { uploadInvoice, getInvoice, updateInvoice, generateSummary } from "../controller/invoiceController.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

// ---------------- Routes ----------------

router.post("/invoice/upload", upload.single("file"), uploadInvoice);

router.get("/invoice/:id", getInvoice);

router.put("/invoice/:id", updateInvoice);

router.post("/invoice/:id/summary", generateSummary);

export default router;

