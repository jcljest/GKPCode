import React from "react";
import { useLocation } from "react-router-dom";

/** --- Edit these to grow your notes --- */
const sections = [
  {
    id: "overview",
    title: "Overview",
    content: (
      <>
        <p className="mb-4">
          A pragmatic, reproducible Python setup for local development. Use
          <code className="mx-1 px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-800">pyenv</code>
          to pick an interpreter, then isolate project deps with
          <code className="mx-1 px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-800">venv</code>.
        </p>
        <ul className="list-disc ml-5 space-y-2">
          <li>Install interpreter with pyenv</li>
          <li>Pin version per project (<code>.python-version</code>)</li>
          <li>Create & activate <code>venv/</code></li>
          <li><code>pip install -e .</code> for editable packages</li>
        </ul>
      </>
    ),
  },
  {
    id: "pyenv",
    title: "Install & Pin Python (pyenv)",
    content: (
      <>
        <pre className="overflow-auto rounded-lg p-4 bg-gray-900 text-gray-100 text-sm">
{`# user-space install (no admin)
curl https://pyenv.run | bash

# add to ~/.zshrc
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init --path)"
eval "$(pyenv init -)"

# install & pin a version for this project
pyenv install 3.12.6
pyenv local 3.12.6
python -V   # expect 3.12.6`}
        </pre>
        <p className="mt-3 text-sm text-gray-500">
          Tip: If the terminal “freezes” during build, press <kbd>Ctrl</kbd>+<kbd>Q</kbd> to resume
          output; use <code>top</code> to verify CPU is active.
        </p>
      </>
    ),
  },
  {
    id: "venv",
    title: "Create & Use a Virtual Environment",
    content: (
      <>
        <pre className="overflow-auto rounded-lg p-4 bg-gray-900 text-gray-100 text-sm">
{`python -m venv venv
source venv/bin/activate
python -m pip install -U pip setuptools wheel

# when done
deactivate`}
        </pre>
        <p className="mt-3">
          Inside <code>(venv)</code>, <code>python</code> and <code>pip</code> refer to your isolated
          environment—safe to install project deps.
        </p>
      </>
    ),
  },
  {
    id: "editable",
    title: "Editable Install (local packages)",
    content: (
      <>
        <pre className="overflow-auto rounded-lg p-4 bg-gray-900 text-gray-100 text-sm">
{`# at project root with a valid pyproject.toml
python -m pip install -e .
# or include dev tools
python -m pip install -e ".[dev]"`}
        </pre>
        <p className="mt-3">
          <code>-e .</code> symlinks your source so edits reflect instantly without reinstalling.
        </p>
      </>
    ),
  },
  {
    id: "pygame",
    title: "Pygame Notes (Fonts & Init)",
    content: (
      <>
        <pre className="overflow-auto rounded-lg p-4 bg-gray-900 text-gray-100 text-sm">
{`import pygame

pygame.init()                 # initialize modules (incl. font)
screen = pygame.display.set_mode((1280, 720))

# safer default font than SysFont("arial", 24)
font = pygame.font.Font(None, 24)`}
        </pre>
        <p className="mt-3">
          If you see <em>“font not initialized”</em>, call <code>pygame.init()</code> (or
          <code>pygame.font.init()</code>) before creating text widgets.
        </p>
      </>
    ),
  },
  {
    id: "vscode",
    title: "VS Code Interpreter Selection",
    content: (
      <>
        <ol className="list-decimal ml-5 space-y-2">
          <li>Open Command Palette → <strong>Python: Select Interpreter</strong></li>
          <li>Pick <code>…/your-project/venv/bin/python</code></li>
          <li>Reload window so Pylance resolves packages (e.g., <code>pygame</code>)</li>
        </ol>
      </>
    ),
  },
];

function useHashScroll() {
  const { hash } = useLocation();
  React.useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [hash]);
}

export default function LocalEnvPage() {
  useHashScroll();

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* TOC */}
          <aside className="lg:col-span-3">
            <div className="sticky top-20 space-y-2">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-3">
                On this page
              </h2>
              <nav className="flex flex-col gap-2">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="px-3 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <main className="lg:col-span-9 space-y-8">
            <header className="mb-4">
              <h1 className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">
                Local Environment Notes
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Everything you need to set up a clean, reproducible Python dev environment.
              </p>
            </header>

            {sections.map((s) => (
              <section
                id={s.id}
                key={s.id}
                className="scroll-mt-24 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200/60 dark:border-gray-800/60"
              >
                <h2 className="text-2xl font-semibold mb-3 text-indigo-600 dark:text-indigo-400">
                  {s.title}
                </h2>
                <div className="prose prose-indigo dark:prose-invert max-w-none">
                  {s.content}
                </div>
              </section>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}
