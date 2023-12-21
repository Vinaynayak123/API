const express = require("express")
const app = express()
const router = require("./router/router")



app.use(router)

app.listen(8000, () => {
    console.log(`server is running at port no. ${8000}`);
})