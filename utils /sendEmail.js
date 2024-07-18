
const nodemailer = require('nodemailer')
const sendEmail = async (data)=>{
    const transporter = nodemailer.createTransport({
        service : 'gmail', 
        auth : { 
            user : "dptest1230@gmail.com", 
            pass : "tpeiodymfhpmxzhg"
        }
    })

    const mailOption = {
        from : "Namaskar NodeJs<dptest1230@gmail.com>", 
        to : data.email, 
        subject : data.subject, 
        text : data.text 
    }

    await transporter.sendMail(mailOption)
}

module.exports = sendEmail 