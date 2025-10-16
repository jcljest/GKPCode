// src/pages/Venv.jsx
import React from "react";
import { Terminal, Folder, Package, Shield } from "lucide-react";

export default function VenvPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Python <span className="text-indigo-600 dark:text-indigo-400">Virtual Environments</span>
          </h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
            A virtual environment (venv) is a self-contained Python “mini-install” inside your project folder.
            It keeps packages isolated so different projects don’t collide—and you don’t need admin rights.
          </p>
        </header>

        {/* Visual model */}
        <section className="mb-12">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Folder className="w-6 h-6" /> How it looks on disk
            </h2>
            <pre className="text-sm bg-white dark:bg-gray-950 rounded-xl p-4 overflow-auto border border-gray-200 dark:border-gray-800">
{String.raw`CookingSimV2/
├─ .venv/                           ← project-only Python
│  ├─ bin/ (python, pip, activate)  ← executables used when “activated”
│  └─ lib/python3.x/site-packages/  ← your packages (pygame, etc.)
├─ .python-version                  ← (optional) pyenv bookmark for 3.12.x
├─ src/ …                           ← your code
└─ assets/ …`}
            </pre>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              <strong>Activate</strong> swaps your Terminal’s PATH to use <code>.venv/bin/python</code> and
              <code>.venv/bin/pip</code>. Deactivate returns you to normal.
            </p>
          </div>
        </section>

        {/* Why it matters */}
        <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5" /> Why use a venv?
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
              <li>No admin rights needed—installs live in your project.</li>
              <li>Projects don’t break each other’s versions.</li>
              <li>Easy to reproduce with <code>requirements.txt</code>.</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-2">
              <Package className="w-5 h-5" /> What goes inside?
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
              <li>Your project’s Python interpreter &amp; pip.</li>
              <li>Installed libraries (e.g., <code>pygame</code>, <code>jsonschema</code>).</li>
              <li>Scripts/entry points for those libraries.</li>
            </ul>
          </div>
        </section>

        {/* Quick start snippets */}
        <section className="mb-12">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Terminal className="w-6 h-6" /> Quick Start (no admin)
            </h2>
            <ol className="list-decimal pl-5 space-y-4 text-gray-800 dark:text-gray-200">
              <li>
                <strong>(Optional) pyenv for local Python</strong>
                <pre className="mt-2 text-sm bg-white dark:bg-gray-950 rounded-xl p-4 overflow-auto border border-gray-200 dark:border-gray-800">
{String.raw`git clone https://github.com/pyenv/pyenv.git ~/.pyenv
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.zprofile
echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.zprofile
echo 'eval "$(pyenv init -)"' >> ~/.zprofile
exec zsh -l
pyenv install 3.12.6
pyenv local 3.12.6`}
                </pre>
              </li>
              <li>
                <strong>Create &amp; activate your venv</strong>
                <pre className="mt-2 text-sm bg-white dark:bg-gray-950 rounded-xl p-4 overflow-auto border border-gray-200 dark:border-gray-800">
{String.raw`python -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip`}
                </pre>
              </li>
              <li>
                <strong>Install project packages</strong>
                <pre className="mt-2 text-sm bg-white dark:bg-gray-950 rounded-xl p-4 overflow-auto border border-gray-200 dark:border-gray-800">
{String.raw`python -m pip install pygame pyyaml jsonschema injector typing_extensions
# dev tools (optional)
python -m pip install pytest pytest-mock ruff black mypy watchdog rich`}
                </pre>
              </li>
              <li>
                <strong>Test Pygame</strong>
                <pre className="mt-2 text-sm bg-white dark:bg-gray-950 rounded-xl p-4 overflow-auto border border-gray-200 dark:border-gray-800">
{String.raw`python -m pygame.examples.aliens`}
                </pre>
              </li>
            </ol>
          </div>
        </section>

        {/* Tips */}
        <section>
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-bold mb-3">Pro Tips</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Always run <code>source .venv/bin/activate</code> before development.</li>
              <li>Use <code>python -m pip …</code> to guarantee you’re using the venv’s pip.</li>
              <li>Freeze dependencies for collaborators:
                <pre className="mt-2 text-sm bg-gray-50 dark:bg-gray-950 rounded-xl p-3 overflow-auto border border-gray-200 dark:border-gray-800">
{String.raw`pip freeze > requirements.txt
pip install -r requirements.txt`}
                </pre>
              </li>
              <li>Leave the venv with <code>deactivate</code>.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
