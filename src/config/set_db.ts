import {connect} from "mongoose";

const uri = process.env.DB_URL  || "mongodb://localhost:27017/test"

connect(uri, (err)=>{
    if(err) return console.log(`Error: ${err.name} - ${err.message}`)
    console.log(`Database connected`)
})