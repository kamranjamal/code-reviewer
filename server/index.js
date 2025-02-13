import express from 'express'
const app=express()
import dotenv from 'dotenv'
dotenv.config()
const port=process.env.PORT || 5000
import cors from 'cors'
import {generateReview} from './controller/ai.controle.js'

app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('hello world')
})
app.post("/generateReview",generateReview)

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
})