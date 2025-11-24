// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import App from "./App.jsx";
import HowTo from "./pages/HowTo.jsx";
import Venv from "./pages/Venv.jsx";
import GitHubNotes from "./pages/GitHubNotes.jsx";
import LocalEnvPage from "./pages/LocalEnvPage.jsx";
import "./index.css";
<<<<<<< HEAD
import DynamicEulerNetwork from "./pages/DynamicEulerNetwork.jsx";
=======
import QuestLesson1 from "./pages/QuestLesson1.jsx";
>>>>>>> c0cfd3eceeb4b79fb993c345b5bdb56edab89592

function RootLayout() {
	const [isDarkMode, setIsDarkMode] = React.useState(() => {
		return localStorage.getItem("theme") === "dark";
	});

	React.useEffect(() => {
		const root = document.documentElement;
		if (isDarkMode) {
			root.classList.add("dark");
			localStorage.setItem("theme", "dark");
		} else {
			root.classList.remove("dark");
			localStorage.setItem("theme", "light");
		}
	}, [isDarkMode]);

	const toggleDarkMode = () => setIsDarkMode((d) => !d);

	const navItems = [
		{ id: "home", label: "Home", type: "route", to: "/" },
<<<<<<< HEAD
		{ id: "howto", label: "How To", type: "route", to: "/howto" },
		{ id: "venv", label: "Venv", type: "route", to: "/venv" },
		{
			id: "git-notes",
			label: "GitHub Notes",
			type: "route",
			to: "/github-notes",
		},
		 { id: "local-env", label: "Local Env", type: "route", to: "/local-env" },
		 { id: "AI-Node", label: "AI Node", type: "route", to: "/ai-node" },
=======
    { id: "howto", label: "How To", type: "route", to: "/howto" },
    { id: "venv", label: "Venv", type: "route", to: "/venv" },
    { id: "git-notes", label: "GitHub Notes", type: "route", to: "/github-notes" },
    { id: "unity-vr", label: "Unity VR", type: "route", to: "/unity-vr" },   // ✅ match route below
    { id: "local-env", label: "Local Env", type: "route", to: "/local-env" }, // ✅ normalized
>>>>>>> c0cfd3eceeb4b79fb993c345b5bdb56edab89592
	];

	return (
		<div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-500">
			<Navbar
				items={navItems}
				isDarkMode={isDarkMode}
				onToggleTheme={toggleDarkMode}
			/>
			<div className="pt-16">
				<Outlet />
			</div>
		</div>
	);
}

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
<<<<<<< HEAD
				<Route element={<RootLayout />}>
					<Route index element={<App />} />
					<Route path="howto" element={<HowTo />} />
					<Route path="venv" element={<Venv />} />
					<Route path="github-notes" element={<GitHubNotes />} />
					<Route path="Local-Env" element={<LocalEnvPage />} />
					<Route path="ai-node" element={<DynamicEulerNetwork />} />

				</Route>
			</Routes>
=======
  <Route element={<RootLayout />}>
    <Route index element={<App />} />
    <Route path="howto" element={<HowTo />} />
    <Route path="venv" element={<Venv />} />
    <Route path="github-notes" element={<GitHubNotes />} />
    <Route path="local-env" element={<LocalEnvPage />} />        {/* ✅ fixed */}
    <Route path="unity-vr" element={<QuestLesson1 />} />         {/* ✅ new page */}
  </Route>
</Routes>
>>>>>>> c0cfd3eceeb4b79fb993c345b5bdb56edab89592
		</BrowserRouter>
	</React.StrictMode>
);
