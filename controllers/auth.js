const Entries = require("../models/Entries.js");
const catchAsyncerror = require("../middleware/catchAsyncerror.js");


exports.register = (async (req, res) => {

    const { Firstname, lastname, email, password, role } = req.body;
    const { valid, reason, validators } = await isEmailValid(email);

    if (!Firstname || !lastname || !email || !password || !role) {
        return res.status(400).json("plese fill all input ");
    }

    const user = await User.findOne({ email });

    try {
        if (!valid) {
            res.status(400).json("plz enter valid email")

        }
        if (!user) {
            if (role === "Patient") {
                const user = await Patient.create({
                    Firstname,
                    lastname,
                    email,
                    password,
                    role
                });
                sendToken(user, 201, res);

            }
            else if (role === "Doctor") {
                const user = await Doctor.create({
                    Firstname,
                    lastname,
                    email,
                    password,
                    role
                });
                sendToken(user, 201, res);
            }
            else res.status(400).json("Plz select role")
        }
        else {
            res.status(400).json("User already exist")
        }
        return
    } catch (error) {
        res.status(400).json("User already exist")
        // console.log(error.message);
    }

})
exports.Gettransition = (async (req, res) => {
    const filters = req.body; // This will be an object like { type: 'expense', category: 'Food', startDate: '2023-01-01', endDate: '2023-01-31' }
    let query = {}; 
     if (filters.filterCategory ) {
        query.Category=filters.filterCategory
    }
    if( filters.filterStartDate){
        
        query.Date=filters.filterStartDate
     }
    try {
        console.log(query)
        const appointment = await Entries.find( query)
        // console.log(appointment)
        res.status(200).json(appointment)


    } catch (error) {
        console.log(error.message)
    }

})

exports.
    Addnewtransition = async (req, res) => {
        const { Type, Category, Amount, Date, Description } = req.body;
        if (!Type || !Category || !Amount || !Date || !Description) {
            return res.status(400).json("plese fill all input ");
        }

        try {

            const user = await Entries.create({
                Type, Category, Amount, Date, Description
            });
            sendToken(user, 201, res);


        } catch (error) {
            res.status(400).json({ "error": error.message })
            // console.log(error.message);
        }
    }
exports.
    DeleteGettransition = async (req, res) => {
        try {
            let uid = req.params.id;
            let data = await Entries.findByIdAndDelete(uid);
            return res.json({ success: 'data delete' })
        } catch (error) {

            return res.json(error.message)

        }

    }
const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    const options = {
        // expire: new Date(Date.now + 24 * 60 * 60 * 1000),
        httpOnly: false,
    };
    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token,
    });
};