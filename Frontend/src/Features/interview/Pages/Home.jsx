import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router'
import { useInterview } from '../Hooks/useInterview'
import './Home.css'
import Loading from '../../auth/Pages/Loading/Loading'


const Home = () => {
  const [jobDescription, setJobDescription] = useState('')
  const [selfDescription, setSelfDescription] = useState('')
  const [resume, setResume] = useState(null);
  const [resumeFile, setResumeFile] = useState(null)
  const [fileName, setFileName] = useState('No file selected yet')
  const { generateReport, loading } = useInterview()
  const resumeInputRef = useRef()
  const navigate = useNavigate()



    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[ 0 ]
        const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        navigate(`/interview/${data._id}`)
    }

    if(loading){
      return (
        <Loading />
      )
    }

  return (
  <div className="setup-page">


      {/* Logo */}

      <div className="logo">

        <div className="logo-icon">
          ✣
        </div>

        <h2>
          Prep<span>AI</span>
        </h2>

      </div>




      <div className="setup-card">


        <h1>
          Preapre your interview report 
        </h1>


        <p className="subtitle">
          Upload your resume and job details for personalized questions
        </p>



        <div className="main-grid">


          {/* Left Job Description */}

          <div className="field">


            <label>
              Job Description
            </label>


            <textarea
              onChange={(e) => { setJobDescription(e.target.value) }}
              placeholder="Paste the job description here..."

            />


          </div>


          {/* Right Resume */}

          <div className="field">


            <label>
              Upload Resume
            </label>


            <label className="upload-box">


              <input
                ref={resumeInputRef}
                type="file"

                accept=".pdf,.doc,.docx"

                onChange={(e)=>
                  setResume(e.target.files[0])
                }

              />


              <div className="upload-icon">
                ⬆
              </div>


              <p>

              {resume
                ? resume.name
                :
                "Click to upload resume"
              }

              </p>


              <span>
                PDF / DOCX only
              </span>


            </label>


          </div>


        </div>


        {/* Self Description */}

        <div className="field self">


          <label>
            Tell us about yourself
          </label>


          <textarea
           onChange={(e) => { setSelfDescription(e.target.value) }}
            placeholder="
            Describe your skills, experience, projects and career goals..."

          />


        </div>

        <button className="start-btn" onClick={handleGenerateReport}>

          Generate Report →

        </button>

      </div>

    </div>

  );

};


export default Home
