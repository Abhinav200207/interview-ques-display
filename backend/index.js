const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const router = express.Router();

mongoose.connect('mongodb+srv://Abhinav:abhinav123@nodejsproject.pwxex.mongodb.net/interview')
    .then(() => console.log("successfully connected"))
    .catch(error => handleError(error));


const userSchema = new mongoose.Schema({
    name: {
        type: String,

    },
    email: {
        type: String,
        unique: true,
    },
    number: {
        type: String,
        maxlength: 10,
        minlength: 10
    }
});


const User = mongoose.model("User", userSchema);



router.route("/user").post(
    async (req, res) => {
        try {
            const { name, email, number } = req.body;
            const user = await User.create({
                name: name,
                email: email,
                number: number
            });

            res.status(201).send({
                sucess: true,
                user: user
            })

        } catch (e) {
            res.status(401).send({
                sucess: false,
                err: e
            })
        }
    }
)

router.route("/get").get(
    async (req, res) => {
        try {
            const user = await User.find();

            res.status(201).send({
                success: true,
                user: user
            });

        } catch (e) {
            res.status(401).send({
                success: false,
                err: e
            });
        }
    }
);


app.use("/api/v1", router);


app.listen(4000, () => {
    console.log("running on port 4000");
});