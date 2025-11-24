import React, { useEffect, useRef, useState } from 'react';
import { RefreshCw, Play, Circle, Minus } from 'lucide-react';

const DynamicEulerNetwork = () => {
  const canvasRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(-1);
  const requestRef = useRef();
  
  // State for the physics simulation (kept in refs to avoid re-renders on every frame)
  const nodesRef = useRef([]);
  const linksRef = useRef([]);
  const draggingNode = useRef(null);
  const timeRef = useRef(0);

  // --- Configuration Data ---
  const INITIAL_NODES = [
    // Cluster 1: Fun/Lesson
    { id: "Games", type: 'neutral', baseType: 'fun' },
    { id: "Engagement", type: 'neutral', baseType: 'fun' },
    { id: "Activity", type: 'neutral', baseType: 'fun' },
    { id: "Classroom", type: 'neutral', baseType: 'fun' },

    // Cluster 2: Thermodynamics
    { id: "Heat Energy", type: 'neutral', baseType: 'thermo' },
    { id: "Entropy", type: 'neutral', baseType: 'thermo' },
    { id: "Calculus", type: 'neutral', baseType: 'math' }, 
    { id: "Equations", type: 'neutral', baseType: 'math' }, 
    { id: "Laws of Physics", type: 'neutral', baseType: 'thermo' },

    // Cluster 3: Toddlers
    { id: "Sensory Play", type: 'neutral', baseType: 'toddler' },
    { id: "Simple Words", type: 'neutral', baseType: 'toddler' },
    { id: "Hot vs Cold", type: 'neutral', baseType: 'toddler' },
    { id: "Safety", type: 'neutral', baseType: 'toddler' }
  ];

  const LINKS_CONFIG = [
    { s: "Games", t: "Activity" }, { s: "Games", t: "Engagement" }, { s: "Classroom", t: "Activity" },
    { s: "Heat Energy", t: "Entropy" }, { s: "Heat Energy", t: "Laws of Physics" }, 
    { s: "Calculus", t: "Equations" }, { s: "Calculus", t: "Laws of Physics" }, { s: "Equations", t: "Entropy" },
    { s: "Sensory Play", t: "Simple Words" }, { s: "Hot vs Cold", t: "Safety" },
    // Cross-Cluster Potentials
    { s: "Games", t: "Sensory Play" }, 
    { s: "Heat Energy", t: "Hot vs Cold" },
    { s: "Classroom", t: "Laws of Physics" }
  ];

  // --- Initialization ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialize Nodes with random positions centered in the canvas
    const rect = canvas.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    nodesRef.current = INITIAL_NODES.map(n => ({
      ...n,
      x: centerX + (Math.random() - 0.5) * 300,
      y: centerY + (Math.random() - 0.5) * 300,
      vx: 0,
      vy: 0,
      radius: 6,
      targetRadius: 6,
      pulseOffset: Math.random() * Math.PI * 2
    }));

    // Initialize Links
    linksRef.current = LINKS_CONFIG.map(l => ({
      source: nodesRef.current.find(n => n.id === l.s),
      target: nodesRef.current.find(n => n.id === l.t)
    })).filter(l => l.source && l.target);

    // Resize Handler
    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial size

    // Start Loop
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // --- Physics & Drawing Engine ---
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // 1. Update Physics
    updatePhysics(canvas.width, canvas.height);
    
    // 2. Draw Frame
    draw(ctx, canvas.width, canvas.height);
    
    requestRef.current = requestAnimationFrame(animate);
  };

  const updatePhysics = (width, height) => {
    timeRef.current += 0.05;
    const nodes = nodesRef.current;
    const centerPull = 0.005;
    const repulsion = 800;
    const activeAttraction = 0.02;

    nodes.forEach(node => {
      // Mouse Drag Override
      if (draggingNode.current === node) return;

      // Center Gravity
      node.vx += (width / 2 - node.x) * centerPull;
      node.vy += (height / 2 - node.y) * centerPull;

      // Node Repulsion
      nodes.forEach(other => {
        if (node === other) return;
        let dx = node.x - other.x;
        let dy = node.y - other.y;
        let dist = Math.sqrt(dx * dx + dy * dy) || 1;
        if (dist < 200) {
          let f = repulsion / (dist * dist);
          node.vx += (dx / dist) * f;
          node.vy += (dy / dist) * f;
        }
      });

      // Semantic Gravity (Active nodes pull together, Traps push away)
      nodes.forEach(other => {
        if (node === other) return;
        
        // Active Cluster Pull
        if (node.type === 'active' && other.type === 'active') {
          let dx = other.x - node.x;
          let dy = other.y - node.y;
          node.vx += dx * activeAttraction * 0.1;
          node.vy += dy * activeAttraction * 0.1;
        }

        // Trap Repulsion
        if (node.type === 'active' && other.type === 'trap') {
          let dx = node.x - other.x;
          let dy = node.y - other.y;
          let dist = Math.sqrt(dx * dx + dy * dy) || 1;
          node.vx += (dx / dist) * 0.8;
          node.vy += (dy / dist) * 0.8;
        }
      });

      // Apply Velocity & Friction
      node.x += node.vx;
      node.y += node.vy;
      node.vx *= 0.92;
      node.vy *= 0.92;

      // Radius Animation
      if (node.type === 'active') {
        node.targetRadius = 18 + Math.sin(timeRef.current + node.pulseOffset) * 3;
      } else if (node.type === 'trap') {
        node.targetRadius = 14;
      } else {
        node.targetRadius = 6;
      }
      node.radius += (node.targetRadius - node.radius) * 0.1;
      
      // Boundaries
      if(node.x < 0) node.x = 0;
      if(node.x > width) node.x = width;
      if(node.y < 0) node.y = 0;
      if(node.y > height) node.y = height;
    });
  };

  const draw = (ctx, width, height) => {
    ctx.clearRect(0, 0, width, height);

    // Draw Links
    linksRef.current.forEach(link => {
      ctx.beginPath();
      ctx.moveTo(link.source.x, link.source.y);
      ctx.lineTo(link.target.x, link.target.y);

      let sType = link.source.type;
      let tType = link.target.type;

      if (sType === 'active' && tType === 'active') {
        ctx.strokeStyle = "rgba(16, 185, 129, 0.6)";
        ctx.lineWidth = 2;
      } else if (sType === 'trap' || tType === 'trap') {
        ctx.strokeStyle = "rgba(239, 68, 68, 0.3)";
        ctx.lineWidth = 1;
      } else {
        ctx.strokeStyle = "rgba(148, 163, 184, 0.2)"; // Slate-400
        ctx.lineWidth = 1;
      }
      ctx.stroke();
    });

    // Draw Hull (Context Window)
    const activeNodes = nodesRef.current.filter(n => n.type === 'active');
    if (activeNodes.length > 2) {
      const hull = convexHull([...activeNodes]);
      ctx.beginPath();
      ctx.moveTo(hull[0].x, hull[0].y);
      for (let i = 1; i < hull.length; i++) ctx.lineTo(hull[i].x, hull[i].y);
      ctx.closePath();
      
      ctx.fillStyle = "rgba(59, 130, 246, 0.1)"; // Blue-500
      ctx.strokeStyle = "rgba(59, 130, 246, 0.5)";
      ctx.lineWidth = 2;
      ctx.lineJoin = 'round';
      ctx.shadowColor = "#3b82f6";
      ctx.shadowBlur = 20;
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // Draw Nodes
    nodesRef.current.forEach(node => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);

      if (node.type === 'active') {
        ctx.fillStyle = "#10b981"; // Emerald-500
        ctx.globalAlpha = 1;
      } else if (node.type === 'trap') {
        ctx.fillStyle = "#ef4444"; // Red-500
        ctx.globalAlpha = 1;
      } else if (node.type === 'ignored') {
        ctx.fillStyle = "#94a3b8"; // Slate-400
        ctx.globalAlpha = 0.2;
      } else {
        ctx.fillStyle = "#475569"; // Slate-600
        ctx.globalAlpha = 0.6;
      }

      ctx.fill();
      ctx.globalAlpha = 1;

      // Text Labels
      if ((node.type !== 'neutral' && node.type !== 'ignored') || currentStep === -1) {
        ctx.fillStyle = node.type === 'trap' ? "#fca5a5" : "#f1f5f9";
        ctx.font = `${node.type === 'active' ? "bold 14px" : "12px"} Inter, sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText(node.id, node.x, node.y + node.radius + 15);
      }
    });
  };

  // Convex Hull Algorithm (Monotone Chain)
  const convexHull = (points) => {
    if (points.length < 3) return points;
    points.sort((a, b) => a.x === b.x ? a.y - b.y : a.x - b.x);
    const cross = (o, a, b) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
    const lower = [];
    for (let p of points) {
      while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop();
      lower.push(p);
    }
    const upper = [];
    for (let i = points.length - 1; i >= 0; i--) {
      while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], points[i]) <= 0) upper.pop();
      upper.push(points[i]);
    }
    return [...lower.slice(0, -1), ...upper.slice(0, -1)];
  };

  // --- Logic for Steps ---
  const activateStep = (step) => {
    setCurrentStep(step);
    const nodes = nodesRef.current;

    // Reset types first
    const setTypes = (baseType, type) => {
      nodes.forEach(n => { if (n.baseType === baseType) n.type = type; });
    };

    if (step === 0) {
      setTypes("fun", "active");
      setTypes("thermo", "neutral");
      setTypes("math", "neutral");
      setTypes("toddler", "neutral");
    } else if (step === 1) {
      setTypes("fun", "active");
      setTypes("thermo", "active");
      setTypes("math", "active");
      setTypes("toddler", "neutral");
    } else if (step === 2) {
      setTypes("fun", "active");
      setTypes("toddler", "active");
      
      // Manual overrides for the "Trap" shift
      const find = (id) => nodes.find(n => n.id === id);
      if(find("Heat Energy")) find("Heat Energy").type = "active";
      if(find("Hot vs Cold")) find("Hot vs Cold").type = "active";
      if(find("Sensory Play")) find("Sensory Play").type = "active";

      if(find("Calculus")) find("Calculus").type = "trap";
      if(find("Equations")) find("Equations").type = "trap";
      if(find("Entropy")) find("Entropy").type = "trap";
      
      if(find("Laws of Physics")) find("Laws of Physics").type = "ignored";
    }
  };

  const handleReset = () => {
    setCurrentStep(-1);
    nodesRef.current.forEach(n => {
      n.type = 'neutral';
      n.vx += (Math.random() - 0.5) * 15; // Jiggle effect
      n.vy += (Math.random() - 0.5) * 15;
    });
  };

  // --- Interaction Handlers ---
  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    draggingNode.current = nodesRef.current.find(n => Math.hypot(n.x - x, n.y - y) < 30);
  };

  const handleMouseMove = (e) => {
    if (draggingNode.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      draggingNode.current.x = e.clientX - rect.left;
      draggingNode.current.y = e.clientY - rect.top;
      draggingNode.current.vx = 0;
      draggingNode.current.vy = 0;
    }
  };

  const handleMouseUp = () => {
    draggingNode.current = null;
  };

  // Touch Support
  const handleTouchStart = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    draggingNode.current = nodesRef.current.find(n => Math.hypot(n.x - x, n.y - y) < 30);
  };

  const handleTouchMove = (e) => {
    if (draggingNode.current) {
      e.preventDefault(); // Prevent scrolling
      const rect = canvasRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      draggingNode.current.x = touch.clientX - rect.left;
      draggingNode.current.y = touch.clientY - rect.top;
      draggingNode.current.vx = 0;
      draggingNode.current.vy = 0;
    }
  };

  return (
    <div className="relative w-full h-screen bg-slate-900 text-slate-200 flex flex-col items-center overflow-hidden">
      
      {/* UI Layer */}
      <div className="absolute top-6 left-0 w-full flex flex-col items-center pointer-events-none z-20 px-4">
        <h2 className="text-2xl font-light tracking-wide mb-4 text-white drop-shadow-lg text-center">
          Dynamic Contextual Hull
        </h2>
        
        {/* Prompt Builder */}
        <div className="flex flex-wrap justify-center gap-2 pointer-events-auto bg-slate-800/80 backdrop-blur-md p-3 rounded-xl border border-slate-700 shadow-xl">
          {[
            { label: '1. "Create a fun lesson"', step: 0 },
            { label: '2. "...on thermodynamics"', step: 1 },
            { label: '3. "...for toddlers"', step: 2 }
          ].map((btn, idx) => (
            <button
              key={idx}
              onClick={() => activateStep(btn.step)}
              disabled={currentStep < idx - 1 && idx !== 0}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border
                ${currentStep === btn.step 
                  ? 'bg-blue-600 text-white border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] transform -translate-y-0.5' 
                  : 'bg-slate-700 text-slate-400 border-slate-600 hover:bg-slate-600 hover:text-white'}
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-700 disabled:hover:text-slate-400
              `}
            >
              {btn.label}
            </button>
          ))}
          
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-red-600 text-white border border-red-500 hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <RefreshCw size={14} /> Reset
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-6 left-6 pointer-events-none bg-slate-900/90 p-4 rounded-lg border border-slate-700 text-sm shadow-xl z-20">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 rounded bg-blue-500/20 border border-blue-500"></div>
          <span className="text-slate-300">Context Window</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-0.5 bg-emerald-500 shadow-[0_0_5px_#10b981]"></div>
          <span className="text-slate-300">Activated Synapse</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-slate-300">High Probability</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
          <span className="text-slate-300">Negative Constraint (Trap)</span>
        </div>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="block cursor-grab active:cursor-grabbing w-full h-full"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      />
    </div>
  );
};

export default DynamicEulerNetwork;