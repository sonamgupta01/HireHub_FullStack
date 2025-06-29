// Simple test for AI analysis functionality
const commonSkills = [
  // Programming Languages
  "JavaScript", "Python", "Java", "C++", "C#", "PHP", "Ruby", "Go", "Rust", "Swift", "Kotlin", "TypeScript",
  // Web Technologies
  "HTML", "CSS", "React", "Angular", "Vue.js", "Node.js", "Express.js", "Django", "Flask", "Laravel", "Spring Boot",
  // Databases
  "MongoDB", "MySQL", "PostgreSQL", "SQLite", "Redis", "Oracle", "SQL Server",
  // Cloud & DevOps
  "AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Jenkins", "Git", "GitHub", "GitLab", "CI/CD",
  // Data Science & ML
  "Machine Learning", "Data Analysis", "Pandas", "NumPy", "TensorFlow", "PyTorch", "Scikit-learn", "R", "Tableau",
  // Mobile Development
  "React Native", "Flutter", "iOS Development", "Android Development", "Mobile Development",
  // Design & UX
  "Figma", "Adobe Creative Suite", "Photoshop", "Illustrator", "UI/UX Design", "User Research", "Prototyping",
  // Other Technologies
  "REST APIs", "GraphQL", "Microservices", "Agile", "Scrum", "Project Management", "Linux", "Windows", "MacOS"
];

// Extract skills from resume text using AI-like pattern matching
function extractSkillsFromResume(resumeText) {
  const extractedSkills = [];
  const lowerResumeText = resumeText.toLowerCase();
  
  commonSkills.forEach(skill => {
    const skillLower = skill.toLowerCase();
    if (lowerResumeText.includes(skillLower)) {
      extractedSkills.push(skill);
    }
  });

  // Also look for common skill patterns
  const skillPatterns = [
    /(?:proficient in|experience with|skilled in|knowledge of)\s+([A-Za-z\s+#]+)/gi,
    /(?:technologies?|tools?|languages?|frameworks?):\s*([A-Za-z\s,]+)/gi,
    /(?:skills?|expertise):\s*([A-Za-z\s,]+)/gi
  ];

  skillPatterns.forEach(pattern => {
    const matches = [...resumeText.matchAll(pattern)];
    matches.forEach(match => {
      const skills = match[1].split(/[,\s]+/).filter(s => s.length > 2);
      skills.forEach(skill => {
        const cleanSkill = skill.trim();
        if (cleanSkill && !extractedSkills.includes(cleanSkill) && commonSkills.some(cs => 
          cs.toLowerCase().includes(cleanSkill.toLowerCase()) || 
          cleanSkill.toLowerCase().includes(cs.toLowerCase())
        )) {
          extractedSkills.push(cleanSkill);
        }
      });
    });
  });

  return [...new Set(extractedSkills)]; // Remove duplicates
}

// Calculate job fit score based on skills match
function calculateJobFitScore(resumeSkills, jobSkills) {
  if (!jobSkills || jobSkills.length === 0) return 0;
  
  const matchedSkills = resumeSkills.filter(skill => 
    jobSkills.some(jobSkill => 
      skill.toLowerCase().includes(jobSkill.toLowerCase()) || 
      jobSkill.toLowerCase().includes(skill.toLowerCase())
    )
  );

  const matchPercentage = (matchedSkills.length / jobSkills.length) * 100;
  
  // Bonus points for having more skills than required
  const bonusPoints = Math.min((resumeSkills.length - jobSkills.length) * 2, 10);
  
  return Math.min(matchPercentage + bonusPoints, 100);
}

// Test with sample resume
const sampleResume = `
John Doe
Software Developer

EXPERIENCE:
- Frontend Developer at TechCorp (2022-2023)
  • Developed web applications using React, JavaScript, and HTML/CSS
  • Worked with REST APIs and Git for version control
  • Collaborated with backend team using Node.js and Express.js

SKILLS:
- Programming Languages: JavaScript, Python, TypeScript
- Frameworks: React, Node.js, Express.js
- Databases: MongoDB, MySQL
- Tools: Git, Docker, AWS
- Other: REST APIs, Agile methodology

EDUCATION:
- Bachelor's in Computer Science
- Proficient in machine learning and data analysis
`;

const sampleJob = {
  jobTitle: "Full Stack Developer",
  companyName: "StartupXYZ",
  skills: ["React", "Node.js", "MongoDB", "Express.js", "JavaScript", "TypeScript"]
};

console.log("=== AI Job Analysis Test ===");
console.log("Sample Resume:", sampleResume.substring(0, 100) + "...");
console.log("Sample Job:", sampleJob.jobTitle, "at", sampleJob.companyName);
console.log("Required Skills:", sampleJob.skills);

const extractedSkills = extractSkillsFromResume(sampleResume);
console.log("\nExtracted Skills:", extractedSkills);

const fitScore = calculateJobFitScore(extractedSkills, sampleJob.skills);
console.log("Fit Score:", Math.round(fitScore) + "%");

const matchedSkills = extractedSkills.filter(skill => 
  sampleJob.skills.some(jobSkill => 
    skill.toLowerCase().includes(jobSkill.toLowerCase()) || 
    jobSkill.toLowerCase().includes(skill.toLowerCase())
  )
);
console.log("Matched Skills:", matchedSkills);

const missingSkills = sampleJob.skills.filter(jobSkill => 
  !extractedSkills.some(skill => 
    skill.toLowerCase().includes(jobSkill.toLowerCase()) || 
    jobSkill.toLowerCase().includes(skill.toLowerCase())
  )
);
console.log("Missing Skills:", missingSkills);

console.log("\n✅ AI Analysis Test Completed Successfully!"); 

const aiSkillsItems = [
  { path: "/resume-builder", title: "Resume Builder", icon: "📄" },
  { path: "/mock-interview", title: "Mock Interview", icon: "🎤" },
  { path: "/skills-quiz", title: "Skills Quiz", icon: "" },
  { path: "/ai-job-comparison", title: "AI Job Comparison", icon: "" }
]; 