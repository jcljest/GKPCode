import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";  
import {
	Home,
	User,
	Code,
	Mail,
	Github,
	Linkedin,
	Sun,
	Moon,
	ExternalLink,
	Send,
	ArrowUpRight,
	CheckCircle,
	XCircle,
} from "lucide-react";
import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInAnonymously,
	signInWithCustomToken,
} from "firebase/auth";
import {
	getFirestore,
	collection,
	addDoc,
	serverTimestamp,
} from "firebase/firestore";
import "./index.css";

// --- CONFIG & UTILITIES ---

// 1. Firebase Environment Variables (MANDATORY USE)
const appId = typeof __app_id !== "undefined" ? __app_id : "default-app-id";
const firebaseConfig =
	typeof __firebase_config !== "undefined" ? JSON.parse(__firebase_config) : {};
const initialAuthToken =
	typeof __initial_auth_token !== "undefined" ? __initial_auth_token : null;

// 2. Mock Project Data
const PROJECTS = [
	{
		id: 1,
		title: "E-Commerce Platform Redesign",
		description:
			"A complete overhaul of an existing e-commerce platform focusing on mobile-first experience and performance optimization. Technologies: React, Redux, Tailwind CSS.",
		tech: ["React", "Tailwind", "Redux"],
		demoUrl: "#",
		repoUrl: "https://github.com/placeholder/ecommerce",
	},
	{
		id: 2,
		title: "AI-Powered Content Generator",
		description:
			"A web service utilizing the Gemini API to generate structured content from user prompts. Features token-based usage tracking. Technologies: Next.js, Gemini API, Firestore.",
		tech: ["Next.js", "Gemini API", "Firestore"],
		demoUrl: "#",
		repoUrl: "https://github.com/placeholder/ai-generator",
	},
	{
		id: 3,
		title: "Real-Time Chat Application",
		description:
			"A secure, real-time messaging application with private and group chat functionality. Technologies: Node.js, Socket.io, MongoDB.",
		tech: ["Node.js", "Socket.io", "MongoDB"],
		demoUrl: "#",
		repoUrl: "https://github.com/placeholder/chat-app",
	},
	{
		id: 4,
		title: "Data Visualization Dashboard",
		description:
			"An interactive dashboard for complex data analysis built using D3.js and TypeScript. Focus on accessibility and dynamic filtering.",
		tech: ["D3.js", "TypeScript", "Vite"],
		demoUrl: "#",
		repoUrl: "https://github.com/placeholder/data-viz",
	},
];

// --- FIREBASE INITIALIZATION & HANDLERS ---

let db = null;
let auth = null;

const FirebaseContext = React.createContext({
	db: null,
	auth: null,
	userId: null,
});

// Custom Hook for Firebase Setup
const useFirebase = () => {
	const [isAuthReady, setIsAuthReady] = useState(false);
	const [userId, setUserId] = useState(null);

	useEffect(() => {
		try {
			if (Object.keys(firebaseConfig).length === 0) {
				console.error(
					"Firebase config is missing or empty. Cannot initialize Firestore."
				);
				return;
			}

			const app = initializeApp(firebaseConfig);
			db = getFirestore(app);
			auth = getAuth(app);

			const authenticate = async () => {
				try {
					if (initialAuthToken) {
						const userCredential = await signInWithCustomToken(
							auth,
							initialAuthToken
						);
						setUserId(userCredential.user.uid);
					} else {
						const userCredential = await signInAnonymously(auth);
						setUserId(userCredential.user.uid);
					}
				} catch (error) {
					console.error("Firebase Authentication failed:", error);
					// Fallback to anonymous sign-in if custom token fails or is not provided
					const userCredential = await signInAnonymously(auth);
					setUserId(userCredential.user.uid);
				} finally {
					setIsAuthReady(true);
				}
			};
			authenticate();
		} catch (error) {
			console.error("Error initializing Firebase:", error);
			setIsAuthReady(true); // Still set ready to allow UI to load
		}
	}, []);

	return { db, auth, isAuthReady, userId };
};

// --- COMPONENTS ---

// 1. Dark Mode/Navbar Component
const Navbar = ({ isDarkMode, toggleDarkMode, activeSection }) => {
	const navItems = [
		{ id: "home", name: "Home", icon: Home, href: "#home" },
		{ id: "about", name: "About", icon: User, href: "#about" },
		
	];

	return (
		<header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 shadow-md transition-colors duration-500">
			<nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
				<a
					href="#home"
					className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition">
					GKP Coding
				</a>
				<div className="flex items-center space-x-4">
					<div className="hidden md:flex space-x-6">
						{navItems.map((item) => (
							<a
								key={item.id}
								href={item.href}
								className={`
                                    text-sm font-medium transition-colors duration-300 relative group
                                    ${
																			activeSection === item.id
																				? "text-indigo-600 dark:text-indigo-400"
																				: "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
																		}
                                `}>
								{item.name}
								<span
									className={`absolute bottom-0 left-0 h-0.5 w-full bg-indigo-600 dark:bg-indigo-400 
                                    transform scale-x-0 ${
																			activeSection === item.id
																				? "scale-x-100"
																				: "group-hover:scale-x-100"
																		} 
                                    transition-transform duration-300 ease-out`}></span>
							</a>
						))}
					</div>
					<button
						onClick={toggleDarkMode}
						aria-label="Toggle Dark Mode"
						className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300">
						{isDarkMode ? (
							<Sun className="w-5 h-5" />
						) : (
							<Moon className="w-5 h-5" />
						)}
					</button>
				</div>
			</nav>
		</header>
	);
};

// 2. Project Card Component
const ProjectCard = ({ project }) => (
	<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700/50 group">
		<div className="p-6">
			<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
				{project.title}
			</h3>
			<p className="text-sm text-gray-600 dark:text-gray-400 mb-4 h-12 overflow-hidden">
				{project.description}
			</p>
			<div className="flex flex-wrap gap-2 mb-4">
				{project.tech.map((tech, index) => (
					<span
						key={index}
						className="px-3 py-1 text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 rounded-full">
						{tech}
					</span>
				))}
			</div>
			<div className="flex space-x-4">
				<a
					href={project.demoUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 transition">
					Demo <ArrowUpRight className="w-4 h-4 ml-1" />
				</a>
				<a
					href={project.repoUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
					Repo <Github className="w-4 h-4 ml-1" />
				</a>
			</div>
		</div>
	</div>
);

// 3. Section Components
const HeroSection = () => (
	<section
		id="home"
		className="min-h-screen pt-16 flex items-center justify-center text-center px-4">
		<div className="max-w-4xl mx-auto">
			<p className="text-xl font-medium text-indigo-600 dark:text-indigo-400 mb-4 animate-fadeInUp">
				Hi, I'm Mr. Lai
			</p>
			<h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight mb-6 animate-fadeInUp delay-200">
				Lets Build{" "}
				<span className="text-indigo-600 dark:text-indigo-400">
					Modern Web Experiences
				</span>{" "}
				that scale.
			</h1>
			<p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto animate-fadeInUp delay-400">
				This is a quick tutorial on how to create a web page with modern
				frameworks.
			</p>
			<p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto animate-fadeInUp delay-400">
				DISCLAIMER: Your code will be terrible. Attend Part 2 to learn about
				proper software architecture and best practices.
			</p>
			<Link
  to="/howto"
  className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300 transform hover:scale-105 animate-fadeInUp delay-600"
>
  How to Build a Website
</Link>
		</div>
	</section>
);

const AboutSection = () => (
	<section id="about" 
	 className="flex flex-col md:flex-row items-center justify-center gap-10 px-6 md:px-12 py-16 bg-gray-50 dark:bg-gray-900">
		  {/* --- Left: Image --- */}
  <div className="flex-shrink-0">
    <img
  src="/your-photo.jpg"
  alt="Jeff Lai portrait"
  className="w-64 h-auto rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 object-contain bg-gray-100"
/>
  </div>
		
		<div className="max-w-7xl mx-auto">
			<h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
				About Me
			</h2>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
				<div className="lg:col-span-2 space-y-6 text-lg text-gray-700 dark:text-gray-300">
					<p>
						My journey in web development began with a fascination for
						how LLM models can help us create digital products for specific purposes.
						Over the years, explored a better understanding of contemporary
						front-end development frameworks and libraries 
						**React ecosystem** for building robust,
						single-page applications. My focus is helping you start that journey.
					</p>
					<p className="font-semibold text-indigo-600 dark:text-indigo-400">
						Let's connect and build something impactful together.
					</p>
				</div>
				<div className="lg:col-span-1 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
					<h3 className="text-2xl font-semibold flex justify-center text-gray-900 dark:text-white mb-4">
						Core Skills
					</h3>
					<div className="flex flex-wrap justify-center gap-3">
						{[
							"React.js",
							"Tailwind CSS",
							"Node.js",

						].map((skill) => (
							<span
								key={skill}
								className="px-4 py-1 text-sm font-medium bg-indigo-50 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200 rounded-full border border-indigo-200 dark:border-indigo-700 transition transform hover:scale-105">
								{skill}
							</span>
						))}
					</div>
				</div>
			</div>
		</div>
	</section>
);

const ProjectsSection = () => (
	<section id="projects" className="py-20 px-4">
		<div className="max-w-7xl mx-auto">
			<h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
				Featured Projects
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{PROJECTS.map((project) => (
					<ProjectCard key={project.id} project={project} />
				))}
			</div>
		</div>
	</section>
);

const ContactSection = () => {
	const { db, isAuthReady } = React.useContext(FirebaseContext);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [status, setStatus] = useState(null); // 'success', 'error', 'sending'

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!isAuthReady || !db) {
			console.error("Firestore not ready or not initialized.");
			setStatus("error");
			return;
		}

		setStatus("sending");

		// Simple validation
		if (!formData.name || !formData.email || !formData.message) {
			setStatus("error");
			return;
		}

		try {
			const path = `/artifacts/${appId}/public/data/contact_messages`;
			await addDoc(collection(db, path), {
				...formData,
				timestamp: serverTimestamp(),
			});
			setStatus("success");
			setFormData({ name: "", email: "", message: "" }); // Clear form
		} catch (error) {
			console.error("Error submitting contact message:", error);
			setStatus("error");
		} finally {
			setTimeout(() => setStatus(null), 5000); // Clear status message after 5 seconds
		}
	};

	const StatusMessage = ({ type, message }) => (
		<div
			className={`flex items-center p-3 rounded-lg text-sm mb-4 ${
				type === "success"
					? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
					: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
			}`}>
			{type === "success" ? (
				<CheckCircle className="w-5 h-5 mr-2" />
			) : (
				<XCircle className="w-5 h-5 mr-2" />
			)}
			{message}
		</div>
	);

	return (
		<section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900 px-4">
			<div className="max-w-3xl mx-auto">
				<h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
					Get In Touch
				</h2>

				{status === "success" && (
					<StatusMessage
						type="success"
						message="Message sent successfully! I will respond shortly."
					/>
				)}
				{status === "error" && (
					<StatusMessage
						type="error"
						message="Failed to send message. Please check the console for details."
					/>
				)}

				<form
					onSubmit={handleSubmit}
					className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl">
					<div>
						<label
							htmlFor="name"
							className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
							Your Name
						</label>
						<input
							type="text"
							name="name"
							id="name"
							required
							value={formData.name}
							onChange={handleChange}
							className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition duration-200"
						/>
					</div>

					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
							Email Address
						</label>
						<input
							type="email"
							name="email"
							id="email"
							required
							value={formData.email}
							onChange={handleChange}
							className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition duration-200"
						/>
					</div>

					<div>
						<label
							htmlFor="message"
							className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
							Message
						</label>
						<textarea
							name="message"
							id="message"
							rows="4"
							required
							value={formData.message}
							onChange={handleChange}
							className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition duration-200"></textarea>
					</div>

					<button
						type="submit"
						disabled={status === "sending" || !isAuthReady}
						className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.01]">
						{status === "sending" ? "Sending..." : "Send Message"}
						<Send className="w-4 h-4 ml-2" />
					</button>
					{!isAuthReady && (
						<p className="text-center text-xs text-red-500 dark:text-red-400 mt-2">
							Establishing secure connection... Please wait.
						</p>
					)}
				</form>
			</div>
		</section>
	);
};

const Footer = ({ userId }) => (
	<footer className="py-8 border-t border-gray-200 dark:border-gray-700/50">
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
			<div className="flex justify-center space-x-6 mb-4">
				<a
					href="https://github.com/jcljest"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="GitHub"
					className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
					<Github className="w-6 h-6" />
				</a>
				<a
					href="https://www.linkedin.com/in/jeffrey-lai-88ab23372"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="LinkedIn"
					className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition">
					<Linkedin className="w-6 h-6" />
				</a>
			</div>
			<p className="text-sm text-gray-500 dark:text-gray-400">
				&copy; {new Date().getFullYear()} Jeffrey Lai All rights reserved.
			</p>
			{userId && (
				<p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
					User ID: {userId}
				</p>
			)}
		</div>
	</footer>
);

// 4. Main App Component
const App = () => {
	// State for dark mode
	const [isDarkMode, setIsDarkMode] = useState(() => {
		// Initialize dark mode from localStorage or system preference
		if (typeof window !== "undefined" && localStorage.getItem("theme")) {
			return localStorage.getItem("theme") === "dark";
		}
		return false;
	});

	// State for active section tracking (for Navbar highlighting)
	const [activeSection, setActiveSection] = useState("home");

	// Initialize Firebase and get context values
	const { db, auth, isAuthReady, userId } = useFirebase();

	// Toggle dark mode logic
	const toggleDarkMode = () => {
		setIsDarkMode((prev) => {
			const newMode = !prev;
			localStorage.setItem("theme", newMode ? "dark" : "light");
			return newMode;
		});
	};

	// Apply dark mode class to HTML element
	useEffect(() => {
		const html = document.documentElement;
		if (isDarkMode) {
			html.classList.add("dark");
		} else {
			html.classList.remove("dark");
		}
	}, [isDarkMode]);

	// Intersection Observer for Navbar active state
	useEffect(() => {
		const observerOptions = {
			root: null,
			rootMargin: "0px",
			threshold: 0.5, // 50% visibility
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setActiveSection(entry.target.id);
				}
			});
		}, observerOptions);

		// Target all sections
		["home", "about"].forEach((id) => {
			const element = document.getElementById(id);
			if (element) {
				observer.observe(element);
			}
		});

		// Cleanup
		return () => observer.disconnect();
	}, []);

	return (
		<FirebaseContext.Provider value={{ db, auth, isAuthReady, userId }}>
			<div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-500 scroll-smooth font-sans">
				{/* Navbar is fixed */}
				<Navbar
					isDarkMode={isDarkMode}
					toggleDarkMode={toggleDarkMode}
					activeSection={activeSection}
				/>

				<main>
					{/* Sections */}
					<HeroSection />
					<AboutSection />
				</main>

				<Footer userId={userId} />

				{/* Global styles for smooth scrolling and font */}
				<style jsx="true">{`
					html {
						scroll-behavior: smooth;
						font-family: "Inter", sans-serif;
					}
					/* Custom animation for Hero content fade-in */
					@keyframes fadeInUp {
						from {
							opacity: 0;
							transform: translateY(20px);
						}
						to {
							opacity: 1;
							transform: translateY(0);
						}
					}
					.animate-fadeInUp {
						animation: fadeInUp 0.6s ease-out both;
					}
					.delay-200 {
						animation-delay: 0.2s;
					}
					.delay-400 {
						animation-delay: 0.4s;
					}
					.delay-600 {
						animation-delay: 0.6s;
					}
				`}</style>
			</div>
		</FirebaseContext.Provider>
	);
};

export default App;
