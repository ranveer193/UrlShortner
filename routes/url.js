const express = require("express");

const router = express.Router();
const { handleGenerateNewShortURL,
    handleGetTotalClicks,
    handleGetToRedirectURLById
} = require("../controllers/url");

router.post("/",handleGenerateNewShortURL);
router.get("/analytics/:shortId", handleGetTotalClicks)
router.get("/:shortId", handleGetToRedirectURLById);

module.exports = router;