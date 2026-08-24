# 🎓 EDU AI

> An AI-powered learning platform designed to help students learn smarter, understand complex topics, and turn their study materials into interactive learning experiences.

EDU AI is an intelligent student learning platform that combines AI tutoring, document analysis, summarization, quiz generation, and study management into one simple workspace.

Students can ask EDU AI questions, upload their study materials, generate summaries, and create quizzes based on their uploaded content.

---

## ✨ Features

### 🤖 AI Tutor

Ask questions about any topic and receive AI-generated explanations designed to support learning.

- Ask academic questions
- Get clear explanations
- Continue conversations with the AI
- Use AI as a personalized study assistant

### 📄 Document Analysis

Upload your study materials and let EDU AI process them.

Supported file types:

- PDF
- DOCX
- PPTX

Students can use their uploaded materials to:

- Understand difficult content
- Generate summaries
- Extract important points
- Prepare for examinations

### 📝 AI Summarization

Turn long study materials into concise and understandable notes.

EDU AI can help students identify:

- Key concepts
- Important definitions
- Main ideas
- Important sections
- Revision points

### 🧠 AI Quiz Generator

Generate quizzes directly from uploaded study materials.

Students can generate quizzes containing:

- Multiple-choice questions
- Questions based on the uploaded document
- Answers and explanations
- Different difficulty levels

This allows students to test their understanding instead of simply reading their materials.

### 📊 Study Progress

Track your learning activity and monitor your study progress.

Future progress features may include:

- Quiz performance
- Study activity
- Learning streaks
- Topics studied
- Accuracy statistics
- Personalized learning insights

### 📚 Learning Library

Keep your study resources organized in one place.

Students can manage:

- Uploaded documents
- Generated summaries
- Saved materials
- Quiz history
- Recent activities

### 🌙 Dark Mode

EDU AI supports both light and dark themes for a comfortable learning experience.

---

# 🛠️ Tech Stack

## Frontend

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **Lucide React**
- **next/font**

## AI

The AI layer is designed to support:

- Question answering
- Document summarization
- Quiz generation
- Personalized learning assistance

## Planned Backend

The platform can be extended with:

- Node.js
- NestJS / Express
- PostgreSQL
- REST API
- JWT authentication
- AI API integration
- File storage

---

# 📁 Project Structure

```text
edu-ai/
│
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── signup/
│   │
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   ├── ai-tutor/
│   │   ├── document/
│   │   ├── quiz/
│   │   ├── progress/
│   │   ├── saved/
│   │   ├── activity/
│   │   ├── settings/
│   │   └── help/
│   │
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── dashboard/
│   │   ├── sidebar/
│   │   │   ├── sidebar.tsx
│   │   │   ├── sidebarItem.tsx
│   │   │   └── sidebar_data.ts
│   │   │
│   │   ├── topbar.tsx
│   │   └── dashboardShell.tsx
│   │
│   ├── ui/
│   │   └── ...
│   │
│   └── ...
│
├── lib/
│   ├── utils.ts
│   └── ...
│
├── public/
│   ├── logo.png
│   └── ...
│
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
