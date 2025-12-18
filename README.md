# AI Career Guide - Intelligent Career Roadmap Generator

A modern, AI-powered application that helps users discover their ideal career path based on their skills and interests. Built with React, Vite, Firebase, and Google Gemini AI.

## Features

*   **AI-Powered Assessment:** Uses Google Gemini to analyze user skills and interests, providing a personalized career roadmap.
*   **Interactive Career Exploration:** "Chip-based" interface to explore various tech and creative careers.
*   **Detailed Career Insights:** View salary ranges, job outlooks, and required skills for specific roles.
*   **Actionable Plans:** Generates specific project ideas, course recommendations, and certification paths.
*   **Resume Builder:** Integrated tool to help users craft a resume based on their new career path.
*   **Responsive Design:** Fully optimized for desktop and mobile devices.

## Tech Stack

*   **Frontend:** React 19, Vite
*   **Styling:** CSS3 with CSS Variables (Theming supported)
*   **AI Integration:** Google Gemini API (`@google/generative-ai`)
*   **Backend:** Vercel Serverless Functions (Node.js)
*   **Auth & Database:** Firebase (Authentication, Firestore)
*   **Icons:** Lucide React

## Installation & Setup

**Prerequisites:**
- Node.js (v18 or higher)
- A Firebase account ([console.firebase.google.com](https://console.firebase.google.com/))
- A Google Gemini API key ([aistudio.google.com](https://aistudio.google.com/))

**Full step-by-step guide with screenshots is available in `Documentation/index.html`**

### Quick Start

> **Important:** Do NOT rename the project folder or use spaces in the folder name. This can cause build issues.

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Install Vercel CLI (for local development):**
    ```bash
    npm install -g vercel
    ```

3.  **Setup Firebase:**
    - Create a new Firebase project
    - Enable **Authentication** → Google & Email/Password providers
    - Enable **Firestore Database** (Production mode)
    - **Important:** Add these Firestore security rules:
    ```javascript
    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        match /profiles/{userId} {
          allow read, write: if request.auth != null && request.auth.uid == userId;
        }
      }
    }
    ```
    - Copy your Firebase config from Project Settings

4.  **Get Gemini API Key:**
    - Visit [Google AI Studio](https://aistudio.google.com/)
    - Click "Get API Key" → "Create API Key"

5.  **Get Firebase Admin SDK Credentials:**
    - In Firebase Console → Project Settings → Service Accounts
    - Click "Generate New Private Key" → Download JSON file
    - You'll need the `project_id`, `client_email`, and `private_key` from this file

6.  **Configure Environment:**
    - Create a new file named `.env.local` (do not commit this file)
    - Fill in all values:
    ```env
    # Frontend (from Firebase Console → Project Settings → Web App)
    VITE_FIREBASE_API_KEY=your_api_key_here
    VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
    
    # Backend - Gemini AI (from Google AI Studio)
    GEMINI_API_KEY=your_gemini_api_key_here

    # Optional
    GEMINI_MODEL=gemini-3-flash-preview
    ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
    
    # Backend - Firebase Admin (from Service Account JSON)
    FIREBASE_PROJECT_ID=your_project_id
    FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
    FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour_Key_Here\n-----END PRIVATE KEY-----\n"
    ```
    
    > **Important:** The `FIREBASE_PRIVATE_KEY` must include the quotes and `\n` for line breaks. If you get a JSON parse error, your private key is missing line breaks. Do NOT remove the `\n` characters.
    
    > **Warning:** Never upload `.env.local` or private keys to GitHub.

7.  **Run the app:**
    ```bash
    vercel dev
    ```
    The app will open at `http://localhost:3000`

    > **Windows Users:** If you encounter errors with Vercel CLI, try running commands in **Git Bash** instead of PowerShell.

## Customization

### AI Persona & Prompts
Customize how the AI responds by editing `src/config/aiPrompts.js`:
*   **Personas:** Modify the `highSchool`, `college`, or `jobSeeker` prompts to change the tone or focus.
*   **Structure:** The `getBasePromptStructure` function defines the JSON schema returned by the AI.

### Theming
The application uses CSS variables for easy theming. Open `src/index.css` to change the color palette:
*   `--primary-bg`: Main background color
*   `--accent-primary`: Primary accent color (purple by default)
*   `--btn-primary`: Primary button color

## Deployment (Vercel)

This project is optimized for **Vercel** deployment with serverless functions.

1.  **Push your code to GitHub/GitLab/Bitbucket**

2.  **Import project into Vercel:**
    - Go to [vercel.com](https://vercel.com)
    - Click "Add New Project"
    - Import your repository

3.  **Configure Environment Variables:**
    - Go to Vercel Dashboard → Settings → Environment Variables
    - Copy each variable from `.env.local` and add them **one by one**
    - Do NOT upload the file itself
    - **Click "Redeploy"** after adding all variables to apply changes
    
    Add ALL these variables (11 total):
    ```
    # Frontend
    VITE_FIREBASE_API_KEY
    VITE_FIREBASE_AUTH_DOMAIN
    VITE_FIREBASE_PROJECT_ID
    VITE_FIREBASE_STORAGE_BUCKET
    VITE_FIREBASE_MESSAGING_SENDER_ID
    VITE_FIREBASE_APP_ID
    VITE_FIREBASE_MEASUREMENT_ID
    
    # Backend
    GEMINI_API_KEY
    GEMINI_MODEL
    ALLOWED_ORIGINS
    FIREBASE_PROJECT_ID
    FIREBASE_CLIENT_EMAIL
    FIREBASE_PRIVATE_KEY
    ```

4.  **Deploy!**

> **Important:** The `vercel.json` file includes SPA rewrite rules for proper routing. Do not delete it!

## Security Features

This application follows security best practices:
*   **Firestore Security Rules:** Users can only read/write their own data (`/profiles/{userId}`)
*   **Environment Variables:** API keys are never exposed to the client
*   **Serverless Backend:** Gemini API key is kept secure in Vercel Functions (`api/analyze.js`)
*   **Firebase Authentication:** Secure Google & Email/Password authentication

> **Important:** Do NOT commit your Firebase service account JSON or any `.env` files to GitHub. Always store sensitive keys ONLY in:
> - `.env.local` (local machine only)
> - Vercel Environment Variables (production)

## Project Structure

```
careerGuide/
├── api/                  # Vercel Serverless Functions
│   └── analyze.js        # Backend API for Gemini AI
├── src/
│   ├── components/       # Reusable UI components
│   ├── config/           # Configuration (AI Prompts)
│   ├── data/             # Static data (Skills database)
│   ├── firebase/         # Firebase configuration
│   ├── pages/            # Main pages (Home, Assessment, Profile, etc.)
│   └── Services/         # Frontend API services
├── Documentation/        # Full setup guide (index.html)
├── .env.example          # Environment variable template
├── vercel.json           # Vercel deployment config
└── package.json          # Project dependencies
```

## Common Fixes

*   **PRIVATE_KEY parse error:** Your private key is missing `\n` characters. Do not remove them when copying.
*   **Firebase auth error:** Ensure **Google** and **Email/Password** providers are enabled in Firebase Console.
*   **App shows blank page:** Check if `VITE_FIREBASE_PROJECT_ID` and other frontend variables are correct.
*   **AI not generating:** Ensure `GEMINI_API_KEY` is added to Vercel Environment Variables (Backend).

## License

This project is available under **CodeCanyon's Regular or Extended License**.

### What You Can Do:
- Use in **one** end product (Regular License) or **multiple** end products (Extended License)
- Modify and customize the code for your needs
- Use in projects for paying clients
- Use in SaaS products (Extended License required)

### What You Cannot Do:
- Resell or redistribute the source code as a standalone product
- Share the source code publicly or with unlicensed users
- Claim the code as your own original work

For full license details, visit [CodeCanyon Licensing](https://codecanyon.net/licenses/standard).

### Support & Updates:
- Setup documentation provided above
- Bug fixes and updates via CodeCanyon
- Contact author through CodeCanyon for technical support

---

**Developed by Banshal Kumar Yadav**  
Copyright © 2025. All rights reserved.

