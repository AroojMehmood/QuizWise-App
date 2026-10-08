# 🧠 QuizWise

**QuizWise** is an AI-powered study companion that helps you understand topics and test your knowledge — built with React and Google's Gemini API.

🔗 **Live App:** [quizwise-psi.vercel.app](https://quizwise-psi.vercel.app)

---

## What It Does

QuizWise turns your notes or any topic into two things:

- **Clear Explanations** — Paste your notes or type a topic, and get a simple, well-structured explanation in plain language.
- **Custom Quizzes** — Generate a 15-question multiple-choice quiz on any topic or from your own notes, answer questions one at a time, and get instant feedback.

On top of that, it tracks your learning over time:

- **🔥 Streaks** — See how many consecutive days you've studied.
- **📌 Spaced Repetition** — After each quiz, rate how well you knew the material (Hard / Medium / Easy). QuizWise schedules your next review automatically — sooner for topics you found hard, later for ones you knew well — and reminds you on the Dashboard.

## Why It's Useful

Most study tools either explain things or test you — rarely both, and rarely with a system for *when* to come back to a topic. QuizWise combines explanation, testing, and a lightweight spaced-repetition system in one place, so revision actually follows a plan instead of random re-reading.

## How to Use It

1. **Home** — Paste your notes or type a topic name, hit *Explain*, and read a clear breakdown.
2. **Quiz** — Paste notes or a topic name, hit *Generate Quiz*, and answer 15 questions one at a time. At the end, rate the quiz (Hard/Medium/Easy) to schedule your next review.
3. **Dashboard** — Check your streak, your quiz history, and which topics are due for review.

## Tech Stack

- **React** + **Vite** — frontend
- **React Router v7** — routing
- **Google Gemini API** — AI-generated explanations and quizzes
- **Vercel Serverless Functions** — keeps the API key secure on the backend
- **localStorage** — stores quiz history, streaks, and review schedule
- Plain CSS — custom dark theme, glassmorphism, and animated gradients (no UI framework)

## Running Locally

```bash
git clone https://github.com/AroojMehmood/QuizWise-App.git
cd QuizWise-App
npm install
```

Create a `.env` file in the root with:
```
GEMINI_API_KEY=your_key_here
```

Then run with the Vercel CLI (required for the serverless API route to work locally):
```bash
vercel dev
```

## Author

Built by **Arooj Mehmood** as a portfolio project.