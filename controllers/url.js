const shortId = require("shortid");
const URL = require("../models/url");
const shortid = require("shortid");

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body || !body.url)
        return res.status(400).json({ eror: "URL is Required" });
    const shortId = shortid.generate()
    await URL.create({
        shortId:shortId,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    })
    return res.status(201).render("home", {
        id:shortId
    });
}

async function handleGetTotalClicks(req, res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    if (!result)
        return res.status(404).render("home", {
        err:"Invalid Id"});
    return res.json({ Totalclicks:result.visitHistory.length });
}

async function handleGetToRedirectURLById(req, res) {
     const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: {
            timestamp:Date.now(),
        },
        },
    })
    if (!entry)
        return res.status(404).render("home", {
        err:"Invalid Id"}); 
    res.redirect(entry.redirectURL);
}
module.exports = {
    handleGenerateNewShortURL,
    handleGetTotalClicks,
    handleGetToRedirectURLById,
}