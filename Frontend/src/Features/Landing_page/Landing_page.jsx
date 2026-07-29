import { useNavigate, Link} from "react-router";
import React from "react";
import "./Landing_page.css"
import ContactUs from "./Services/api.service"
import { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  Upload,
  Users,
  Star,
  ShieldCheck,
  UserRound
} from "lucide-react";
import axios from "axios";




const Landing = () => {
  const navigate = useNavigate()
   
  const [name, setname] = useState()
  const [email, setEmail] = useState()
  const [subject, setSubject] = useState()
  const [message, setMessage] = useState()


const handleSubmit = async () =>{
  e.preventDefault();
  const Datasend = {
    name,email,subject,message
  }

  try{
    const response = await axios.post('http://localhost:8000/api/auth/contact',Datasend)
    alert(response.data)
  }catch(err){
    console.log(err)
  }
}


  return (
    <div className="landing">
      {/* Navbar */}
      <nav className="navbar">
        <a href="#about">
        <div className="logo">
          <div className="logo-box">
            ✣
          </div>
          Prep<span>AI</span>
        </div>
        </a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a>Features</a>
          <a href="#works">How It Works</a>
          <a>Contact Us</a>

        </div>
        <div className="nav-buttons">
          <button className="signin">
            <Link to={'/login'}>
            Sign In
            </Link>
          </button>

          <button className="start">
            <Link to={'/register'}>
            Get Started
            </Link>
          </button>
        </div>
      </nav>
      {/* Hero */}
      <section className="hero" id="about">
        <div className="badge">

          <Sparkles size={16} />
          AI-POWERED INTERVIEW INTELLIGENCE
        </div>

        <h1>
          Ace Every Interview.

          <br />

          <span>
            Land the Role.
          </span>

        </h1>

        <p>

          Upload your resume and get an instant AI analysis —
          personalized questions, skill gap diagnosis,
          and a readiness score in under 30 seconds.

        </p>

        <div className="hero-buttons">
          <button className="primary">
            <Link to={'/register'}>
            Get Started Free
            </Link>
            <ArrowRight />
          </button>
        </div>
      </section>
      <section className="hero-1" id="works">
        <div className="process-container">
          <h4>PROCESS</h4>
        </div>
         <h3>
          From Resume To Ready
          <br />
          <span>
            In 4 Steps
          </span>
        </h3>

        <div className="container">
          <div className="small-container">
            <span className="number">01</span>
            <div className="content">Create Account</div>
            <div className="para">Sign up in 30 seconds. No credit card required.</div>
          </div>
         <div className="small-container">
            <span className="number">02</span>
            <div className="content">Upload Your Resume</div>
            <div className="para">PDF or DOCX. Our parser handles any format..</div>
        </div>
        <div className="small-container">
            <span className="number">03</span>
            <div className="content">AI Analysis</div>
            <div className="para">Deep scan across 40+ competency dimensions.</div>
        </div>
        <div className="small-container">
            <span className="number">04</span>
            <div className="content">Review & Practice
          </div>
            <div className="para">Work through your personalized question bank.</div>
        </div>
        </div>

        <button className="start-now">Start Now -- it's Free  </button>
      </section>

      <section className="contact-us">
        <h3>Contact Us</h3>
         <div className="contact-container">
          
      <div className="contact-card">
        <div className="contact-info">
          <h2>Contact Us</h2>
          <p>
            We'd love to hear from you. Fill out the form and our team will get
            back to you as soon as possible.
          </p>

          <div className="info-item">
            <h4>Email</h4>
            <p>support@example.com</p>
          </div>

          <div className="info-item">
            <h4>Phone</h4>
            <p>+91 98765 43210</p>
          </div>

          <div className="info-item">
            <h4>Address</h4>
            <p>Kanpur, Uttar Pradesh, India</p>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Send Message</h2>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            onChange={(e)=>setName(e.target.value)}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
           onChange={(e)=>setEmail(e.target.value)}
            required
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
           onChange={(e)=>setSubject(e.target.value)}
            required
          />

          <textarea
            name="message"
            rows="6"
            placeholder="Write your message..."
           onChange={(e)=>setMessage(e.target.value)}
            required
          ></textarea>

          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
      </section>
    </div>
  )

}
export default Landing;