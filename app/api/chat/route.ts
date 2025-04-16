import { StreamingTextResponse } from "ai"
import { generateText } from "ai"
import { google } from "@ai-sdk/google"

// Create a personal bio based on the resume with more detailed instructions
const personalBio = `
Name: Abebe Kayimo
Role: Senior Full Stack Developer and Team Lead
Location: Ethiopia
Phone: +251939416681
Experience: Over 5 years in full-stack development

About Me:
I am a full-stack developer with over 5 years of experience and dedicated to delivering high-quality projects on schedule and within budget. I specialize in solving complex challenges and creating cost-effective, scalable solutions that save clients time and resources. With a strong blend of technical expertise and clear communication, I ensure every project is seamless and value-focused from inception to completion.

Education:
- B.Sc in Software Engineering, Addis Ababa Institute of Technology (2016-2020)

Technical Expertise:
- Backend Development: Python, Java, PHP, Node.js
- Frontend Development: React.js, React Native, Vue.js, Angular, Tailwind CSS, Material UI
- Scripting Languages: JavaScript, TypeScript, AJAX, ECMAScript, PHP
- RDBMS: PostgreSQL, MySQL, SQLite
- NoSQL: MongoDB, Amazon DynamoDB, Redis, CosmosDB, Graph Database
- Cloud: AWS - S3 Bucket, EC2 Instance
- Version Control: GIT, Bitbucket

Work Experience:
1. Sr. Full Stack Developer and Team Lead at Kifiya Financial Technologies (Jan 2024 - Present)
2. Sr. Full Stack Developer at Safari English Academy (Jan 2024 - Dec 2024)
3. Mobile App Developer at Crowdbotics Inc., Remote (Dec 2022 - Jan 2024)
4. Full Stack Developer at Tiltek Technologies, Addis Ababa (Oct 2021 - Dec 2022)
5. Mobile App Developer at Super Technologies, Addis Ababa (May 2018 - May 2021)

Projects:

1. AI-Based Credit Scoring System (Kifiya Financial Technologies)
   - Developed an AI-based credit scoring system to evaluate borrowers' creditworthiness using machine learning models
   - Developed frontend using Next.js and Tailwind CSS
   - Implemented backend API using Django and FastAPI
   - Integrated machine learning models for predictive credit scores
   - Optimized database queries with Redis caching
   - Implemented authentication using JWT and OAuth
   - Deployed on AWS (EC2, S3, Lambda)
   - Technologies: Next.js, React.js, Django, Tailwind CSS, Redis, PostgreSQL, AWS, JWT, OAuth, Python, Machine Learning, Docker

2. Online English Language Learning App (Safari English Academy)
   - Created web and mobile app for online English learning
   - Developed components using React.js, Tailwind CSS, HTML5
   - Implemented backend using Node.js
   - Integrated live course lessons using WebRTC
   - Implemented Firebase and JWT authentication
   - Added push notifications using Firebase Cloud Messaging
   - Technologies: React.js, React Native, Node.js, TailwindCSS, DynamoDB, WebRTC, Amazon S3, Amazon Lambda, Firebase, JWT

3. Gapless Music Mobile App (Crowdbotics Inc.)
   - Developed app for listening to audio tracks without pauses
   - Implemented crossfade feature for smooth transitions
   - Created caching system using SQLite for uninterrupted playback
   - Designed UX/UI showing current and upcoming tracks
   - Implemented playlist feature using Redux
   - Added offline mode for downloaded playlists
   - Technologies: Next.js, Node.js, Redux, React Native, SQLite

4. Trabahanapp/9000jobs (Tiltek Technologies)
   - Job search platform connecting job seekers and employers
   - Implemented dynamic job search with filters
   - Developed interactive resume-building tool
   - Created feature for employers to download candidate resumes
   - Implemented job application tracking system
   - Developed secure login and registration systems
   - Technologies: Algolia, html2pdf, DynamoDB, AWS S3, JavaScript, Tailwind CSS, PDF.js, PHP, React.js, Axios, OAuth2

5. EthioMatric Mobile App (Super Technologies)
   - Educational app for Grade 12 students preparing for national exams
   - Integrated 8+ years of past exams with answers and explanations
   - Developed student performance tracking
   - Implemented offline access to exam data
   - Added push notifications for exam reminders
   - Over 100K downloads
   - Technologies: PHP, React Native, Firebase Analytics, Firebase Authentication, SQLite, AWS Lambda, Google Cloud Functions

Contact:
- Phone: +251939416681
- LinkedIn: [LinkedIn Profile]
`

// Simple predefined responses for common questions
const predefinedResponses = {
  greeting: "Hello! I'm Abebe's virtual assistant. How can I help you today?",
  about:
    "Abebe Kayimo is a Senior Full Stack Developer and Team Lead with over 5 years of experience in delivering high-quality projects on schedule and within budget. He specializes in solving complex challenges and creating cost-effective, scalable solutions.",
  skills:
    "Abebe's technical skills include:\n- Backend: Python, Java, PHP, Node.js\n- Frontend: React.js, React Native, Vue.js, Angular\n- Databases: PostgreSQL, MySQL, SQLite, MongoDB, DynamoDB\n- Cloud: AWS (EC2, S3, Lambda), Firebase\n- And many more!",
  experience:
    "Abebe has worked as:\n1. Sr. Full Stack Developer and Team Lead at Kifiya Financial Technologies (Jan 2024 - Present)\n2. Sr. Full Stack Developer at Safari English Academy (Jan 2024 - Dec 2024)\n3. Mobile App Developer at Crowdbotics Inc. (Dec 2022 - Jan 2024)\n4. Full Stack Developer at Tiltek Technologies (Oct 2021 - Dec 2022)\n5. Mobile App Developer at Super Technologies (May 2018 - May 2021)",
  education: "Abebe has a B.Sc in Software Engineering from Addis Ababa Institute of Technology (2016-2020).",
  projects:
    "Abebe has worked on several major projects including:\n1. AI-Based Credit Scoring System\n2. Online English Language Learning App\n3. Gapless Music Mobile App\n4. Trabahanapp/9000jobs\n5. EthioMatric Mobile App (100K+ downloads)\n\nAsk about any specific project for more details!",
  contact: "You can contact Abebe at:\nPhone: +251939416681\nLinkedIn: [LinkedIn Profile]",
  default:
    "I'm a simple version of Abebe's AI assistant. I can tell you about his skills, experience, education, and projects. What would you like to know?",
}

// Project-specific responses
const projectResponses = {
  "credit scoring":
    "The AI-Based Credit Scoring System at Kifiya Financial Technologies evaluates borrowers' creditworthiness using machine learning models. Abebe developed the frontend using Next.js and Tailwind CSS, implemented the backend API with Django and FastAPI, integrated ML models, and optimized database queries with Redis caching. The system was deployed on AWS.",
  english:
    "The Online English Language Learning App for Safari English Academy helps learners from beginner to advanced levels improve their English fluency. Abebe created components using React.js and Tailwind CSS, implemented the backend with Node.js, integrated live course lessons using WebRTC, and added push notifications using Firebase Cloud Messaging.",
  music:
    "The Gapless Music Mobile App for Crowdbotics Inc. lets users listen to audio tracks without pauses between them. Abebe implemented a crossfade feature for smooth transitions, created a caching system using SQLite, designed the UX/UI showing current and upcoming tracks, and added an offline mode for downloaded playlists.",
  job: "Trabahanapp (9000jobs) for Tiltek Technologies is a job search platform connecting job seekers and employers. Abebe implemented dynamic job search with filters, developed an interactive resume-building tool, created features for employers to download candidate resumes, and implemented a job application tracking system.",
  ethiomatric:
    "The EthioMatric Mobile App for Super Technologies helps Grade 12 students prepare for national exams. It offers 8+ years of past exams with answers and explanations. Abebe integrated the exam database, developed student performance tracking, implemented offline access, and added push notifications for exam reminders. The app has over 100K downloads.",
}

// Simple keyword-based response function
function getSimpleResponse(message: string): string {
  const lowercaseMessage = message.toLowerCase()

  // Check for greetings
  if (lowercaseMessage.match(/\b(hi|hello|hey|greetings)\b/)) {
    return predefinedResponses.greeting
  }

  // Check for questions about Abebe
  if (lowercaseMessage.match(/\b(who is|about|tell me about|who's)\b/) && lowercaseMessage.includes("abebe")) {
    return predefinedResponses.about
  }

  // Check for skills questions
  if (lowercaseMessage.match(/\b(skills|technologies|tech stack|what can|expertise|know)\b/)) {
    return predefinedResponses.skills
  }

  // Check for experience questions
  if (lowercaseMessage.match(/\b(experience|work|job|career|worked|companies)\b/)) {
    return predefinedResponses.experience
  }

  // Check for education questions
  if (lowercaseMessage.match(/\b(education|degree|university|college|school|study|studied)\b/)) {
    return predefinedResponses.education
  }

  // Check for project questions
  if (lowercaseMessage.match(/\b(projects|portfolio|work|built|created|developed|make|made)\b/)) {
    // Check for specific project questions
    for (const [keyword, response] of Object.entries(projectResponses)) {
      if (lowercaseMessage.includes(keyword)) {
        return response
      }
    }
    return predefinedResponses.projects
  }

  // Check for contact questions
  if (lowercaseMessage.match(/\b(contact|email|phone|reach|call|message)\b/)) {
    return predefinedResponses.contact
  }

  // Default response
  return predefinedResponses.default
}

// Function to simulate streaming for the fallback mode
async function* streamingSimulator(text: string) {
  const chunks = text.split(" ")
  for (const chunk of chunks) {
    // Add a small random delay to simulate typing
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 50 + 20))
    yield chunk + " "
  }
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    const userMessage = messages[messages.length - 1].content

    // Try to use Gemini if available
    if (process.env.GOOGLE_API_KEY && process.env.USE_AI !== "false") {
      try {
        // Create a system message with your personal bio and improved instructions
        const systemMessage = {
          role: "system",
          content: `You are an AI assistant for Abebe Kayimo. 
          Your purpose is to answer questions about them based on the following information. 
          Be friendly, professional, and concise in your responses.
          Always provide accurate information based on Abebe's resume.
          If asked about skills, work experience, or projects, provide specific details from the resume.
          If asked something not covered in this bio, politely mention that you don't have that information.
          
          ${personalBio}`,
        }

        // Add the system message to the beginning of the messages array
        const messagesWithSystem = [systemMessage, ...messages]

        // Generate a response using the AI SDK with Gemini
        const response = await generateText({
          model: google("gemini-pro"),
          messages: messagesWithSystem,
          temperature: 0.7, // Add some personality but keep responses factual
        })

        // Return a streaming response
        return new StreamingTextResponse(response.toStream())
      } catch (aiError) {
        console.error("Gemini API error:", aiError)
        // Fall back to simple responses if Gemini fails
      }
    }

    // Fallback to simple responses if Gemini is not available or fails
    const simpleResponse = getSimpleResponse(userMessage)

    // Create a ReadableStream from the simple response to simulate streaming
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of streamingSimulator(simpleResponse)) {
          controller.enqueue(new TextEncoder().encode(chunk))
        }
        controller.close()
      },
    })

    return new StreamingTextResponse(stream)
  } catch (error) {
    console.error("Chat API error:", error)
    return new Response(
      JSON.stringify({
        error: "There was an error processing your request",
        details: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  }
}
