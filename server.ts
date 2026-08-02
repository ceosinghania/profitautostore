import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini AI client securely on server side
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// API Route: AI Vehicle & Product Compatibility Assistant
app.post("/api/ai/compatibility", async (req, res) => {
  try {
    const { vehicleMake, vehicleModel, year, category, userQuery } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.status(503).json({
        error: "Gemini API key is not configured.",
        recommendation: `Recommended specification for ${vehicleMake || "Vehicle"} ${vehicleModel || ""}: Standard OEM grade products with high viscosity 5W-30 synthetic lubricant, 12V 60Ah DIN Battery, and DOT 4 Brake Fluid.`,
      });
    }

    const prompt = `You are the lead Master Automotive Engineer & Technical Advisor for PROFIT AUTOMOBILE STORE (Retail Chain of Big Business House).
Provide expert, ultra-precise technical recommendations for a customer's vehicle.

Vehicle Details:
- Make: ${vehicleMake || "General Automobile"}
- Model: ${vehicleModel || "Standard"}
- Year: ${year || "2023"}
- Interested Category: ${category || "General Products"}
- Customer Query: ${userQuery || "What are the optimal oil grade, battery specification, and recommended upgrades for my vehicle?"}

Format your response in structured sections:
1. Exact Technical Specifications (Engine Oil Grade & Capacity, Battery Type & Ah, Wiper Blade Sizes, Spark Plug Type)
2. Recommended PROFIT AUTOMOBILE STORE Premium Products & Brands (Castrol, Mobil, Bosch, Exide, Amaron, 3M, Sonax)
3. Recommended Modifications or Detailing Upgrades
4. Maintenance Tip from Master Mechanics

Keep the tone professional, authoritative, premium, and friendly. Maximum 350 words.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    res.json({ result: response.text });
  } catch (error: any) {
    console.error("AI Compatibility error:", error);
    res.status(500).json({
      error: "Failed to generate AI technical recommendation.",
      details: error.message,
    });
  }
});

// API Route: AI Automotive Expert Chatbot
app.post("/api/ai/chat", async (req, res) => {
  try {
    const { messages, userQuery } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.status(503).json({
        reply: "Hello! I am PROFIT AUTOMOBILE STORE's AI Automotive Assistant. How can I help you choose genuine spare parts, lubricants, batteries, or franchise details today?",
      });
    }

    const systemPrompt = `You are PROFIT AI, the official AI Concierge for PROFIT AUTOMOBILE STORE (Retail Chain of Big Business House) - India's flagship automotive retail chain.
You assist users with:
- Finding genuine lubricants (Castrol, Mobil, Shell, Gulf)
- Selecting car/bike/truck/inverter batteries (Exide, Amaron, Luminous)
- Automobile accessories (Android Stereo, LED Lights, Dash Cams, Floor Mats, Wipers)
- Spare parts & Filters (Bosch, Brake Pads, Air/Oil/Fuel Filters)
- Car care & Detailing (3M, Sonax, Meguiar's, Ceramic Coating)
- Franchise Opportunities (₹5L - ₹25L Investment, 20-35% profit margin, 300-1500 sq ft)
- Nearest Store Locator assistance across Pan-India

Always be polite, enthusiastic, corporate, and highlight "Driven by Trust. Focused on Quality." and "Retail Chain of Big Business House".`;

    const promptText = userQuery || (messages && messages[messages.length - 1]?.text) || "Hello";

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: promptText,
      config: {
        systemInstruction: systemPrompt,
      },
    });

    res.json({ reply: response.text });
  } catch (error: any) {
    console.error("AI Chat error:", error);
    res.status(500).json({
      reply: "Thank you for reaching out to PROFIT AUTOMOBILE STORE. Please call our hotline at 1800-102-PROFIT or visit your nearest store for immediate help.",
    });
  }
});

// API Route: Franchise Feasibility & Application
app.post("/api/franchise/submit", (req, res) => {
  const { fullName, phone, email, city, state, investmentBudget, proposedSpace, timeline } = req.body;

  // Calculate estimated ROI score
  let score = "HIGH FEASIBILITY";
  let estimatedMonthlyProfit = "₹1.2 Lakhs - ₹3.5 Lakhs";
  let breakEvenMonths = "6 - 10 Months";

  if (investmentBudget === "5-10L") {
    estimatedMonthlyProfit = "₹80,000 - ₹1.5 Lakhs";
    breakEvenMonths = "8 - 12 Months";
  } else if (investmentBudget === "20L+") {
    estimatedMonthlyProfit = "₹3.0 Lakhs - ₹6.0 Lakhs";
    breakEvenMonths = "5 - 8 Months";
  }

  res.json({
    status: "SUCCESS",
    applicationId: `PAS-FR-${Math.floor(100000 + Math.random() * 900000)}`,
    message: "Thank you for your interest in becoming a Franchise Partner with Profit Automobile Store (Big Business House). Our Expansion Director will contact you within 24 hours.",
    feasibilityReport: {
      score,
      estimatedMonthlyProfit,
      breakEvenMonths,
      assignedTerritoryManager: "Rajesh Sharma (National Franchise Head)",
    },
  });
});

// API Route: Instant Quote Request
app.post("/api/quote/generate", (req, res) => {
  const { name, phone, email, items, storeLocation } = req.body;
  const quoteId = `PAS-QT-${Math.floor(100000 + Math.random() * 900000)}`;
  
  res.json({
    quoteId,
    timestamp: new Date().toISOString(),
    customerName: name,
    storeLocation: storeLocation || "Pan-India Central Warehouse",
    status: "CONFIRMED_VIP_QUOTE",
    discountApplied: "12% Corporate Big Business House Discount",
    deliveryEstimate: "24-48 Hours Express Dispatch",
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
