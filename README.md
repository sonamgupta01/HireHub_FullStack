# HireHub - Full Stack Job Portal

A comprehensive job portal application with AI-powered features for job seekers and recruiters.

## �� Features

### Core Features
- **Job Posting & Management**: Recruiters can post, edit, and manage job listings
- **Job Search & Filtering**: Advanced search with location, salary, experience filters
- **User Authentication**: Secure registration and login system
- **Application Management**: Track job applications and status updates
- **Dashboard**: Separate dashboards for job seekers and recruiters

### AI-Powered Features
- **AI Job Comparison**: Upload resume and get matched with relevant jobs
- **Resume Analysis**: Extract skills and provide job fit scores
- **Personalized Recommendations**: Get improvement suggestions based on job requirements
- **Comprehensive Quiz System**: Multi-topic quizzes for skill assessment

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Hot Toast** - Notifications
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **pdf-parse** - PDF processing

### AI Features
- **Local AI Processing** - No external API dependencies
- **Pattern Matching** - Skill extraction from resumes
- **Scoring Algorithm** - Job fit calculation
- **Smart Recommendations** - Personalized suggestions

## 📁 Project Structure
# HireHub - Complete File Structure

```
HireHub_FullStack-main/
├── README.md                           # Project documentation
├── FILE_STRUCTURE.md                   # This file - complete structure
├── .git/                               # Git repository
│
├── job-portal-client/                  # React Frontend
│   ├── package.json                    # Frontend dependencies
│   ├── vite.config.js                  # Vite configuration
│   ├── tailwind.config.cjs             # Tailwind CSS configuration
│   ├── node_modules/                   # Installed packages
│   │
│   ├── public/                         # Static assets
│   │   └── images/                     # Image assets
│   │       ├── Aswani.jpg              # Team member photo
│   │       ├── Sonam.jpg               # Team member photo
│   │       ├── Linear.png              # Company logo
│   │       ├── Loom.png                # Company logo
│   │       ├── Notion.png              # Company logo
│   │       ├── Raycast.png             # Company logo
│   │       ├── Spline.png              # Company logo
│   │       ├── Trainline.png           # Company logo
│   │       ├── vite.svg                # Vite logo
│   │       ├── jobs.json               # Sample job data
│   │       └── salary.json             # Salary data
│   │
│   └── src/                            # Source code
│       ├── main.jsx                    # React entry point
│       ├── index.css                   # Global styles
│       │
│       ├── assets/                     # Assets (currently empty)
│       │
│       ├── context/                    # React Context
│       │   └── AuthContext.jsx         # Authentication context
│       │
│       ├── Router/                     # Routing (currently empty)
│       │
│       ├── Pages/                      # Page components
│       │   ├── About.jsx               # About page
│       │   ├── AIJobComparison.jsx     # AI job comparison page
│       │   ├── AIQuiz.jsx              # AI quiz page
│       │   ├── Applications.jsx        # Applications page
│       │   ├── AppliedJobs.jsx         # Applied jobs page
│       │   ├── CreateJob.jsx           # Create job page
│       │   ├── Dashboard.jsx           # Dashboard page
│       │   ├── Home.jsx                # Home page
│       │   ├── JobDetails.jsx          # Job details page
│       │   ├── Jobs.jsx                # Jobs listing page
│       │   ├── Login.jsx               # Login page
│       │   ├── MockInterview.jsx       # Mock interview page
│       │   ├── MyJobs.jsx              # My jobs page
│       │   ├── ResumeBuilder.jsx       # Resume builder page
│       │   ├── SavedJobs.jsx           # Saved jobs page
│       │   └── Signup.jsx              # Signup page
│       │
│       ├── components/                 # Reusable components
│       │   ├── Banner.jsx              # Banner component
│       │   ├── Card.jsx                # Job card component
│       │   ├── InputField.jsx          # Input field component
│       │   ├── Navbar.jsx              # Navigation bar
│       │   ├── Newsletter.jsx          # Newsletter component
│       │   ├── Sidebar.jsx             # Sidebar component
│       │   └── Toast.jsx               # Toast notifications
│       │
│       ├── components/Quiz/            # Quiz components
│       │   ├── AptitudeQuiz.jsx        # Aptitude quiz component
│       │   ├── QuizData.js             # Quiz data and questions
│       │   ├── QuizInterface.jsx       # Quiz interface component
│       │   └── QuizLink.jsx            # Quiz link component
│       │
│       └── sidebar/                    # Sidebar components
│           ├── AIJobComparisonLink.jsx # AI job comparison link
│           ├── Button.jsx              # Button component
│           ├── EmploymentType.jsx      # Employment type filter
│           ├── JobPostingData.jsx      # Job posting date filter
│           ├── Location.jsx            # Location filter
│           ├── QuizLink.jsx            # Quiz link in sidebar
│           ├── Salary.jsx              # Salary filter
│           ├── Sidebar.jsx             # Main sidebar component
│           └── WorkExperience.jsx      # Work experience filter
│
└── job-portal-server/                  # Node.js Backend
    ├── package.json                    # Backend dependencies
    ├── package-lock.json               # Dependency lock file
    ├── index.js                        # Main server file (689 lines)
    ├── test-ai.js                      # AI functionality tests
    └── node_modules/                   # Installed packages
        ├── express/                    # Web framework
        ├── cors/                       # CORS middleware
        ├── bcryptjs/                   # Password hashing
        ├── jsonwebtoken/               # JWT authentication
        ├── mongodb/                    # MongoDB driver
        ├── pdf-parse/                  # PDF parsing
        ├── dotenv/                     # Environment variables
        └── [other dependencies...]
```

## 📁 Key Files Explained

### Frontend (job-portal-client/)

#### Configuration Files
- **package.json** - Frontend dependencies and scripts
- **vite.config.js** - Vite build tool configuration
- **tailwind.config.cjs** - Tailwind CSS configuration

#### Core Files
- **src/main.jsx** - React application entry point
- **src/index.css** - Global CSS styles with Tailwind imports

#### Pages (src/Pages/)
- **Home.jsx** - Landing page with job search
- **Jobs.jsx** - Job listings with filters
- **JobDetails.jsx** - Detailed job information
- **Dashboard.jsx** - User dashboard
- **AIJobComparison.jsx** - Resume analysis and job matching
- **AIQuiz.jsx** - Multi-topic quiz system
- **ResumeBuilder.jsx** - Create and edit resumes
- **MockInterview.jsx** - Interview practice
- **AppliedJobs.jsx** - Track applications
- **CreateJob.jsx** - Post new jobs (recruiters)
- **MyJobs.jsx** - Manage posted jobs (recruiters)
- **Login.jsx** & **Signup.jsx** - Authentication pages
- **About.jsx** - About page
- **SavedJobs.jsx** - Saved jobs management

#### Components (src/components/)
- **Navbar.jsx** - Navigation header
- **Sidebar.jsx** - Filter sidebar
- **Card.jsx** - Job listing cards
- **Toast.jsx** - Notifications
- **Banner.jsx** - Banner component
- **Newsletter.jsx** - Newsletter component
- **InputField.jsx** - Reusable input field

#### Quiz Components (src/components/Quiz/)
- **AptitudeQuiz.jsx** - Aptitude quiz implementation
- **QuizData.js** - Quiz questions and data
- **QuizInterface.jsx** - Quiz UI interface
- **QuizLink.jsx** - Quiz navigation link

#### Sidebar Components (src/sidebar/)
- **Sidebar.jsx** - Main sidebar component
- **Location.jsx** - Location filter
- **Salary.jsx** - Salary range filter
- **WorkExperience.jsx** - Experience level filter
- **EmploymentType.jsx** - Employment type filter
- **JobPostingData.jsx** - Job posting date filter
- **AIJobComparisonLink.jsx** - AI comparison link
- **QuizLink.jsx** - Quiz link in sidebar
- **Button.jsx** - Reusable button component

#### Context (src/context/)
- **AuthContext.jsx** - Authentication state management

#### Public Assets (public/)
- **images/** - Static images including team photos and logos
- **jobs.json** - Sample job data
- **salary.json** - Salary information

### Backend (job-portal-server/)

#### Core Files
- **index.js** - Main server file with all API endpoints
- **package.json** - Backend dependencies
- **test-ai.js** - AI functionality testing

#### Key Backend Features in index.js:
- **Authentication Routes** - Register, login
- **Job Management** - CRUD operations for jobs
- **Application Management** - Job applications
- **AI Resume Analysis** - Skill extraction and job matching
- **Quiz Generation** - AI-powered quiz questions
- **PDF Processing** - Resume parsing
- **Database Operations** - MongoDB integration

## 🔧 Missing Files to Consider

Based on the structure, you might want to add:

1. **src/Router/index.jsx** - Main routing configuration
2. **src/App.jsx** - Main App component
3. **.env** files for environment variables
4. **.gitignore** for Git ignore rules
5. **eslint.config.js** for code linting
6. **postcss.config.cjs** for PostCSS configuration

## 📊 File Statistics

- **Total Files**: ~50+ files
- **Frontend Files**: ~30+ files
- **Backend Files**: ~5 files
- **Configuration Files**: ~5 files
- **Asset Files**: ~10+ files

This structure provides a well-organized, scalable architecture for the HireHub job portal with clear separation of concerns between frontend and backend components.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sonamgupta01/HireHub_FullStack.git
   cd HireHub_FullStack
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd job-portal-client
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../job-portal-server
   npm install
   ```

4. **Environment Setup**
   
   Create a `.env` file in the `job-portal-server` directory:
   ```env
   DB_USER=your_mongodb_username
   DB_PASSWORD=your_mongodb_password
   JWT_SECRET=your_jwt_secret_key
   PORT=3000
   ```

5. **Database Setup**
   - Create a MongoDB Atlas cluster
   - Get your connection string
   - Update the MongoDB URI in `job-portal-server/index.js`

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd job-portal-server
   npm start
   ```
   Server will run on `http://localhost:3000`

2. **Start the Frontend Development Server**
   ```bash
   cd job-portal-client
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

## 🎯 Key Features Explained

### AI Job Comparison
- **Resume Upload**: Support for PDF and text resumes
- **Skill Extraction**: Automatically extracts skills using pattern matching
- **Job Matching**: Compares resume skills with job requirements
- **Fit Scoring**: Calculates percentage match with bonus points
- **Recommendations**: Provides personalized improvement suggestions

### Quiz System
- **Multiple Topics**: Aptitude, Technical, DSA, Core CS, Web Development, AI/ML, Data Science, Soft Skills, Resume/Career, Emerging Skills
- **Fallback Questions**: 5 questions per topic for offline use
- **Real-time Scoring**: Immediate feedback on quiz completion
- **Progress Tracking**: Track performance across different topics

### Job Management
- **Advanced Filtering**: Filter by location, salary, experience, employment type
- **Search Functionality**: Search jobs by title, company, or keywords
- **Application Tracking**: Monitor application status
- **Recruiter Dashboard**: Manage posted jobs and applications

## �� API Endpoints

### Authentication
- `POST /register` - User registration
- `POST /login` - User login

### Jobs
- `POST /post-job` - Create new job posting
- `GET /all-jobs` - Get all jobs
- `GET /myJobs/:email` - Get jobs by recruiter
- `PATCH /update-job/:id` - Update job
- `DELETE /job/:id` - Delete job

### Applications
- `POST /apply-job` - Apply for a job
- `GET /my-applications/:email` - Get user applications
- `GET /job-applications/:recruiterEmail` - Get applications for recruiter's jobs
- `PATCH /application-status/:id` - Update application status

### AI Features
- `POST /analyze-resume` - Analyze resume and find job matches
- `POST /job-fit-analysis` - Detailed analysis for specific job

### Quiz
- `POST /api/quiz/ai` - Generate AI quiz questions
- `POST /api/generate-quiz` - Generate quiz questions by topic

## �� UI Components

### Pages
- **Home** - Landing page with job search
- **Jobs** - Job listings with filters
- **Job Details** - Detailed job information
- **Dashboard** - User dashboard
- **AI Job Comparison** - Resume analysis and job matching
- **AI Quiz** - Multi-topic quiz system
- **Resume Builder** - Create and edit resumes
- **Mock Interview** - Interview practice
- **Applied Jobs** - Track applications
- **Create Job** - Post new jobs (recruiters)
- **My Jobs** - Manage posted jobs (recruiters)

### Components
- **Navbar** - Navigation header
- **Sidebar** - Filter sidebar
- **Card** - Job listing cards
- **Toast** - Notifications
- **Quiz Interface** - Quiz components
- **Input Fields** - Form components

## 🔒 Security Features

- **Password Hashing**: bcryptjs for secure password storage
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Server-side validation
- **CORS Configuration**: Cross-origin resource sharing setup
- **Environment Variables**: Secure configuration management

## 📊 Database Schema

### Collections
- **users** - User accounts and authentication
- **demoJobs** - Job postings
- **applications** - Job applications

### Sample Job Document
```javascript
{
  jobTitle: "Frontend Developer",
  companyName: "TechCorp Inc.",
  minPrice: "60000",
  maxPrice: "80000",
  salaryType: "Yearly",
  jobLocation: "New York, NY",
  experienceLevel: "Mid-level",
  employmentType: "Full-time",
  description: "Job description...",
  postedBy: "recruiter@techcorp.com",
  skills: ["React", "JavaScript", "HTML", "CSS"],
  createdAt: new Date()
}
```

## 🚀 Deployment

### Frontend Deployment
```bash
cd job-portal-client
npm run build
```

### Backend Deployment
- Deploy to platforms like Heroku, Vercel, or Railway
- Set environment variables
- Configure MongoDB connection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.



**HireHub** - Connecting talent with opportunities through AI-powered job matching! 🚀
