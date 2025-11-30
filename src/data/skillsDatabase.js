// skills data, separated by type
export const skillsData = {
  technical: [
    { id: 'javascript', name: 'JavaScript', aliases: ['js', 'javascript', 'ecmascript', 'node'], category: 'Programming Language' },
    { id: 'python', name: 'Python', aliases: ['python', 'py', 'django', 'flask'], category: 'Programming Language' },
    { id: 'react', name: 'React', aliases: ['react', 'reactjs', 'react.js', 'jsx'], category: 'Library/Framework' },
    { id: 'html', name: 'HTML', aliases: ['html', 'html5', 'markup', 'web'], category: 'Web Foundation' },
    { id: 'css', name: 'CSS', aliases: ['css', 'css3', 'styling', 'sass', 'scss'], category: 'Web Foundation' },
    { id: 'sql', name: 'SQL', aliases: ['sql', 'mysql', 'database', 'postgresql', 'db'], category: 'Database' },
    { id: 'nodejs', name: 'Node.js', aliases: ['node', 'nodejs', 'node.js', 'backend'], category: 'Backend' },
    { id: 'git', name: 'Git', aliases: ['git', 'github', 'version control', 'gitlab'], category: 'Tools' },
    { id: 'java', name: 'Java', aliases: ['java', 'spring', 'jsp'], category: 'Programming Language' },
    { id: 'mongodb', name: 'MongoDB', aliases: ['mongodb', 'mongo', 'nosql'], category: 'Database' },
    { id: 'angular', name: 'Angular', aliases: ['angular', 'angularjs', 'typescript'], category: 'Library/Framework' },
    { id: 'vue', name: 'Vue.js', aliases: ['vue', 'vuejs', 'vue.js'], category: 'Library/Framework' },
    { id: 'php', name: 'PHP', aliases: ['php', 'laravel', 'wordpress'], category: 'Programming Language' },
    { id: 'aws', name: 'AWS', aliases: ['aws', 'amazon web services', 'cloud'], category: 'Cloud' },
    { id: 'docker', name: 'Docker', aliases: ['docker', 'containers', 'kubernetes'], category: 'Tools' },

    // more tech skills relevant for india
    { id: 'cpp', name: 'C++', aliases: ['cpp', 'c++', 'cplusplus', 'c plus plus'], category: 'Programming Language' },
    { id: 'c', name: 'C', aliases: ['c', 'c programming', 'ansi c'], category: 'Programming Language' },
    { id: 'csharp', name: 'C#', aliases: ['c#', 'csharp', 'c sharp', 'dotnet', '.net'], category: 'Programming Language' },
    { id: 'kotlin', name: 'Kotlin', aliases: ['kotlin', 'android kotlin'], category: 'Programming Language' },
    { id: 'swift', name: 'Swift', aliases: ['swift', 'ios swift'], category: 'Programming Language' },
    { id: 'r', name: 'R', aliases: ['r', 'r programming', 'rstudio'], category: 'Programming Language' },
    { id: 'matlab', name: 'MATLAB', aliases: ['matlab', 'simulink'], category: 'Programming Language' },
    { id: 'scala', name: 'Scala', aliases: ['scala', 'apache spark'], category: 'Programming Language' },
    { id: 'go', name: 'Go', aliases: ['go', 'golang', 'google go'], category: 'Programming Language' },

    { id: 'azure', name: 'Microsoft Azure', aliases: ['azure', 'microsoft azure'], category: 'Cloud' },
    { id: 'gcp', name: 'Google Cloud Platform', aliases: ['gcp', 'google cloud', 'google cloud platform'], category: 'Cloud' },
    { id: 'kubernetes', name: 'Kubernetes', aliases: ['kubernetes', 'k8s', 'kubectl'], category: 'Tools' },
    { id: 'jenkins', name: 'Jenkins', aliases: ['jenkins', 'ci cd'], category: 'Tools' },
    { id: 'terraform', name: 'Terraform', aliases: ['terraform', 'infrastructure as code'], category: 'Tools' },

    { id: 'postgresql', name: 'PostgreSQL', aliases: ['postgresql', 'postgres', 'psql'], category: 'Database' },
    { id: 'oracle', name: 'Oracle Database', aliases: ['oracle', 'oracle db', 'plsql'], category: 'Database' },
    { id: 'redis', name: 'Redis', aliases: ['redis', 'redis cache'], category: 'Database' },

    { id: 'machine_learning', name: 'Machine Learning', aliases: ['ml', 'machine learning', 'artificial intelligence', 'ai'], category: 'AI/ML' },
    { id: 'tensorflow', name: 'TensorFlow', aliases: ['tensorflow', 'tf'], category: 'AI/ML' },
    { id: 'pytorch', name: 'PyTorch', aliases: ['pytorch', 'torch'], category: 'AI/ML' },
    { id: 'pandas', name: 'Pandas', aliases: ['pandas', 'data manipulation'], category: 'Data Science' },
    { id: 'numpy', name: 'NumPy', aliases: ['numpy', 'numerical computing'], category: 'Data Science' },
    { id: 'apache_spark', name: 'Apache Spark', aliases: ['spark', 'apache spark', 'pyspark'], category: 'Big Data' },

    { id: 'android', name: 'Android Development', aliases: ['android', 'android studio'], category: 'Mobile' },
    { id: 'ios', name: 'iOS Development', aliases: ['ios', 'xcode', 'objective c'], category: 'Mobile' },
    { id: 'flutter', name: 'Flutter', aliases: ['flutter', 'dart'], category: 'Mobile' },
    { id: 'react_native', name: 'React Native', aliases: ['react native', 'react-native'], category: 'Mobile' },

    { id: 'cybersecurity', name: 'Cybersecurity', aliases: ['cybersecurity', 'information security', 'infosec'], category: 'Security' },
    { id: 'penetration_testing', name: 'Penetration Testing', aliases: ['penetration testing', 'pen testing', 'ethical hacking'], category: 'Security' },

    { id: 'autocad', name: 'AutoCAD', aliases: ['autocad', 'cad', 'computer aided design'], category: 'Engineering' },
    { id: 'solidworks', name: 'SolidWorks', aliases: ['solidworks', 'solid works', '3d modeling'], category: 'Engineering' },
    { id: 'ansys', name: 'ANSYS', aliases: ['ansys', 'finite element analysis', 'fea'], category: 'Engineering' },
    { id: 'catia', name: 'CATIA', aliases: ['catia', 'dassault'], category: 'Engineering' },
    // NEW MECHANICAL/CIVIL SKILLS
    { id: 'thermodynamics', name: 'Thermodynamics', aliases: ['thermodynamics', 'thermo'], category: 'Engineering' },
    { id: 'fluid_mechanics', name: 'Fluid Mechanics', aliases: ['fluid mechanics', 'fluids'], category: 'Engineering' },
    { id: 'hvac', name: 'HVAC', aliases: ['hvac', 'heating ventilation air conditioning'], category: 'Engineering' },
    { id: 'staad_pro', name: 'STAAD Pro', aliases: ['staad pro', 'staad', 'structural analysis'], category: 'Engineering' },
    { id: 'primavera', name: 'Primavera', aliases: ['primavera', 'p6', 'project planning'], category: 'Engineering' },
    { id: 'gdt', name: 'GD&T', aliases: ['gd&t', 'geometric dimensioning tolerancing'], category: 'Engineering' },
    { id: 'cnc_programming', name: 'CNC Programming', aliases: ['cnc', 'cnc programming', 'g-code'], category: 'Engineering' },

    // NEW ELECTRONICS SKILLS
    { id: 'circuit_design', name: 'Circuit Design', aliases: ['circuit design', 'analog circuits', 'digital circuits'], category: 'Electronics' },
    { id: 'pcb_design', name: 'PCB Design', aliases: ['pcb design', 'printed circuit board', 'altium', 'eagle'], category: 'Electronics' },
    { id: 'verilog', name: 'Verilog', aliases: ['verilog', 'hdl'], category: 'Electronics' },
    { id: 'vhdl', name: 'VHDL', aliases: ['vhdl', 'hdl'], category: 'Electronics' },
    { id: 'embedded_c', name: 'Embedded C', aliases: ['embedded c', 'embedded systems c'], category: 'Electronics' },
    { id: 'microcontrollers', name: 'Microcontrollers', aliases: ['microcontrollers', 'mcu', 'arm', 'pic', 'avr'], category: 'Electronics' },
    { id: 'rtos', name: 'RTOS', aliases: ['rtos', 'real-time operating system'], category: 'Electronics' },
    { id: 'spice_simulation', name: 'SPICE Simulation', aliases: ['spice', 'ltspice', 'pspice', 'circuit simulation'], category: 'Electronics' },
    { id: 'rf_design', name: 'RF Design', aliases: ['rf design', 'radio frequency', 'microwave engineering'], category: 'Electronics' },

    // NEW CHEMISTRY/SCIENCE SKILLS
    { id: 'chemical_process', name: 'Chemical Process Engineering', aliases: ['chemical process engineering', 'process design'], category: 'Science' },
    { id: 'spectroscopy', name: 'Spectroscopy', aliases: ['spectroscopy', 'nmr', 'ir', 'uv-vis'], category: 'Science' },
    { id: 'chromatography', name: 'Chromatography', aliases: ['chromatography', 'hplc', 'gas chromatography', 'gc'], category: 'Science' },
    { id: 'organic_chemistry', name: 'Organic Chemistry', aliases: ['organic chemistry', 'ochem'], category: 'Science' },
    { id: 'analytical_chemistry', name: 'Analytical Chemistry', aliases: ['analytical chemistry'], category: 'Science' },

    // NEW NICHE AI & SPECIALIZED TECH SKILLS
    { id: 'ai_ethics', name: 'AI Ethics', aliases: ['ai ethics', 'responsible ai', 'ai safety', 'ai governance'], category: 'AI Specializations' },
    { id: 'prompt_engineering', name: 'Prompt Engineering', aliases: ['prompt engineering', 'prompt design', 'llm prompting'], category: 'AI Specializations' },
    { id: 'digital_twin', name: 'Digital Twin Technology', aliases: ['digital twin', 'iot simulation'], category: 'AI Specializations' },
    { id: 'qml', name: 'Quantum Machine Learning', aliases: ['qml', 'quantum ml', 'quantum computing'], category: 'AI Specializations' },
    { id: 'xr_development', name: 'XR Development', aliases: ['xr', 'extended reality', 'ar', 'vr', 'augmented reality', 'virtual reality'], category: 'Emerging Tech' },

    // NEW NICHE BIOTECHNOLOGY SKILLS
    { id: 'bioinformatics', name: 'Bioinformatics', aliases: ['bioinformatics', 'computational biology', 'genomic analysis'], category: 'Biotechnology' },
    { id: 'genetic_counseling', name: 'Genetic Counseling', aliases: ['genetic counseling', 'medical genetics'], category: 'Biotechnology' },
    { id: 'telehealth_tech', name: 'Telehealth Technology', aliases: ['telehealth', 'telemedicine platforms', 'remote patient monitoring'], category: 'Biotechnology' },

    { id: 'sap', name: 'SAP', aliases: ['sap', 'sap erp', 'sap hana'], category: 'Enterprise Software' },
    { id: 'salesforce', name: 'Salesforce', aliases: ['salesforce', 'crm'], category: 'Enterprise Software' },

    { id: 'blockchain', name: 'Blockchain', aliases: ['blockchain', 'cryptocurrency', 'bitcoin', 'web3'], category: 'Emerging Tech' },
    { id: 'iot', name: 'Internet of Things', aliases: ['iot', 'internet of things', 'embedded systems'], category: 'Emerging Tech' },
    { id: 'robotics', name: 'Robotics', aliases: ['robotics', 'automation', 'ros'], category: 'Emerging Tech' }
  ],
  soft: [
    { id: 'communication', name: 'Communication', aliases: ['communication', 'speaking', 'presentation', 'talking', 'public speaking'], category: 'Soft Skill' },
    { id: 'leadership', name: 'Leadership', aliases: ['leadership', 'team lead', 'management', 'leading', 'mentor'], category: 'Soft Skill' },
    { id: 'problem_solving', name: 'Problem Solving', aliases: ['problem solving', 'troubleshooting', 'analytical', 'debugging'], category: 'Soft Skill' },
    { id: 'teamwork', name: 'Teamwork', aliases: ['teamwork', 'collaboration', 'team player', 'cooperative'], category: 'Soft Skill' },
    { id: 'time_management', name: 'Time Management', aliases: ['time management', 'organization', 'planning', 'scheduling'], category: 'Soft Skill' },
    { id: 'creativity', name: 'Creativity', aliases: ['creativity', 'creative thinking', 'innovation', 'artistic'], category: 'Soft Skill' },
    { id: 'adaptability', name: 'Adaptability', aliases: ['adaptability', 'flexible', 'learning', 'quick learner'], category: 'Soft Skill' },
    { id: 'critical_thinking', name: 'Critical Thinking', aliases: ['critical thinking', 'analysis', 'logic', 'reasoning'], category: 'Soft Skill' },

    // some soft skills
    { id: 'negotiation', name: 'Negotiation', aliases: ['negotiation', 'bargaining', 'deal making'], category: 'Soft Skill' },
    { id: 'emotional_intelligence', name: 'Emotional Intelligence', aliases: ['emotional intelligence', 'eq', 'empathy'], category: 'Soft Skill' },
    { id: 'decision_making', name: 'Decision Making', aliases: ['decision making', 'judgment', 'strategic thinking'], category: 'Soft Skill' }
  ],
  industry: [
    { id: 'digital_marketing', name: 'Digital Marketing', aliases: ['marketing', 'digital marketing', 'social media', 'seo', 'advertising'], category: 'Business' },
    { id: 'project_management', name: 'Project Management', aliases: ['project management', 'agile', 'scrum', 'pm', 'kanban'], category: 'Business' },
    { id: 'data_analysis', name: 'Data Analysis', aliases: ['data analysis', 'analytics', 'excel', 'reporting', 'statistics'], category: 'Business' },
    { id: 'graphic_design', name: 'Graphic Design', aliases: ['design', 'graphic design', 'photoshop', 'ui design', 'visual design'], category: 'Creative' },
    { id: 'content_writing', name: 'Content Writing', aliases: ['writing', 'content writing', 'copywriting', 'blogging'], category: 'Creative' },
    { id: 'sales', name: 'Sales', aliases: ['sales', 'selling', 'business development', 'customer relations'], category: 'Business' },
    { id: 'finance', name: 'Finance', aliases: ['finance', 'accounting', 'financial analysis', 'budgeting'], category: 'Business' },
    { id: 'hr', name: 'Human Resources', aliases: ['hr', 'human resources', 'recruitment', 'hiring'], category: 'Business' },

    { id: 'investment_banking', name: 'Investment Banking', aliases: ['investment banking', 'ib', 'capital markets'], category: 'Finance' },
    { id: 'financial_modeling', name: 'Financial Modeling', aliases: ['financial modeling', 'valuation', 'dcf'], category: 'Finance' },
    { id: 'risk_management', name: 'Risk Management', aliases: ['risk management', 'credit risk', 'market risk'], category: 'Finance' },
    { id: 'accounting', name: 'Accounting', aliases: ['accounting', 'bookkeeping', 'financial reporting'], category: 'Finance' },
    { id: 'taxation', name: 'Taxation', aliases: ['taxation', 'tax planning', 'gst', 'income tax'], category: 'Finance' },

    { id: 'consulting', name: 'Management Consulting', aliases: ['consulting', 'strategy consulting', 'business consulting'], category: 'Business' },
    { id: 'business_analysis', name: 'Business Analysis', aliases: ['business analysis', 'ba', 'requirements gathering'], category: 'Business' },
    { id: 'supply_chain', name: 'Supply Chain Management', aliases: ['supply chain', 'logistics', 'procurement', 'scm'], category: 'Business' },

    { id: 'ui_ux_design', name: 'UI/UX Design', aliases: ['ui design', 'ux design', 'user experience', 'user interface'], category: 'Creative' },
    { id: 'video_editing', name: 'Video Editing', aliases: ['video editing', 'video production', 'adobe premiere'], category: 'Creative' },

    { id: 'clinical_research', name: 'Clinical Research', aliases: ['clinical research', 'clinical trials', 'drug development'], category: 'Healthcare' },
    { id: 'medical_devices', name: 'Medical Devices', aliases: ['medical devices', 'biomedical engineering'], category: 'Healthcare' },

    { id: 'quality_assurance', name: 'Quality Assurance', aliases: ['quality assurance', 'qa', 'quality control', 'testing'], category: 'Operations' },
    { id: 'lean_manufacturing', name: 'Lean Manufacturing', aliases: ['lean manufacturing', 'six sigma', 'process improvement'], category: 'Operations' },

    // NEW NICHE SUSTAINABILITY SKILLS
    { id: 'carbon_accounting', name: 'Carbon Accounting', aliases: ['carbon accounting', 'ghg accounting', 'emissions reporting'], category: 'Sustainability' },
    { id: 'circular_economy', name: 'Circular Economy Design', aliases: ['circular economy', 'cradle-to-cradle', 'sustainable design'], category: 'Sustainability' },
    { id: 'climate_risk', name: 'Climate Risk Analysis', aliases: ['climate risk', 'esg analysis'], category: 'Sustainability' },
    { id: 'vertical_farming', name: 'Vertical Farming', aliases: ['vertical farming', 'hydroponics', 'aeroponics', 'cea'], category: 'Sustainability' },

    // NEW NICHE DIGITAL MEDIA SKILLS
    { id: 'growth_hacking', name: 'Growth Hacking', aliases: ['growth hacking', 'cro', 'conversion rate optimization'], category: 'Digital Media' },
    { id: 'podcast_production', name: 'Podcast Production', aliases: ['podcast production', 'audio editing', 'sound design'], category: 'Digital Media' },
    { id: 'no_code', name: 'No-Code/Low-Code Development', aliases: ['no-code', 'low-code', 'nocode', 'bubble', 'webflow'], category: 'Digital Media' }
  ]
};

// career paths with required skills
export const careersData = [
  {
    id: 'frontend_developer',
    title: 'Frontend Developer',
    description: 'Build user-facing web applications and interfaces.',
    skillRequirements: [
      { skillId: 'javascript', level: 'Intermediate' },
      { skillId: 'react', level: 'Intermediate' },
      { skillId: 'html', level: 'Advanced' },
      { skillId: 'css', level: 'Advanced' },
      { skillId: 'problem_solving', level: 'Advanced' },
      { skillId: 'teamwork', level: 'Intermediate' },
    ],
    relatedCareers: ['full_stack_developer', 'ui_ux_designer'],
    averageSalary: '₹6-12 LPA',
    growthProspect: 'High'
  },
  {
    id: 'full_stack_developer',
    title: 'Full Stack Developer',
    description: 'Work on both the frontend and backend of websites and applications.',
    skillRequirements: [
      { skillId: 'javascript', level: 'Advanced' },
      { skillId: 'nodejs', level: 'Intermediate' },
      { skillId: 'sql', level: 'Intermediate' },
      { skillId: 'html', level: 'Intermediate' },
      { skillId: 'css', level: 'Intermediate' },
      { skillId: 'problem_solving', level: 'Advanced' },
      { skillId: 'communication', level: 'Intermediate' },
    ],
    relatedCareers: ['frontend_developer', 'backend_developer'],
    averageSalary: '₹8-16 LPA',
    growthProspect: 'Very High'
  },
  {
    id: 'digital_marketer',
    title: 'Digital Marketing Specialist',
    description: 'Develop and execute comprehensive digital marketing strategies to increase brand awareness and drive traffic. You will manage campaigns across social media, SEO, email, and other channels to achieve business goals.',
    skillRequirements: [
      { skillId: 'digital_marketing', level: 'Advanced' },
      { skillId: 'data_analysis', level: 'Intermediate' },
      { skillId: 'communication', level: 'Advanced' },
      { skillId: 'creativity', level: 'Advanced' },
    ],
    relatedCareers: ['content_creator', 'sales_manager'],
    averageSalary: '₹4-8 LPA',
    growthProspect: 'High'
  },
  {
    id: 'data_analyst',
    title: 'Data Analyst',
    description: 'Analyze data to find useful business insights and trends.',
    skillRequirements: [
      { skillId: 'sql', level: 'Advanced' },
      { skillId: 'python', level: 'Intermediate' },
      { skillId: 'data_analysis', level: 'Advanced' },
      { skillId: 'critical_thinking', level: 'Advanced' },
      { skillId: 'problem_solving', level: 'Intermediate' },
    ],
    relatedCareers: ['data_scientist', 'business_analyst'],
    averageSalary: '₹5-10 LPA',
    growthProspect: 'Very High'
  },
  {
    id: 'ui_ux_designer',
    title: 'UI/UX Designer',
    description: 'Create intuitive and visually appealing user interfaces and experiences for digital products. You will conduct user research, design wireframes and prototypes, and collaborate with developers to ensure a seamless user journey.',
    skillRequirements: [
      { skillId: 'graphic_design', level: 'Advanced' },
      { skillId: 'html', level: 'Beginner' },
      { skillId: 'css', level: 'Beginner' },
      { skillId: 'creativity', level: 'Advanced' },
      { skillId: 'communication', level: 'Intermediate' },
      { skillId: 'critical_thinking', level: 'Intermediate' },
    ],
    relatedCareers: ['frontend_developer', 'graphic_designer'],
    averageSalary: '₹4-9 LPA',
    growthProspect: 'High'
  },
  {
    id: 'project_manager',
    title: 'Project Manager',
    description: 'Plan, execute, and close projects while managing scope, time, and budget. You will lead cross-functional teams, mitigate risks, and ensure successful project delivery aligned with business objectives.',
    skillRequirements: [
      { skillId: 'project_management', level: 'Advanced' },
      { skillId: 'leadership', level: 'Advanced' },
      { skillId: 'communication', level: 'Advanced' },
      { skillId: 'time_management', level: 'Advanced' },
    ],
    relatedCareers: ['product_manager', 'business_analyst'],
    averageSalary: '₹8-15 LPA',
    growthProspect: 'High'
  },
  {
    id: 'content_creator',
    title: 'Content Creator',
    description: 'Produce high-quality, engaging content across various formats such as video, text, and graphics for digital platforms. You will develop content strategies, grow audiences, and analyze performance metrics.',
    skillRequirements: [
      { skillId: 'content_writing', level: 'Advanced' },
      { skillId: 'digital_marketing', level: 'Intermediate' },
      { skillId: 'creativity', level: 'Advanced' },
      { skillId: 'communication', level: 'Intermediate' },
    ],
    relatedCareers: ['digital_marketer', 'graphic_designer'],
    averageSalary: '₹3-7 LPA',
    growthProspect: 'Medium'
  },
  {
    id: 'backend_developer',
    title: 'Backend Developer',
    description: 'Design, build, and maintain the server-side logic, databases, and APIs that power web applications. You will ensure high performance, security, and scalability while integrating with frontend elements.',
    skillRequirements: [
      { skillId: 'python', level: 'Intermediate' },
      { skillId: 'nodejs', level: 'Intermediate' },
      { skillId: 'sql', level: 'Advanced' },
      { skillId: 'mongodb', level: 'Intermediate' },
      { skillId: 'problem_solving', level: 'Advanced' },
    ],
    relatedCareers: ['full_stack_developer', 'devops_engineer'],
    averageSalary: '₹6-14 LPA',
    growthProspect: 'Very High'
  },

  // more careers for the indian market
  {
    id: 'data_scientist',
    title: 'Data Scientist',
    description: 'Leverage advanced statistical analysis, machine learning algorithms, and predictive modeling to extract actionable insights from complex datasets. You will solve business problems by identifying trends and communicating findings.',
    skillRequirements: [
      { skillId: 'python', level: 'Advanced' },
      { skillId: 'sql', level: 'Advanced' },
      { skillId: 'machine_learning', level: 'Advanced' },
      { skillId: 'data_analysis', level: 'Advanced' },
      { skillId: 'critical_thinking', level: 'Advanced' },
    ],
    relatedCareers: ['ml_engineer', 'data_analyst'],
    averageSalary: '₹8-25 LPA',
    growthProspect: 'Very High'
  },
  {
    id: 'software_architect',
    title: 'Software Architect',
    description: 'Design high-level software system architecture and make technical decisions for large-scale applications.',
    skillRequirements: [
      { skillId: 'java', level: 'Advanced' },
      { skillId: 'python', level: 'Advanced' },
      { skillId: 'aws', level: 'Advanced' },
      { skillId: 'leadership', level: 'Advanced' },
      { skillId: 'problem_solving', level: 'Advanced' },
    ],
    relatedCareers: ['technical_lead', 'engineering_manager'],
    averageSalary: '₹25-60 LPA',
    growthProspect: 'Very High'
  },
  {
    id: 'devops_engineer',
    title: 'DevOps Engineer',
    description: 'Bridge the gap between development and operations by automating deployment pipelines, managing cloud infrastructure, and ensuring system reliability. You will focus on CI/CD, monitoring, and scaling applications efficiently.',
    skillRequirements: [
      { skillId: 'aws', level: 'Advanced' },
      { skillId: 'docker', level: 'Advanced' },
      { skillId: 'kubernetes', level: 'Intermediate' },
      { skillId: 'python', level: 'Intermediate' },
      { skillId: 'problem_solving', level: 'Advanced' },
    ],
    relatedCareers: ['cloud_architect', 'backend_developer'],
    averageSalary: '₹8-20 LPA',
    growthProspect: 'Very High'
  },
  {
    id: 'cybersecurity_analyst',
    title: 'Cybersecurity Analyst',
    description: 'Monitor, detect, and respond to security threats and vulnerabilities.',
    skillRequirements: [
      { skillId: 'cybersecurity', level: 'Advanced' },
      { skillId: 'penetration_testing', level: 'Intermediate' },
      { skillId: 'critical_thinking', level: 'Advanced' },
      { skillId: 'problem_solving', level: 'Advanced' },
    ],
    relatedCareers: ['security_consultant', 'ethical_hacker'],
    averageSalary: '₹6-15 LPA',
    growthProspect: 'High'
  },
  {
    id: 'android_developer',
    title: 'Android Developer',
    description: 'Develop native Android applications using Java/Kotlin and Android SDK.',
    skillRequirements: [
      { skillId: 'android', level: 'Advanced' },
      { skillId: 'java', level: 'Advanced' },
      { skillId: 'kotlin', level: 'Intermediate' },
      { skillId: 'problem_solving', level: 'Advanced' },
    ],
    relatedCareers: ['ios_developer', 'mobile_architect'],
    averageSalary: '₹5-15 LPA',
    growthProspect: 'High'
  },
  {
    id: 'ios_developer',
    title: 'iOS Developer',
    description: 'Build native iOS applications using Swift and iOS development frameworks.',
    skillRequirements: [
      { skillId: 'ios', level: 'Advanced' },
      { skillId: 'swift', level: 'Advanced' },
      { skillId: 'problem_solving', level: 'Advanced' },
      { skillId: 'creativity', level: 'Intermediate' },
    ],
    relatedCareers: ['android_developer', 'mobile_architect'],
    averageSalary: '₹6-18 LPA',
    growthProspect: 'High'
  },
  {
    id: 'product_manager',
    title: 'Product Manager',
    description: 'Drive the product vision, strategy, and roadmap from conception to launch. You will collaborate with cross-functional teams, prioritize features based on user needs and market research, and ensure product success.',
    skillRequirements: [
      { skillId: 'project_management', level: 'Advanced' },
      { skillId: 'data_analysis', level: 'Intermediate' },
      { skillId: 'communication', level: 'Advanced' },
      { skillId: 'leadership', level: 'Advanced' },
      { skillId: 'critical_thinking', level: 'Advanced' },
    ],
    relatedCareers: ['business_analyst', 'strategy_consultant'],
    averageSalary: '₹12-30 LPA',
    growthProspect: 'Very High'
  },
  {
    id: 'business_analyst',
    title: 'Business Analyst',
    description: 'Bridge the gap between IT and business by analyzing processes, identifying needs, and recommending data-driven solutions. You will document requirements, facilitate communication, and drive organizational efficiency.',
    skillRequirements: [
      { skillId: 'business_analysis', level: 'Advanced' },
      { skillId: 'data_analysis', level: 'Advanced' },
      { skillId: 'sql', level: 'Intermediate' },
      { skillId: 'communication', level: 'Advanced' },
      { skillId: 'critical_thinking', level: 'Advanced' },
    ],
    relatedCareers: ['product_manager', 'data_analyst'],
    averageSalary: '₹6-15 LPA',
    growthProspect: 'High'
  },
  {
    id: 'management_consultant',
    title: 'Management Consultant',
    description: 'Provide expert advice to organizations to improve their performance and solve complex business problems. You will analyze data, develop strategies, and implement solutions to drive growth and efficiency.',
    skillRequirements: [
      { skillId: 'consulting', level: 'Advanced' },
      { skillId: 'critical_thinking', level: 'Advanced' },
      { skillId: 'communication', level: 'Advanced' },
      { skillId: 'leadership', level: 'Advanced' },
      { skillId: 'data_analysis', level: 'Advanced' },
    ],
    relatedCareers: ['strategy_consultant', 'business_analyst'],
    averageSalary: '₹20-60 LPA',
    growthProspect: 'Very High'
  },
  {
    id: 'investment_banker',
    title: 'Investment Banking Analyst',
    description: 'Analyze financial data, create investment models, and support M&A transactions.',
    skillRequirements: [
      { skillId: 'investment_banking', level: 'Advanced' },
      { skillId: 'financial_modeling', level: 'Advanced' },
      { skillId: 'finance', level: 'Advanced' },
      { skillId: 'data_analysis', level: 'Advanced' },
      { skillId: 'communication', level: 'Advanced' },
    ],
    relatedCareers: ['equity_research', 'private_equity'],
    averageSalary: '₹15-50 LPA',
    growthProspect: 'Very High'
  },
  {
    id: 'chartered_accountant',
    title: 'Chartered Accountant',
    description: 'Provide accounting, auditing, taxation, and financial advisory services.',
    skillRequirements: [
      { skillId: 'accounting', level: 'Advanced' },
      { skillId: 'taxation', level: 'Advanced' },
      { skillId: 'finance', level: 'Advanced' },
      { skillId: 'data_analysis', level: 'Intermediate' },
      { skillId: 'communication', level: 'Advanced' },
    ],
    relatedCareers: ['financial_analyst', 'audit_manager'],
    averageSalary: '₹6-25 LPA',
    growthProspect: 'High'
  },
  {
    id: 'financial_analyst',
    title: 'Financial Analyst',
    description: 'Analyze financial data, trends, and performance to provide actionable insights and recommendations. You will create financial models, forecasts, and reports to support strategic business decisions.',
    skillRequirements: [
      { skillId: 'finance', level: 'Advanced' },
      { skillId: 'financial_modeling', level: 'Advanced' },
      { skillId: 'data_analysis', level: 'Advanced' },
      { skillId: 'critical_thinking', level: 'Advanced' },
    ],
    relatedCareers: ['chartered_accountant', 'investment_analyst'],
    averageSalary: '₹5-15 LPA',
    growthProspect: 'High'
  },
  {
    id: 'mechanical_engineer',
    title: 'Mechanical Engineer',
    description: 'Design, develop, and test mechanical systems and products.',
    skillRequirements: [
      { skillId: 'solidworks', level: 'Advanced' },
      { skillId: 'autocad', level: 'Intermediate' },
      { skillId: 'matlab', level: 'Intermediate' },
      { skillId: 'problem_solving', level: 'Advanced' },
      { skillId: 'critical_thinking', level: 'Advanced' },
    ],
    relatedCareers: ['design_engineer', 'manufacturing_engineer'],
    averageSalary: '₹4-12 LPA',
    growthProspect: 'Medium'
  },
  {
    id: 'civil_engineer',
    title: 'Civil Engineer',
    description: 'Design and oversee construction of infrastructure projects like buildings and roads.',
    skillRequirements: [
      { skillId: 'autocad', level: 'Advanced' },
      { skillId: 'project_management', level: 'Intermediate' },
      { skillId: 'problem_solving', level: 'Advanced' },
      { skillId: 'teamwork', level: 'Advanced' },
    ],
    relatedCareers: ['structural_engineer', 'construction_manager'],
    averageSalary: '₹3-10 LPA',
    growthProspect: 'Medium'
  },
  {
    id: 'research_scientist',
    title: 'Research Scientist',
    description: 'Lead innovative research projects to discover new knowledge, develop technologies, or solve complex scientific problems. You will design experiments, analyze results, and publish findings to advance the field.',
    skillRequirements: [
      { skillId: 'python', level: 'Advanced' },
      { skillId: 'r', level: 'Advanced' },
      { skillId: 'matlab', level: 'Advanced' },
      { skillId: 'critical_thinking', level: 'Advanced' },
      { skillId: 'communication', level: 'Advanced' },
    ],
    relatedCareers: ['data_scientist', 'professor'],
    averageSalary: '₹8-25 LPA',
    growthProspect: 'High'
  },
  {
    id: 'sales_manager',
    title: 'Sales Manager',
    description: 'Lead sales teams, develop sales strategies, and manage customer relationships.',
    skillRequirements: [
      { skillId: 'sales', level: 'Advanced' },
      { skillId: 'leadership', level: 'Advanced' },
      { skillId: 'communication', level: 'Advanced' },
      { skillId: 'negotiation', level: 'Advanced' },
    ],
    relatedCareers: ['business_development', 'account_manager'],
    averageSalary: '₹8-20 LPA',
    growthProspect: 'High'
  },
  {
    id: 'operations_manager',
    title: 'Operations Manager',
    description: 'Oversee and optimize daily business operations to ensure efficiency and productivity. You will manage resources, improve processes, and lead teams to achieve operational excellence and organizational goals.',
    skillRequirements: [
      { skillId: 'supply_chain', level: 'Advanced' },
      { skillId: 'leadership', level: 'Advanced' },
      { skillId: 'problem_solving', level: 'Advanced' },
      { skillId: 'data_analysis', level: 'Intermediate' },
    ],
    relatedCareers: ['supply_chain_manager', 'general_manager'],
    averageSalary: '₹8-18 LPA',
    growthProspect: 'High'
  },
  {
    id: 'hr_manager',
    title: 'HR Manager',
    description: 'Manage human resources functions including recruitment, training, and employee relations.',
    skillRequirements: [
      { skillId: 'hr', level: 'Advanced' },
      { skillId: 'leadership', level: 'Advanced' },
      { skillId: 'communication', level: 'Advanced' },
      { skillId: 'emotional_intelligence', level: 'Advanced' },
    ],
    relatedCareers: ['talent_acquisition', 'organizational_development'],
    averageSalary: '₹6-15 LPA',
    growthProspect: 'Medium'
  },
  {
    id: 'qa_engineer',
    title: 'QA Engineer',
    description: 'Test software applications to ensure quality and functionality before release.',
    skillRequirements: [
      { skillId: 'quality_assurance', level: 'Advanced' },
      { skillId: 'python', level: 'Intermediate' },
      { skillId: 'problem_solving', level: 'Advanced' },
      { skillId: 'critical_thinking', level: 'Advanced' },
    ],
    relatedCareers: ['automation_tester', 'software_engineer'],
    averageSalary: '₹4-10 LPA',
    growthProspect: 'Medium'
  },
  {
    id: 'sap_consultant',
    title: 'SAP Consultant',
    description: 'Implement and customize SAP ERP solutions for enterprise clients.',
    skillRequirements: [
      { skillId: 'sap', level: 'Advanced' },
      { skillId: 'business_analysis', level: 'Advanced' },
      { skillId: 'communication', level: 'Advanced' },
      { skillId: 'problem_solving', level: 'Advanced' },
    ],
    relatedCareers: ['erp_consultant', 'business_analyst'],
    averageSalary: '₹6-18 LPA',
    growthProspect: 'High'
  },
  {
    id: 'blockchain_developer',
    title: 'Blockchain Developer',
    description: 'Develop decentralized applications and smart contracts using blockchain technology.',
    skillRequirements: [
      { skillId: 'blockchain', level: 'Advanced' },
      { skillId: 'javascript', level: 'Advanced' },
      { skillId: 'python', level: 'Intermediate' },
      { skillId: 'problem_solving', level: 'Advanced' },
    ],
    relatedCareers: ['crypto_analyst', 'web3_developer'],
    averageSalary: '₹8-25 LPA',
    growthProspect: 'Very High'
  },
  {
    id: 'robotics_engineer',
    title: 'Robotics Engineer',
    description: 'Design and develop robotic systems for industrial and consumer applications.',
    skillRequirements: [
      { skillId: 'robotics', level: 'Advanced' },
      { skillId: 'cpp', level: 'Advanced' },
      { skillId: 'python', level: 'Intermediate' },
      { skillId: 'problem_solving', level: 'Advanced' },
    ],
    relatedCareers: ['automation_engineer', 'ai_engineer'],
    averageSalary: '₹6-18 LPA',
    growthProspect: 'Very High'
  },
  {
    id: 'iot_engineer',
    title: 'IoT Engineer',
    description: 'Develop Internet of Things solutions connecting devices and sensors.',
    skillRequirements: [
      { skillId: 'iot', level: 'Advanced' },
      { skillId: 'python', level: 'Advanced' },
      { skillId: 'c', level: 'Intermediate' },
      { skillId: 'problem_solving', level: 'Advanced' },
    ],
    relatedCareers: ['embedded_engineer', 'hardware_engineer'],
    averageSalary: '₹5-15 LPA',
    growthProspect: 'Very High'
  },
  {
    id: 'biomedical_engineer',
    title: 'Biomedical Engineer',
    description: 'Design and develop medical devices and healthcare technology solutions.',
    skillRequirements: [
      { skillId: 'medical_devices', level: 'Advanced' },
      { skillId: 'problem_solving', level: 'Advanced' },
      { skillId: 'matlab', level: 'Intermediate' },
      { skillId: 'quality_assurance', level: 'Advanced' },
    ],
    relatedCareers: ['clinical_engineer', 'regulatory_affairs'],
    averageSalary: '₹4-12 LPA',
    growthProspect: 'Medium'
  },
  {
    id: 'clinical_research_associate',
    title: 'Clinical Research Associate',
    description: 'Coordinate and monitor clinical trials for pharmaceutical companies.',
    skillRequirements: [
      { skillId: 'clinical_research', level: 'Advanced' },
      { skillId: 'data_analysis', level: 'Advanced' },
      { skillId: 'communication', level: 'Advanced' },
      { skillId: 'critical_thinking', level: 'Advanced' },
    ],
    relatedCareers: ['regulatory_affairs', 'medical_writer'],
    averageSalary: '₹5-15 LPA',
    growthProspect: 'High'
  },
  {
    id: 'tax_consultant',
    title: 'Tax Consultant',
    description: 'Provide tax planning and compliance services to individuals and businesses.',
    skillRequirements: [
      { skillId: 'taxation', level: 'Advanced' },
      { skillId: 'accounting', level: 'Advanced' },
      { skillId: 'communication', level: 'Advanced' },
      { skillId: 'critical_thinking', level: 'Intermediate' },
    ],
    relatedCareers: ['chartered_accountant', 'financial_advisor'],
    averageSalary: '₹4-12 LPA',
    growthProspect: 'Medium'
  },
  {
    id: 'equity_research_analyst',
    title: 'Equity Research Analyst',
    description: 'Analyze companies and industries to provide investment recommendations.',
    skillRequirements: [
      { skillId: 'finance', level: 'Advanced' },
      { skillId: 'financial_modeling', level: 'Advanced' },
      { skillId: 'data_analysis', level: 'Advanced' },
      { skillId: 'critical_thinking', level: 'Advanced' },
    ],
    relatedCareers: ['portfolio_manager', 'investment_banker'],
    averageSalary: '₹12-35 LPA',
    growthProspect: 'High'
  },
  {
    id: 'portfolio_manager',
    title: 'Portfolio Manager',
    description: 'Manage investment portfolios and make strategic investment decisions.',
    skillRequirements: [
      { skillId: 'finance', level: 'Advanced' },
      { skillId: 'risk_management', level: 'Advanced' },
      { skillId: 'data_analysis', level: 'Advanced' },
      { skillId: 'decision_making', level: 'Advanced' },
    ],
    relatedCareers: ['fund_manager', 'equity_research_analyst'],
    averageSalary: '₹20-80 LPA',
    growthProspect: 'Very High'
  },
  {
    id: 'chemical_engineer',
    title: 'Chemical Engineer',
    description: 'Design and operate chemical processes and manufacturing plants.',
    skillRequirements: [
      { skillId: 'matlab', level: 'Intermediate' },
      { skillId: 'problem_solving', level: 'Advanced' },
      { skillId: 'critical_thinking', level: 'Advanced' },
      { skillId: 'quality_assurance', level: 'Intermediate' },
    ],
    relatedCareers: ['process_engineer', 'environmental_engineer'],
    averageSalary: '₹4-12 LPA',
    growthProspect: 'Medium'
  },
  {
    id: 'aerospace_engineer',
    title: 'Aerospace Engineer',
    description: 'Design and develop aircraft, spacecraft, and related systems.',
    skillRequirements: [
      { skillId: 'catia', level: 'Advanced' },
      { skillId: 'matlab', level: 'Advanced' },
      { skillId: 'ansys', level: 'Intermediate' },
      { skillId: 'problem_solving', level: 'Advanced' },
    ],
    relatedCareers: ['design_engineer', 'systems_engineer'],
    averageSalary: '₹6-18 LPA',
    growthProspect: 'High'
  },
  {
    id: 'bank_po',
    title: 'Bank Probationary Officer',
    description: 'Entry-level management position in banking operations and customer service.',
    skillRequirements: [
      { skillId: 'finance', level: 'Intermediate' },
      { skillId: 'communication', level: 'Advanced' },
      { skillId: 'leadership', level: 'Intermediate' },
      { skillId: 'problem_solving', level: 'Advanced' },
    ],
    relatedCareers: ['relationship_manager', 'branch_manager'],
    averageSalary: '₹4-8 LPA',
    growthProspect: 'Medium'
  },
  {
    id: 'ias_officer',
    title: 'IAS Officer',
    description: 'Administrative service officer responsible for policy implementation and governance.',
    skillRequirements: [
      { skillId: 'leadership', level: 'Advanced' },
      { skillId: 'communication', level: 'Advanced' },
      { skillId: 'critical_thinking', level: 'Advanced' },
      { skillId: 'problem_solving', level: 'Advanced' },
    ],
    relatedCareers: ['policy_analyst', 'public_administration'],
    averageSalary: '₹8-25 LPA',
    growthProspect: 'High'
  },
  {
    id: 'psu_engineer',
    title: 'PSU Engineer',
    description: 'Engineering roles in Public Sector Undertakings like ONGC, NTPC, BHEL.',
    skillRequirements: [
      { skillId: 'problem_solving', level: 'Advanced' },
      { skillId: 'teamwork', level: 'Advanced' },
      { skillId: 'critical_thinking', level: 'Advanced' },
      { skillId: 'leadership', level: 'Intermediate' },
    ],
    relatedCareers: ['government_engineer', 'project_manager'],
    averageSalary: '₹6-15 LPA',
    growthProspect: 'Medium'
  },
  {
    id: 'electronics_design_engineer',
    title: 'Electronics Design Engineer',
    description: 'Design and develop electronic circuits, PCBs, and embedded systems for various applications.',
    skillRequirements: [
      { skillId: 'circuit_design', level: 'Advanced' },
      { skillId: 'pcb_design', level: 'Advanced' },
      { skillId: 'altium_designer', level: 'Intermediate' },
      { skillId: 'analog_electronics', level: 'Advanced' },
      { skillId: 'digital_electronics', level: 'Advanced' },
      { skillId: 'spice_simulation', level: 'Intermediate' }
    ],
    relatedCareers: ['hardware_engineer', 'rf_engineer', 'embedded_engineer'],
    averageSalary: '₹4-18 LPA',
    growthProspect: 'High'
  },
  {
    id: 'embedded_systems_engineer',
    title: 'Embedded Systems Engineer',
    description: 'Develop firmware and software for microcontroller-based systems and IoT devices.',
    skillRequirements: [
      { skillId: 'c_programming', level: 'Advanced' },
      { skillId: 'cpp', level: 'Advanced' },
      { skillId: 'microcontrollers', level: 'Advanced' },
      { skillId: 'rtos', level: 'Intermediate' },
      { skillId: 'embedded_c', level: 'Advanced' },
      { skillId: 'hardware_debugging', level: 'Intermediate' }
    ],
    relatedCareers: ['iot_engineer', 'firmware_engineer', 'electronics_design_engineer'],
    averageSalary: '₹3.5-16 LPA',
    growthProspect: 'Very High'
  },
  {
    id: 'rf_engineer',
    title: 'RF/Microwave Engineer',
    description: 'Design and optimize radio frequency circuits, antennas, and wireless communication systems.',
    skillRequirements: [
      { skillId: 'rf_design', level: 'Advanced' },
      { skillId: 'antenna_design', level: 'Advanced' },
      { skillId: 'electromagnetic_theory', level: 'Advanced' },
      { skillId: 'hfss', level: 'Intermediate' },
      { skillId: 'cst_studio', level: 'Intermediate' },
      { skillId: 'network_analyzer', level: 'Intermediate' }
    ],
    relatedCareers: ['telecom_engineer', 'antenna_engineer', 'electronics_design_engineer'],
    averageSalary: '₹5-22 LPA',
    growthProspect: 'High'
  },
  {
    id: 'vlsi_engineer',
    title: 'VLSI Design Engineer',
    description: 'Design and verify integrated circuits and semiconductor devices using advanced CAD tools.',
    skillRequirements: [
      { skillId: 'verilog', level: 'Advanced' },
      { skillId: 'vhdl', level: 'Advanced' },
      { skillId: 'cadence_tools', level: 'Advanced' },
      { skillId: 'synopsys_tools', level: 'Advanced' },
      { skillId: 'digital_design', level: 'Advanced' },
      { skillId: 'verification', level: 'Intermediate' }
    ],
    relatedCareers: ['asic_engineer', 'fpga_engineer', 'semiconductor_engineer'],
    averageSalary: '₹4-20 LPA',
    growthProspect: 'Very High'
  },
  {
    id: 'fpga_engineer',
    title: 'FPGA Engineer',
    description: 'Design and implement digital systems using Field-Programmable Gate Arrays for high-performance applications.',
    skillRequirements: [
      { skillId: 'verilog', level: 'Advanced' },
      { skillId: 'vhdl', level: 'Advanced' },
      { skillId: 'xilinx_vivado', level: 'Advanced' },
      { skillId: 'altera_quartus', level: 'Intermediate' },
      { skillId: 'digital_signal_processing', level: 'Intermediate' },
      { skillId: 'timing_analysis', level: 'Intermediate' }
    ],
    relatedCareers: ['vlsi_engineer', 'embedded_engineer', 'digital_design_engineer'],
    averageSalary: '₹4.5-18 LPA',
    growthProspect: 'High'
  },
  {
    id: 'power_electronics_engineer',
    title: 'Power Electronics Engineer',
    description: 'Design power conversion systems, motor drives, and renewable energy electronics.',
    skillRequirements: [
      { skillId: 'power_electronics', level: 'Advanced' },
      { skillId: 'motor_control', level: 'Advanced' },
      { skillId: 'matlab_simulink', level: 'Advanced' },
      { skillId: 'power_systems', level: 'Intermediate' },
      { skillId: 'control_systems', level: 'Advanced' },
      { skillId: 'high_voltage_systems', level: 'Intermediate' }
    ],
    relatedCareers: ['electrical_engineer', 'renewable_energy_engineer', 'control_systems_engineer'],
    averageSalary: '₹3.5-15 LPA',
    growthProspect: 'High'
  },
  {
    id: 'test_engineer',
    title: 'Electronics Test Engineer',
    description: 'Develop test procedures and validate electronic products for quality and compliance.',
    skillRequirements: [
      { skillId: 'test_automation', level: 'Advanced' },
      { skillId: 'labview', level: 'Intermediate' },
      { skillId: 'python', level: 'Intermediate' },
      { skillId: 'oscilloscope', level: 'Advanced' },
      { skillId: 'spectrum_analyzer', level: 'Intermediate' },
      { skillId: 'quality_assurance', level: 'Advanced' }
    ],
    relatedCareers: ['quality_engineer', 'validation_engineer', 'production_engineer'],
    averageSalary: '₹3-12 LPA',
    growthProspect: 'Medium'
  },
  {
    id: 'iot_engineer',
    title: 'IoT Engineer',
    description: 'Design and develop Internet of Things solutions combining hardware, software, and connectivity.',
    skillRequirements: [
      { skillId: 'iot_protocols', level: 'Advanced' },
      { skillId: 'embedded_systems', level: 'Advanced' },
      { skillId: 'wireless_communication', level: 'Advanced' },
      { skillId: 'cloud_platforms', level: 'Intermediate' },
      { skillId: 'sensor_integration', level: 'Advanced' },
      { skillId: 'data_analytics', level: 'Intermediate' }
    ],
    relatedCareers: ['embedded_engineer', 'software_engineer', 'data_engineer'],
    averageSalary: '₹4-18 LPA',
    growthProspect: 'Very High'
  },
  {
    id: 'analog_design_engineer',
    title: 'Analog IC Design Engineer',
    description: 'Design analog and mixed-signal integrated circuits for various applications.',
    skillRequirements: [
      { skillId: 'analog_ic_design', level: 'Advanced' },
      { skillId: 'spice_simulation', level: 'Advanced' },
      { skillId: 'layout_design', level: 'Advanced' },
      { skillId: 'semiconductor_physics', level: 'Advanced' },
      { skillId: 'cadence_virtuoso', level: 'Advanced' },
      { skillId: 'circuit_analysis', level: 'Advanced' }
    ],
    relatedCareers: ['vlsi_engineer', 'mixed_signal_engineer', 'rf_engineer'],
    averageSalary: '₹5-25 LPA',
    growthProspect: 'High'
  },
  {
    id: 'signal_processing_engineer',
    title: 'Digital Signal Processing Engineer',
    description: 'Develop algorithms and systems for processing digital signals in audio, video, and communication applications.',
    skillRequirements: [
      { skillId: 'dsp_algorithms', level: 'Advanced' },
      { skillId: 'matlab', level: 'Advanced' },
      { skillId: 'c_dsp', level: 'Advanced' },
      { skillId: 'filter_design', level: 'Advanced' },
      { skillId: 'fft_analysis', level: 'Advanced' },
      { skillId: 'real_time_processing', level: 'Intermediate' }
    ],
    relatedCareers: ['audio_engineer', 'communication_engineer', 'embedded_engineer'],
    averageSalary: '₹4.5-20 LPA',
    growthProspect: 'High'
  },
  {
    id: 'telecom_engineer',
    title: 'Telecommunications Engineer',
    description: 'Design and maintain communication networks, including cellular, fiber optic, and satellite systems.',
    skillRequirements: [
      { skillId: 'telecom_protocols', level: 'Advanced' },
      { skillId: 'network_planning', level: 'Advanced' },
      { skillId: 'rf_planning', level: 'Intermediate' },
      { skillId: '5g_technology', level: 'Advanced' },
      { skillId: 'fiber_optics', level: 'Intermediate' },
      { skillId: 'network_optimization', level: 'Advanced' }
    ],
    relatedCareers: ['network_engineer', 'rf_engineer', 'communication_engineer'],
    averageSalary: '₹3.5-16 LPA',
    growthProspect: 'High'
  },
  {
    id: 'automotive_electronics_engineer',
    title: 'Automotive Electronics Engineer',
    description: 'Develop electronic systems for vehicles including ECUs, infotainment, and autonomous driving features.',
    skillRequirements: [
      { skillId: 'automotive_protocols', level: 'Advanced' },
      { skillId: 'can_bus', level: 'Advanced' },
      { skillId: 'autosar', level: 'Intermediate' },
      { skillId: 'embedded_automotive', level: 'Advanced' },
      { skillId: 'functional_safety', level: 'Intermediate' },
      { skillId: 'vehicle_dynamics', level: 'Intermediate' }
    ],
    relatedCareers: ['embedded_engineer', 'control_systems_engineer', 'mechatronics_engineer'],
    averageSalary: '₹4-18 LPA',
    growthProspect: 'Very High'
  },
  {
    id: 'biomedical_electronics_engineer',
    title: 'Biomedical Electronics Engineer',
    description: 'Design and develop electronic medical devices and healthcare monitoring systems.',
    skillRequirements: [
      { skillId: 'biomedical_instrumentation', level: 'Advanced' },
      { skillId: 'medical_device_standards', level: 'Advanced' },
      { skillId: 'signal_processing', level: 'Advanced' },
      { skillId: 'regulatory_compliance', level: 'Intermediate' },
      { skillId: 'biosensors', level: 'Advanced' },
      { skillId: 'medical_imaging', level: 'Intermediate' }
    ],
    relatedCareers: ['medical_device_engineer', 'clinical_engineer', 'research_engineer'],
    averageSalary: '₹4-16 LPA',
    growthProspect: 'High'
  },
  {
    id: 'control_systems_engineer',
    title: 'Control Systems Engineer',
    description: 'Design automated control systems for industrial processes and robotic applications.',
    skillRequirements: [
      { skillId: 'control_theory', level: 'Advanced' },
      { skillId: 'plc_programming', level: 'Advanced' },
      { skillId: 'scada_systems', level: 'Advanced' },
      { skillId: 'matlab_simulink', level: 'Advanced' },
      { skillId: 'pid_control', level: 'Advanced' },
      { skillId: 'industrial_automation', level: 'Advanced' }
    ],
    relatedCareers: ['automation_engineer', 'robotics_engineer', 'process_engineer'],
    averageSalary: '₹3.5-15 LPA',
    growthProspect: 'High'
  },
  {
    id: 'electronics_consultant',
    title: 'Electronics Consultant',
    description: 'Provide expert technical advice and solutions to clients on electronic systems and products.',
    skillRequirements: [
      { skillId: 'technical_consulting', level: 'Advanced' },
      { skillId: 'project_management', level: 'Advanced' },
      { skillId: 'client_communication', level: 'Advanced' },
      { skillId: 'system_analysis', level: 'Advanced' },
      { skillId: 'cost_optimization', level: 'Intermediate' },
      { skillId: 'business_development', level: 'Intermediate' }
    ],
    relatedCareers: ['technical_lead', 'project_manager', 'sales_engineer'],
    averageSalary: '₹6-30 LPA',
    growthProspect: 'High'
  },

  // NICHE CAREERS
  {
    id: 'ai_ethics_officer',
    title: 'AI Ethics Officer',
    description: 'Ensures AI systems are developed and used responsibly, fairly, and transparently.',
    skillRequirements: [
      { skillId: 'ai_ethics', level: 'Advanced' },
      { skillId: 'machine_learning', level: 'Intermediate' },
      { skillId: 'critical_thinking', level: 'Advanced' },
      { skillId: 'communication', level: 'Advanced' }
    ],
    relatedCareers: ['data_scientist', 'legal_consultant'],
    averageSalary: '₹15-40 LPA',
    growthProspect: 'Very High'
  },
  {
    id: 'prompt_engineer',
    title: 'Prompt Engineer',
    description: 'Designs and refines inputs for generative AI models to produce accurate and desirable outputs.',
    skillRequirements: [
      { skillId: 'prompt_engineering', level: 'Advanced' },
      { skillId: 'python', level: 'Intermediate' },
      { skillId: 'creativity', level: 'Advanced' },
      { skillId: 'critical_thinking', level: 'Advanced' },
      { skillId: 'communication', level: 'Intermediate' }
    ],
    relatedCareers: ['data_scientist', 'content_creator', 'ai_developer'],
    averageSalary: '₹10-30 LPA',
    growthProspect: 'Very High'
  },
  {
    id: 'digital_twin_developer',
    title: 'Digital Twin Developer',
    description: 'Creates and manages virtual models of real-world objects and systems for simulation and analysis.',
    skillRequirements: [
      { skillId: 'digital_twin', level: 'Advanced' },
      { skillId: 'iot', level: 'Advanced' },
      { skillId: 'python', level: 'Intermediate' },
      { skillId: 'solidworks', level: 'Intermediate' },
      { skillId: 'problem_solving', level: 'Advanced' }
    ],
    relatedCareers: ['iot_engineer', 'mechanical_engineer', 'data_scientist'],
    averageSalary: '₹9-25 LPA',
    growthProspect: 'High'
  },
  {
    id: 'qml_analyst',
    title: 'Quantum Machine Learning Analyst',
    description: 'Combines quantum computing with machine learning to solve highly complex problems.',
    skillRequirements: [
      { skillId: 'qml', level: 'Advanced' },
      { skillId: 'machine_learning', level: 'Advanced' },
      { skillId: 'python', level: 'Advanced' },
      { skillId: 'critical_thinking', level: 'Advanced' }
    ],
    relatedCareers: ['research_scientist', 'data_scientist'],
    averageSalary: '₹18-60 LPA',
    growthProspect: 'High'
  },
  {
    id: 'xr_experience_designer',
    title: 'XR Experience Designer',
    description: 'Designs immersive augmented, virtual, and mixed reality experiences.',
    skillRequirements: [
      { skillId: 'xr_development', level: 'Advanced' },
      { skillId: 'ui_ux_design', level: 'Advanced' },
      { skillId: 'creativity', level: 'Advanced' },
      { skillId: 'problem_solving', level: 'Intermediate' }
    ],
    relatedCareers: ['ui_ux_designer', 'game_developer', 'frontend_developer'],
    averageSalary: '₹8-22 LPA',
    growthProspect: 'Very High'
  },
  {
    id: 'carbon_accountant',
    title: 'Carbon Accountant',
    description: 'Measures, tracks, and reports an organization\'s greenhouse gas emissions.',
    skillRequirements: [
      { skillId: 'carbon_accounting', level: 'Advanced' },
      { skillId: 'accounting', level: 'Intermediate' },
      { skillId: 'data_analysis', level: 'Advanced' },
      { skillId: 'critical_thinking', level: 'Advanced' }
    ],
    relatedCareers: ['financial_analyst', 'environmental_consultant'],
    averageSalary: '₹7-18 LPA',
    growthProspect: 'High'
  },
  {
    id: 'circular_economy_designer',
    title: 'Circular Economy Designer',
    description: 'Reimagines products and systems to eliminate waste and promote resource reuse.',
    skillRequirements: [
      { skillId: 'circular_economy', level: 'Advanced' },
      { skillId: 'supply_chain', level: 'Intermediate' },
      { skillId: 'creativity', level: 'Advanced' },
      { skillId: 'problem_solving', level: 'Advanced' }
    ],
    relatedCareers: ['product_designer', 'sustainability_manager', 'operations_manager'],
    averageSalary: '₹8-20 LPA',
    growthProspect: 'High'
  },
  {
    id: 'climate_risk_analyst',
    title: 'Climate Risk Analyst',
    description: 'Assesses financial and operational risks posed by climate change.',
    skillRequirements: [
      { skillId: 'climate_risk', level: 'Advanced' },
      { skillId: 'risk_management', level: 'Advanced' },
      { skillId: 'financial_modeling', level: 'Intermediate' },
      { skillId: 'data_analysis', level: 'Advanced' }
    ],
    relatedCareers: ['financial_analyst', 'investment_banker', 'management_consultant'],
    averageSalary: '₹10-35 LPA',
    growthProspect: 'Very High'
  },
  {
    id: 'vertical_farming_technician',
    title: 'Vertical Farming Technician',
    description: 'Manages and optimizes automated, soil-free vertical farming systems.',
    skillRequirements: [
      { skillId: 'vertical_farming', level: 'Advanced' },
      { skillId: 'iot', level: 'Intermediate' },
      { skillId: 'problem_solving', level: 'Advanced' },
      { skillId: 'adaptability', level: 'Advanced' }
    ],
    relatedCareers: ['agricultural_engineer', 'iot_engineer'],
    averageSalary: '₹4-9 LPA',
    growthProspect: 'High'
  },
  {
    id: 'genetic_counselor',
    title: 'Genetic Counselor',
    description: 'Advises individuals and families on genetic conditions and their implications.',
    skillRequirements: [
      { skillId: 'genetic_counseling', level: 'Advanced' },
      { skillId: 'communication', level: 'Advanced' },
      { skillId: 'emotional_intelligence', level: 'Advanced' },
      { skillId: 'critical_thinking', level: 'Advanced' }
    ],
    relatedCareers: ['healthcare_consultant', 'clinical_research_associate'],
    averageSalary: '₹6-15 LPA',
    growthProspect: 'High'
  },
  {
    id: 'bioinformatics_scientist',
    title: 'Bioinformatics Scientist',
    description: 'Develops software and methods to analyze large sets of biological data.',
    skillRequirements: [
      { skillId: 'bioinformatics', level: 'Advanced' },
      { skillId: 'python', level: 'Advanced' },
      { skillId: 'r', level: 'Intermediate' },
      { skillId: 'data_analysis', level: 'Advanced' },
      { skillId: 'problem_solving', level: 'Advanced' }
    ],
    relatedCareers: ['data_scientist', 'research_scientist'],
    averageSalary: '₹7-25 LPA',
    growthProspect: 'Very High'
  },
  {
    id: 'telehealth_specialist',
    title: 'Telehealth Technology Specialist',
    description: 'Implements and maintains the infrastructure for remote patient monitoring and virtual visits.',
    skillRequirements: [
      { skillId: 'telehealth_tech', level: 'Advanced' },
      { skillId: 'cybersecurity', level: 'Intermediate' },
      { skillId: 'problem_solving', level: 'Advanced' },
      { skillId: 'communication', level: 'Intermediate' }
    ],
    relatedCareers: ['it_support_specialist', 'network_engineer'],
    averageSalary: '₹5-12 LPA',
    growthProspect: 'High'
  },
  {
    id: 'growth_hacker',
    title: 'Growth Hacker',
    description: 'Uses rapid experimentation across marketing channels to find effective ways to grow a business.',
    skillRequirements: [
      { skillId: 'growth_hacking', level: 'Advanced' },
      { skillId: 'digital_marketing', level: 'Advanced' },
      { skillId: 'data_analysis', level: 'Advanced' },
      { skillId: 'creativity', level: 'Advanced' }
    ],
    relatedCareers: ['digital_marketer', 'product_manager'],
    averageSalary: '₹8-25 LPA',
    growthProspect: 'Very High'
  },
  {
    id: 'podcast_producer',
    title: 'Podcast Producer',
    description: 'Manages the technical and creative aspects of producing high-quality audio content.',
    skillRequirements: [
      { skillId: 'podcast_production', level: 'Advanced' },
      { skillId: 'content_writing', level: 'Intermediate' },
      { skillId: 'creativity', level: 'Advanced' },
      { skillId: 'project_management', level: 'Intermediate' }
    ],
    relatedCareers: ['content_creator', 'video_editor', 'sound_engineer'],
    averageSalary: '₹4-10 LPA',
    growthProspect: 'High'
  },
  {
    id: 'no_code_developer',
    title: 'No-Code/Low-Code Developer',
    description: 'Builds applications and automates processes using visual development platforms.',
    skillRequirements: [
      { skillId: 'no_code', level: 'Advanced' },
      { skillId: 'problem_solving', level: 'Advanced' },
      { skillId: 'creativity', level: 'Intermediate' },
      { skillId: 'business_analysis', level: 'Intermediate' }
    ],
    relatedCareers: ['business_analyst', 'frontend_developer', 'operations_manager'],
    averageSalary: '₹5-14 LPA',
    growthProspect: 'Very High'
  }
];



// finds a skill from list based on user input
const findSkillLocally = (userInput) => {
  const allSkills = [
    ...skillsData.technical,
    ...skillsData.soft,
    ...skillsData.industry
  ];

  const cleanInput = userInput.toLowerCase().trim();
  if (!cleanInput) return null;

  // check if user input matches a skill name or alias
  // checks if user input is exactly equal to an alias
  return allSkills.find(skill =>
    skill.aliases.some(alias => cleanInput === alias.toLowerCase())
  );
};

// takes a string of skills and matches them to  list
export const processSkillsLocally = (rawSkills) => {
  if (!rawSkills || typeof rawSkills !== 'string') return [];

  const skillList = rawSkills.split(',').map(s => s.trim());
  const matchedSkills = [];

  skillList.forEach(userSkill => {
    const foundSkill = findSkillLocally(userSkill);
    if (foundSkill) {
      matchedSkills.push({
        ...foundSkill,
        originalInput: userSkill,
      });
    }
  });

  // removes duplicates
  const uniqueSkills = Array.from(new Map(matchedSkills.map(skill => [skill.id, skill])).values());
  return uniqueSkills;
};

// find careers that match the user's skills
export const getRelevantCareers = (userSkillIds) => {
  if (!userSkillIds || userSkillIds.length === 0) return [];

  return careersData
    .map(career => {
      const allRequiredSkillIds = career.skillRequirements.map(req => req.skillId);
      const matchCount = userSkillIds.filter(skillId => allRequiredSkillIds.includes(skillId)).length;
      return { ...career, matchCount };
    })
    .filter(career => career.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount)
    .slice(0, 10);
};

/**
 * Finds a career object by its title, attempting a case-insensitive match.
 * @param {string} careerTitle - The title of the career to find.
 * @returns {object | undefined} The found career object or undefined.
 */
export const findCareerByTitle = (careerTitle) => {
  const normalizedTitle = careerTitle.toLowerCase().trim();
  return careersData.find(career =>
    career.title.toLowerCase().trim() === normalizedTitle
  );
};