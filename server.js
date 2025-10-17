const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Serve static frontend files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// ✅ API route for translation
app.post("/translate", async (req, res) => {
  const { text, sourceLang, targetLang } = req.body;

  try {
    const response = await axios.get("https://translate.googleapis.com/translate_a/single", {
      params: {
        client: "gtx",
        sl: sourceLang,
        tl: targetLang,
        dt: "t",
        q: text,
      },
    });

    const translatedText = response.data[0][0][0];
    res.json({ translatedText });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Translation failed" });
  }
});

// ✅ Run the server
app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
