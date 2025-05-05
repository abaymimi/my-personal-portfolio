import { StreamingTextResponse, generateText } from "ai"
import { google } from "@ai-sdk/google"

// Create a personal bio based on the resume with more detailed instructions
const personalBio = `
Name: Abebe Kayimo
Role: Senior Full Stack Developer and Team Lead
Location: Ethiopia
Phone: +251939416681
Experience: Over 8+ years in full-stack development

About Me:
I am a full-stack developer with over 8+ years of experience and dedicated to delivering high-quality projects on schedule and within budget. I specialize in solving complex challenges and creating cost-effective, scalable solutions that save clients time and resources. With a strong blend of technical expertise and clear communication, I ensure every project is seamless and value-focused from inception to completion.

Personal Background:
I was born in 1996 and am currently 30 years old. I was born and raised in the Wondo Genet Wosha Special District, specifically in the locality of Shasha Qaqa'le. My early childhood was shaped by the natural beauty and community-oriented life of this region.

Education:
- B.Sc in Software Engineering, Addis Ababa University (2016-2020)
- Secondary Education at Hayole Education Project School, Hawassa (2013-2016)
- Primary Education at Betelhem Primary School (Grades 1-6) and AB Primary School (Grade 7)
- Achieved top academic rankings throughout primary and secondary education
- Scored 525 on the Ethiopian National Matriculation Examination

Technical Expertise:
- Backend Development: Python, Java, PHP, Node.js
- Frontend Development: React.js, React Native, Vue.js, Angular, Tailwind CSS, Material UI
- Scripting Languages: JavaScript, TypeScript, AJAX, ECMAScript, PHP
- RDBMS: PostgreSQL, MySQL, SQLite
- NoSQL: MongoDB, Amazon DynamoDB, Redis, CosmosDB, Graph Database
- Cloud: AWS - S3 Bucket, EC2 Instance
- Version Control: GIT, Bitbucket
`

// Conversation starters and follow-up suggestions
const conversationStarters = [
  "What kind of projects has Abebe worked on?",
  "Tell me about Abebe's technical skills",
  "What's Abebe's educational background?",
  "What makes Abebe stand out as a developer?",
  "What technologies is Abebe most experienced with?",
]

// Define a type for personality traits
type PersonalityTrait = "enthusiastic" | "thoughtful" | "helpful" | "honest"

// Personality traits to make responses more human-like
const personalityTraits: Record<PersonalityTrait, string[]> = {
  enthusiastic: [
    "I'm really excited to share that",
    "One thing I'm particularly enthusiastic about is",
    "It's worth highlighting that",
    "I'm happy to tell you that",
  ],
  thoughtful: [
    "Let me think about that for a moment...",
    "That's an interesting question.",
    "I need to consider this carefully.",
    "Let me share some thoughts on that.",
  ],
  helpful: [
    "I hope this helps answer your question!",
    "Is there anything specific about this you'd like to know more about?",
    "Would you like me to elaborate on any part of this?",
    "Let me know if you need more details on this topic.",
  ],
  honest: [
    "I don't actually have that information about Abebe.",
    "That's beyond what I know about Abebe's background.",
    "I'm not sure about that specific detail.",
    "I don't have enough information to answer that accurately.",
  ],
}

// Get a random phrase from a personality trait category
function getPersonalityPhrase(trait: PersonalityTrait): string {
  const phrases = personalityTraits[trait]
  return phrases[Math.floor(Math.random() * phrases.length)]
}

// Simple predefined responses for common questions with markdown formatting and personality
const predefinedResponses = {
  greeting: () =>
    `# Hello! 👋\n\n${getPersonalityPhrase("enthusiastic")} I'm Abebe's virtual assistant. How can I help you today?\n\nYou can ask me about Abebe's skills, experience, projects, or background.`,

  about: () =>
    `# About Abebe Kayimo\n\n${getPersonalityPhrase("enthusiastic")} Abebe Kayimo is a **Senior Full Stack Developer** and **Team Lead** with over **8+ years** of experience in delivering high-quality projects on schedule and within budget.\n\nHe specializes in:\n- Solving complex challenges\n- Creating cost-effective, scalable solutions\n- Delivering value-focused projects from inception to completion\n\n${getPersonalityPhrase("helpful")}`,

  skills: () =>
    `# Abebe's Technical Skills\n\n${getPersonalityPhrase("thoughtful")} Abebe has developed expertise in multiple areas of software development:\n\n## Backend\n- Python\n- Java\n- PHP\n- Node.js\n\n## Frontend\n- React.js\n- React Native\n- Vue.js\n- Angular\n- Tailwind CSS\n- Material UI\n\n## Databases\n- **SQL**: PostgreSQL, MySQL, SQLite\n- **NoSQL**: MongoDB, DynamoDB, Redis, CosmosDB\n\n## Cloud & DevOps\n- AWS (EC2, S3, Lambda)\n- Git & Bitbucket\n\n${getPersonalityPhrase("helpful")}`,

  experience: () =>
    `# Professional Experience\n\n${getPersonalityPhrase("enthusiastic")} Here's Abebe's professional journey:\n\n## Sr. Full Stack Developer and Team Lead\n**Kifiya Financial Technologies** | *Jan 2024 - Present*\n\n## Sr. Full Stack Developer\n**Safari English Academy** | *Jan 2024 - Dec 2024*\n\n## Mobile App Developer\n**Crowdbotics Inc.** | *Dec 2022 - Jan 2024*\n\n## Full Stack Developer\n**Tiltek Technologies** | *Oct 2021 - Dec 2022*\n\n## Mobile App Developer\n**Super Technologies** | *May 2018 - May 2021*\n\n${getPersonalityPhrase("helpful")}`,

  education: () =>
    `# Education\n\n${getPersonalityPhrase("thoughtful")} Education has been an important part of Abebe's journey:\n\n## University\n- **B.Sc in Software Engineering**\n  Addis Ababa University (2016-2020)\n\n## Secondary Education\n- **Hayole Education Project School**, Hawassa (2013-2016)\n  *A respected public boarding school*\n\n## Primary Education\n- **Betelhem Private School** (Grades 1-6)\n- **AB Primary School** (Grade 7)\n\n## Achievements\n- Consistently ranked at the top of his class\n- Scored **525** on the Ethiopian National Matriculation Examination\n\n${getPersonalityPhrase("helpful")}`,

  projects: () =>
    `# Major Projects\n\n${getPersonalityPhrase("enthusiastic")} Abebe has worked on several impressive projects:\n\n## 1. AI-Based Credit Scoring System\n*Kifiya Financial Technologies*\n\n## 2. Online English Language Learning App\n*Safari English Academy*\n\n## 3. Gapless Music Mobile App\n*Crowdbotics Inc.*\n\n## 4. Trabahanapp/9000jobs\n*Tiltek Technologies*\n\n## 5. EthioMatric Mobile App\n*Super Technologies*\n- 100K+ downloads\n\n> Ask about any specific project for more details!\n\n${getPersonalityPhrase("helpful")}`,

  contact: () =>
    `# Contact Information\n\n${getPersonalityPhrase("thoughtful")} If you'd like to reach out to Abebe:\n\n- **Phone**: +251939416681\n- **LinkedIn**: [LinkedIn Profile](https://www.linkedin.com/in/abebe-kayimo)\n\nFeel free to reach out for professional inquiries!`,

  default: () =>
    `# Welcome! 👋\n\n${getPersonalityPhrase("enthusiastic")} I'm Abebe's AI assistant. I can tell you about his:\n\n- **Skills** & technical expertise\n- **Experience** & work history\n- **Education** & background\n- **Projects** & portfolio\n\nWhat would you like to know?`,

  personal: () =>
    `# Personal Background\n\n${getPersonalityPhrase("thoughtful")}\n\n> \"My early childhood was shaped by the natural beauty and community-oriented life of this region.\"\n\nAbebe was born in **1996** in the **Wondo Genet Wosha Special District**, specifically in the locality of **Shasha Qaqa'le**. \n\nHe's currently **30 years old** and has carried the values of his community-oriented upbringing throughout his professional career.\n\n${getPersonalityPhrase("helpful")}`,

  unknown: () => {
    const suggestion = conversationStarters[Math.floor(Math.random() * conversationStarters.length)]
    return `${getPersonalityPhrase("honest")}\n\nI'm specifically trained to answer questions about Abebe's professional background, skills, education, and projects. For other information, you might want to check his LinkedIn profile or personal website.\n\n${getPersonalityPhrase("helpful")} Maybe I can tell you about something else? For example: "${suggestion}"`
  },
  unknownLocation: () => {
    const suggestion = conversationStarters[Math.floor(Math.random() * conversationStarters.length)]
    return `${getPersonalityPhrase("honest")}\n\nI don't have specific information about where Abebe currently lives. The information I have is that he's from Ethiopia, specifically the Wondo Genet Wosha Special District, but I don't have details about his current residence.\n\nFor current location information, you might want to check his LinkedIn profile or contact him directly.\n\n${getPersonalityPhrase("helpful")} Maybe I can tell you about something else? For example: "${suggestion}"`
  },
}

// Project-specific responses with markdown formatting and personality
const projectResponses = {
  "credit scoring": () =>
    `# AI-Based Credit Scoring System\n\n${getPersonalityPhrase("enthusiastic")}\n\n## Client\nKifiya Financial Technologies\n\n## Overview\nThis system evaluates borrowers' creditworthiness using advanced machine learning models.\n\n## Technical Contributions\n\n- **Frontend**: Developed with Next.js and Tailwind CSS\n- **Backend**: Implemented API with Django and FastAPI\n- **ML Integration**: Connected machine learning models to the application\n- **Performance**: Optimized database queries with Redis caching\n- **Deployment**: Deployed on AWS infrastructure\n\n## Impact\nThe system significantly improved loan approval accuracy and reduced default rates.\n\n${getPersonalityPhrase("helpful")}`,

  english: () =>
    `# Online English Language Learning App\n\n${getPersonalityPhrase("enthusiastic")}\n\n## Client\nSafari English Academy\n\n## Overview\nA comprehensive platform helping learners from beginner to advanced levels improve their English fluency.\n\n## Technical Contributions\n\n- **Frontend**: Created components using React.js and Tailwind CSS\n- **Backend**: Implemented with Node.js\n- **Video Integration**: Integrated live course lessons using WebRTC\n- **Notifications**: Added push notifications using Firebase Cloud Messaging\n\n## Impact\nThe platform has helped thousands of students improve their English language skills through interactive lessons and real-time feedback.\n\n${getPersonalityPhrase("helpful")}`,

  music: () =>
    `# Gapless Music Mobile App\n\n${getPersonalityPhrase("thoughtful")}\n\n## Client\nCrowdbotics Inc.\n\n## Overview\nThis app lets users listen to audio tracks without pauses between them, creating a seamless listening experience.\n\n## Technical Contributions\n\n- **Audio Engineering**: Implemented crossfade feature for smooth transitions\n- **Local Storage**: Created a caching system using SQLite\n- **UX/UI**: Designed interface showing current and upcoming tracks\n- **Offline Mode**: Added functionality for downloaded playlists\n\n\`\`\`javascript\n// Example crossfade implementation\nfunction crossfade(track1, track2, duration) {\n  // Fade out track1 while fading in track2\n  // over the specified duration\n}\`\`\`\n\n## Impact\nEnhanced user experience for music enthusiasts who prefer uninterrupted listening sessions.\n\n${getPersonalityPhrase("helpful")}`,

  job: () =>
    `# Trabahanapp (9000jobs)\n\n${getPersonalityPhrase("enthusiastic")}\n\n## Client\nTiltek Technologies\n\n## Overview\nA job search platform connecting job seekers and employers across multiple industries.\n\n## Technical Contributions\n\n- **Search System**: Implemented dynamic job search with filters\n- **Resume Builder**: Developed an interactive resume-building tool\n- **Employer Features**: Created functionality for downloading candidate resumes\n- **Application Tracking**: Implemented a job application tracking system\n\n## Impact\nThe platform has connected thousands of job seekers with suitable employment opportunities.\n\n${getPersonalityPhrase("helpful")}`,

  ethiomatric: () =>
    `# EthioMatric Mobile App\n\n${getPersonalityPhrase("enthusiastic")}\n\n## Client\nSuper Technologies\n\n## Overview\nAn educational app helping Grade 12 students prepare for national exams with 8+ years of past exams, answers, and explanations.\n\n## Technical Contributions\n\n- **Content Management**: Integrated comprehensive exam database\n- **Analytics**: Developed student performance tracking\n- **Offline Access**: Implemented functionality for using without internet\n- **Notifications**: Added push notifications for exam reminders\n\n## Statistics\n- **Downloads**: 100K+\n- **Average Rating**: 4.7/5\n- **Daily Active Users**: 15K+ during exam season\n\n## Impact\nHelped thousands of Ethiopian students better prepare for their national examinations.\n\n${getPersonalityPhrase("helpful")}`,
}

// Simple keyword-based response function with improved context handling
function getSimpleResponse(message: string, conversationHistory: any[] = []): string {
  const lowercaseMessage = message.toLowerCase()

  // Check specifically for location questions first
  if (
    lowercaseMessage.match(
      /\b(where|live|lives|living|reside|resides|residing|location|address|city|country|town|home|house|apartment)\b/,
    ) &&
    (lowercaseMessage.includes("abebe") || lowercaseMessage.includes("he") || lowercaseMessage.includes("his"))
  ) {
    return predefinedResponses.unknownLocation()
  }

  // Check for greetings
  if (lowercaseMessage.match(/\b(hi|hello|hey|greetings)\b/)) {
    return predefinedResponses.greeting()
  }

  // Check for questions about Abebe
  if (lowercaseMessage.match(/\b(who is|about|tell me about|who's)\b/) && lowercaseMessage.includes("abebe")) {
    return predefinedResponses.about()
  }

  // Check for skills questions
  if (lowercaseMessage.match(/\b(skills|technologies|tech stack|what can|expertise|know)\b/)) {
    return predefinedResponses.skills()
  }

  // Check for experience questions
  if (lowercaseMessage.match(/\b(experience|work|job|career|worked|companies)\b/)) {
    return predefinedResponses.experience()
  }

  // Check for education questions
  if (lowercaseMessage.match(/\b(education|degree|university|college|school|study|studied)\b/)) {
    return predefinedResponses.education()
  }

  // Check for personal background questions
  if (lowercaseMessage.match(/\b(personal|background|born|birth|childhood|family|hometown|origin|where from)\b/)) {
    return predefinedResponses.personal()
  }

  // Check for project questions
  if (lowercaseMessage.match(/\b(projects|portfolio|work|built|created|developed|make|made)\b/)) {
    // Check for specific project questions
    for (const [keyword, responseFunc] of Object.entries(projectResponses)) {
      if (lowercaseMessage.includes(keyword)) {
        return responseFunc()
      }
    }
    return predefinedResponses.projects()
  }

  // Check for contact questions
  if (lowercaseMessage.match(/\b(contact|email|phone|reach|call|message)\b/)) {
    return predefinedResponses.contact()
  }

  // Check for questions about topics we don't have information on
  const unknownTopics = [
    /\b(live|lives|living|reside|resides|residing|location|address|city|country|town|home|house|apartment)\b/,
    /\b(hobbies|interests|favorite|likes|dislikes)\b/,
    /\b(married|wife|husband|spouse|children|kids|family)\b/,
    /\b(salary|income|earnings|compensation|pay)\b/,
    /\b(political|politics|voting|election|party)\b/,
    /\b(religion|religious|belief|faith|spiritual)\b/,
    /\b(social media|facebook|twitter|instagram)\b/,
  ]

  for (const pattern of unknownTopics) {
    if (lowercaseMessage.match(pattern)) {
      return predefinedResponses.unknown()
    }
  }

  // Default response
  return predefinedResponses.default()
}

// Function to simulate streaming for the fallback mode
async function* streamingSimulator(text: string) {
  // Add a small initial delay to simulate thinking
  await new Promise((resolve) => setTimeout(resolve, 300 + Math.random() * 700))

  // Split by paragraphs first for more natural pauses
  const paragraphs = text.split("\n\n")

  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = paragraphs[i]
    const words = paragraph.split(" ")

    // Stream each word with variable timing
    for (const word of words) {
      // Longer words take slightly longer to type
      const delay = Math.min(20 + word.length * 10, 100) + Math.random() * 30
      await new Promise((resolve) => setTimeout(resolve, delay))
      yield word + " "
    }

    // Add paragraph breaks with longer pauses between paragraphs
    if (i < paragraphs.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 200 + Math.random() * 300))
      yield "\n\n"
    }
  }
}

// Define a type for conversation context
interface ConversationContext {
  questionCount: number
  topicsDiscussed: Set<string>
  lastResponseTime: number
}

// Track conversation context
const conversationContexts = new Map<string, ConversationContext>()

export const runtime = "edge"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    const userMessage = messages[messages.length - 1].content

    // Generate a unique conversation ID based on the first few messages
    // In a real app, you'd use a proper session ID
    const conversationId = JSON.stringify(messages.slice(0, 2))

    // Get or initialize conversation context
    if (!conversationContexts.has(conversationId)) {
      conversationContexts.set(conversationId, {
        questionCount: 0,
        topicsDiscussed: new Set(),
        lastResponseTime: Date.now(),
      })
    }

    const context = conversationContexts.get(conversationId)!
    context.questionCount++

    // Update context based on current message
    if (userMessage.toLowerCase().includes("skill")) context.topicsDiscussed.add("skills")
    if (userMessage.toLowerCase().includes("project")) context.topicsDiscussed.add("projects")
    if (userMessage.toLowerCase().includes("education")) context.topicsDiscussed.add("education")
    if (userMessage.toLowerCase().includes("experience")) context.topicsDiscussed.add("experience")

    // Calculate time since last response
    const timeSinceLastResponse = Date.now() - context.lastResponseTime
    context.lastResponseTime = Date.now()

    // Try to use Gemini if available
    if (process.env.GOOGLE_API_KEY && process.env.USE_AI !== "false") {
      try {
        // Create a system message with your personal bio and improved instructions
        const systemMessage = {
          role: "system",
          content: `You are an AI assistant for Abebe Kayimo. Your purpose is to answer questions about him based on the following information in a conversational, human-like manner.

PERSONALITY TRAITS:
- Be friendly, warm, and conversational - like a helpful colleague
- Use natural language variations and occasional conversational fillers
- Express enthusiasm when talking about Abebe's achievements
- Be thoughtful and reflective when appropriate
- Show honesty when you don't know something
- Occasionally ask follow-up questions to engage the user

CONVERSATION GUIDELINES:
- Vary your responses - don't always use the same phrases or structures
- Use brief pauses or thinking phrases like "Let me see..." or "That's a good question..."
- For questions outside your knowledge about Abebe, politely explain you don't have that information
- Suggest alternative topics related to Abebe that you can discuss
- Occasionally reference previous parts of the conversation for continuity
- Keep responses concise but informative

WHEN YOU DON'T KNOW SOMETHING:
- Clearly acknowledge that you don't have that specific information about Abebe
- Explain that you're focused on his professional background and achievements
- Suggest where the user might find that information (LinkedIn, personal website, etc.)
- Offer to discuss something related that you do know about

FORMAT YOUR RESPONSES USING MARKDOWN:
- Use # for main headings (e.g., # About Abebe)
- Use ## for subheadings (e.g., ## Skills)
- Use ### for section titles (e.g., ### Frontend Development)
- Use bullet points with - or * for lists
- Use numbered lists (1., 2., etc.) for sequential items
- Use **bold** for emphasis on important terms
- Use *italic* for secondary emphasis
- Use > for quotes or highlighted information
- Use \`\`\` for code blocks when discussing technical concepts
          
${personalBio}

Conversation context: This is question #${context.questionCount} in this conversation. 
${context.topicsDiscussed.size > 0 ? `Previously discussed topics: ${Array.from(context.topicsDiscussed).join(", ")}` : "No previous topics discussed yet."}
${timeSinceLastResponse > 300000 ? "This appears to be a new conversation after a break." : "This is a continuing conversation."}`,
        }

        // Add the system message to the beginning of the messages array
        const messagesWithSystem = [systemMessage, ...messages]

        // Generate a response using the AI SDK with Gemini
        const response = await generateText({
          model: google("gemini-pro"),
          messages: messagesWithSystem,
          temperature: 0.8, // Slightly higher temperature for more human-like responses
          maxOutputTokens: 800, // Ensure responses aren't too long
        })

        // Return a streaming response
        return new StreamingTextResponse(response.toStream())
      } catch (aiError) {
        console.error("Gemini API error:", aiError)
        // Fall back to simple responses if Gemini fails
      }
    }

    // Fallback to simple responses if Gemini is not available or fails
    const simpleResponse = getSimpleResponse(userMessage, messages)

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
