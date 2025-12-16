// src/pages/Venv.jsx
import React from "react";
import { Terminal, Folder, Package, Shield, CheckCircle } from "lucide-react";

export default function VenvPage() {
	return (
		<div className="min-h-screen pt-24 pb-16 bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

				{/* Header */}
				<header className="space-y-4">
					<h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
						Python{" "}
						<span className="text-indigo-600 dark:text-indigo-400">
							Virtual Environments
						</span>
					</h1>
					<p className="text-lg text-gray-600 dark:text-gray-400">
						A virtual environment (venv) is a project-local Python workspace.
						It isolates packages, avoids admin permissions, and makes projects
						reproducible.
					</p>
				</header>

				{/* Conceptual framing */}
				<section className="space-y-4">
					<h2 className="text-2xl font-bold">What a venv actually is</h2>
					<p>
						A venv is not a new copy of Python. It is a controlled environment
						that points to a specific Python interpreter and redirects where
						packages are installed.
					</p>
					<p>
						This means each project can depend on its own library versions
						without interfering with other projects or the system Python.
					</p>
				</section>

				{/* Visual model */}
				<section>
					<div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
						<h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
							<Folder className="w-6 h-6" /> How it looks on disk
						</h2>
						<pre className="text-sm bg-white dark:bg-gray-950 rounded-xl p-4 overflow-auto border border-gray-200 dark:border-gray-800">
{String.raw`CookingSimV2/
├─ .venv/                           ← project-only environment
│  ├─ bin/ (python, pip, activate)  ← executables used when activated
│  └─ lib/python3.x/site-packages/  ← installed packages
├─ .python-version                  ← optional pyenv version pin
├─ src/
└─ assets/`}
						</pre>
						<p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
							Activation temporarily swaps your terminal PATH so commands use
							<code> .venv/bin/python</code> and <code>pip</code>.
						</p>
					</div>
				</section>

				{/* Why it matters */}
				<section className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
						<h3 className="text-xl font-bold flex items-center gap-2 mb-2">
							<Shield className="w-5 h-5" /> Why use a venv?
						</h3>
						<ul className="list-disc pl-5 space-y-1">
							<li>No admin rights required.</li>
							<li>Projects do not break each other.</li>
							<li>Dependencies are reproducible.</li>
						</ul>
					</div>
					<div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
						<h3 className="text-xl font-bold flex items-center gap-2 mb-2">
							<Package className="w-5 h-5" /> What goes inside?
						</h3>
						<ul className="list-disc pl-5 space-y-1">
							<li>A fixed Python interpreter reference.</li>
							<li>Installed libraries for this project.</li>
							<li>Entry scripts for those libraries.</li>
						</ul>
					</div>
				</section>

				{/* Python version importance */}
				<section className="space-y-4">
					<h2 className="text-2xl font-bold">Why Python version choice matters</h2>
					<p>
						A venv permanently binds to the Python executable used when it is
						created. If that Python is unstable, inaccessible, or removed,
						the environment can silently fail.
					</p>
					<p>
						Best practice is to use a stable Python version you can run directly,
						typically Python 3.11 or 3.12.
					</p>
				</section>

				{/* Quick start */}
				<section>
					<div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
						<h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
							<Terminal className="w-6 h-6" /> Quick Start
						</h2>
						<ol className="list-decimal pl-5 space-y-4">
							<li>
								<strong>Create and activate</strong>
								<pre className="mt-2 text-sm bg-white dark:bg-gray-950 rounded-xl p-4 overflow-auto border border-gray-200 dark:border-gray-800">
{String.raw`python -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip`}
								</pre>
							</li>
							<li>
								<strong>Install packages</strong>
								<pre className="mt-2 text-sm bg-white dark:bg-gray-950 rounded-xl p-4 overflow-auto border border-gray-200 dark:border-gray-800">
{String.raw`python -m pip install pygame`}
								</pre>
							</li>
							<li>
								<strong>Test</strong>
								<pre className="mt-2 text-sm bg-white dark:bg-gray-950 rounded-xl p-4 overflow-auto border border-gray-200 dark:border-gray-800">
{String.raw`python -m pygame.examples.aliens`}
								</pre>
							</li>
						</ol>
					</div>
				</section>

				{/* Verification */}
				<section className="space-y-4">
					<h2 className="text-2xl font-bold flex items-center gap-2">
						<CheckCircle className="w-6 h-6" /> Verify your venv
					</h2>
					<p>After activation, always confirm Python is coming from the venv.</p>
					<pre className="text-sm bg-gray-100 dark:bg-gray-950 rounded-xl p-4 overflow-auto border border-gray-200 dark:border-gray-800">
{String.raw`which python
python --version
python -c "import sys; print(sys.executable)"`}
					</pre>
					<p className="text-sm text-gray-600 dark:text-gray-400">
						All paths should point inside <code>.venv</code>.
					</p>
				</section>

				{/* README */}
				<section className="space-y-4">
					<h2 className="text-2xl font-bold">Minimum README</h2>
					<p>
						A README documents how to run the project correctly for future you
						and collaborators.
					</p>
					<pre className="text-sm bg-gray-100 dark:bg-gray-950 rounded-xl p-4 overflow-auto border border-gray-200 dark:border-gray-800">
{String.raw`# Project Name

## Python Version
Python 3.11.x

## Setup
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

## Run
python main.py`}
					</pre>
				</section>

			</div>
		</div>
	);
}
