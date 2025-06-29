// mongo db
// username : sonam98450
// password : uXKxQzOOjibnYDGS


const express = require('express')
const app = express()
const cors = require('cors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const port = process.env.PORT || 3000;
require('dotenv').config()
console.log(process.env.DB_USER)

// Increase the limit for JSON and URL-encoded bodies
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors())

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://sonam98450:${process.env.DB_PASSWORD}@job-portal-demo.stgsae7.mongodb.net/?retryWrites=true&w=majority&appName=job-portal-demo`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// REMOVED OpenAI require and initialization
// const OpenAI = require('openai');
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const pdfParse = require('pdf-parse');

async function run() {
  try {
    await client.connect();

    const db = client.db("mernjobPortal");
    const jobsCollection = db.collection("demoJobs");
    const usersCollection = db.collection("users");
    const applicationsCollection = db.collection("applications");

    // POST a job
    app.post("/post-job", async (req, res) => {
      const body = req.body;
      body.createdAt = new Date(); // fixed typo from createAt → createdAt
      const result = await jobsCollection.insertOne(body);
      if (result.insertedId) {
        return res.status(200).send(result);
      } else {
        return res.status(500).send({
          message: "Unable to insert, try again later",
          status: false
        });
      }
    });

    // GET all jobs
    app.get("/all-jobs", async (req, res) => {
      const jobs = await jobsCollection.find({}).toArray();
      res.send(jobs);
    });

    // get jobs by email
    app.get("/myJobs/:email", async(req,res)=>{
       //console.log(req.params.email)
       const jobs = await jobsCollection.find({postedBy : req.params.email}).toArray();
       res.send(jobs)
    })

    //delete a job
    app.delete("/job/:id", async(req,res) => {
      const id = req.params.id;
      const filter = {_id : new ObjectId(id)}
      const result = await jobsCollection.deleteOne(filter);
      res.send(result)
    })

    // update a job
    app.patch("/update-job/:id", async(req,res) => {
      const id = req.params.id;
      const jobData = req.body;
      const filter = {_id : new ObjectId(id)};
      const updateDoc = {
        $set: {
          ...jobData,
        },
      };
      const options = { upsert: true };
      const result = await jobsCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    })

    // USER AUTHENTICATION ROUTES
    
    // Register user
    app.post("/register", async(req, res) => {
      try {
        const { name, email, password, role } = req.body;
        
        // Check if user already exists
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
          return res.status(400).send({ message: "User already exists" });
        }
        
        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        const user = {
          name,
          email,
          password: hashedPassword,
          role,
          createdAt: new Date()
        };
        
        const result = await usersCollection.insertOne(user);
        res.status(201).send({ message: "User registered successfully", userId: result.insertedId });
      } catch (error) {
        res.status(500).send({ message: "Registration failed", error: error.message });
      }
    });

    // Login user
    app.post("/login", async(req, res) => {
      try {
        const { email, password } = req.body;
        const user = await usersCollection.findOne({ email });
        
        if (user && await bcrypt.compare(password, user.password)) {
          res.status(200).send({ 
            message: "Login successful", 
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
          });
        } else {
          res.status(401).send({ message: "Invalid credentials" });
        }
      } catch (error) {
        res.status(500).send({ message: "Login failed", error: error.message });
      }
    });

    // APPLICATION ROUTES
    
    // Apply for a job
    app.post("/apply-job", async(req, res) => {
      try {
        const applicationData = {
          ...req.body,
          appliedAt: new Date(),
          status: "pending"
        };
        
        // Check if user already applied for this job
        const existingApplication = await applicationsCollection.findOne({
          jobId: applicationData.jobId,
          candidateEmail: applicationData.candidateEmail
        });
        
        if (existingApplication) {
          return res.status(400).send({ message: "Already applied for this job" });
        }
        
        const result = await applicationsCollection.insertOne(applicationData);
        res.status(201).send({ message: "Application submitted successfully", applicationId: result.insertedId });
      } catch (error) {
        res.status(500).send({ message: "Application failed", error: error.message });
      }
    });

    // Get applications for a user (student)
    app.get("/my-applications/:email", async(req, res) => {
      try {
        const applications = await applicationsCollection.find({ candidateEmail: req.params.email }).toArray();
        res.send(applications);
      } catch (error) {
        res.status(500).send({ message: "Failed to fetch applications", error: error.message });
      }
    });

    // Get applications for jobs posted by recruiter
    app.get("/job-applications/:recruiterEmail", async(req, res) => {
      try {
        // First get all jobs posted by this recruiter
        const recruiterJobs = await jobsCollection.find({ postedBy: req.params.recruiterEmail }).toArray();
        const jobIds = recruiterJobs.map(job => job._id.toString());
        
        // Then get all applications for these jobs
        const applications = await applicationsCollection.find({ jobId: { $in: jobIds } }).toArray();
        res.send(applications);
      } catch (error) {
        res.status(500).send({ message: "Failed to fetch applications", error: error.message });
      }
    });

    // Update application status
    app.patch("/application-status/:id", async(req, res) => {
      try {
        const id = req.params.id;
        const { status } = req.body;
        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
          $set: {
            status: status,
            updatedAt: new Date()
          }
        };
        
        const result = await applicationsCollection.updateOne(filter, updateDoc);
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to update application status", error: error.message });
      }
    });

    // DEMO DATA SEEDING ENDPOINT (for development only)
    app.post("/seed-demo-data", async(req, res) => {
      try {
        // Check if jobs already exist
        const existingJobs = await jobsCollection.countDocuments();
        if (existingJobs > 0) {
          return res.status(200).send({ message: "Demo data already exists", count: existingJobs });
        }

        const demoJobs = [
          {
            jobTitle: "Frontend Developer",
            companyName: "TechCorp Inc.",
            minPrice: "60000",
            maxPrice: "80000",
            salaryType: "Yearly",
            jobLocation: "New York, NY",
            postingDate: new Date(),
            experienceLevel: "Mid-level",
            employmentType: "Full-time",
            description: "We are looking for a skilled Frontend Developer to join our team. You will be responsible for developing user interface components and implementing them following well-known React.js workflows.",
            postedBy: "recruiter@techcorp.com",
            skills: ["React", "JavaScript", "HTML", "CSS", "TypeScript"],
            createdAt: new Date()
          },
          {
            jobTitle: "Full Stack Developer",
            companyName: "StartupXYZ",
            minPrice: "70000",
            maxPrice: "90000",
            salaryType: "Yearly",
            jobLocation: "San Francisco, CA",
            postingDate: new Date(),
            experienceLevel: "Mid-level",
            employmentType: "Full-time",
            description: "Join our dynamic startup as a Full Stack Developer. You'll work on both frontend and backend technologies to build scalable web applications.",
            postedBy: "hr@startupxyz.com",
            skills: ["React", "Node.js", "MongoDB", "Express.js", "JavaScript"],
            createdAt: new Date()
          },
          {
            jobTitle: "Software Engineering Intern",
            companyName: "MegaTech Solutions",
            minPrice: "3000",
            maxPrice: "4000",
            salaryType: "Monthly",
            jobLocation: "Austin, TX",
            postingDate: new Date(),
            experienceLevel: "Entry-level",
            employmentType: "Internship",
            description: "Great opportunity for students to gain hands-on experience in software development. You'll work alongside senior developers on real projects.",
            postedBy: "internships@megatech.com",
            skills: ["Python", "JavaScript", "Git", "SQL"],
            createdAt: new Date()
          },
          {
            jobTitle: "Data Scientist",
            companyName: "DataDriven Co.",
            minPrice: "85000",
            maxPrice: "110000",
            salaryType: "Yearly",
            jobLocation: "Seattle, WA",
            postingDate: new Date(),
            experienceLevel: "Senior-level",
            employmentType: "Full-time",
            description: "We're seeking a Data Scientist to join our team and help drive data-driven decision making across the organization.",
            postedBy: "careers@datadriven.com",
            skills: ["Python", "Machine Learning", "SQL", "Pandas", "TensorFlow"],
            createdAt: new Date()
          },
          {
            jobTitle: "UI/UX Designer",
            companyName: "Creative Studios",
            minPrice: "55000",
            maxPrice: "75000",
            salaryType: "Yearly",
            jobLocation: "Los Angeles, CA",
            postingDate: new Date(),
            experienceLevel: "Mid-level",
            employmentType: "Full-time",
            description: "Join our creative team as a UI/UX Designer. You'll be responsible for creating user-centered designs and improving user experience across our products.",
            postedBy: "design@creativestudios.com",
            skills: ["Figma", "Adobe Creative Suite", "User Research", "Prototyping"],
            createdAt: new Date()
          },
          {
            jobTitle: "DevOps Engineer",
            companyName: "CloudFirst Technologies",
            minPrice: "80000",
            maxPrice: "100000",
            salaryType: "Yearly",
            jobLocation: "Denver, CO",
            postingDate: new Date(),
            experienceLevel: "Senior-level",
            employmentType: "Full-time",
            description: "We're looking for a DevOps Engineer to help us build and maintain our cloud infrastructure and deployment pipelines.",
            postedBy: "tech@cloudfirst.com",
            skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform"],
            createdAt: new Date()
          },
          {
            jobTitle: "Backend Developer",
            companyName: "APIHub Inc.",
            minPrice: "65000",
            maxPrice: "85000",
            salaryType: "Yearly",
            jobLocation: "Chicago, IL",
            postingDate: new Date(),
            experienceLevel: "Mid-level",
            employmentType: "Full-time",
            description: "Join our backend team to build robust APIs and microservices. Experience with Node.js and databases required.",
            postedBy: "backend@apihub.com",
            skills: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "REST APIs"],
            createdAt: new Date()
          },
          {
            jobTitle: "Mobile App Developer",
            companyName: "MobileFirst Studios",
            minPrice: "70000",
            maxPrice: "90000",
            salaryType: "Yearly",
            jobLocation: "Miami, FL",
            postingDate: new Date(),
            experienceLevel: "Mid-level",
            employmentType: "Full-time",
            description: "Develop cutting-edge mobile applications for iOS and Android platforms using React Native or native technologies.",
            postedBy: "mobile@mobilefirst.com",
            skills: ["React Native", "Swift", "Kotlin", "JavaScript", "Mobile Development"],
            createdAt: new Date()
          }
        ];

        const result = await jobsCollection.insertMany(demoJobs);
        res.status(201).send({ 
          message: "Demo data seeded successfully", 
          insertedCount: result.insertedCount 
        });
      } catch (error) {
        res.status(500).send({ message: "Failed to seed demo data", error: error.message });
      }
    });

    // AI RESUME ANALYSIS ENDPOINTS

    // Common skills database for AI analysis
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

    // Generate improvement suggestions
    function generateImprovementSuggestions(resumeSkills, jobSkills, fitScore) {
      const suggestions = [];
      
      if (fitScore < 60) {
        suggestions.push({
          category: "Skills Gap",
          suggestion: "Consider learning the missing skills identified in the job requirements to improve your match rate."
        });
      }
      
      if (resumeSkills.length < 5) {
        suggestions.push({
          category: "Skill Diversity",
          suggestion: "Your resume shows limited technical skills. Consider adding more relevant technical skills to make it more competitive."
        });
      }
      
      if (fitScore >= 80) {
        suggestions.push({
          category: "Strong Match",
          suggestion: "Great job! Your skills align well with this position. Focus on highlighting your relevant experience in your application."
        });
      }
      
      return suggestions;
    }

    // Analyze resume and find job matches
    app.post("/analyze-resume", async (req, res) => {
      try {
        let resumeText = req.body.resumeText;
        // If the text looks like a PDF (starts with %PDF), try to parse it
        if (resumeText.startsWith('%PDF')) {
          // Convert base64 or binary string to Buffer if needed
          const buffer = Buffer.from(resumeText, 'base64');
          const data = await pdfParse(buffer);
          resumeText = data.text;
        }
        
        if (!resumeText) {
          return res.status(400).send({ message: "Resume text is required" });
        }

        // Extract skills from resume
        const extractedSkills = extractSkillsFromResume(resumeText);
        
        // Get all jobs
        const allJobs = await jobsCollection.find({}).toArray();
        
        // Calculate matches for each job
        const jobMatches = allJobs.map(job => {
          const fitScore = calculateJobFitScore(extractedSkills, job.skills || []);
          const matchedSkills = extractedSkills.filter(skill => 
            (job.skills || []).some(jobSkill => 
              skill.toLowerCase().includes(jobSkill.toLowerCase()) || 
              jobSkill.toLowerCase().includes(skill.toLowerCase())
            )
          );
          const missingSkills = (job.skills || []).filter(jobSkill => 
            !extractedSkills.some(skill => 
              skill.toLowerCase().includes(jobSkill.toLowerCase()) || 
              jobSkill.toLowerCase().includes(skill.toLowerCase())
            )
          );
          
          return {
            job: job,
            fitScore: Math.round(fitScore),
            matchedSkills: matchedSkills,
            missingSkills: missingSkills
          };
        });

        // Sort by fit score (highest first) and take top 10
        const topMatches = jobMatches
          .filter(match => match.fitScore > 0)
          .sort((a, b) => b.fitScore - a.fitScore)
          .slice(0, 10);

        // Calculate average fit score
        const averageFitScore = topMatches.length > 0 
          ? topMatches.reduce((sum, match) => sum + match.fitScore, 0) / topMatches.length 
          : 0;

        // Generate improvement suggestions based on top match
        const topMatch = topMatches[0];
        const improvementSuggestions = topMatch 
          ? generateImprovementSuggestions(extractedSkills, topMatch.job.skills || [], topMatch.fitScore)
          : [];

        // Store analysis result (optional - for future reference)
        const analysisResult = {
          userEmail: req.body.userEmail,
          extractedSkills: extractedSkills,
          totalJobsAnalyzed: allJobs.length,
          topMatchesCount: topMatches.length,
          averageFitScore: Math.round(averageFitScore),
          analyzedAt: new Date()
        };

        res.status(200).send({
          extractedSkills: extractedSkills,
          jobMatches: topMatches,
          averageFitScore: Math.round(averageFitScore),
          improvementSuggestions: improvementSuggestions,
          analysisSummary: analysisResult
        });

      } catch (error) {
        console.error('Resume analysis error:', error);
        res.status(500).json({ error: 'Failed to analyze resume' });
      }
    });

    // Get detailed analysis for a specific job
    app.post("/job-fit-analysis", async (req, res) => {
      try {
        const { resumeText, jobId } = req.body;
        
        if (!resumeText || !jobId) {
          return res.status(400).send({ message: "Resume text and job ID are required" });
        }

        // Get the specific job
        const job = await jobsCollection.findOne({ _id: new ObjectId(jobId) });
        if (!job) {
          return res.status(404).send({ message: "Job not found" });
        }

        // Extract skills from resume
        const extractedSkills = extractSkillsFromResume(resumeText);
        
        // Calculate detailed match
        const fitScore = calculateJobFitScore(extractedSkills, job.skills || []);
        const matchedSkills = extractedSkills.filter(skill => 
          (job.skills || []).some(jobSkill => 
            skill.toLowerCase().includes(jobSkill.toLowerCase()) || 
            jobSkill.toLowerCase().includes(skill.toLowerCase())
          )
        );
        const missingSkills = (job.skills || []).filter(jobSkill => 
          !extractedSkills.some(skill => 
            skill.toLowerCase().includes(jobSkill.toLowerCase()) || 
            jobSkill.toLowerCase().includes(skill.toLowerCase())
          )
        );

        // Generate detailed suggestions
        const suggestions = generateImprovementSuggestions(extractedSkills, job.skills || [], fitScore);
        
        // Add specific skill recommendations
        if (missingSkills.length > 0) {
          suggestions.push({
            category: "Recommended Skills to Learn",
            suggestion: `Focus on learning: ${missingSkills.slice(0, 3).join(', ')}${missingSkills.length > 3 ? ' and more' : ''}`
          });
        }

        res.status(200).send({
          job: job,
          fitScore: Math.round(fitScore),
          matchedSkills: matchedSkills,
          missingSkills: missingSkills,
          suggestions: suggestions,
          skillMatchPercentage: Math.round((matchedSkills.length / (job.skills?.length || 1)) * 100)
        });

      } catch (error) {
        console.error('Error analyzing job fit:', error);
        res.status(500).send({ message: "Failed to analyze job fit", error: error.message });
      }
    });

    // Optional: Ping the database
    await db.command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // New endpoint for AI quiz generation
    app.post('/api/quiz/ai', async (req, res) => {
      try {
        const { topic } = req.body;
        const prompt = `Generate 5 aptitude quiz questions about ${topic} with 4 options and the correct answer. Format as JSON.`;
        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 500,
        });
        // Parse the AI's response as JSON
        const questions = JSON.parse(completion.choices[0].message.content);
        res.json({ questions });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    app.get('/api/generate-quiz', (req, res) => {
      res.send('This endpoint is for POST requests to generate AI quiz questions.');
    });

    app.post('/api/generate-quiz', async (req, res) => {
      const { topic, difficulty } = req.body;
      if (!topic) return res.status(400).json({ error: 'Topic is required' });

      const prompt = `Generate a ${difficulty || 'medium'} difficulty ${topic} quiz question with 4 options and one correct answer. Format as JSON with fields: question, options (array), correctAnswer.`;

      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        });

        const question = JSON.parse(completion.choices[0].message.content);
        res.json(question);
      } catch (error) {
        console.error('OpenAI error:', error);
        res.status(500).json({ error: 'Failed to generate quiz question' });
      }
    });

  } catch (err) {
    console.error(err);
  }
  // ❌ Don't close the client here if routes need it
  // await client.close();
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

async function fetchAIQuiz(topic) {
  const response = await fetch('http://localhost:5000/api/quiz/ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topic }),
  });
  const data = await response.json();
  return data.questions;
}
