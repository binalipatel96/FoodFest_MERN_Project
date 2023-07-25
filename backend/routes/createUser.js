const express = require('express');
const router = express.Router();
const user = require('../model/user');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = "###MyNameIsBinaliPatelThisIsMyReactProject###";

//-------------------SIGN UP CODE-------------------
router.post("/createuser", [

    // name must be at least 3 chars long
    body('name', "Name must be at least 3 character long.").isLength({ min: 3 }),
    // password must be at least 5 chars long
    body('password', "Password must be at least 5 character long.").isLength({ min: 5 }),
    // email must be an email
    body('email', "Invalid Email").isEmail()],
    async (req, res) => {

        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //To make the password secure we will use bcrypt js. This will store the password in the database as hashed value.
        const salt = await bcrypt.genSalt(10);
        let securePassword = await bcrypt.hash(req.body.password, salt);

        try {
            //creating a user 
            await user.create({
                name: req.body.name,
                password: securePassword,
                email: req.body.email,
                location: req.body.location
            })
            res.json({ success: true });
        } catch (error) {
            console.log(error)
            res.json({ success: false });
        }
    })

//-------------------LOGIN CODE-------------------
router.post("/loginuser", [
    // password must be at least 5 chars long
    body('password', "Password must be at least 5 character long.").isLength({ min: 5 }),
    // email must be an email
    body('email', "Invalid Email").isEmail()],
    async (req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email;
        try {
            //find the user
            let userData = await user.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "You have entered an invalid email or password." });
            }

            //Compares the password which is entered by the user with hashed password in the database
            const passwordCompare = await bcrypt.compare(req.body.password, userData.password);
            if (!passwordCompare) {
                return res.status(400).json({ errors: "You have entered an invalid email or password." });
            }

            // creating jwt token while login 
            const data = {
                userId: {
                    id: userData.id
                }
            }
            const authToken = jwt.sign(data, jwtSecret);
            return res.json({ success: true , authToken: authToken});
            // return res.json({ success: true});

        } catch (error) {
            console.log(error)
            res.json({ success: false });
        }
    })

module.exports = router;