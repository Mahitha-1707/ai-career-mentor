import axios from 'axios';

const BACKEND_URL = 'http://localhost:5000/api/career';

/**
 * Generates a high-quality mock response tailored to user inputs.
 * Used when the backend is not running, or fails (e.g. missing API key).
 */
function generateMockAdvice(formData) {
  const { name, degree, skills, interests, experience } = formData;
  
  const userName = name || 'Professional';
  const userDegree = degree || 'your field';
  const skillList = Array.isArray(skills) && skills.length > 0 ? skills : ['General Problem Solving'];
  const interestList = Array.isArray(interests) && interests.length > 0 ? interests : ['Career Growth'];
  
  const combinedText = [...skillList, ...interestList].join(" ").toLowerCase();
  const words = combinedText.split(/[^a-zA-Z0-9\+\#\-\.\/]/).filter(Boolean);
  
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
  
  let domain = 'Software Development';
  let roles = [];
  let skillGap = [];
  let certifications = [];
  let projects = [];
  let interviewTips = [];
  let roadmap = {};

  // 1. Artificial Intelligence
  if (has("artificial intelligence", "ai", "machine learning", "deep learning", "tensorflow", "pytorch", "generative ai", "llm", "langchain", "prompt engineering", "gemini api", "openai api")) {
    domain = 'Artificial Intelligence';
    roles = [
      {
        title: 'AI Engineer',
        matchScore: 95,
        reason: 'Matches your background in model interfaces and interest in artificial intelligence tools.'
      },
      {
        title: 'Generative AI Engineer',
        matchScore: 90,
        reason: 'Fits perfectly with prompt templating, LLMs, and Google/OpenAI APIs.'
      },
      {
        title: 'Machine Learning Engineer',
        matchScore: 88,
        reason: 'Leverages model fine-tuning frameworks like PyTorch or TensorFlow.'
      }
    ];
    skillGap = [
      {
        skill: 'Vector Databases (ChromaDB / Pinecone)',
        requiredFor: 'AI Engineer',
        gapLevel: 'High',
        actionableSteps: 'Learn semantic similarity indexing, document chunking, and embedding storage.'
      },
      {
        skill: 'Agentic Frameworks (LangChain / LlamaIndex)',
        requiredFor: 'Generative AI Engineer',
        gapLevel: 'Medium',
        actionableSteps: 'Build an automated multi-agent query-routing system.'
      }
    ];
    certifications = [
      'DeepLearning.AI TensorFlow Developer Certificate',
      'Google Cloud Certified - Professional ML Engineer'
    ];
    projects = [
      {
        title: 'RAG Semantic Search System',
        description: 'Upload custom documents, index them into a vector DB, and query details via LLM endpoints.'
      },
      {
        title: 'AI Ticket-Routing Agent',
        description: 'Create an Express app using Gemini SDK to analyze user emails and automate backend workflows.'
      }
    ];
    interviewTips = [
      'Explain semantic chunking strategies and how to optimize vector lookup queries.',
      'Showcase code handles context window exceptions and API token optimization.'
    ];
  }
  // 2. Data Science
  else if (has("python") && has("pandas", "numpy", "scikit-learn", "statistics")) {
    domain = 'Data Science';
    roles = [
      {
        title: 'Data Scientist',
        matchScore: 96,
        reason: 'Leverages Python statistical analysis packages and your analytical skillset.'
      },
      {
        title: 'Machine Learning Engineer',
        matchScore: 88,
        reason: 'Builds on regression and classification modeling pipelines in Python.'
      },
      {
        title: 'AI Engineer',
        matchScore: 82,
        reason: 'Integrates statistical models into web applications and API pipelines.'
      }
    ];
    skillGap = [
      {
        skill: 'Scikit-Learn modeling pipelines',
        requiredFor: 'Data Scientist',
        gapLevel: 'High',
        actionableSteps: 'Learn feature engineering, normalization, cross-validation, and hyperparameter tuning.'
      },
      {
        skill: 'SQL Query Optimization',
        requiredFor: 'Data Scientist',
        gapLevel: 'Medium',
        actionableSteps: 'Practice advanced window queries and table joins for dataset preparation.'
      }
    ];
    certifications = [
      'Google Data Analytics Professional Certificate',
      'DeepLearning.AI Machine Learning Specialization'
    ];
    projects = [
      {
        title: 'Predictive Customer Churn Model',
        description: 'Train a regression algorithm to identify churn risks and output visualizations via Pandas.'
      }
    ];
    interviewTips = [
      'Be ready to explain random forests, linear predictors, and model metrics like F1-Score vs Precision.',
      'Practice drawing database schema diagrams showing data warehouse structures.'
    ];
  }
  // 3. Data Engineering
  else if (has("sql", "python") && has("snowflake", "apache spark", "airflow", "etl")) {
    domain = 'Data Engineering';
    roles = [
      {
        title: 'Data Engineer',
        matchScore: 95,
        reason: 'Matches your SQL and Python pipelines combined with large scale ETL data processing.'
      },
      {
        title: 'Analytics Engineer',
        matchScore: 88,
        reason: 'Bridges raw data ingestion and visualization dashboards using dbt modeling.'
      },
      {
        title: 'Big Data Engineer',
        matchScore: 82,
        reason: 'Focuses on designing streaming and map-reduce schemas via Apache Spark.'
      }
    ];
    skillGap = [
      {
        skill: 'Apache Airflow orchestrations',
        requiredFor: 'Data Engineer',
        gapLevel: 'High',
        actionableSteps: 'Write DAG pipelines automating scheduling, extraction, and warehouse updates.'
      },
      {
        skill: 'Snowflake Data Modeling',
        requiredFor: 'Analytics Engineer',
        gapLevel: 'Medium',
        actionableSteps: 'Study dimensional tables, facts, and snowflake cluster keys.'
      }
    ];
    certifications = [
      'AWS Certified Data Analytics - Specialty',
      'SnowPro Core Certification'
    ];
    projects = [
      {
        title: 'Serverless ETL Log Pipeline',
        description: 'Ingest raw API files using Python, clean data using Pandas, and populate Snowflake warehouses.'
      }
    ];
    interviewTips = [
      'Refresh dimensional warehouse models, facts vs dimensions, and slowly changing dimensions (SCD).',
      'Practice optimization window calls and index management in SQL.'
    ];
  }
  // 4. Data Analytics
  else if (has("sql", "power bi", "excel", "tableau", "business intelligence")) {
    domain = 'Data Analytics';
    roles = [
      {
        title: 'Data Analyst',
        matchScore: 96,
        reason: 'Leverages SQL and BI analytics to construct reports and translate data into business metrics.'
      },
      {
        title: 'BI Developer',
        matchScore: 90,
        reason: 'Focuses on designing DAX metrics, data modeling, and dashboards inside Power BI or Tableau.'
      },
      {
        title: 'Business Analyst',
        matchScore: 85,
        reason: 'Bridges technical metrics and corporate strategy to draft operational workflow plans.'
      }
    ];
    skillGap = [
      {
        skill: 'DAX and Power Query logic',
        requiredFor: 'BI Developer',
        gapLevel: 'Medium',
        actionableSteps: 'Learn advanced data modeling relationships, custom filters, and calendar tables.'
      },
      {
        skill: 'Advanced SQL windows',
        requiredFor: 'Data Analyst',
        gapLevel: 'High',
        actionableSteps: 'Practice partition aggregations, common table expressions (CTEs), and query profiling.'
      }
    ];
    certifications = [
      'Google Data Analytics Professional Certificate',
      'Microsoft Certified: Power BI Data Analyst Associate'
    ];
    projects = [
      {
        title: 'Executive Sales Performance Report',
        description: 'Connect SQL tables to Power BI, draft DAX calculations, and build interactive trend indicators.'
      }
    ];
    interviewTips = [
      'Expect SQL whiteboard tests involving JOINs, subqueries, and GROUP BY conditions.',
      'Practice explaining complex analytical charts in clear terms to non-technical managers.'
    ];
  }
  // 5. Cyber Security
  else if (has("networking", "linux", "ethical hacking", "kali linux", "wireshark", "burp suite")) {
    domain = 'Cyber Security';
    roles = [
      {
        title: 'Cyber Security Analyst',
        matchScore: 94,
        reason: 'Fits your Linux systems foundations combined with interest in ethical network tracking.'
      },
      {
        title: 'Penetration Tester',
        matchScore: 88,
        reason: 'Evaluates network nodes and software applications using automated exploit checks.'
      },
      {
        title: 'SOC Analyst',
        matchScore: 82,
        reason: 'Monitors real-time security events, log triggers, and incident responses.'
      }
    ];
    skillGap = [
      {
        skill: 'Kali Linux exploit utilities',
        requiredFor: 'Penetration Tester',
        gapLevel: 'High',
        actionableSteps: 'Master Metasploit, Nmap scans, and privilege escalation checks.'
      },
      {
        skill: 'Wireshark packet diagnostics',
        requiredFor: 'Cyber Security Analyst',
        gapLevel: 'Medium',
        actionableSteps: 'Study TCP/IP protocols, handshake sequences, and trace malicious patterns.'
      }
    ];
    certifications = [
      'CompTIA Security+',
      'Certified Ethical Hacker (CEH)'
    ];
    projects = [
      {
        title: 'Vulnerability Assessment Audit',
        description: 'Scan a local staging target using Nmap, audit open ports, and write a vulnerability remediation report.'
      }
    ];
    interviewTips = [
      'Understand the OWASP Top 10 vulnerabilities, specifically SQL injection, XSS, and broken auth.',
      'Explain how firewalls, VPC security groups, and encryption protocols work under the hood.'
    ];
  }
  // 6. Game Development
  else if (has("unity", "unreal engine", "c#", "game development")) {
    domain = 'Game Development';
    roles = [
      {
        title: 'Game Developer',
        matchScore: 95,
        reason: 'Leverages your interest in interactive design alongside C# logic blocks in Unity.'
      },
      {
        title: 'Unity Developer',
        matchScore: 92,
        reason: 'Designs layout scenes, character controllers, state mechanics, and assets physics.'
      },
      {
        title: 'AR/VR Developer',
        matchScore: 80,
        reason: 'Bridges standard 3D game pipelines into spatial computing and responsive viewports.'
      }
    ];
    skillGap = [
      {
        skill: 'C# advanced scripting in Unity',
        requiredFor: 'Unity Developer',
        gapLevel: 'Medium',
        actionableSteps: 'Learn delegates, scriptable objects, event systems, and object pools.'
      },
      {
        skill: 'Shader and Render Optimizations',
        requiredFor: 'Game Developer',
        gapLevel: 'High',
        actionableSteps: 'Study GPU batch draws, occlusion culling, and texture compressions.'
      }
    ];
    certifications = [
      'Unity Certified Associate - Game Developer',
      'Unreal Engine Certified Creator Program'
    ];
    projects = [
      {
        title: '3D Physics Platformer sandbox',
        description: 'Build a game including player physics, score triggers, custom animations, and object pools in C#.'
      }
    ];
    interviewTips = [
      'Be ready to outline game loops, update vs late update frames, and reference garbage collector costs.',
      'Explain structural design patterns like Singleton, State, and Component-Entity structures.'
    ];
  }
  // 7. Blockchain
  else if (has("solidity", "ethereum", "web3", "smart contracts")) {
    domain = 'Blockchain';
    roles = [
      {
        title: 'Blockchain Developer',
        matchScore: 94,
        reason: 'Matches Web3 skills to deploy custom smart contracts and transaction protocols.'
      },
      {
        title: 'Web3 Developer',
        matchScore: 90,
        reason: 'Integrates front-end UI libraries with contract wallets using Ethers.js or Web3.js.'
      },
      {
        title: 'Smart Contract Engineer',
        matchScore: 86,
        reason: 'Focuses on writing optimized contract logic, gas optimizations, and audits.'
      }
    ];
    skillGap = [
      {
        skill: 'Solidity Smart Contract Security',
        requiredFor: 'Smart Contract Engineer',
        gapLevel: 'High',
        actionableSteps: 'Study reentrancy exploits, integer overflows, and contract audit patterns.'
      },
      {
        skill: 'Ethers.js Wallet Integrations',
        requiredFor: 'Web3 Developer',
        gapLevel: 'Medium',
        actionableSteps: 'Connect Metamask wallets to a React interface and call read/write contract hooks.'
      }
    ];
    certifications = [
      'Certified Blockchain Developer (CBD)',
      'Ethereum Smart Contract Security Auditing Specialization'
    ];
    projects = [
      {
        title: 'Decentralized Crowd-Funding Portal',
        description: 'Write Solidity smart contracts to hold, target, and refund ether; build a React front-end client interface.'
      }
    ];
    interviewTips = [
      'Explain Ethereum Virtual Machine (EVM) structures, gas fee calculations, and call vs delegatecall patterns.',
      'Understand reentrancy exploit mitigation rules and the Checks-Effects-Interactions pattern.'
    ];
  }
  // 8. Embedded Systems
  else if (has("c", "c++", "arduino", "raspberry pi", "embedded c", "microcontrollers")) {
    domain = 'Embedded Systems';
    roles = [
      {
        title: 'Embedded Software Engineer',
        matchScore: 95,
        reason: 'Combines low-level C programming with hardware controls and circuit structures.'
      },
      {
        title: 'Firmware Engineer',
        matchScore: 90,
        reason: 'Develops device drivers, bootloaders, and system-level interface protocols.'
      },
      {
        title: 'IoT Engineer',
        matchScore: 84,
        reason: 'Bridges microcontrollers to cloud networking nodes and data ingestion points.'
      }
    ];
    skillGap = [
      {
        skill: 'Embedded C Hardware Registrations',
        requiredFor: 'Embedded Software Engineer',
        gapLevel: 'High',
        actionableSteps: 'Learn GPIO mapping, timers, interrupts, and serial communication (UART, I2C, SPI).'
      },
      {
        skill: 'RTOS (Real-Time Operating Systems)',
        requiredFor: 'Firmware Engineer',
        gapLevel: 'High',
        actionableSteps: 'Learn tasks, semaphores, mutexes, and scheduling in FreeRTOS.'
      }
    ];
    certifications = [
      'Embedded Software Engineering Professional Certificate',
      'Arm Accredited Engineer (AAE)'
    ];
    projects = [
      {
        title: 'Automated Weather Monitoring Hub',
        description: 'Program a microcontroller (ESP32/Arduino) to read sensors, transmit stats to cloud endpoints via Wi-Fi.'
      }
    ];
    interviewTips = [
      'Be prepared to explain bitwise operations, volatile keywords, pointer arithmetic, and stack vs heap configurations.',
      'Practice mapping simple state machines representing hardware behaviors.'
    ];
  }
  // 9. Mobile Development
  else if (has("flutter", "react native", "android", "kotlin", "swift")) {
    domain = 'Mobile Development';
    roles = [
      {
        title: 'Mobile App Developer',
        matchScore: 96,
        reason: 'Perfect fit given your experience with mobile frameworks and mobile UI layouts.'
      },
      {
        title: 'Android Developer',
        matchScore: 90,
        reason: 'Focuses on writing native Android applications in Kotlin and standard material guides.'
      },
      {
        title: 'iOS Developer',
        matchScore: 88,
        reason: 'Focuses on Swift, Xcode workspaces, Apple guidelines, and SwiftUI components.'
      }
    ];
    skillGap = [
      {
        skill: 'Flutter State Management (BLoC / Provider)',
        requiredFor: 'Mobile App Developer',
        gapLevel: 'Medium',
        actionableSteps: 'Build an app containing async requests, models mapping, and state indicators.'
      },
      {
        skill: 'Kotlin Coroutines and API client structure',
        requiredFor: 'Android Developer',
        gapLevel: 'High',
        actionableSteps: 'Learn asynchronous threads calling client APIs and updating views.'
      }
    ];
    certifications = [
      'Google Associate Android Developer',
      'Meta Android Developer Professional Certificate'
    ];
    projects = [
      {
        title: 'Personal Finance Tracker Mobile App',
        description: 'Create a cross-platform Flutter/React Native application showing financial analytics graphs.'
      }
    ];
    interviewTips = [
      'Understand mobile design guidelines, local storage (SQLite/Hive), and sync adapters.',
      'Explain native compilation targets vs cross-platform web frames.'
    ];
  }
  // 10. DevOps
  else if (has("docker", "kubernetes", "jenkins", "github actions", "linux", "ci/cd")) {
    domain = 'DevOps';
    roles = [
      {
        title: 'DevOps Engineer',
        matchScore: 96,
        reason: 'Excellent alignment since you work across container orchestrations, Linux terminals, and build tools.'
      },
      {
        title: 'Platform Engineer',
        matchScore: 88,
        reason: 'Designs deployment platforms and developer environments to host scalable applications.'
      },
      {
        title: 'Site Reliability Engineer (SRE)',
        matchScore: 82,
        reason: 'Focuses on container scaling, health probes, server failovers, and incident diagnostic monitoring.'
      }
    ];
    skillGap = [
      {
        skill: 'Kubernetes Container Orchestration',
        requiredFor: 'DevOps Engineer',
        gapLevel: 'High',
        actionableSteps: 'Set up Minikube, deploy multiple-replica applications, configure configmaps, and ingress routes.'
      },
      {
        skill: 'CI/CD Pipelines (Jenkins / GitHub Actions)',
        requiredFor: 'DevOps Engineer',
        gapLevel: 'High',
        actionableSteps: 'Build automation pipelines that execute linting, run tests, and package Docker containers on pushes.'
      }
    ];
    certifications = [
      'Certified Kubernetes Administrator (CKA)',
      'HashiCorp Certified: Terraform Associate'
    ];
    projects = [
      {
        title: 'Fully Automated CI/CD Web Pipeline',
        description: 'Write a pipeline that automates React application builds, runs tests, creates Docker packages, and deploys online.'
      }
    ];
    interviewTips = [
      'Understand processes, namespaces, and cgroups in container virtualization.',
      'Explain how blue/green deployments compare with rolling updates in Kubernetes.'
    ];
  }
  // 11. Cloud Computing
  else if (has("aws", "azure", "google cloud", "cloud computing")) {
    domain = 'Cloud Computing';
    roles = [
      {
        title: 'Cloud Engineer',
        matchScore: 95,
        reason: 'Leverages cloud provider services (AWS/Azure) to host infrastructure and manage server networks.'
      },
      {
        title: 'Cloud Administrator',
        matchScore: 88,
        reason: 'Manages user accounts, IAM policies, networking security groups, and cloud billing targets.'
      },
      {
        title: 'Cloud Support Engineer',
        matchScore: 80,
        reason: 'Triage connectivity issues, diagnostic logs, and server outages on cloud systems.'
      }
    ];
    skillGap = [
      {
        skill: 'Infrastructure as Code (Terraform)',
        requiredFor: 'Cloud Engineer',
        gapLevel: 'High',
        actionableSteps: 'Learn HCL scripting to spin up VPCs, subnets, EC2 nodes, and database servers on AWS.'
      },
      {
        skill: 'Cloud Security and IAM rules',
        requiredFor: 'Cloud Administrator',
        gapLevel: 'Medium',
        actionableSteps: 'Configure identity profiles, restrict roles, and audit security tokens.'
      }
    ];
    certifications = [
      'AWS Certified Solutions Architect - Associate',
      'Microsoft Certified: Azure Fundamentals'
    ];
    projects = [
      {
        title: 'High-Availability AWS Infrastructure Setup',
        description: 'Write a Terraform script that launches load balancers, auto-scaling instances, and security groups in AWS.'
      }
    ];
    interviewTips = [
      'Outline standard cloud architectural pillars: security, cost, performance, and high-availability.',
      'Practice designing VPC configurations showing subnet splits, gateways, and load routing tables.'
    ];
  }
  // 12. UI/UX Design
  else if (has("figma", "adobe xd", "wireframing", "prototype", "ui design", "ux design")) {
    domain = 'UI/UX Design';
    roles = [
      {
        title: 'UI Designer',
        matchScore: 96,
        reason: 'Fits your screen interfaces design experience and layout prototyping workflows.'
      },
      {
        title: 'UX Designer',
        matchScore: 92,
        reason: 'Evaluates user journeys, information hierarchy, and user feedback metrics.'
      },
      {
        title: 'Product Designer',
        matchScore: 90,
        reason: 'Guides visual guidelines, conducts audits, drafts wireframes, and manages component design assets.'
      }
    ];
    skillGap = [
      {
        skill: 'UX Research and Usability Testing protocols',
        requiredFor: 'UX Designer',
        gapLevel: 'High',
        actionableSteps: 'Practice user testing structures, record sessions, and map user flows.'
      },
      {
        skill: 'Advanced Figma Variables and Systems',
        requiredFor: 'UI Designer',
        gapLevel: 'Medium',
        actionableSteps: 'Build unified atomic component system tokens inside Figma.'
      }
    ];
    certifications = [
      'Google UX Design Professional Certificate',
      'NN/g UX Master Certification'
    ];
    projects = [
      {
        title: 'Wellness Mobile App Case Study',
        description: 'Conduct user research, build design guidelines, map wireframes, and create a high fidelity clickable prototype.'
      }
    ];
    interviewTips = [
      'Focus on detailing your problem solving steps, user feedback data, and wireframes rather than just high fidelity renders.',
      'Practice whiteboard sessions for user login or product checkout layouts.'
    ];
  }
  // 13. Java Development
  else if (has("java", "spring boot", "hibernate", "jpa")) {
    domain = 'Java Development';
    roles = [
      {
        title: 'Java Developer',
        matchScore: 96,
        reason: 'Matches your object-oriented Java foundations and backend database mapping skills.'
      },
      {
        title: 'Spring Boot Developer',
        matchScore: 92,
        reason: 'Focuses on deploying server REST APIs, dependency injection, and JPA structures.'
      },
      {
        title: 'Backend Engineer',
        matchScore: 88,
        reason: 'Manages API endpoints, backend databases, and service configurations.'
      }
    ];
    skillGap = [
      {
        skill: 'Spring Boot API Security (Spring Security)',
        requiredFor: 'Spring Boot Developer',
        gapLevel: 'High',
        actionableSteps: 'Learn JWT configuration, password encoders, authentication filters, and method security.'
      },
      {
        skill: 'Hibernate Query Optimization',
        requiredFor: 'Java Developer',
        gapLevel: 'Medium',
        actionableSteps: 'Resolve N+1 query issue, study object mappings, and database transaction boundaries.'
      }
    ];
    certifications = [
      'Oracle Certified Professional: Java SE Developer',
      'Spring Certified Professional'
    ];
    projects = [
      {
        title: 'Corporate Employee Management REST API',
        description: 'Build a secure API in Spring Boot, utilizing JPA mappings, MySQL database, and validation annotations.'
      }
    ];
    interviewTips = [
      'Be ready to explain OOP principles, JVM architecture, garbage collection, and HashMap internals.',
      'Explain dependency injection and how inversion of control (IoC) works in Spring.'
    ];
  }
  // 14. Python Development
  else if (has("python", "flask", "django")) {
    domain = 'Python Development';
    roles = [
      {
        title: 'Python Developer',
        matchScore: 96,
        reason: 'Matches your core scripting and data processing pipelines in Python.'
      },
      {
        title: 'Backend Developer',
        matchScore: 90,
        reason: 'Develops server REST APIs, middleware filters, and routes datasets using Django or Flask.'
      },
      {
        title: 'Automation Engineer',
        matchScore: 84,
        reason: 'Creates file management utilities, database seeders, and automation scripts.'
      }
    ];
    skillGap = [
      {
        skill: 'Django ORM and Database migrations',
        requiredFor: 'Backend Developer',
        gapLevel: 'Medium',
        actionableSteps: 'Learn how to define database tables in Django models and manage schema updates.'
      },
      {
        skill: 'API Testing (Pytest)',
        requiredFor: 'Python Developer',
        gapLevel: 'Low',
        actionableSteps: 'Write testing loops to mock endpoints and evaluate status responses.'
      }
    ];
    certifications = [
      'PCAP – Certified Associate in Python Programming',
      'Google IT Automation with Python Professional Certificate'
    ];
    projects = [
      {
        title: 'Blogging REST API Hub',
        description: 'Build a backend server in Django REST framework containing user accounts, comments mapping, and image uploads.'
      }
    ];
    interviewTips = [
      'Explain mutable vs immutable variables, generators, list comprehensions, and decorators in Python.',
      'Compare WSGI vs ASGI web server routing styles.'
    ];
  }
  // 15. Full Stack Development
  else if (
    (words.includes("react") && words.includes("node")) ||
    words.includes("fullstack") ||
    combinedText.includes("full stack")
  ) {
    domain = 'Full Stack Development';
    roles = [
      {
        title: 'Full Stack Developer',
        matchScore: 96,
        reason: 'Matches your capabilities in interactive front-end React components and backend Node API routes.'
      },
      {
        title: 'MERN Stack Developer',
        matchScore: 92,
        reason: 'Focuses specifically on building React apps using Express, Node, and MongoDB database layers.'
      },
      {
        title: 'Software Engineer',
        matchScore: 88,
        reason: 'Guides database models, secure REST APIs, system integrations, and client components.'
      }
    ];
    skillGap = [
      {
        skill: 'PostgreSQL or MongoDB Schema Design',
        requiredFor: 'MERN Stack Developer',
        gapLevel: 'Medium',
        actionableSteps: 'Learn table relationships, indices, aggregations, and raw query optimization.'
      },
      {
        skill: 'Authentication Protocols (JWT / OAuth)',
        requiredFor: 'Full Stack Developer',
        gapLevel: 'High',
        actionableSteps: 'Implement secure login, token signature validation, cookies, and route guards.'
      }
    ];
    certifications = [
      'AWS Certified Developer - Associate',
      'Meta Full-Stack Developer Professional Certificate'
    ];
    projects = [
      {
        title: 'Real-time Corporate Chat Workspace',
        description: 'Build an app containing login flow, channel creations, WebSockets messaging sync, and MongoDB server.'
      }
    ];
    interviewTips = [
      'Outline client-side routing vs server-side rendering, component lifecycles, and state hooks.',
      'Explain how CORS security rules protect backend APIs from unauthorized calls.'
    ];
  }
  // 16. Frontend Development
  else if (
    words.includes("react") ||
    words.includes("javascript") ||
    words.includes("js") ||
    words.includes("html") ||
    words.includes("css") ||
    words.includes("bootstrap") ||
    words.includes("tailwind") ||
    words.includes("next.js")
  ) {
    domain = 'Frontend Development';
    roles = [
      {
        title: 'Frontend Developer',
        matchScore: 95,
        reason: 'Fits your JavaScript scripting, HTML styling, and interactive React layout foundations.'
      },
      {
        title: 'React Developer',
        matchScore: 92,
        reason: 'Focuses deeply on component design, state hooks, custom properties, rendering loops, and context values.'
      },
      {
        title: 'UI Developer',
        matchScore: 88,
        reason: 'Bridges visual designs (Figma) and interactive layouts using CSS frameworks and variables.'
      }
    ];
    skillGap = [
      {
        skill: 'TypeScript for Static Coding safety',
        requiredFor: 'Frontend Developer',
        gapLevel: 'Medium',
        actionableSteps: 'Define explicit component props interface models and type-check APIs.'
      },
      {
        skill: 'Next.js App Router (SSR)',
        requiredFor: 'React Developer',
        gapLevel: 'High',
        actionableSteps: 'Build an app optimizing page-load sizes, meta titles, and server components.'
      }
    ];
    certifications = [
      'Meta Front-End Developer Professional Certificate',
      'W3Schools Front-End Web Developer Certification'
    ];
    projects = [
      {
        title: 'Interactive Crypto Portfolio analytics client',
        description: 'Create a React app fetching coin statistics from APIs and rendering trend lines using chart libraries.'
      }
    ];
    interviewTips = [
      'Explain scope closures, event hoisting, promise callbacks, and async/await event loops.',
      'Detail layout designs leveraging CSS flex containers and grid systems.'
    ];
  }
  // 17. Backend Development
  else if (has("node.js", "express.js", "rest api", "mongodb")) {
    domain = 'Backend Development';
    roles = [
      {
        title: 'Backend Developer',
        matchScore: 95,
        reason: 'Leverages your backend database integrations and custom REST API configurations.'
      },
      {
        title: 'Node.js Developer',
        matchScore: 92,
        reason: 'Focuses specifically on asynchronous file operations, API middleware filters, and Express routing.'
      },
      {
        title: 'API Developer',
        matchScore: 88,
        reason: 'Bridges business integrations by writing clear, document-documented endpoints.'
      }
    ];
    skillGap = [
      {
        skill: 'Database query optimizations',
        requiredFor: 'Backend Developer',
        gapLevel: 'High',
        actionableSteps: 'Learn indexes creation, aggregation lookups, and transaction blocks.'
      },
      {
        skill: 'REST guidelines & Swagger docs',
        requiredFor: 'API Developer',
        gapLevel: 'Medium',
        actionableSteps: 'Write backend specifications and automate interactive endpoint reports.'
      }
    ];
    certifications = [
      'AWS Certified Developer - Associate',
      'OpenJS Node.js Application Developer (ASD)'
    ];
    projects = [
      {
        title: 'Secure API gateway & Authentication module',
        description: 'Write a Node service using bcrypt password hashing, JWT sessions, rate limiting, and inputs validations.'
      }
    ];
    interviewTips = [
      'Explain non-blocking I/O event loops, cluster scaling, and stream pipelines in Node.',
      'Be ready to map REST resource status codes for errors (e.g. 400, 401, 403, 500).'
    ];
  }
  // 18. Default Software Engineering
  else {
    domain = 'Software Development';
    roles = [
      {
        title: 'Software Engineer',
        matchScore: 94,
        reason: `Your credentials in ${userDegree} and active skills (${skillList.slice(0, 2).join(', ')}) give you an excellent logic base to build software applications.`
      },
      {
        title: 'Systems Engineer',
        matchScore: 86,
        reason: 'Perfect for working on configuration scripts, server monitoring tools, and general command-line utilities.'
      },
      {
        title: 'API Integrator',
        matchScore: 80,
        reason: 'Focuses on integrating multiple business SaaS endpoints and writing data transformations.'
      }
    ];
    skillGap = [
      {
        skill: 'Git & Collaboration Workflows',
        requiredFor: 'Software Engineer',
        gapLevel: 'Low',
        actionableSteps: 'Master branch merges, pull request reviews, resolve conflicts, and use interactive rebases.'
      },
      {
        skill: 'Object-Oriented Programming (OOP) & Architecture',
        requiredFor: 'Software Engineer',
        gapLevel: 'Medium',
        actionableSteps: 'Study SOLID programming principles, design patterns (Singleton, Factory), and test-driven code.'
      }
    ];
    certifications = [
      'AWS Certified Developer - Associate',
      'CompTIA Security+ Certification'
    ];
    projects = [
      {
        title: 'Secure Authentication REST API gateway',
        description: 'Design an Express API utilizing JWT, password hashing via bcrypt, rate-limiting, and validation schemas.'
      }
    ];
    interviewTips = [
      'Review fundamental data structures (Arrays, Linked Lists, HashMaps) and search/sorting algorithms.',
      'Structure behavioral answers using the STAR method (Situation, Task, Action, Result).'
    ];
  }

  // Adjust fit scores based on soft skills presence
  const softText = combinedText;
  roles = roles.map(role => {
    let score = role.matchScore;
    
    if (softText.includes("problem solving")) {
      if (['Software Engineer', 'AI Engineer', 'Backend Developer'].includes(role.title)) {
        score = Math.min(100, score + 3);
      }
    }
    if (softText.includes("creativity")) {
      if (['Frontend Developer', 'UI Designer', 'Product Designer'].includes(role.title)) {
        score = Math.min(100, score + 3);
      }
    }
    if (softText.includes("analytical thinking")) {
      if (['Data Scientist', 'AI Engineer', 'Data Analyst'].includes(role.title)) {
        score = Math.min(100, score + 3);
      }
    }
    
    return { ...role, matchScore: score };
  });

  // Common Roadmap Templates for v2
  roadmap = {
    thirtyDays: [
      'Master core foundations: Review key documentation and complete initial tutorials.',
      'Bridge the skill gap: Spend 1 hour daily learning the first high gap item in the list.',
      'Start portfolio project 1: Build the UI structures and simple logic hooks.'
    ],
    sixtyDays: [
      'Connect backend/databases: Enhance project 1 with REST APIs and database layers.',
      'Engage with open-source: Fork repository boards, run setups, and contribute code.',
      'Refine profile networks: Highlight your target skill areas on LinkedIn and GitHub.'
    ],
    ninetyDays: [
      'Complete project 2: Build the secondary project, containerize it, and deploy online.',
      'Optimize application files: Write descriptions showcasing target skills.',
      'Launch outreach applications: Send 5 targeted applications weekly and practice mock interviews.'
    ]
  };

  return {
    isMock: true,
    summary: `Hello ${userName}! Based on your credentials (${userDegree}), your active skills (${skillList.join(', ')}), and your target goals (${interestList.join(', ')}), you are positioned for a successful career in ${domain}. Here is a curated mentor analysis to accelerate your professional growth.`,
    domain: domain,
    roles: roles,
    skillGap: skillGap,
    certifications: certifications,
    projects: projects,
    interviewTips: interviewTips,
    roadmap: roadmap
  };
}

/**
 * Sends a career advice request to the backend. Falls back to mock data if backend is offline or unauthenticated.
 */
export async function getCareerAdvice(formData) {
  try {
    const response = await axios.post(BACKEND_URL, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 12000, // 12-second timeout to handle Gemini latency
    });

    return response.data;
  } catch (error) {
    console.warn('Backend API connection failed or returned an error, falling back to simulated Gemini response.', error);
    
    // Simulate network latency (2 seconds)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(generateMockAdvice(formData));
      }, 2000);
    });
  }
}

const CHAT_BACKEND_URL = 'http://localhost:5000/api/career/chat';

/**
 * Generates a mock chat response in the frontend if the backend API key is unavailable or fails.
 */
function generateMockChatResponse(message) {
  const msg = message.toLowerCase();

  if (msg.includes("prepare") || msg.includes("interview") || msg.includes("prep")) {
    return `### Interview Strategy & Prep Recommendations

Preparing for a tech interview requires a mix of fundamental concepts, coding practice, and behavioral storytelling:

1. **Whiteboard/Coding Exercises**:
   - Master common patterns (sliding window, two pointers, depth-first search).
   - Talk through your thought process out loud. Start by identifying edge cases before writing code.
2. **System Architecture**:
   - For backend/fullstack, practice designing microservices, database schemas, and caching strategies (Redis).
   - Use diagrams to explain resource routes clearly.
3. **Behavioral Questions**:
   - Use the **STAR** method (Situation, Task, Action, Result) to talk about project conflicts, technical challenges, or leadership initiatives.

Would you like to drill down into a specific role's interview questions (e.g. Frontend or DevOps)?`;
  }

  if (msg.includes("project") || msg.includes("portfolio") || msg.includes("build")) {
    return `### Portfolio Project Recommendations

Building projects is the single best way to bridge your skill gaps and display your capabilities:

1. **Frontend / Fullstack Project**:
   - **Real-Time Workspace (React + Socket.io + MongoDB)**: Implement live message feeds, online status tags, database persistence, and clean CSS layouts.
2. **Backend / Data Project**:
   - **ETL Data Pipelines (Python + SQL + Docker)**: Schedule daily ingestion scripts, parse raw JSON fields, save aggregates to PostgreSQL, and containerize the service.
3. **Cloud / DevOps Project**:
   - **VPC Deployment via Terraform**: Provision a highly available auto-scaling cluster with custom load balancers and secure route configurations.

Which domain's projects are you interested in building first?`;
  }

  if (msg.includes("react") || msg.includes("frontend") || msg.includes("js") || msg.includes("javascript")) {
    return `### Frontend Development Guidance (React & JavaScript)

To level up your Frontend and React capabilities:

1. **Advanced JavaScript**:
   - Master asynchronous control (promises, async/await, event loops).
   - Understand hoisting, variable scopes, closures, and modern ES6 operators.
2. **React Fundamentals & State**:
   - Understand rendering triggers, component lifecycles, and key hooks (\`useState\`, \`useEffect\`, \`useMemo\`, \`useCallback\`).
   - Learn state optimization: avoid over-rendering and lift state appropriately.
3. **Next.js & SSR**:
   - Learn the differences between Server-Side Rendering (SSR) and Static Site Generation (SSG).
   - Practice the App Router configuration to optimize page size and SEO metrics.

Do you have any questions on styling, state management libraries (Redux/Zustand), or deployment hubs?`;
  }

  if (msg.includes("python") || msg.includes("data") || msg.includes("analyt") || msg.includes("machine") || msg.includes("ml") || msg.includes("ai")) {
    return `### AI, Data Science & Python Guidance

If you are pursuing AI, Data Science, or general Python backend tracks:

1. **Python Scripting & Automation**:
   - Clean datasets using \`Pandas\` and \`NumPy\`.
   - Practice writing reusable scripts, error handlers, and file operations.
2. **Machine Learning Pipeline**:
   - Learn supervised learning algorithms (regression, classification) via \`Scikit-Learn\`.
   - Build intuition around hyperparameters and validation metrics (F1-score, precision/recall).
3. **Generative AI & LLMs**:
   - Connect frontend apps to Gemini/OpenAI API endpoints.
   - Master prompt templating, Retrieval-Augmented Generation (RAG) structures, and embedding vector databases.

What area would you like to investigate further?`;
  }

  if (msg.includes("docker") || msg.includes("kubernetes") || msg.includes("devops") || msg.includes("aws") || msg.includes("cloud")) {
    return `### DevOps & Cloud Computing Path

Transitioning into DevOps and Infrastructure involves mastering scaling, containerization, and automation:

1. **Virtualization & Containers**:
   - Learn how to package Node/Python web apps into minimal \`Docker\` containers.
   - Master image tags, environment bindings, and multi-stage builds.
2. **Orchestrations & CI/CD**:
   - Set up automatic GitHub Actions pipelines that run tests, lint scripts, and push images on changes.
   - Practice basic deployments on \`Kubernetes\` clusters using deployments, service definitions, and ingress mappings.
3. **Cloud Infrastructure**:
   - Understand fundamental AWS/Azure services: VPC subnetting, security groups, database instances, and IAM roles.

Would you like advice on cloud certifications or basic pipeline setups?`;
  }

  return `### Industry Mentorship Insights

As your AI Career Mentor, I'm here to guide your professional trajectory. Here are some quick starting options:

- **Skills Expansion**: Tell me a skill you want to learn (e.g. React, Docker, Python) and I'll detail the core topics.
- **Projects**: Tell me your target field (e.g. Frontend, Data) and I'll suggest a roadmap project.
- **Interviews**: Ask me about tech interview structures or strategies.

Tell me a bit more about your career objectives, or ask about specific roadmap steps!`;
}

/**
 * Sends a chat message to the backend. Falls back to mock data if backend is offline or returns error.
 */
export async function sendChatMessage(history, message) {
  try {
    const response = await axios.post(CHAT_BACKEND_URL, { history, message }, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });

    return response.data.response;
  } catch (error) {
    console.warn('Backend Chat API connection failed or returned an error, falling back to simulated Gemini Chat response.', error);
    
    // Simulate network latency (1 second)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(generateMockChatResponse(message));
      }, 1000);
    });
  }
}
