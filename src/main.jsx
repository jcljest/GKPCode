// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import App from "./App.jsx";
import HowTo from "./pages/HowTo.jsx";
import Venv from "./pages/Venv.jsx";
import GitHubNotes from "./pages/GitHubNotes.jsx";
import "./index.css";

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
		{ id: "howto", label: "How To", type: "route", to: "/howto" },
		{ id: "venv", label: "Venv", type: "route", to: "/venv" },
		{
			id: "git-notes",
			label: "GitHub Notes",
			type: "route",
			to: "/github-notes",
		},
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
				<Route element={<RootLayout />}>
					<Route index element={<App />} />
					<Route path="howto" element={<HowTo />} />
					<Route path="venv" element={<Venv />} />
					<Route path="github-notes" element={<GitHubNotes />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
