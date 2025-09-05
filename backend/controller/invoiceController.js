import Invoice from "../models/invoiceSchema.js";
import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import { CohereClient } from "cohere-ai";

const cohere = new CohereClient({
  token: process.env.CO_API_KEY,
});

// ---------------- Upload an invoice (PDF/JPG) ----------------
export const uploadInvoice = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // --- Step 1: OCR Extraction ---
    const formData = new FormData();
    formData.append("file", fs.createReadStream(req.file.path), {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });
    formData.append("apikey", process.env.OCR_API_KEY);
    formData.append("language", "eng");

    const response = await axios.post("https://api.ocr.space/parse/image", formData, {
      headers: formData.getHeaders(),
    });

    const parsedText = response.data?.ParsedResults?.[0]?.ParsedText || "";
    console.log("OCR Parsed Text:\n", parsedText);

    // --- Step 2: Ask Cohere to structure the data ---
    const cohereResponse = await cohere.chat({
      model: "command-r-plus",
      message: `Extract the following fields from this invoice text:
      - Invoice Number
      - Date
      - Customer Name
      - Total Amount

      Return the result strictly in JSON format without explanations or markdown.
      {"invoiceNumber": "...", "date": "...", "customerName": "...", "totalAmount": "..."}

      Invoice text:
      ${parsedText}`,
    });

    let extractedData = {
      invoiceNumber: "Unknown",
      date: "Unknown",
      customerName: "Unknown",
      totalAmount: "Unknown",
    };

    try {
      let cleanText = cohereResponse.text
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();
      extractedData = JSON.parse(cleanText);
    } catch (err) {
      console.error("Error parsing Cohere response:", err);
    }

    // --- Step 3: Save to DB ---
    const invoice = await Invoice.create({
      fileName: req.file.originalname,
      extractedData,
    });

    res.status(201).json({ success: true, invoice });
  } catch (error) {
    console.error("Error uploading invoice:", error.response?.data || error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ---------------- Fetch structured invoice data ----------------
export const getInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findById(id);

    if (!invoice) {
      return res.status(404).json({ success: false, message: "Invoice not found" });
    }

    res.status(200).json({
      success: true,
      invoice,
    });
  } catch (error) {
    console.error("Error fetching invoice:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ---------------- Update invoice (user correction) ----------------
export const updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const { invoiceNumber, date, customerName, totalAmount } = req.body;

    const updatedInvoice = await Invoice.findByIdAndUpdate(
      id,
      {
        $set: {
          "extractedData.invoiceNumber": invoiceNumber,
          "extractedData.date": date,
          "extractedData.customerName": customerName,
          "extractedData.totalAmount": totalAmount,
        },
      },
      { new: true }
    );

    if (!updatedInvoice) {
      return res.status(404).json({ success: false, message: "Invoice not found" });
    }

    res.status(200).json({
      success: true,
      message: "Invoice updated successfully",
      invoice: updatedInvoice,
    });
  } catch (error) {
    console.error("Error updating invoice:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ---------------- Generate AI summary ----------------
export const generateSummary = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findById(id);

    if (!invoice) {
      return res.status(404).json({ success: false, message: "Invoice not found" });
    }

    const cohereResponse = await cohere.chat({
      model: "command-r-plus",
      message: `Write a single-sentence professional summary for this invoice JSON:
      ${JSON.stringify(invoice.extractedData)}`,
    });

    const summary = cohereResponse.text?.trim() || "Summary not generated";

    res.status(200).json({
      success: true,
      summary,
    });
  } catch (error) {
    console.error("Error generating summary:", error.response?.data || error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};







