// src/HowTo.jsx
import React, { useState } from "react";
import { ArrowLeft, ChevronDown, ChevronRight, Terminal, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const Bubble = ({ role = "user", children }) => {
  const isUser = role === "user";
  return (
    <div className={`w-full flex ${isUser ? "justify-start" : "justify-end"} mb-4`}>
      <div
        className={`max-w-3xl w-full rounded-2xl border shadow-sm p-4
          ${isUser
            ? "bg-white border-gray-200 dark:bg-gray-800/80 dark:border-gray-700"
            : "bg-indigo-50 border-indigo-200 dark:bg-indigo-900/40 dark:border-indigo-700"
          }`}
      >
        <div className="flex items-center gap-2 mb-2">
          <span
            className={`text-xs px-2 py-0.5 rounded-full
              ${isUser
                ? "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                : "bg-indigo-100 text-indigo-700 dark:bg-indigo-800 dark:text-indigo-200"
              }`}
          >
            {isUser ? "You" : "Assistant"}
          </span>
        </div>
        <div className={`prose prose-sm dark:prose-invert max-w-none ${isUser ? "" : "font-[450]"}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

const Collapsible = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-3 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-left
                   bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      >
        <span className="text-sm font-medium">{title}</span>
        {open ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>
      {open && <div className="px-4 py-3 text-sm">{children}</div>}
    </div>
  );
};

const StepCard = ({ idx, user, assistant, details }) => (
  <div className="mb-10">
    <div className="flex items-center gap-2 mb-3">
      <div className="w-6 h-6 rounded-full bg-indigo-600 text-white grid place-items-center text-xs font-semibold">{idx}</div>
      <h3 className="text-base font-semibold">Step {idx}</h3>
    </div>
    <Bubble role="user">{user}</Bubble>
    <Bubble role="assistant">
      {assistant}
      {details?.map((d, i) => (
        <Collapsible key={i} title={d.title}>
          {d.content}
        </Collapsible>
      ))}
    </Bubble>
  </div>
);

export default function HowTo() {
  const steps = [
    {
      user: <>How do I confirm Node & npm on a Mac and scaffold a Vite + React (JS only) project?</>,
      assistant: <>You’ll verify versions, then generate a JSX-only Vite template and run it to confirm dev server works.</>,
      details: [
        {
          title: "Commands (verify + scaffold + run)",
          content: (
            <pre className="text-xs overflow-auto">
{`node -v
npm -v

# Create project in current folder (or replace my-app)
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev  # open shown localhost URL`}
            </pre>
          )
        }
      ]
    },
    {
      user: <>How do I add and configure TailwindCSS for Vite + React?</>,
      assistant: <>Install Tailwind and initialize config. Import Tailwind layers in <code>index.css</code>.</>,
      details: [
        {
          title: "Commands & config (Tailwind)",
          content: (
            <pre className="text-xs overflow-auto">
{`npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { extend: {} },
  plugins: [],
}

# src/index.css (ensure you import this in main.jsx)
@tailwind base;
@tailwind components;
@tailwind utilities;`}
            </pre>
          )
        }
      ]
    },
    {
      user: <>What minimum files do I need and what are they for?</>,
      assistant: <>Keep <code>index.html</code>, <code>src/main.jsx</code>, <code>src/App.jsx</code>, and <code>src/index.css</code>. Remove the rest.</>,
      details: [
        {
          title: "Purpose of each",
          content: (
            <ul className="list-disc ml-5">
              <li><b>index.html</b> – single HTML shell; Vite injects your bundle.</li>
              <li><b>main.jsx</b> – bootstraps React and mounts <code>&lt;App /&gt;</code>.</li>
              <li><b>App.jsx</b> – your UI root; routes or sections live here.</li>
              <li><b>index.css</b> – Tailwind layers and global tweaks.</li>
            </ul>
          )
        }
      ]
    },
    {
      user: <>Can you give me a paste-ready prompt to generate a single-file <code>App.jsx</code> for my purpose?</>,
      assistant: <>Here’s a template that forces the LLM to output a complete, paste-ready file.</>,
      details: [
        {
          title: "Copy-ready prompt",
          content: (
            <pre className="text-xs overflow-auto">
{`Write a complete, contemporary single-file React component named App.jsx for Vite.
Constraints:
- JSX only (no TS), TailwindCSS classes for styling.
- Self-contained: imports only 'react' and 'react-router-dom' (if needed).
- Includes a prominent CTA button linking to '/howto'.
Purpose:
- [Describe your app purpose in 1–2 lines here].
Output: A single code block containing only the App.jsx code.`}
            </pre>
          )
        }
      ]
    },
    {
      user: <>List all npm packages the generated app needs and provide the exact install CLI.</>,
      assistant: <>The LLM should enumerate packages (e.g., <code>react-router-dom</code>, any UI libs) with an install line you can paste.</>,
      details: [
        {
          title: "Example",
          content: <pre className="text-xs overflow-auto">{`npm install react-router-dom`}</pre>
        }
      ]
    },
    {
      user: <>How do I test locally?</>,
      assistant: <>Run the dev server and open the shown URL. Fix any console errors, then refresh.</>,
      details: [
        { title: "Command", content: <pre className="text-xs overflow-auto">{`npm run dev`}</pre> }
      ]
    },
    {
      user: <>How do I create a GitHub account and repo?</>,
      assistant: <>Create a GitHub account, new repo (Public or Private). Copy the repo URL for the next step.</>,
    },
    {
      user: <>How do I initialize Git locally and push? Also what do <code>-u</code>, <code>add</code>, <code>commit</code>, <code>push</code> do?</>,
      assistant: <>Initialize, stage, commit, and push. <code>-u</code> sets upstream so future <code>git push</code> works without extra args.</>,
      details: [
        {
          title: "Commands",
          content: (
            <pre className="text-xs overflow-auto">
{`git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main  # -u links local 'main' to remote 'origin/main'`}
            </pre>
          )
        }
      ]
    },
    {
      user: <>How do I deploy with Vercel from GitHub?</>,
      assistant: <>Create a Vercel account, “Add New Project”, import your GitHub repo, accept defaults for Vite, deploy.</>,
    },
    {
      user: <>How do I confirm my site is live and auto-deploys on push?</>,
      assistant: <>Open your Vercel URL. Commit and push a change; watch Vercel build and redeploy. <span className="inline-flex items-center gap-1"><CheckCircle2 className="w-4 h-4" />Done.</span></>,
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-6 md:py-10">
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
            <Terminal className="w-4 h-4" /> How to Build a Website (Prompt-Driven)
          </div>
        </div>

        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Prompt-Driven Website Build Guide
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Learn the purpose of each step, then expand details when you need exact commands or copy-ready prompts.
          </p>
        </header>

        <section className="space-y-2 mb-8">
          <div className="p-3 rounded-xl border border-indigo-200 bg-indigo-50 dark:border-indigo-800 dark:bg-indigo-900/30 text-sm">
            Tip: Ask your LLM one step at a time, paste outputs into your project, and test frequently.
          </div>
        </section>

        <main>
          {steps.map((s, i) => (
            <StepCard key={i} idx={i + 1} user={s.user} assistant={s.assistant} details={s.details} />
          ))}
        </main>
      </div>
    </div>
  );
}
