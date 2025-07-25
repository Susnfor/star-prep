# Star Prep - AI Interview Practice Platform

A realistic interview simulation platform that helps you practise behavioural interviews with AI-powered feedback. Built to replicate the HireVue experience with video recording, timed responses, and detailed performance analysis.

**Live Demo:** [Demo](https://star-prep.vercel.app/)

## Screenshots

See below for examples of Star Prep in action:

![Setup Screen](https://github.com/user-attachments/assets/8c842fd6-216e-4dba-90f9-152e21de67ee)
*Setup screen: Select job type and configure timing preferences.*

![Recording Interface](https://github.com/user-attachments/assets/db5048e0-3826-4691-83df-822a896f48a0)
*Recording interface: Live interview simulation with webcam and timer.*

![Summary Page](https://github.com/user-attachments/assets/50c591f5-2a9b-4323-9b4b-8f94b2537d9c)
*Summary page: Complete overview of interview performance.*

![AI Feedback Analysis](https://github.com/user-attachments/assets/3d39fb96-23b4-4c5f-a7cd-d8ffa7de4122)
*AI feedback analysis: Detailed response evaluation and improvement suggestions.*

![AI Feedback Details](https://github.com/user-attachments/assets/c7e6f547-50c1-4757-97ab-dc19399c396c)
*AI feedback details: STAR method analysis and performance metrics.*

## What It Does

Star Prep simulates real interview conditions by recording your responses to behavioural questions and providing AI-generated feedback. You get timed preparation periods, video recording with webcam feed, and detailed analysis of your answers using the STAR method framework.

Key features:
- Video interview simulation with live recording
- AI feedback analysis with STAR method evaluation  
- Filler word detection and speaking pace metrics
- Question-by-question performance breakdown
- **Video download** for personal review and sharing
- **Privacy-first design** - no recordings stored on servers
- Professional interview environment with Material-UI design

## Tech Stack

**Frontend:** Next.js 14, React 18, Material-UI 5  
**Backend:** Next.js API Routes (full-stack without database by design)  
**Recording:** WebRTC MediaRecorder API, Web Speech API  
**AI:** Google Gemini API with secure server-side integration  
**Deployment:** Vercel with automatic deployments

## Getting Started

### Prerequisites
- Node.js 18 or higher
- A Google Gemini API key

### Setup

1. Clone the repository:
```bash
git clone https://github.com/Susnfor/star-prep.git
cd star-prep
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your Gemini API key:
```bash
GEMINI_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Getting a Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a new API key
3. Copy it to your `.env.local` file

## How It Works

The app guides you through a complete interview simulation:

1. **Setup**: Choose job type and configure timing preferences
2. **Questions**: Practise with curated behavioural questions or AI-generated ones
3. **Recording**: Webcam records your responses with prep time and answer phases
4. **Analysis**: AI evaluates responses using STAR framework and provides detailed feedback
5. **Review**: View performance metrics, download recordings for personal review, and track improvement

All recordings remain completely local for privacy - nothing is stored on external servers.

## Architecture & Design Philosophy

**Privacy-First Approach:** Star Prep intentionally operates without user accounts or data persistence. While this means we can't track long-term progress or improvement metrics, it ensures complete user privacy and builds trust - especially important when users are sharing personal interview responses.

**Video Download Feature:** Since no data is stored, the video download functionality ensures users can still take something valuable away from each session. They can review their responses later, share them with mentors, or build their own personal improvement tracking system.

**Trade-offs:** This architecture puts user privacy and trust over features like progress tracking or personalised recommendations. For an interview practice platform handling sensitive personal content, this felt like the right balance.

## Technical Implementation

### Video Recording System
Built a custom VideoRecorder class that handles MediaRecorder lifecycle, stream management, and automatic cleanup. The component uses React's key prop for reliable remounting when sessions restart.

### State Management  
Uses React Context with custom hooks (useRecording, useTranscription) to manage complex interview session state. The controller pattern centralises all session logic and actions.

### AI Integration
Built as a full-stack application with two separate API routes for better code organisation and maintainability. The `/api/generateQuestions` and `/api/userFeedback` endpoints handle different aspects of AI communication, keeping the Gemini API key secure on the server side. Intentionally designed without a database to ensure complete user privacy - no personal data or recordings are ever stored.

## Challenges & Solutions

Throughout development, I faced and overcame several technical and product challenges:

- **UI/UX Consistency:** Refactored the entire interface to use Material-UI, ensuring a professional and cohesive look across all screens. Reduced code duplication by over 200 lines with a shared layout component.
- **Session & State Management:** Adopted a controller (MVC) pattern and React Context to centralise session logic, making the app easier to maintain and extend.
- **Timer & Recording Reliability:** Solved tricky issues with timer synchronisation and webcam state, using React's key prop to guarantee fresh video sessions and prevent black camera bugs.
- **Prompt Engineering:** Iterated on Gemini API prompts to get high-quality, actionable feedback. Learned how to structure requests for best results.
- **Error Management & Fallback Logic:** Built robust error handling for video recording, session state, and API calls. When the Gemini AI service was unavailable, I developed a fallback system for question generation so users always have questions to practise, ensuring a smooth and reliable experience.

**Impact & Value:**
The solutions and improvements above made Star Prep robust, user-friendly, and ready for real-world use in asynchronous interview preparation. Every feature is designed to deliver a reliable, private, and effective experience for graduate students and early-career professionals who want to practise and improve their interview skills in a realistic, self-paced environment.

## Project Structure
```
app/
├── components/
│   ├── session/          # Interview recording and controls
│   ├── interview/        # Setup and configuration
│   ├── feedback/         # AI analysis display
│   ├── summary/          # Performance dashboard
│   └── ui/              # Reusable components
├── context/             # React state management
├── lib/                 # Core utilities and classes
└── api/                 # Backend API routes
    ├── generateQuestions/    # AI question generation endpoint
    └── userFeedback/         # AI feedback analysis endpoint
```

## Future Enhancements

### Technical Improvements
- **Audio analysis** for speaking pace, volume, and clarity metrics
- **Mobile-responsive** video recording for practice on any device
- **Progressive Web App** features for offline question practice

### User Experience
- **Progress tracking** across multiple sessions with performance trends
- **Industry-specific** question banks (tech, finance, consulting, etc.)
- **Custom question** upload and practice with personal scenarios

### Advanced AI Features
- **CV-based question generation** tailored to specific job applications
- **Body language analysis** using computer vision for non-verbal feedback
- **Sentiment analysis** to detect confidence levels and emotional tone
- **Personalised coaching** recommendations based on performance patterns

### Integration & Scaling
- **Job board integration** to practice with real job requirements
- **Calendar scheduling** for structured practice routines
- **Multi-language support** for global accessibility


## Building for Production

```bash
npm run build
npm start
```


