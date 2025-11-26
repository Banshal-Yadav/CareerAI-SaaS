// dummy resume profiles for testing purposes

export const dummyResumes = [
  // profile 1: a computer science student
  {
    id: 'dummy_1',
    fullName: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phoneNumber: '+91 98765 43210',
    linkedin: 'linkedin.com/in/priyasharma-dev',
    github: 'github.com/priyasharma',
    summary: 'A highly motivated final-year Computer Science student at IIT Bombay with a strong foundation in algorithms, data structures, and web development. Passionate about creating scalable and user-friendly applications. Eager to apply my skills in a challenging and dynamic environment.',
    // keeping experience empty since many students might not have formal jobs yet
    experience: [],
    education: [
      {
        degree: 'Bachelor of Technology (B.Tech), Computer Science',
        university: 'Indian Institute of Technology Bombay',
        gradYear: '2021 - 2025',
      },
      {
        degree: 'Class XII, CBSE',
        university: 'Delhi Public School, R.K. Puram',
        gradYear: '2021',
      }
    ],
    projects: [
      {
        title: 'AI Career Coach Web App',
        link: 'github.com/priyasharma/career-coach',
        // using newline characters for bullet points in the textarea
        description: 'Developed a full-stack web application using the MERN stack (MongoDB, Express, React, Node.js) to provide personalized career guidance.\nIntegrated with the Gemini API for AI-powered analysis of user skills.\nImplemented user authentication and data storage with Firebase.',
      },
      {
        title: 'Sentiment Analysis of Movie Reviews',
        link: 'github.com/priyasharma/sentiment-analysis',
        description: 'Built a machine learning model using Python, Scikit-learn, and NLTK to classify movie reviews as positive or negative.\nAchieved an accuracy of 88% on the test dataset.\nCreated a simple web interface with Flask to demonstrate the model.',
      },
    ],
    skills: 'JavaScript, React, Node.js, Express, MongoDB, Python, C++, Git, Firebase, HTML, CSS',
    lastUpdated: new Date().toISOString(),
  },
  // profile 2: a commerce/finance student
  {
    id: 'dummy_2',
    fullName: 'Rohan Mehta',
    email: 'rohan.mehta@example.com',
    phoneNumber: '+91 87654 32109',
    linkedin: 'linkedin.com/in/rohanmehta-finance',
    github: 'github.com/rohanmehta',
    summary: 'A detail-oriented and analytical B.Com (Hons) graduate from Shri Ram College of Commerce, DU. Possesses strong knowledge of financial accounting, corporate finance, and market analysis. Completed two internships with a focus on financial modeling and equity research.',
    experience: [
      {
        jobTitle: 'Finance Intern',
        company: 'Kotak Mahindra Bank',
        startDate: 'May 2024',
        endDate: 'July 2024',
        description: 'Assisted the wealth management team with portfolio analysis and client reporting.\nDeveloped financial models to evaluate investment opportunities.\nConducted market research on Nifty 50 companies.',
      }
    ],
    education: [
      {
        degree: 'Bachelor of Commerce (B.Com Hons)',
        university: 'Shri Ram College of Commerce, Delhi University',
        gradYear: '2022 - 2025',
      },
    ],
    projects: [
      {
        title: 'Stock Market Performance Dashboard',
        link: 'github.com/rohanmehta/stock-dashboard',
        description: 'Created an interactive dashboard using Python (Dash, Plotly) to visualize historical stock data for BSE SENSEX companies.\nImplemented features for trend analysis and moving average calculation.',
      },
      {
        title: 'Business Valuation of a Startup',
        link: 'example.com/valuation-report.pdf',
        description: 'Conducted a comprehensive business valuation for a local startup as part of a university project.\nUsed DCF (Discounted Cash Flow) and comparable company analysis methods.',
      },
    ],
    skills: 'Financial Modeling, Microsoft Excel, Equity Research, Data Analysis, Python (Pandas, NumPy), PowerPoint, Teamwork, Communication',
    lastUpdated: new Date().toISOString(),
  },
   // profile 3: an arts/humanities student
  {
    id: 'dummy_3',
    fullName: 'Ananya Iyer',
    email: 'ananya.iyer@example.com',
    phoneNumber: '+91 76543 21098',
    linkedin: 'linkedin.com/in/ananyaiyer-creative',
    github: 'github.com/ananyaiyer',
    summary: 'A creative and passionate B.A. English Literature student from Christ University with a flair for writing and digital content creation. Experienced in SEO writing, social media management, and content strategy through freelance projects. Aims to build a career in digital marketing or corporate communications.',
    experience: [
       {
        jobTitle: 'Content Writing Intern',
        company: 'YourStory Media',
        startDate: 'Jan 2024',
        endDate: 'Apr 2024',
        description: 'Wrote and published over 30 articles on startups and entrepreneurship, optimizing them for SEO.\nManaged the company\'s LinkedIn page, increasing engagement by 20%.\nAssisted in developing the content calendar for the month.',
      }
    ],
    education: [
      {
        degree: 'Bachelor of Arts (B.A.), English Literature',
        university: 'Christ University, Bangalore',
        gradYear: '2022 - 2025',
      },
    ],
    projects: [
      {
        title: 'Personal Creative Writing Blog',
        link: 'ananyasblog.com',
        description: 'Maintain a personal blog featuring poetry, short stories, and book reviews.\nAttracted over 2,000 monthly visitors through organic social media promotion and SEO.',
      },
      {
        title: 'Social Media Campaign for a College Fest',
        link: 'instagram.com/collegefest_official',
        description: 'Led a team of 5 to create and execute a social media campaign for the annual college cultural festival.\nIncreased ticket sales by 15% compared to the previous year through engaging content.',
      },
    ],
    skills: 'Content Writing, SEO, Social Media Marketing, Copywriting, Creative Writing, Communication, Adobe Photoshop (Basic), Team Leadership',
    lastUpdated: new Date().toISOString(),
  }
];