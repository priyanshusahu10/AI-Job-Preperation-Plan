const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const blackListToken = require('../models/blacklist.model')
const nodemailer = require("nodemailer");
const Middleware = require('../middleware/auth.middleware')

async function userRegister(req,res){
        const{username , email , password} = req.body
        if(!username || !email || !password){
            return res.status(400).json({
                message:"Please provide username , email , password"
            })
        }

        const IsuserExist = await userModel.findOne({
            $or: [{username},
                {email}]
        })

        if(IsuserExist){
            return res.status(401).json({
                message:"User already exist"
            })
        }

        const hash = await bcrypt.hash(password, 10)
        const user = await userModel.create({
            username,
            email,
            password: hash
        })

        const token = jwt.sign({
            id:user._id,
            username:user.username},

                process.env.JWT_SCRETE,
                
        )
        res.cookie('token',token)

        res.status(201).json({
            message:"User registered Successfully",
            user:{
                id:user._id,
                username:user.username,
                email:user.email,
            }
        })
        console.log(JSON.req.body)
}

async function loginController(req,res){
    const {email,password} = req.body
    const user = await userModel.findOne({email})

    if(!user){
        return res.status(400).json({
            message:"Invaild email or password"
        })
    }

    const IspasswordValid = await bcrypt.compare(password, user.password)

    if(!IspasswordValid){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }

     const token = jwt.sign({
            id:user._id,
            username:user.username},

                process.env.JWT_SCRETE
        )
        res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000
});

        
        res.status(201).json({
            message:"User Login Successfully",
            user:{
                id:user.id,
                username:user.username,
                email:user.email
            }
            
        })
        console.log("User Login Successfully")
        
}

async function logoutController(req,res){
    const token = req.cookies.token

    if(token){
        await blackListToken.create({token})
    }
     
    res.clearCookie("token")

    res.status(200).json({
        message:"User Logout Successfully"
    })
}


async function getUser(req,res){
    const user = await userModel.findById(req.user.id)
    res.status(200).json({
        message:"User detail fetched successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })

    
}


const sendContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Gmail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.EMAIL, // Your email address
      replyTo: email,        // Clicking Reply replies to the sender
      subject: `Contact Form: ${subject}`,
      html: `
        <h2>New Contact Message</h2>

        <p><strong>Name:</strong> ${name}</p>

        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Subject:</strong> ${subject}</p>

        <p><strong>Message:</strong></p>

        <p>${message}</p>
      `,
    });

    res.status(200).json({
      message: "Message sent successfully!",
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};




module.exports = {
    userRegister,
    loginController,
    logoutController,
    getUser,
    sendContactMessage

};
