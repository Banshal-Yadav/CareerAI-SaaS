# AI Career Guide - Intelligent Career Roadmap Generator

A modern, AI-powered application that helps users discover their ideal career path based on their skills and interests. Built with React, Vite, Firebase, and Google Gemini AI.

## 🧩 Features

*   **AI-Powered Assessment:** Uses Google Gemini to analyze user skills and interests, providing a personalized career roadmap.
*   **Interactive Career Exploration:** "Chip-based" interface to explore various tech and creative careers.
*   **Detailed Career Insights:** View salary ranges, job outlooks, and required skills for specific roles.
*   **Actionable Plans:** Generates specific project ideas, course recommendations, and certification paths.
*   **Resume Builder:** Integrated tool to help users craft a resume based on their new career path.
*   **Responsive Design:** Fully optimized for desktop and mobile devices.

## 🛠️ Tech Stack

*   **Frontend:** React 18, Vite
*   **Styling:** CSS3 with CSS Variables (Theming supported)
*   **AI Integration:** Google Gemini API (`@google/generative-ai`)
*   **Backend:** Vercel Serverless Functions (Node.js)
*   **Auth & Database:** Firebase (Authentication, Firestore)
*   **Icons:** Lucide React

## 📦 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Banshal-Yadav/CareerAI-SaaS.git
    cd careerGuide
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Install Vercel CLI (Global):**
    Required to run the serverless functions locally.
    ```bash
    npm install -g vercel
    ```

4.  **Environment Configuration:**
    Create a `.env` file in the root directory.

    **Client-Side Keys (Vite):**
    ```env
    VITE_FIREBASE_API_KEY=your_api_key_here
    VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    ```

    **Server-Side Keys (Vercel):**
    *Note: For local development, you can add this to `.env`. For production, add it to your Vercel Project Settings.*
    ```env
    GEMINI_API_KEY=your_gemini_api_key_here
    ```

5.  **Run the development server:**
    Use `vercel dev` to start both the frontend and the backend API.
    ```bash
    vercel dev
    ```
    The app will be available at `http://localhost:3000`.

## 🎨 Customization

### AI Persona & Prompts
You can customize how the AI responds (its "personality") by editing `src/config/aiPrompts.js`.
*   **Personas:** Modify the `highSchool`, `college`, or `jobSeeker` prompts to change the tone or focus of the advice.
*   **Structure:** The `getBasePromptStructure` function defines the JSON schema expected from the AI.

### Theming
The application uses CSS variables for easy theming. Open `src/index.css` to change the color palette.

**Key Variables:**
*   `--primary-bg`: Main background color.
*   `--accent-primary`: Primary accent color (used for highlights).
*   `--btn-primary`: Primary button color.

## 🚀 Deployment

This project is optimized for deployment on **Vercel**.

1.  **Push to GitHub/GitLab/Bitbucket.**
2.  **Import project into Vercel.**
3.  **Configure Environment Variables:**
    *   Add `GEMINI_API_KEY` (The one used in `api/analyze.js`).
    *   Add all `VITE_FIREBASE_...` keys.
4.  **Deploy.**

## 📂 Project Structure

```
api/                 # Vercel Serverless Functions
  analyze.js         # Backend API for Gemini
src/
  assets/            # Images and static assets
  components/        # Reusable UI components (Assessment, Profile, etc.)
  config/            # Configuration files (AI Prompts)
  data/              # Static data (Skills database, dummy data)
  firebase/          # Firebase configuration
  hooks/             # Custom React hooks
  Services/          # Frontend API services
  ...
```

## 📄 License

This project is available under **CodeCanyon's Regular or Extended License**.

### What You Can Do:
- ✅ Use in **one** end product (Regular License) or **multiple** end products (Extended License)
- ✅ Modify and customize the code for your needs
- ✅ Use in projects for paying clients
- ✅ Use in SaaS products (Extended License required)

### What You Cannot Do:
- ❌ Resell or redistribute the source code as a standalone product
- ❌ Share the source code publicly or with unlicensed users
- ❌ Claim the code as your own original work

For full license details, visit [CodeCanyon Licensing](https://codecanyon.net/licenses/standard).

### Support & Updates:
- Setup documentation provided above
- Bug fixes and updates via CodeCanyon
- Contact author through CodeCanyon for technical support

---

**Developed by Banshal Kumar Yadav**  
Copyright © 2025. All rights reserved.

