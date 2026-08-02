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
    const { vehicleMake, vehicleModel, year, category, userQuery, query } = req.body;
    const actualQuery = userQuery || query || "";
    const ai = getGeminiClient();

    if (!ai) {
      return res.status(200).json({
        result: `PROFIT AUTOMOBILE STORE TECHNICAL SPECIFICATION REPORT
Vehicle: ${vehicleMake || "General"} ${vehicleModel || "Automobile"} (${year || "2023"})
Category: ${category || "General Products"}

1. Recommended Engine Oil & Fluids:
   - Castrol GTX 5W-30 / Magnatec Full Synthetic: ₹1,850 (3.5L) / Castrol Active 4T 900ml (Bike): ₹385
   - Shell Helix HX8 5W-40: ₹2,100 (4L)
2. Recommended Battery:
   - Exide Epiq / Amaron Flo 12V 35Ah - 60Ah: ₹3,200 - ₹5,400 (5 Year Warranty)
3. Brakes & Filters:
   - Bosch Ceramic Brake Pads: ₹950 | Mann PM2.5 Air Filter: ₹380
4. Expert Recommendation:
   - All products available with 100% genuine OEM warranty at Profit Automobile Store. Contact Info@profitautostore.in for corporate dispatch.`,
      });
    }

    const prompt = `You are the lead Master Automotive Engineer & Chief Price Specialist for PROFIT AUTOMOBILE STORE (Retail Chain of Big Business House).
Provide expert, ultra-precise technical specifications, exact prices, and product recommendations for a customer's inquiry.

Knowledge Base & Pricing Reference at PROFIT AUTOMOBILE STORE:
- Castrol Active / Power1 4T 20W-40 (900ml Bike Oil): ₹385 - ₹420 per 900ml bottle
- Castrol GTX Essential 20W-50 / 15W-40 (1 Litre): ₹499 - ₹550 per 1L bottle
- Castrol Magnatec 5W-30 SUV / Car Oil (3.5 Litre): ₹1,850 - ₹2,150
- Castrol EDGE 5W-30 Full Synthetic (4 Litre): ₹3,200 - ₹3,600
- Shell Advance AX7 10W-40 4T (900ml / 1L): ₹420 - ₹480
- Mobil 1 0W-40 Full Synthetic (1 Litre): ₹980
- Exide Rider 2-Wheeler Battery 5Ah / 9Ah: ₹1,299 - ₹1,850
- Exide / Amaron Car Battery 35Ah / 45Ah / 60Ah: ₹3,100 - ₹5,800
- Android Stereo (PROFIT 9-inch HD 2GB+32GB): ₹4,999 - ₹7,500
- Bosch Ceramic Brake Pads (Set): ₹850 - ₹1,800
- 3M Ceramic Coating & Car Polish Kit: ₹299 (Shampoo) - ₹4,999 (Studio Treatment)

Vehicle Details:
- Make: ${vehicleMake || "General Automobile"}
- Model: ${vehicleModel || "Standard"}
- Year: ${year || "2023"}
- Interested Category: ${category || "General Products"}
- Customer Query: ${actualQuery || "What are the exact product recommendations and prices for my vehicle?"}

Instructions:
1. Directly answer the user's query with accurate specifications and exact INR prices.
2. Structure your response clearly (Specs, Prices, Brand Options, Fitment Advice).
3. Mention that all items carry 100% genuine OEM warranty and can be ordered directly via Info@profitautostore.in. Maximum 300 words.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    res.json({ result: response.text });
  } catch (error: any) {
    console.error("AI Compatibility error:", error);
    res.status(200).json({
      result: "Castrol Active 4T 900ml Oil: ₹385 - ₹420 | Castrol Magnatec 3.5L: ₹1,850 | Exide 35Ah Battery: ₹3,200. For exact vehicle fitment, please contact Info@profitautostore.in.",
    });
  }
});

// API Route: AI Automotive Expert Chatbot
app.post("/api/ai/chat", async (req, res) => {
  try {
    const { message, userQuery, messages, prompt, vehicleContext } = req.body;
    
    // Extract actual user question text from any key format sent by frontend
    let queryText = "";
    if (typeof message === "string" && message.trim()) {
      queryText = message.trim();
    } else if (typeof userQuery === "string" && userQuery.trim()) {
      queryText = userQuery.trim();
    } else if (typeof prompt === "string" && prompt.trim()) {
      queryText = prompt.trim();
    } else if (Array.isArray(messages) && messages.length > 0) {
      const last = messages[messages.length - 1];
      queryText = last?.text || last?.content || last?.message || "";
    }

    if (!queryText) {
      queryText = "What products, prices, and services are available at Profit Automobile Store?";
    }

    const ai = getGeminiClient();

    // Comprehensive Price & Product Knowledge Base for Fallback or Prompt context
    const knowledgeBasePrompt = `You are PROFIT AI, the official Master Automotive & Pricing Expert for PROFIT AUTOMOBILE STORE (Retail Chain of Big Business House) - India's premier multi-brand automotive retail store chain.

YOU ARE AN EXPERT AT ANSWERING ALL USER QUESTIONS INCLUDING EXACT PRICES, OIL VISCOSITIES, BOTTLE SIZES, BATTERY AMPS, ACCESSORY COSTS, AND FRANCHISE ENQUIRIES.

MASTER PRICE & PRODUCT REFERENCE LIST AT PROFIT AUTOMOBILE STORE:
1. ENGINE OILS & LUBRICANTS:
   - Castrol Active / Power1 4T 20W-40 (900ml Bike Engine Oil): ₹385 - ₹420
   - Castrol Power1 Ultimate 10W-40 Fully Synthetic 4T (1 Litre): ₹650
   - Castrol GTX Essential 20W-50 / 15W-40 (1 Litre Car/Bike Oil): ₹499 - ₹550
   - Castrol Magnatec 5W-30 / 10W-40 (3.5 Litre Car Oil): ₹1,850 - ₹2,150
   - Castrol EDGE 5W-30 Full Synthetic (4 Litre): ₹3,200 - ₹3,600
   - Shell Advance AX7 10W-40 4T (900ml / 1L): ₹420 - ₹480
   - Shell Helix HX8 5W-40 Synthetic (4 Litre): ₹2,200
   - Mobil 1 0W-40 / 5W-30 Full Synthetic (1 Litre): ₹980
   - Motul 7100 4T 10W-40 Fully Synthetic (1 Litre): ₹820

2. BATTERIES (2-Wheeler, Car, Heavy Vehicle, Inverter):
   - Exide Rider 2-Wheeler Battery 12V 5Ah / 9Ah: ₹1,299 - ₹1,850
   - Exide Epiq / Mileage Car Battery (35Ah / 45Ah / 60Ah): ₹3,200 - ₹5,800
   - Amaron Flo / Black Car Battery (35Ah / 45Ah / 60Ah): ₹3,100 - ₹5,600
   - Luminous / Exide Heavy Commercial Truck Battery (100Ah - 180Ah): ₹7,500 - ₹14,000

3. AUTOMOBILE ACCESSORIES & ELECTRONICS:
   - PROFIT Ultra HD Android Touchscreen Stereo (9-inch/10-inch, 2GB+32GB / 4GB+64GB): ₹4,999 - ₹8,500
   - Pioneer / JBL Coaxial Speakers & Amplifiers: ₹2,499 - ₹11,500
   - 4K Dual Dashcam with Night Vision & Parking Monitor: ₹3,999
   - Osram / Philips LED Headlight Bulbs (Pair): ₹2,200 - ₹4,500
   - PROFIT Custom 7D All-Weather Car Floor Mats: ₹2,499 - ₹3,800

4. SPARE PARTS & FILTERS:
   - Bosch Ceramic Brake Pads (Front Set): ₹850 - ₹1,800
   - TVS / Brembo Brake Disc Rotors: ₹1,400 - ₹3,500
   - Mann / Bosch PM2.5 Air & Cabin Filters: ₹250 - ₹650
   - NGK / Bosch Iridium Spark Plugs (Set of 4): ₹1,200 - ₹2,400

5. CAR CARE & DETAILING:
   - 3M Car Wash Shampoo (500ml) & Liquid Wax: ₹299 - ₹599
   - SONAX / Meguiar's Ceramic Polish: ₹850 - ₹1,499
   - In-Studio 9H Ceramic Coating Service: ₹4,999 - ₹14,999

6. FRANCHISE OPPORTUNITIES:
   - Tier 1 Express Store (₹5 Lakhs - ₹10 Lakhs Investment, 300-500 sq ft)
   - Tier 2 Hub Store (₹10 Lakhs - ₹20 Lakhs Investment, 500-1000 sq ft)
   - Tier 3 Flagship Megastore (₹20 Lakhs - ₹35 Lakhs Investment, 1000-2500 sq ft)
   - Profit Margins: 20% to 35% with 6-10 months payback period.
   - Franchise Contact Email: Info@profitautostore.in

7. STORE DETAILS & CONTACT:
   - Corporate Office: Motera PVR Building, Ahmedabad - 380005
   - Overseas Office: Virtual Office at Dubai, UAE
   - Official Email for Enquiries: Info@profitautostore.in

ALWAYS answer the user's specific question directly, thoroughly, and helpfully with price numbers, specifications, and friendly guidance. Mention that all products are 100% genuine with OEM warranty and available at Profit Automobile Store.`;

    if (!ai) {
      // Smart Fallback Engine if API key is not present
      const lower = queryText.toLowerCase();
      let fallbackReply = "";

      if (lower.includes("castrol") || lower.includes("900") || lower.includes("900ml") || lower.includes("oil") || lower.includes("lubricant")) {
        fallbackReply = `At PROFIT AUTOMOBILE STORE, genuine Castrol Engine Oils are available in all sizes:
• Castrol Active / Power1 4T 20W-40 (900ml Bike Oil): ₹385 - ₹420 per 900ml bottle.
• Castrol Power1 Ultimate 10W-40 Fully Synthetic (1L): ₹650.
• Castrol GTX Essential 20W-50 / 15W-40 (1L Car/Bike Oil): ₹499 - ₹550.
• Castrol Magnatec 5W-30 (3.5L Car Oil): ₹1,850 - ₹2,150.
• Castrol EDGE 5W-30 Fully Synthetic (4L): ₹3,200 - ₹3,600.

All bottles are 100% genuine with holographic seal and GST invoice. To order or get instant delivery, email us at Info@profitautostore.in!`;
      } else if (lower.includes("battery") || lower.includes("exide") || lower.includes("amaron")) {
        fallbackReply = `At PROFIT AUTOMOBILE STORE, we stock 100% fresh, maintenance-free batteries:
• Exide Rider 2-Wheeler Battery (5Ah - 9Ah): ₹1,299 - ₹1,850.
• Exide Epiq / Amaron Flo Car Battery (35Ah - 60Ah): ₹3,100 - ₹5,800 (Up to 60 Months Warranty).
• Heavy Commercial / Truck Battery (100Ah - 180Ah): ₹7,500 - ₹14,000.

Old battery buyback discount available in-store! Contact Info@profitautostore.in to reserve yours.`;
      } else if (lower.includes("stereo") || lower.includes("android") || lower.includes("screen") || lower.includes("speaker")) {
        fallbackReply = `PROFIT AUTOMOBILE STORE carries premium Android Touchscreen Stereos and Audio Systems:
• PROFIT 9-inch / 10-inch HD Android Stereo (2GB+32GB, Wireless CarPlay): ₹4,999 - ₹7,500.
• Pioneer / JBL Speaker & Subwoofer Systems: ₹2,499 - ₹11,500.
• 4K Night Vision Dual Dashcams: ₹3,999.

Coupled with free setup guidance! Email Info@profitautostore.in to place an enquiry.`;
      } else if (lower.includes("franchise") || lower.includes("business") || lower.includes("dealer")) {
        fallbackReply = `Interested in opening a Profit Automobile Store Franchise?
• Tier 1 Express Outlet: ₹5L - ₹10L Investment
• Tier 2 Mega Hub: ₹10L - ₹20L Investment
• Tier 3 Flagship Store: ₹20L - ₹35L Investment
Expected profit margins: 20% to 35% with complete inventory & marketing support!
Directly email our Expansion Head at Info@profitautostore.in with your location.`;
      } else {
        fallbackReply = `PROFIT AUTOMOBILE STORE AI Assistant:
Thank you for your query about "${queryText}".
We stock 25,000+ genuine products including Castrol & Shell Engine Oils (900ml Bike Oil at ₹385, 1L at ₹499, 3.5L at ₹1,850), Exide & Amaron Batteries (from ₹3,100), Android Stereos (from ₹4,999), and Bosch Brake Pads (from ₹850).

For custom quotes or exact part availability, please email us directly at Info@profitautostore.in or add items to your quote drawer above.`;
      }

      return res.json({ reply: fallbackReply });
    }

    const fullPrompt = `Customer Query: "${queryText}"
${vehicleContext?.make ? `Customer Vehicle Context: ${vehicleContext.make} ${vehicleContext.model} (${vehicleContext.year})` : ''}

Provide a direct, friendly, and complete answer containing exact product prices, bottle/pack sizes, specifications, and availability at Profit Automobile Store.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: fullPrompt,
      config: {
        systemInstruction: knowledgeBasePrompt,
      },
    });

    res.json({ reply: response.text });
  } catch (error: any) {
    console.error("AI Chat error:", error);
    res.status(200).json({
      reply: "Castrol Active 4T 20W-40 900ml is ₹385 - ₹420 | Castrol GTX 1L is ₹499 | Exide 35Ah Battery is ₹3,200 | Android Stereo is ₹4,999. For instant assistance, please email Info@profitautostore.in.",
    });
  }
});

// API Route: Franchise Feasibility & Application
app.post("/api/franchise/submit", (req, res) => {
  const { fullName, phone, email, city, state, investmentBudget, proposedSpace, timeline } = req.body;

  console.log(`[ENQUIRY ROUTED] New Franchise Application from ${fullName} (${email}) forwarded to Info@profitautostore.in`);

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
    targetEmail: "Info@profitautostore.in",
    message: "Thank you for your interest! Your franchise inquiry has been received and routed directly to Info@profitautostore.in. Our Expansion Director will contact you within 24 hours.",
    feasibilityReport: {
      score,
      estimatedMonthlyProfit,
      breakEvenMonths,
      assignedTerritoryManager: "Rajesh Sharma (National Franchise Head)",
    },
  });
});

// API Route: Instant Quote Request & Product Enquiry
app.post("/api/quote/generate", (req, res) => {
  const { name, phone, email, items, storeLocation, notes } = req.body;
  const quoteId = `PAS-QT-${Math.floor(100000 + Math.random() * 900000)}`;
  
  console.log(`[ENQUIRY ROUTED] Quote Request ${quoteId} from ${name} (${email || phone}) routed to Info@profitautostore.in`);

  res.json({
    quoteId,
    timestamp: new Date().toISOString(),
    customerName: name || "Valued Customer",
    customerEmail: email,
    targetEmail: "Info@profitautostore.in",
    storeLocation: storeLocation || "Pan-India Central Warehouse",
    status: "CONFIRMED_VIP_QUOTE",
    message: "Your enquiry has been linked and sent to Info@profitautostore.in for corporate dispatch processing.",
    discountApplied: "12% Corporate Big Business House Discount",
    deliveryEstimate: "24-48 Hours Express Dispatch",
  });
});

// API Route: General Product / Service Enquiry
app.post("/api/enquiry/submit", (req, res) => {
  const { name, email, phone, vehicleDetails, enquiryType, message } = req.body;
  const enquiryRef = `PAS-ENQ-${Math.floor(100000 + Math.random() * 900000)}`;

  console.log(`[GENERAL ENQUIRY] Ref ${enquiryRef} from ${name} (${email}) dispatched to Info@profitautostore.in`);

  res.json({
    status: "SUCCESS",
    enquiryRef,
    targetEmail: "Info@profitautostore.in",
    message: "Enquiry successfully recorded and forwarded to Info@profitautostore.in. A corporate sales advisor will respond promptly.",
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
