const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const puppeteer = require('puppeteer');
const { zodToJsonSchema } = require("zod-to-json-schema");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GEN_API_KEY
});


const interviewReportSchema = z.object({
  matchScore: z.number(),

  technicalQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string()
    })
  ),

  behavioralQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string(),
    })
  ),

  skillGaps: z.array(
    z.object({
      skill: z.string(),
      severity: z.enum([
        "low",
        "medium",
        "high"
      ])
    })
  ),

  preparationPlan: z.array(
    z.object({
      day: z.number(),
      focus: z.string(),
      tasks: z.array(z.string())
    })
  ),

  title: z.string()
});


async function generateInterviewReport({ resume, selfDescription,jobDescription}) {

  const prompt = `
Generate an interview report.

Candidate Resume:
${resume}

Candidate Description:
${selfDescription}

Job Description:
${jobDescription}

Return ONLY JSON.

IMPORTANT:
- Generate minimum 10 technicalQuestions.Also, provide answers for each question in a short and professional way.
- Generate minimum 10 behavioralQuestions.Also, provide answers for each question in a short and professional way.
- Generate minimum 6 skillGaps.
- Generate a preparationPlan according to the candidate's needs.
- Never return empty arrays.
- Follow the schema exactly.
`;

  const response = await ai.models.generateContent({

    model: "gemini-2.5-flash",

    contents: prompt,

    config: {
      responseMimeType: "application/json",

      responseSchema: {
        type: "object",
        properties: {
          matchScore: {
            type: "number"
          },

          technicalQuestions: {
            type: "array",
            minItems: 5,
            items: {
              type: "object",
              properties: {
                question: { type: "string" },
                intention: { type: "string" },
                answer: { type: "string" }
              },
              required: [
                "question",
                "intention",
                "answer"
              ]
            }
          },

          behavioralQuestions: {
            type: "array",
            items: {
              type: "object",
              properties: {
                question: { type: "string" },
                intention: { type: "string" },
                answer: { type: "string" }
              },
              required: [
                "question",
                "intention",
                "answer"
              ]
            }
          },

          skillGaps: {
            type: "array",
            minItems: 3,
            items: {
              type: "object",
              properties: {
                skill: { type: "string" },
                severity: {
                  type: "string",
                  enum: [
                    "low",
                    "medium",
                    "high"
                  ]
                }
              },
              required: [
                "skill",
                "severity"
              ]
            }
          },

          preparationPlan: {
            type: "array",
            items: {
              type: "object",
              properties: {
                day: { type: "number" },
                focus: { type: "string" },
                tasks: {
                  type: "array",
                  items: {
                    type: "string"
                  }
                }
              },
              required: [
                "day",
                "focus",
                "tasks"
              ]
            }
          },

          title: {
            type: "string"
          }

        },

        required: [
          "matchScore",
          "technicalQuestions",
          "behavioralQuestions",
          "skillGaps",
          "preparationPlan",
          "title"
        ]
      }
    }
  });


  const report = JSON.parse(response.text);
  console.log(JSON.stringify(report, null, 2));
  return report;
}


async function generatePdfFromHtml(htmlContent) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  const pdfBuffer = await page.pdf({ format: 'A4' });
  await browser.close();
  return pdfBuffer;
}


async function generateResume({resume, selfDescription,jobDescription}){
      const resumePdfSchema = z.object({
        html: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
    })

    const prompt = `Generate resume for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}

                        the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                        The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
                        The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
                        you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
                        The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
                        The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
                    `

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(resumePdfSchema),
        }
    })


  const jsonResponse = JSON.parse(response.text);
  const pdfBuffer = await generatePdfFromHtml(jsonResponse.html);
  return pdfBuffer;
}
module.exports = {generateInterviewReport,generateResume};