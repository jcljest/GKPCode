// src/pages/QuestLesson1.jsx
import React from "react";
import { BookOpen, List, Wrench, Rocket, HelpCircle, Smartphone, Usb, Box, Settings2, Bug } from "lucide-react";

const TocLink = ({ href, children }) => (
  <a
    href={href}
    className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900"
  >
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

export default function QuestLesson1() {
  const sections = [
    { id: "overview", label: "Overview" },
    { id: "setup", label: "Lesson 0 — One‑time Setup" },
    { id: "project", label: "Create Project (URP)" },
    { id: "xr", label: "XR Plugin & Player Settings" },
    { id: "scene", label: "Build the Minimal XR Scene" },
    { id: "build-run", label: "Build & Run to Quest" },
    { id: "troubleshoot", label: "Troubleshooting" },
    { id: "exit-ticket", label: "Exit Ticket + Extensions" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* TOC */}
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
              Meta Quest — Lesson 0 (Setup) + Lesson 1 (Hello Cube)
            </h1>
            <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
              Fastest path from a blank Unity 2022.3 URP project to seeing a cube in‑headset. Designed for classroom flow and repeatability.
            </p>
          </header>

          <section id="overview" className="space-y-3">
            <h2 className="text-2xl font-bold">Overview</h2>
            <p>
              Sequence for Unit 1: (0) one‑time machine & headset setup → (1) show an object in VR → (2) make it interactable → (3) add behaviors & polish.
            </p>
            <div className="grid sm:grid-cols-3 gap-3 text-sm">
              <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-3">Target: <strong>Meta Quest 2/3/Pro</strong></div>
              <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-3">Engine: <strong>Unity 2022.3 LTS (URP)</strong></div>
              <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-3">Goal today: <strong>Cube at (0,0,2)</strong></div>
            </div>
          </section>

          <section id="setup" className="space-y-3">
            <h2 className="text-2xl font-bold">Lesson 0 — One‑time Setup</h2>
            <Callout icon={Wrench} title="Install toolchain">
              <ul className="list-disc pl-6 space-y-1">
                <li>Install <strong>Unity 2022.3 LTS</strong> with <em>Android Build Support (SDK/NDK + OpenJDK)</em> via Unity Hub.</li>
                <li>On your phone: Meta Quest app → <em>Devices → Developer Mode → On</em>; reboot headset once.</li>
                <li>Use a reliable USB‑C cable. First connect shows an in‑headset prompt: <em>Allow USB debugging</em> → check <em>Always allow</em> → Allow.</li>
              </ul>
            </Callout>
            <div className="grid sm:grid-cols-2 gap-3">
              <Callout icon={Smartphone} title="Developer Mode tip">
                If you don’t see Developer Mode, create a free developer org at <em>developer.oculus.com</em>, then re‑open the app.
              </Callout>
              <Callout icon={Usb} title="ADB sanity check (optional)">
                In a terminal, run <code className="font-mono">adb devices</code>. Your Quest should appear as a single device ID.
              </Callout>
            </div>
          </section>

          <section id="project" className="space-y-3">
            <h2 className="text-2xl font-bold">Create Project (URP)</h2>
            <ol className="list-decimal pl-6 space-y-1">
              <li>Unity Hub → <strong>New</strong> → Template: <strong>Universal 3D (URP)</strong>.</li>
              <li><strong>Switch platform to Android:</strong> File → Build Settings → Android → <em>Switch Platform</em>.</li>
            </ol>
            <Callout icon={Settings2} title="Why URP?">
              URP is optimized for mobile XR (tile‑based GPUs), supports Multiview, foveated rendering, and modern XR features.
            </Callout>
          </section>

          <section id="xr" className="space-y-3">
            <h2 className="text-2xl font-bold">XR Plugin & Player Settings</h2>
            <ol className="list-decimal pl-6 space-y-1">
              <li>Edit → Project Settings → <strong>XR Plugin Management</strong> → install if prompted.</li>
              <li>Android tab → enable <strong>Oculus</strong> (fastest path). *(OpenXR also works; add the Oculus interaction profile.)*</li>
              <li>Project Settings → <strong>Player</strong> (Android):
                <ul className="list-disc pl-6 mt-1 space-y-1">
                  <li><strong>Scripting Backend:</strong> IL2CPP</li>
                  <li><strong>Target Architectures:</strong> ARM64</li>
                  <li><strong>Minimum API:</strong> Android 10 (API 29)+</li>
                  <li><strong>Color Space:</strong> Linear</li>
                  <li><strong>Graphics API:</strong> Vulkan (GLES3 as fallback if needed)</li>
                  <li><strong>XR → Oculus:</strong> Stereo Rendering Mode = <em>Multiview</em></li>
                </ul>
              </li>
              <li>Project Settings → <strong>Quality (Android)</strong>: MSAA 4×; keep post‑processing off for now.</li>
            </ol>
          </section>

          <section id="scene" className="space-y-3">
            <h2 className="text-2xl font-bold">Build the Minimal XR Scene</h2>
            <ol className="list-decimal pl-6 space-y-1">
              <li>Create a new scene → save as <code className="font-mono">Main.unity</code>.</li>
              <li>Delete the default <strong>Main Camera</strong> (not XR‑aware).</li>
              <li>GameObject → XR → <strong>XR Origin (Action‑based)</strong> (this adds an XR‑ready camera).</li>
              <li>Add a visible target: GameObject → 3D Object → <strong>Cube</strong>.
                <ul className="list-disc pl-6 mt-1 space-y-1">
                  <li><strong>Position:</strong> (0, 0, 2.0) — two meters in front of the headset.</li>
                  <li><strong>Scale:</strong> (0.4, 0.4, 0.4)</li>
                </ul>
              </li>
              <li>Add lighting: GameObject → Light → <strong>Directional Light</strong> (Intensity ≈ 1, shadows off for now).</li>
            </ol>
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-4 font-mono text-sm">
              Camera preview sanity: select the XR camera (child of XR Origin) and look at the preview — you should see the cube centered.
            </div>
            <Callout icon={Box} title="Optional clarity">
              Create a bright material and assign it to the cube. Add a Plane at y = −1 as a floor to improve depth cues.
            </Callout>
          </section>

          <section id="build-run" className="space-y-3">
            <h2 className="text-2xl font-bold">Build & Run to Quest</h2>
            <ol className="list-decimal pl-6 space-y-1">
              <li>File → Build Settings → <strong>Add Open Scenes</strong> (ensure <em>Main</em> is listed).</li>
              <li>Connect the headset (Developer Mode ON) and accept <em>USB debugging</em> in‑headset.</li>
              <li>Click <strong>Build And Run</strong>. The APK will compile, install, and auto‑launch on the headset.</li>
            </ol>
            <Callout icon={Rocket} title="Success criteria">
              In‑headset you appear in a blank space with a cube directly ahead, stable and sharp (MSAA 4×, Render Scale 1.0).
            </Callout>
          </section>

          <section id="troubleshoot" className="space-y-3">
            <h2 className="text-2xl font-bold">Troubleshooting</h2>
            <div className="overflow-auto rounded-2xl border border-gray-200 dark:border-gray-800">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="text-left p-3">Symptom</th>
                    <th className="text-left p-3">Fix</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  <tr>
                    <td className="p-3">Black screen on launch</td>
                    <td className="p-3">Player → Color Space = Linear; XR → Multiview; disable heavy post effects.</td>
                  </tr>
                  <tr>
                    <td className="p-3">Build fails (SDK/NDK/Gradle)</td>
                    <td className="p-3">Re‑install Android modules in Unity Hub (Editor → Add modules).</td>
                  </tr>
                  <tr>
                    <td className="p-3">Headset not detected</td>
                    <td className="p-3">Re‑plug USB‑C; accept USB debugging; run <code className="font-mono">adb devices</code>.</td>
                  </tr>
                  <tr>
                    <td className="p-3">Scene loads but no cube</td>
                    <td className="p-3">Ensure you deleted the legacy Main Camera and used XR Origin; cube at (0,0,2).</td>
                  </tr>
                  <tr>
                    <td className="p-3">Extremely blurry</td>
                    <td className="p-3">Quality (Android) MSAA = 4×; URP Render Scale = 1.0; avoid TAA/FXAA for now.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Callout icon={Bug} title="Pro tip">
              Keep a tiny test scene just like this to verify headset + toolchain before opening big projects.
            </Callout>
          </section>

          <section id="exit-ticket" className="space-y-3">
            <h2 className="text-2xl font-bold">Exit Ticket + Extensions</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Exit ticket:</strong> Which Player/XR setting was critical and why? (Expected: Android switch, XR provider, Multiview.)</li>
              <li><strong>Fast finisher:</strong> Replace cube with 3D TextMeshPro \"Hello Quest\".</li>
              <li><strong>Stretch:</strong> Add a floor plane and adjust cube to (0, −0.2, 1.5) to test comfort.</li>
            </ul>
          </section>

          <div className="pt-4">
            <a href="#top" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">Back to top</a>
          </div>
        </main>
      </div>
    </div>
  );
}
