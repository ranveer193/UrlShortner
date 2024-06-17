const User = require("../models/user");
const { setUser } = require("../services/auth");
const express = require("express");

async function handleUserSignup(req, res) {
    const { user_name, email, password } = req.body;
    await User.create({
        user_name,
        email,
        password,
    });
    return res.render("home", {
        name: user_name,
    });
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({
        email, password
    });
    if (!user)
        return res.render("login", {
            err: "Invalid email or password"
        })
    const token = setUser(user);
    res.cookie("uid", token);
    // return res.json({ token });
    return res.redirect("/");
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
}