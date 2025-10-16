import React, { useState } from "react";
import {
	ArrowLeft,
	ChevronDown,
	ChevronRight,
	Terminal,
	CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";

const Bubble = ({ role = "user", children }) => {
	const isUser = role === "user";
	return (
		<div className={`mb-4 flex w-full ${isUser ? "justify-start" : "justify-end"}`}>
			<div
				className={`w-full max-w-3xl rounded-2xl border p-4 shadow-sm ${
					isUser
						? "bg-white border-gray-200 dark:bg-gray-800/80 dark:border-gray-700"
						: "bg-indigo-50 border-indigo-200 dark:bg-indigo-900/40 dark:border-indigo-700"
				}`}>
				<div className="mb-2 flex items-center gap-2">
					<span
						className={`rounded-full px-2 py-0.5 text-xs ${
							isUser
								? "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
								: "bg-indigo-100 text-indigo-700 dark:bg-indigo-800 dark:text-indigo-200"
						}`}>
						{isUser ? "You" : "Assistant"}
					</span>
				</div>
				<div
					className={`prose prose-sm max-w-none ${isUser ? "" : "font-[450]"} dark:prose-invert`}>
					{children}
				</div>
			</div>
		</div>
	);
};

const Collapsible = ({ title, children }) => {
	const [open, setOpen] = useState(false);
	return (
		<div className="mt-3 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
			<button
				type="button"
				onClick={() => setOpen((value) => !value)}
				className="flex w-full items-center justify-between bg-gray-50 px-4 py-3 text-left transition hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800">
				<span className="text-sm font-medium">{title}</span>
				{open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
			</button>
			{open && <div className="px-4 py-3 text-sm">{children}</div>}
		</div>
	);
};

const StepCard = ({ idx, user, assistant, details }) => (
	<div className="mb-10">
		<div className="mb-3 flex items-center gap-2">
			<div className="grid h-6 w-6 place-items-center rounded-full bg-indigo-600 text-xs font-semibold text-white">
				{idx}
			</div>
			<h3 className="text-base font-semibold">Step {idx}</h3>
		</div>
		<Bubble role="user">{user}</Bubble>
		<Bubble role="assistant">
			{assistant}
			{details?.map((detail, index) => (
				<Collapsible key={index} title={detail.title}>
					{detail.content}
				</Collapsible>
			))}
		</Bubble>
	</div>
);

export default function HowToPage() {
	const steps = [
		{
			user: <>How do I confirm Node & npm on a Mac and scaffold a Vite + React (JS only) project?</>,
			assistant: (
				<>
					First install Visual Studio Code. Then we will verify versions, then generate a
					JSX-only Vite template and run it to confirm dev server works.
				</>
			),
			details: [
				{
					title: "Commands (verify + scaffold + run)",
					content: (
						<pre className="overflow-auto text-xs">
{`All Command Lines on VS code need to be separate, use ^ + ~ on keyboard to activate terminal
node -v
npm -v

# Create project in current folder
npm create vite@latest 

This part is a big confusing, watch on the board.

cd [name of your folder]
npm install
npm run dev  # open shown localhost URL`}
						</pre>
					),
				},
			],
		},
		{
			user: <>How do I add and configure TailwindCSS for Vite + React?</>,
			assistant: (
				<>
					Install Tailwind and initialize config. Import Tailwind layers in <code>index.css</code>.
				</>
			),
			details: [
				{
					title: "Commands & config (Tailwind)",
					content: (
						<pre className="overflow-auto text-xs">
{`npm install tailwindcss @tailwindcss/vite

Then follow these instructions
https://tailwindcss.com/docs/installation/using-vite`}
						</pre>
					),
				},
			],
		},
		{
			user: <>What minimum files do I need and what are they for?</>,
			assistant: (
				<>
					Keep <code>index.html</code>, <code>src/main.jsx</code>, <code>src/App.jsx</code>,
					and <code>src/index.css</code>. Remove the rest.
				</>
			),
			details: [
				{
					title: "Purpose of each",
					content: (
						<ul className="ml-5 list-disc">
							<li>
								<b>index.html</b> – single HTML shell; Vite injects your bundle.
							</li>
							<li>
								<b>main.jsx</b> – bootstraps React and mounts <code>&lt;App /&gt;</code>.
							</li>
							<li>
								<b>App.jsx</b> – your UI root; routes or sections live here.
							</li>
							<li>
								<b>index.css</b> – Tailwind layers and global tweaks.
							</li>
						</ul>
					),
				},
			],
		},
		{
			user: <>Can you give me a paste-ready prompt to generate a single-file <code>App.jsx</code> for my purpose?</>,
			assistant: <>Here’s a template that forces the LLM to output a complete, paste-ready file.</>,
			details: [
				{
					title: "Copy-ready prompt",
					content: (
						<pre className="overflow-auto text-xs">
{`Write a complete, contemporary single-file React component named App.jsx for Vite.
Constraints:
- JSX only (no TS), TailwindCSS classes for styling.
- Self-contained: imports only 'react' and 'react-router-dom' (if needed).
- Includes a prominent CTA button linking to '/howto'.
Purpose:
- [Describe your app purpose in 1–2 lines here].
Output: A single code block containing only the App.jsx code.`}
						</pre>
					),
				},
			],
		},
		{
			user: <>List all npm packages the generated app needs and provide the exact install CLI.</>,
			assistant: (
				<>
					The LLM should enumerate packages (e.g., <code>react-router-dom</code>, any UI libs) with
					an install line you can paste.
				</>
			),
			details: [
				{
					title: "Example",
					content: <pre className="overflow-auto text-xs">{`npm install react-router-dom`}</pre>,
				},
			],
		},
		{
			user: <>How do I test locally?</>,
			assistant: <>Run the dev server and open the shown URL. Fix any console errors, then refresh.</>,
			details: [
				{
					title: "Command",
					content: <pre className="overflow-auto text-xs">{`npm run dev`}</pre>,
				},
			],
		},
		{
			user: <>How do I create a GitHub account and repo?</>,
			assistant: <>Create a GitHub account, new repo (Public or Private). Copy the repo URL for the next step.</>,
		},
		{
			user: <>How do I initialize Git locally and push? Also what do <code>-u</code>, <code>add</code>, <code>commit</code>, <code>push</code> do?</>,
			assistant: (
				<>
					Initialize, stage, commit, and push. <code>-u</code> sets upstream so future{" "}
					<code>git push</code> works without extra args.
				</>
			),
			details: [
				{
					title: "Commands",
					content: (
						<pre className="overflow-auto text-xs">
{`git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main  # -u links local 'main' to remote 'origin/main'`}
						</pre>
					),
				},
			],
		},
		{
			user: <>How do I deploy with Vercel from GitHub?</>,
			assistant: (
				<>
					Create a Vercel account, “Add New Project”, import your GitHub repo, accept defaults for Vite,
					deploy.
				</>
			),
		},
		{
			user: <>How do I confirm my site is live and auto-deploys on push?</>,
			assistant: (
				<>
					Open your Vercel URL. Commit and push a change; watch Vercel build and redeploy.{" "}
					<span className="inline-flex items-center gap-1">
						<CheckCircle2 className="h-4 w-4" />
						Done.
					</span>
				</>
			),
		},
	];

	return (
		<div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
			<div className="mx-auto max-w-5xl px-4 py-6 md:py-10">
				<div className="mb-6 flex items-center justify-between">
					<Link
						to="/"
						className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:underline dark:text-indigo-400">
						<ArrowLeft className="h-4 w-4" /> Back
					</Link>
					<div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
						<Terminal className="h-4 w-4" /> How to Build a Website (Prompt-Driven)
					</div>
				</div>

				<header className="mb-8">
					<h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
						Prompt-Driven Website Build Guide
					</h1>
					<p className="mt-2 text-gray-600 dark:text-gray-300">
						Learn the purpose of each step, then expand details when you need exact commands or
						copy-ready prompts.
					</p>
				</header>

				<section className="mb-8 space-y-2">
					<div className="rounded-xl border border-indigo-200 bg-indigo-50 p-3 text-sm dark:border-indigo-800 dark:bg-indigo-900/30">
						Tip: Ask your LLM one step at a time, paste outputs into your project, and test
						frequently.
					</div>
				</section>

				<main>
					{steps.map((step, index) => (
						<StepCard
							key={index}
							idx={index + 1}
							user={step.user}
							assistant={step.assistant}
							details={step.details}
						/>
					))}
				</main>
			</div>
		</div>
	);
}
