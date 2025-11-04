// src/pages/GitHubNotes.jsx
import React from "react";
import { BookOpen, List, GitBranch, Bot, HelpCircle } from "lucide-react";

const TocLink = ({ href, children }) => (
	<a
		href={href}
		className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900">
		{children}
	</a>
);

const Callout = ({ icon: Icon = HelpCircle, title, children }) => (
	<div className="rounded-2xl border border-indigo-200/60 dark:border-indigo-900/60 bg-indigo-50/50 dark:bg-indigo-900/20 p-4">
		<div className="flex items-center gap-2 font-semibold mb-2">
			<Icon className="w-4 h-4" />
			<span>{title}</span>
		</div>
		<div className="text-sm text-gray-700 dark:text-gray-300">{children}</div>
	</div>
);

export default function GitHubNotes() {
	const sections = [
		{ id: "what-is-github", label: "1. What is GitHub?" },
		{ id: "why", label: "2. Why do developers use it?" },
		{ id: "core-idea", label: "3. The Core Idea of Git" },
		{ id: "fits-in", label: "4. How GitHub Fits In" },
		{ id: "commands", label: "5. Basic Commands (Plain English)" },
		{ id: "human-side", label: "6. The Human Side" },
		{ id: "workflow", label: "7. Healthy Beginner Workflow" },
		{ id: "grow", label: "8. When You’re Ready to Grow" },
		{ id: "purpose", label: "9. The Real Purpose" },
		{ id: "branching-deep-dive", label: "10. Branching Deep Dive" },
		{ id: "tips", label: "Pro Tip for Learners" },
	];

	return (
		<div className="min-h-screen pt-24 pb-16 bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
				{/* TOC (sticky on large screens) */}
				<aside className="lg:col-span-3">
					<div className="lg:sticky lg:top-24 rounded-2xl border border-gray-200 dark:border-gray-800">
						<div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 dark:border-gray-800">
							<List className="w-4 h-4" />
							<h2 className="text-sm font-semibold">Table of Contents</h2>
						</div>
						<nav className="p-2">
							{sections.map((s) => (
								<TocLink key={s.id} href={`#${s.id}`}>
									{s.label}
								</TocLink>
							))}
						</nav>
					</div>
				</aside>

				{/* Content */}
				<main className="lg:col-span-9 space-y-10">
					<header className="mb-2">
						<h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight flex items-center gap-3">
							<BookOpen className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
							GitHub Notes — Plain English Reference
						</h1>
						<p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
							Start with the <em>why</em>, then the <em>what</em>, then the{" "}
							<em>how</em>. Use this as a quick reference and a launchpad for
							deeper questions.
						</p>
					</header>

					<section id="what-is-github" className="space-y-3">
						<h2 className="text-2xl font-bold">1. What is GitHub?</h2>
						<p>
							<strong>Git</strong> is a version control system — it records a
							timeline of your files. <strong>GitHub</strong> is the cloud place
							that hosts that timeline so you can back it up, share, and
							collaborate.
						</p>
						<Callout icon={Bot} title="Ask an LLM">
							“Explain how GitHub and Git are different using a cooking recipe
							analogy.”
						</Callout>
					</section>

					<section id="why" className="space-y-3">
						<h2 className="text-2xl font-bold">2. Why do developers use it?</h2>
						<ul className="list-disc pl-6 space-y-1">
							<li>
								Never lose work — every meaningful save is a <em>commit</em>.
							</li>
							<li>
								Collaborate safely — merge changes instead of overwriting.
							</li>
							<li>
								Experiment without fear — use <em>branches</em> as sandboxes.
							</li>
							<li>
								Publish and learn from others — explore open-source projects.
							</li>
						</ul>
						<Callout icon={Bot} title="Ask an LLM">
							“How does version control help in collaborative student projects?”
						</Callout>
					</section>

					<section id="core-idea" className="space-y-3">
						<h2 className="text-2xl font-bold">3. The Core Idea of Git</h2>
						<p>
							Git is a <strong>time machine for your folder</strong>. Each{" "}
							<em>commit</em> is a snapshot. You can compare, revert, and branch
							into parallel timelines.
						</p>
						<ul className="grid sm:grid-cols-2 gap-3">
							<li className="rounded-xl border border-gray-200 dark:border-gray-800 p-3">
								<strong>Repository:</strong> the folder tracked by Git.
							</li>
							<li className="rounded-xl border border-gray-200 dark:border-gray-800 p-3">
								<strong>Commit:</strong> a saved snapshot with a message.
							</li>
							<li className="rounded-xl border border-gray-200 dark:border-gray-800 p-3">
								<strong>Branch:</strong> separate line of development.
							</li>
							<li className="rounded-xl border border-gray-200 dark:border-gray-800 p-3">
								<strong>Merge:</strong> combine one branch into another.
							</li>
						</ul>
					</section>

					<section id="fits-in" className="space-y-3">
						<h2 className="text-2xl font-bold">4. How GitHub Fits In</h2>
						<p>
							Locally you have Git; remotely, GitHub hosts the same history. You
							connect them via <em>push</em> (upload) and <em>pull</em>{" "}
							(download).
						</p>
						<div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-4 font-mono text-sm">
							{String.raw`[Your Computer]  <-- push/pull -->  [GitHub Cloud]`}
						</div>
						<Callout icon={Bot} title="Ask an LLM">
							“What’s the difference between a local repo and a remote repo?
							Show a simple diagram.”
						</Callout>
					</section>

					<section id="commands" className="space-y-3">
						<h2 className="text-2xl font-bold">
							5. Basic Commands (Plain English)
						</h2>
						<div className="overflow-auto rounded-2xl border border-gray-200 dark:border-gray-800">
							<table className="min-w-full text-sm">
								<thead className="bg-gray-50 dark:bg-gray-900">
									<tr>
										<th className="text-left p-3">Goal</th>
										<th className="text-left p-3">Command</th>
										<th className="text-left p-3">Meaning</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200 dark:divide-gray-800">
									<tr>
										<td className="p-3">Start tracking this folder</td>
										<td className="p-3 font-mono">git init</td>
										<td className="p-3">“Start version control here.”</td>
									</tr>
									<tr>
										<td className="p-3">Save current changes</td>
										<td className="p-3 font-mono">
											git add . && git commit -m "message"
										</td>
										<td className="p-3">“Remember this version.”</td>
									</tr>
									<tr>
										<td className="p-3">Create a new branch</td>
										<td className="p-3 font-mono">
											git checkout -b new-feature
										</td>
										<td className="p-3">“Start a new idea safely.”</td>
									</tr>
									<tr>
										<td className="p-3">Upload to GitHub</td>
										<td className="p-3 font-mono">
											git push -u origin new-feature
										</td>
										<td className="p-3">“Send my branch to the cloud.”</td>
									</tr>
									<tr>
										<td className="p-3">Merge a branch</td>
										<td className="p-3 font-mono">git merge new-feature</td>
										<td className="p-3">“Combine my new idea back in.”</td>
									</tr>
									<tr>
										<td className="p-3">Get latest from GitHub</td>
										<td className="p-3 font-mono">git pull</td>
										<td className="p-3">“Bring down the newest updates.”</td>
									</tr>
								</tbody>
							</table>
						</div>
					</section>

					<section id="human-side" className="space-y-3">
						<h2 className="text-2xl font-bold">6. The Human Side</h2>
						<p>
							GitHub supports how people really work: independent changes,
							review before merge, and a recoverable history.
						</p>
						<Callout icon={Bot} title="Ask an LLM">
							“What are good commit message habits? How do teams review pull
							requests?”
						</Callout>
					</section>

					<section id="workflow" className="space-y-3">
						<h2 className="text-2xl font-bold">7. Healthy Beginner Workflow</h2>
						<div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-4 font-mono text-sm">
							{String.raw`git clone <repo-url>
git checkout -b experiment
# ...edit...
git add .
git commit -m "Experiment"
git push -u origin experiment`}
						</div>
					</section>

					<section id="grow" className="space-y-3">
						<h2 className="text-2xl font-bold">8. When You’re Ready to Grow</h2>
						<ul className="list-disc pl-6 space-y-1">
							<li>Pull Requests (PRs) & merge strategies</li>
							<li>Resolving merge conflicts</li>
							<li>Branch protection rules</li>
							<li>GitHub Actions (CI)</li>
							<li>Great READMEs and docs</li>
						</ul>
					</section>

					<section id="purpose" className="space-y-3">
						<h2 className="text-2xl font-bold">9. The Real Purpose</h2>
						<p>
							GitHub is more than storage — it’s a{" "}
							<strong>shared lab notebook</strong> with a rewind button. It
							helps you collaborate with clarity and build a visible record of
							growth.
						</p>
					</section>

					<section id="branching-deep-dive" className="space-y-3">
					<h2 className="text-2xl font-bold">10. Branching Deep Dive — The Real Power of Git</h2>
					<p>
						Branches let you create independent timelines of work. Each branch is just a label
						pointing to a commit — so you can test new ideas, fix bugs, or refactor without
						touching main.
					</p>

					<ul className="list-disc pl-6 space-y-1">
						<li><strong>Local vs Remote:</strong> Local branches live on your device; remote ones (like <code>origin/feature-x</code>) live on GitHub.</li>
						<li><strong>Tracking Branch:</strong> A local branch that “follows” a remote one. It lets you simply type <code>git pull</code> or <code>git push</code> without extra arguments.</li>
						<li><strong>Creating & Linking:</strong> <code>git switch -c feature-x origin/feature-x</code> or <code>git push -u origin feature-x</code> automatically sets up tracking.</li>
						<li><strong>Fetching vs Pulling:</strong> <code>git fetch</code> updates remote info but doesn’t change files; <code>git pull</code> brings remote commits into your current branch.</li>
						<li><strong>Merge vs Rebase:</strong> Merge preserves history with an extra commit; rebase rewrites your commits on top for a cleaner, linear timeline.</li>
						<li><strong>Pruning:</strong> <code>git fetch --prune</code> removes deleted remote branches locally — keeping your list clean.</li>
						<li><strong>Conflict Resolution:</strong> When Git can’t auto-merge, it marks conflicts with <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code> lines. Edit, remove markers, then <code>git add</code> and <code>git commit</code>.</li>
						<li><strong>Discarding Local Work:</strong> <code>git reset --hard origin/branch</code> makes your branch identical to GitHub’s version (use carefully).</li>
						<li><strong>Recovering Work:</strong> <code>git reflog</code> lists all recent states so you can restore lost commits.</li>
					</ul>

					<Callout icon={GitBranch} title="Command Summary">
						<div className="font-mono text-sm space-y-1">
						<div><code>git fetch --prune</code> → refresh and clean remote refs</div>
						<div><code>git pull --rebase</code> → update your branch linearly</div>
						<div><code>git push -u origin &lt;branch&gt;</code> → create + track remote branch</div>
						<div><code>git reset --hard origin/&lt;branch&gt;</code> → discard local commits</div>
						<div><code>git branch -vv</code> → show tracking info and sync status</div>
						</div>
					</Callout>

					<Callout icon={Bot} title="Ask an LLM">
						“What’s the difference between merging and rebasing in a visual timeline?”
					</Callout>
					</section>

					<section id="tips" className="space-y-3">
						<h2 className="text-2xl font-bold">Pro Tip for Learners</h2>
						<Callout icon={Bot} title="Ask an LLM">
							“Explain staging vs committing with a real-world analogy (like
							editing photos or cooking).”
						</Callout>
					</section>

					<div className="pt-4">
						<a
							href="#top"
							className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
							Back to top
						</a>
					</div>
				</main>
			</div>
		</div>
	);
}
