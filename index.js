import express from "express"
import cors from "cors"
  import nodemailer from  "nodemailer"
const app=express()
import fetch from 'node-fetch';

async function run() {
  
}


app.use(express.json())

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "infomailer1011@gmail.com",
      pass: "xyfd lcng cbtc pfhl",
    },
  });


app.listen(8000,()=>{
    console.log("app is listening")
})

app.use(cors({
    origin:"*",
    credentials:true
  }
  ))

app.get("/",(req,res)=>{
    res.send("ok")
})

app.post("/send-mail",(req,res)=>{
    try {
        const {name,email,message,toEmail}=req.body;
        console.log(name,email,message,"sending mail","to",toEmail)
    let mailOptions ={
            from: 'infomailer1011@gmail.com', // sender address
            to: toEmail, // list of receivers
            subject: `${name} contacted You`, // Subject line
            html: `<b>Name: </b>${name}<br><br><b>email: </b>${email}<br><br><b>message: </b>${message}<br>`, // html body
      }
    
    async function sendMail(){
        await transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
              console.log("error while sending mail",error)
              return res.status(400).json({error:"some error occured"})
            }
            else{
              console.log("mail sent successfully")
            }
          })
        
    }

    
    
    sendMail()

    res.send("i have sent it")
    } catch (error) {
        console.log(error)
        return res.status(400).json({error:"some error occured"})
    }
    
})



// const aiImage={
  // id: '212ab6d0-bc2b-4996-bff3-105a92a56121',
  // self: 'https://api.limewire.com/api/request/212ab6d0-bc2b-4996-bff3-105a92a56121',
  // status: 'COMPLETED',
  // failure_code: null,
  // failure_reason: null,
  // credits_used: 3,
  // credits_remaining: 7,
  // data: [
  //   {
  //     asset_id: '664257ca-1d38-4747-98ac-47012f8686d7',
  //     self: 'https://api.limewire.com/api/assets/664257ca-1d38-4747-98ac-47012f8686d7',
  //     asset_url: 'https://ai-studio-assets.limewire.media/u/3a5bdb92-2dc6-4d63-96d3-7859d4843916/image/1cec99e8-8e90-4f7f-9839-c8ed635e1b3c?Expires=1726851558&Signature=PDw0OFwYFaf~ivemJ-LImPMwrj~4gKEdhZG4GHKCl2CaFZyL8S2U5MsiB6klvml7ZdRRF3CerA4g-N276JszKjOEvme7rEYFDr8iwYGdkrObIVlW82K9Q8j6RLzeP~wRdRxCET7pURuEWH~YoIGwaT3mrwdkBlDctYKtsVy8kc3tjbvb5tPetkIjqxXbPeHfg2lvVBvxt7UFXVJ~GTwaniRJm6aUO5uFQxyw6FhGxskZ4YI0LZLi9-HzeMeHLWTkkMQgPUc6mUUVtyQUdmYpzOtMhomfbiMHLZanSRjpwAD9~4SShMCuf-3U2MaPdBPT7Yg1fJhAg9~nCG5CUzIVZA__&Key-Pair-Id=K1U52DHN9E92VT',
  //     type: 'image/png',
  //     width: 1024,
  //     height: 1024
  //   }
  // ]
// }
app.post("/get-ai-image",async(req,res)=>{
  const {prompt}=req.body;
  console.log(req.body)
  const resp = await fetch(
    `https://api.limewire.com/api/image/generation`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Version': 'v1',
        Accept: 'application/json',
        Authorization: 'Bearer lmwr_sk_clfsHxiItt_3f6RyVqIj07X1F6yQCcmIKYxeKISyHcPUO5cZ'
      },
      body: JSON.stringify({
        prompt: prompt,
        aspect_ratio: '1:1'
      })
    }
  );

  const data = await resp.json();
  console.log(data);
  res.status(200).json({aiImage:data})
})