const { GoogleGenerativeAI } = require("@google/generative-ai");

function normalizeArray(value) {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function detectCareerDomain(skills, interests) {
  const text = [...skills, ...interests].join(" ").toLowerCase();
  // Split retaining . (e.g. Next.js, Node.js, Express.js), + (e.g. C++), # (e.g. C#), and / (e.g. CI/CD, UI/UX)
  const words = text.split(/[^a-zA-Z0-9\+\#\-\.\/]/).filter(Boolean);

  const has = (...list) => list.some(item => {
    const itemWords = item.toLowerCase().split(/[^a-zA-Z0-9\+\#\-\.\/]/).filter(Boolean);
    if (itemWords.length === 0) return false;
    for (let i = 0; i <= words.length - itemWords.length; i++) {
      let match = true;
      for (let j = 0; j < itemWords.length; j++) {
        if (words[i + j] !== itemWords[j]) {
          match = false;
          break;
        }
      }
      if (match) return true;
    }
    return false;
  });

  // 1. Artificial Intelligence
  if (has("artificial intelligence", "ai", "machine learning", "deep learning", "tensorflow", "pytorch", "generative ai", "llm", "langchain", "prompt engineering", "gemini api", "openai api")) {
    return "Artificial Intelligence";
  }

  // 2. Data Science
  if (has("python") && has("pandas", "numpy", "scikit-learn", "statistics")) {
    return "Data Science";
  }

  // 3. Data Engineering
  if (has("sql", "python") && has("snowflake", "apache spark", "airflow", "etl")) {
    return "Data Engineering";
  }

  // 4. Data Analytics
  if (has("sql", "power bi", "excel", "tableau", "business intelligence")) {
    return "Data Analytics";
  }

  // 5. Cyber Security
  if (has("networking", "linux", "ethical hacking", "kali linux", "wireshark", "burp suite")) {
    if (has("ethical hacking", "kali linux", "wireshark", "burp suite")) {
      return "Cyber Security";
    }
  }

  // 6. Game Development
  if (has("unity", "unreal engine", "c#", "game development")) {
    return "Game Development";
  }

  // 7. Blockchain
  if (has("solidity", "ethereum", "web3", "smart contracts")) {
    return "Blockchain";
  }

  // 8. Embedded Systems
  if (has("c", "c++", "arduino", "raspberry pi", "embedded c", "microcontrollers")) {
    if (has("arduino", "raspberry pi", "embedded c", "microcontrollers")) {
      return "Embedded Systems";
    }
  }

  // 9. Mobile Development
  if (has("flutter", "react native", "android", "kotlin", "swift")) {
    return "Mobile Development";
  }

  // 10. DevOps
  if (has("docker", "kubernetes", "jenkins", "github actions", "linux", "ci/cd")) {
    if (has("docker", "kubernetes", "jenkins", "github actions", "ci/cd")) {
      return "DevOps";
    }
  }

  // 11. Cloud Computing
  if (has("aws", "azure", "google cloud", "cloud computing")) {
    return "Cloud Computing";
  }

  // 12. UI/UX Design
  if (has("figma", "adobe xd", "wireframing", "prototype", "ui design", "ux design")) {
    return "UI/UX Design";
  }

  // 13. Java Development
  if (has("java", "spring boot", "hibernate", "jpa")) {
    if (has("spring boot", "hibernate", "jpa")) {
      return "Java Development";
    }
  }

  // 14. Python Development
  if (has("python", "flask", "django")) {
    if (has("flask", "django")) {
      return "Python Development";
    }
  }

  // 15. Full Stack Development
  if (has("react", "node.js", "express.js", "mongodb", "mysql", "javascript")) {
    if (has("react") && has("node.js", "express.js")) {
      return "Full Stack Development";
    }
  }

  // 16. Frontend Development
  if (has("react", "javascript", "js", "html", "css", "bootstrap", "tailwind css", "next.js")) {
    if (!has("node.js", "express.js")) {
      return "Frontend Development";
    }
  }

  // 17. Backend Development
  if (has("node.js", "express.js", "rest api", "mongodb")) {
    return "Backend Development";
  }

  return "Software Development";
}

async function generateCareerAdvice(profile) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Gemini API Key Missing");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-3.5-flash",
  });

  const skills = normalizeArray(profile.skills);
  const interests = normalizeArray(profile.interests);
  const predictedDomain = detectCareerDomain(skills, interests);

  const prompt = `
You are a Senior Career Mentor.
You must recommend career paths matching the student's profile. You MUST follow deterministic career mapping rules strictly.

Student Profile:
Name: ${profile.name}
Degree: ${profile.degree}
Skills: ${skills.join(", ")}
Interests: ${interests.join(", ")}
Experience: ${profile.experience || "No details provided"}
Predicted Domain: ${predictedDomain}

-------------------------------------------------

DETAILED CAREER MAPPING RULES

1. Frontend Development
If User Skills or Interests contain: React, JavaScript, JS, HTML, CSS, Bootstrap, Tailwind CSS, Next.js AND NOT Node.js
Recommend: Frontend Developer, React Developer, UI Developer, Web Developer

2. Full Stack Development
If User Skills contain: React, Node.js, Express.js, MongoDB, MySQL, JavaScript
Recommend: Full Stack Developer, MERN Stack Developer, Software Engineer

3. Backend Development
If User Skills contain: Node.js, Express.js, REST API, MongoDB
Recommend: Backend Developer, Node.js Developer, API Developer

4. Java Development
If Skills contain: Java, Spring Boot, Hibernate, JPA
Recommend: Java Developer, Spring Boot Developer, Backend Engineer

5. Python Development
If Skills contain: Python, Flask, Django
Recommend: Python Developer, Backend Developer, Automation Engineer

6. Artificial Intelligence
If Skills or Interests contain: Artificial Intelligence, AI, Machine Learning, Deep Learning, TensorFlow, PyTorch, Generative AI, LLM, LangChain, Prompt Engineering, Gemini API, OpenAI API
Recommend: AI Engineer, Generative AI Engineer, Machine Learning Engineer

7. Data Science
If Skills contain: Python, Pandas, NumPy, Scikit-Learn, Statistics
Recommend: Data Scientist, Machine Learning Engineer, AI Engineer

8. Data Analytics
If Skills contain: SQL, Power BI, Excel, Tableau, Business Intelligence
Recommend: Data Analyst, BI Developer, Business Analyst

9. Data Engineering
If Skills contain: SQL, Python, Snowflake, Apache Spark, Airflow, ETL
Recommend: Data Engineer, Analytics Engineer, Big Data Engineer

10. Cloud Computing
If Skills contain: AWS, Azure, Google Cloud, Cloud Computing
Recommend: Cloud Engineer, Cloud Administrator, Cloud Support Engineer

11. DevOps
If Skills contain: Docker, Kubernetes, Jenkins, GitHub Actions, Linux, CI/CD
Recommend: DevOps Engineer, Platform Engineer, Site Reliability Engineer (SRE)

12. Cyber Security
If Skills contain: Networking, Linux, Ethical Hacking, Kali Linux, Wireshark, Burp Suite
Recommend: Cyber Security Analyst, Penetration Tester, SOC Analyst

13. Mobile Development
If Skills contain: Flutter, React Native, Android, Kotlin, Swift
Recommend: Mobile App Developer, Android Developer, iOS Developer

14. UI/UX Design
If Skills contain: Figma, Adobe XD, Wireframing, Prototype, UI Design, UX Design
Recommend: UI Designer, UX Designer, Product Designer

15. Game Development
If Skills contain: Unity, Unreal Engine, C#, Game Development
Recommend: Game Developer, Unity Developer, AR/VR Developer

16. Blockchain
If Skills contain: Solidity, Ethereum, Web3, Smart Contracts
Recommend: Blockchain Developer, Web3 Developer, Smart Contract Engineer

17. Embedded Systems
If Skills contain: C, C++, Arduino, Raspberry Pi, Embedded C, Microcontrollers
Recommend: Embedded Software Engineer, Firmware Engineer, IoT Engineer

----------------------------------

SOFT SKILLS MAPPING RULES
- If user has Leadership: recommend careers involving Team Lead, Project Manager, Engineering Manager (future).
- If user has Communication: highlight careers requiring client interaction like Business Analyst, Consultant, Technical Support Engineer.
- If user has Problem Solving: increase fit score for Software Engineer, AI Engineer, Backend Developer.
- If user has Creativity: increase fit score for Frontend Developer, UI Designer, Product Designer.
- If user has Analytical Thinking: increase fit score for Data Scientist, AI Engineer, Data Analyst.
- If user has Teamwork: recommend Software Engineer, Full Stack Developer, DevOps Engineer.
- If user has Time Management: highlight success in Project Management, DevOps, Software Engineering.

----------------------------------

IMPORTANT RULES
- Career Interests have highest priority.
- Technical Skills have second priority.
- Soft Skills have third priority.
- Degree has fourth priority.
- Experience has fifth priority.
- Never recommend unrelated careers.
- Never recommend Data Analyst if the user is interested in Web Development.
- Never recommend UI Designer unless UI/UX related skills exist.
- Never recommend AI Engineer without AI-related skills or interests.
- Always explain WHY each recommendation matches.
- Return exactly 3 careers ranked by best match percentage.

Return ONLY valid JSON matching this schema:
`;

  const jsonSchema = `
{
  "domain": "Predicted Career Domain",
  "summary": "High-level summary of findings",
  "roles": [
    {
      "title": "Role Title",
      "matchScore": 95,
      "reason": "Detailed reason why it fits"
    },
    {
      "title": "Role Title",
      "matchScore": 88,
      "reason": "Detailed reason why it fits"
    },
    {
      "title": "Role Title",
      "matchScore": 80,
      "reason": "Detailed reason why it fits"
    }
  ],
  "skillGap": [
    {
      "skill": "Required Skill Name",
      "requiredFor": "Target Role Title",
      "gapLevel": "High",
      "actionableSteps": "How to learn or bridge this gap (e.g. read docs, build a mini project)"
    },
    {
      "skill": "Required Skill Name",
      "requiredFor": "Target Role Title",
      "gapLevel": "Medium",
      "actionableSteps": "Steps to improve"
    }
  ],
  "certifications": ["Certification A", "Certification B"],
  "projects": [
    {
      "title": "Project Title",
      "description": "Project Description and technologies to use"
    },
    {
      "title": "Project Title",
      "description": "Project Description and technologies to use"
    }
  ],
  "interviewTips": ["Tip 1", "Tip 2"],
  "roadmap": {
    "thirtyDays": ["Step 1", "Step 2"],
    "sixtyDays": ["Step 3", "Step 4"],
    "ninetyDays": ["Step 5", "Step 6"]
  }
}
`;

  const finalPrompt = prompt + "\n\n" + jsonSchema;

  try {
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: finalPrompt }],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.35,
        topP: 0.9,
        topK: 40,
      },
    });

    const text = result.response.text();
    let data;

    try {
      let cleanedText = text.trim();
      if (cleanedText.startsWith("```")) {
        const match = cleanedText.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/);
        if (match) {
          cleanedText = match[1];
        } else {
          cleanedText = cleanedText.replace(/^```(?:json)?/, "").replace(/```$/, "").trim();
        }
      }
      data = JSON.parse(cleanedText);
    } catch (parseError) {
      console.log("Invalid JSON returned.");
      console.log(text);
      throw new Error("Gemini returned invalid JSON.");
    }

    // Validation & defaults
    if (!data || typeof data !== "object") {
      data = {};
    }
    data.domain = data.domain || predictedDomain;
    data.summary = data.summary || "Based on your inputs, here is your career mentor roadmap.";
    data.roles = Array.isArray(data.roles) ? data.roles.map(role => ({
      title: role?.title || "Career Option",
      matchScore: typeof role?.matchScore === 'number' ? role.matchScore : 80,
      reason: role?.reason || "Matches your interest profile."
    })) : [];
    data.skillGap = Array.isArray(data.skillGap) ? data.skillGap.map(gap => ({
      skill: gap?.skill || "General Competency",
      requiredFor: gap?.requiredFor || "All Roles",
      gapLevel: ["High", "Medium", "Low"].includes(gap?.gapLevel) ? gap.gapLevel : "Medium",
      actionableSteps: gap?.actionableSteps || "Learn the fundamentals and apply them."
    })) : [];
    data.certifications = Array.isArray(data.certifications) ? data.certifications.filter(Boolean) : [];
    data.projects = Array.isArray(data.projects) ? data.projects.map(proj => ({
      title: proj?.title || "Portfolio Project",
      description: proj?.description || "Build a project matching this stack."
    })) : [];
    data.interviewTips = Array.isArray(data.interviewTips) ? data.interviewTips.filter(Boolean) : [];
    
    if (!data.roadmap || typeof data.roadmap !== "object") {
      data.roadmap = {};
    }
    data.roadmap.thirtyDays = Array.isArray(data.roadmap.thirtyDays) ? data.roadmap.thirtyDays.filter(Boolean) : [];
    data.roadmap.sixtyDays = Array.isArray(data.roadmap.sixtyDays) ? data.roadmap.sixtyDays.filter(Boolean) : [];
    data.roadmap.ninetyDays = Array.isArray(data.roadmap.ninetyDays) ? data.roadmap.ninetyDays.filter(Boolean) : [];

    return data;
  } catch (error) {
    console.error("=== GEMINI API ERROR ===");
    console.error("Status Code:", error.status || "N/A");
    console.error("Status Text:", error.statusText || "N/A");
    console.error("Full Error Details:", error);
    console.error("=========================");
    throw error;
  }
}

async function generateChatResponse(history, message) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Gemini API Key Missing");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-3.5-flash",
    systemInstruction: "You are an encouraging and expert Senior Career Mentor. You help students and professionals navigate their career choices, understand skill gaps, build learning roadmaps, recommend projects, and prep for interviews. Be concise, highly actionable, and format your answers with clean markdown.",
  });

  const formattedHistory = Array.isArray(history) ? history.map(msg => ({
    role: msg.role === "user" ? "user" : "model",
    parts: [{ text: msg.text }],
  })) : [];

  const chat = model.startChat({
    history: formattedHistory,
  });

  const result = await chat.sendMessage(message);
  return result.response.text();
}

module.exports = {
  generateCareerAdvice,
  generateChatResponse,
};