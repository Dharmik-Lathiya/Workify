const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
        user: 'workify.tevroninfo@gmail.com',
        pass: 'xaup pmmj zbcn huym'
    }
});

async function SendOtp(email,otp) {
    const info = await transporter.sendMail({
      from: "workify@support.pvt",
      to: email, 
      subject: "Otp for verification", 
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
          <h2 style="color: #333; text-align: center;">Verify Your Email</h2>
          <p style="font-size: 16px; color: #555; text-align: center;">
              Your One-Time Password (OTP) for Workify is:
          </p>
          <div style="font-size: 24px; font-weight: bold; color: #007bff; text-align: center; margin: 15px 0;">
              ${otp}
          </div>
          <p style="font-size: 14px; color: #777; text-align: center;">
              This OTP is valid for 10 minutes. Do not share it with anyone.
          </p>
          <hr style="border: none; border-top: 1px solid #ddd;">
          <p style="font-size: 12px; color: #888; text-align: center;">
              If you did not request this, please ignore this email.
          </p>
      </div>
  `, 
      
    });
}

const Verification = async(req,res)=>{

     const {email} = req.body;
     let otp = Math.floor(1000 + Math.random() * 9000);

     try {
      await  SendOtp(email,otp).then(()=>{
        res.status(200).send({success:true,message:`otp sent`,otp:otp})
      }).catch((err)=>{console.log(err);
      })
     } catch (error) {
        console.log(error)
     }

       
       

}
module.exports = Verification