const { Router } = require("express")

const courseRouter = Router();

courseRouter.get("/purchase", (req,res) => {
    res.json({
        msg: "signin page"
    })
})

courseRouter.post("/purchase", (req,res) => {
    res.json({
        msg: "signin page"
    })
})

module.exports = {
    courseRouter
}