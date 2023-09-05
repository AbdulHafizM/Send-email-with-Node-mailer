const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors')
const app = express()

require('dotenv').config();

app.use(cors())
app.use(express.json())

app.post('/send-email',async(req,res)=>{
    const config = {
        service: 'gmail',
        auth:{
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSWORD
        }
    }

    const transport = nodemailer.createTransport(config)

    let message = {
        from: 'muibiabdulhafiz007@gmail.com',
        to: req.body.email,
        subject: 'Sending mails with nodemailer',
        html: "<b>Hello world?</b>"
    }

    const msg = await transport.sendMail(message)

    res.json(msg)
})

app.listen(process.env.PORT,()=>{
    console.log('I am ready to serve...')
})