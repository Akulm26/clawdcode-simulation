import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal as TerminalIcon, 
  Cpu, 
  Database, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  ChevronRight, 
  RefreshCcw,
  Command,
  Info,
  X,
  Layers,
  Activity,
  Box,
  Code2,
  Linkedin
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  example: string;
}

interface State {
  id: number;
  title: string;
  subtitle: string;
  content: React.ReactNode;
  keywords: string[];
}

// --- Constants ---

const GLOSSARY: Record<string, GlossaryTerm> = {
  'Gateway': {
    id: 'gateway',
    term: 'Gateway',
    definition: 'The entry point that receives raw requests and normalizes them for the system.',
    example: 'Like a receptionist who takes a messy handwritten note and types it into a clean digital form.'
  },
  'MCP': {
    id: 'mcp',
    term: 'Model Context Protocol',
    definition: 'A standardized way for AI models to interact with external tools and data sources.',
    example: 'Like a universal remote that works with every TV, regardless of the brand.'
  },
  'Sandbox': {
    id: 'sandbox',
    term: 'Sandbox',
    definition: 'A secure, isolated environment where code can be executed without affecting the rest of the system.',
    example: 'Like a laboratory with thick glass walls where scientists can test dangerous chemicals safely.'
  },
  'Retrieval': {
    id: 'retrieval',
    term: 'Retrieval',
    definition: 'The process of searching and fetching relevant data from a database or memory.',
    example: 'Like a librarian finding the exact book you need from thousands of shelves.'
  },
  'LLM': {
    id: 'llm',
    term: 'Large Language Model',
    definition: 'An AI model trained on vast amounts of text to understand and generate human-like language.',
    example: 'Like a super-intelligent assistant who has read every book in the world.'
  },
  'Normalization': {
    id: 'normalization',
    term: 'Normalization',
    definition: 'Converting data into a standard format to ensure consistency across the system.',
    example: 'Converting "3/19/26", "March 19, 2026", and "19-03-2026" all into "2026-03-19".'
  },
  'Payload': {
    id: 'payload',
    term: 'Payload',
    definition: 'The actual data being transmitted in a request or response.',
    example: 'The letter inside an envelope; the envelope is the metadata, the letter is the payload.'
  },
  'Context Window': {
    id: 'context-window',
    term: 'Context Window',
    definition: 'The amount of information an AI can "remember" or consider at one time.',
    example: 'Like the size of a whiteboard; once it\'s full, you have to erase old notes to write new ones.'
  },
  'Self-Correction': {
    id: 'self-correction',
    term: 'Self-Correction',
    definition: 'The ability of the system to detect its own errors and fix them automatically.',
    example: 'Like a GPS that says "Recalculating" when you take a wrong turn.'
  }
};

// --- Components ---

const Term = ({ name }: { name: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const termData = GLOSSARY[name];

  if (!termData) return <span className="oc-accent-text font-mono">{name}</span>;

  return (
    <span className="relative inline-block">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="oc-accent-text font-mono border-b border-[#FF5A2D]/30 hover:bg-[#FF5A2D]/10 transition-colors cursor-help"
      >
        {name}
      </button>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 top-full mt-2 w-72 z-50 oc-bg oc-border p-5 shadow-2xl rounded-xl border-white/10"
            >
              <div className="flex justify-between items-start mb-3">
                <h4 className="oc-accent-text font-display font-bold text-[10px] uppercase tracking-[0.2em]">{termData.term}</h4>
                <button onClick={() => setIsOpen(false)} className="text-[#8B7F77] hover:text-white transition-colors">
                  <X size={14} />
                </button>
              </div>
              <p className="text-[12px] text-slate-300 leading-relaxed mb-4">
                {termData.definition}
              </p>
              <div className="pt-4 border-t border-white/5">
                <span className="text-[9px] font-bold text-[#8B7F77] uppercase tracking-widest block mb-2">Real-life Analogy</span>
                <p className="text-[11px] oc-accent-dim italic leading-relaxed">
                  "{termData.example}"
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </span>
  );
};

const CodeBlock = ({ children, label }: { children: React.ReactNode, label?: string }) => (
  <div className="space-y-2">
    {label && <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{label}</span>}
    <div className="oc-bg oc-border p-4 rounded-lg font-mono text-[11px] leading-relaxed relative overflow-hidden scanline">
      <div className="relative z-10 text-slate-300">
        {children}
      </div>
    </div>
  </div>
);

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [command, setCommand] = useState('');
  const [logs, setLogs] = useState<string[]>(['System initialized. Waiting for command...']);
  const scrollRef = useRef<HTMLDivElement>(null);

  const STATES: State[] = [
    {
      id: 1,
      title: "Gateway Entry",
      subtitle: "Request Normalization",
      keywords: ["Gateway", "Normalization", "Payload"],
      content: (
        <div className="space-y-6">
          <p className="text-sm leading-relaxed">
            The <Term name="Gateway" /> receives the raw input. It performs <Term name="Normalization" /> to ensure the <Term name="Payload" /> is in a standard format for the rest of the architecture.
          </p>
          <CodeBlock label="Raw Input">
            {`{
    "user": "Priya",
    "query": "What's my Monday looking like?",
    "timestamp": "${new Date().toISOString()}"
  }`}
          </CodeBlock>
          <CodeBlock label="Normalized Payload">
            {`{
    "intent": "SCHEDULE_QUERY",
    "parameters": {
      "day": "MONDAY",
      "user_context": "PRIYA_WORK_PROFILE"
    },
    "security_token": "OC_SEC_9921"
  }`}
          </CodeBlock>
        </div>
      )
    },
    {
      id: 2,
      title: "Memory Retrieval",
      subtitle: "Contextual Awareness",
      keywords: ["Retrieval", "Context Window"],
      content: (
        <div className="space-y-6">
          <p className="text-sm leading-relaxed">
            The system performs <Term name="Retrieval" /> to fetch relevant data from Priya's work history and calendar, filling the <Term name="Context Window" /> for the LLM.
          </p>
          <CodeBlock label="Retrieved Context">
            {`[
    { "source": "Jira", "task": "Sprint Planning", "time": "09:00" },
    { "source": "Calendar", "event": "Team Sync", "time": "11:30" },
    { "source": "Slack", "mention": "Review PR #442", "priority": "HIGH" }
  ]`}
          </CodeBlock>
        </div>
      )
    },
    {
      id: 3,
      title: "LLM Reasoning",
      subtitle: "Strategic Planning",
      keywords: ["LLM", "MCP"],
      content: (
        <div className="space-y-6">
          <p className="text-sm leading-relaxed">
            The <Term name="LLM" /> analyzes the context and decides which tools to call via the <Term name="MCP" />.
          </p>
          <CodeBlock label="Reasoning Trace">
            {`THOUGHT: User wants a Monday summary.
  I have calendar and Jira data.
  I need to check if there are any blocking PRs.
  ACTION: call_mcp_tool("github", "get_pending_prs")
  ACTION: call_mcp_tool("jira", "get_active_sprint")`}
          </CodeBlock>
        </div>
      )
    },
    {
      id: 4,
      title: "Sandbox Execution",
      subtitle: "Secure Tool Interaction",
      keywords: ["Sandbox", "Self-Correction"],
      content: (
        <div className="space-y-6">
          <p className="text-sm leading-relaxed">
            Tools are executed within a secure <Term name="Sandbox" />. If an error occurs, the system attempts <Term name="Self-Correction" />.
          </p>
          <CodeBlock label="Sandbox Log">
            {`EXEC: github.get_pending_prs()
  ERROR: API_RATE_LIMIT_EXCEEDED
  RETRY: Switching to cached mirror...
  SUCCESS: 2 PRs found for Priya.`}
          </CodeBlock>
        </div>
      )
    },
    {
      id: 5,
      title: "MCP Integration",
      subtitle: "Data Synthesis",
      keywords: ["MCP"],
      content: (
        <div className="space-y-6">
          <p className="text-sm leading-relaxed">
            All data from various <Term name="MCP" /> tools is synthesized into a coherent final response.
          </p>
          <CodeBlock label="Synthesized Data">
            {`{
    "schedule": ["Planning", "Sync"],
    "tasks": ["PR #442", "Sprint Review"],
    "status": "READY_FOR_DELIVERY"
  }`}
          </CodeBlock>
        </div>
      )
    },
    {
      id: 6,
      title: "Final Delivery",
      subtitle: "User Presentation",
      keywords: [],
      content: (
        <div className="space-y-8">
          <p className="text-sm leading-relaxed oc-muted">
            The final output is delivered to Priya in a natural, helpful format.
          </p>
          <div className="p-8 rounded-3xl bg-[#FF5A2D]/[0.03] border border-[#FF5A2D]/20 shadow-[0_0_50px_rgba(255,90,45,0.05)]">
            <p className="oc-info font-medium text-lg leading-relaxed">
              "Good morning Priya! Your Monday is looking busy but manageable. You have Sprint Planning at 9:00 AM, followed by a Team Sync at 11:30 AM. Don't forget to review PR #442, which is marked as high priority."
            </p>
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, currentStep]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = command.toLowerCase().trim();
    
    if (cmd === 'start simulation') {
      setCurrentStep(1);
      setLogs(prev => [...prev, '⟩ start simulation', 'Initializing OpenClaw trace...', 'Gateway active.']);
    } else if (cmd === 'next' && currentStep > 0 && currentStep < 6) {
      setCurrentStep(prev => prev + 1);
      setLogs(prev => [...prev, '⟩ next', `Advancing to state: ${STATES[currentStep].title}`]);
    } else if (cmd === 'reset') {
      setCurrentStep(0);
      setLogs(['System reset.', 'Waiting for command...']);
    } else {
      setLogs(prev => [...prev, `⟩ ${command}`, 'Unknown command. Try "Start Simulation", "Next", or "Reset".']);
    }
    setCommand('');
  };

  return (
    <div className="flex min-h-screen text-slate-300">
      {/* Sidebar */}
      <aside className="w-80 oc-bg border-r border-white/5 flex flex-col sticky top-0 h-screen overflow-y-auto">
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 oc-accent-bg flex items-center justify-center rounded-lg">
              <Activity className="w-4 h-4 oc-accent-text" />
            </div>
            <h1 className="text-lg font-display font-bold text-white tracking-tight">OpenClaw</h1>
          </div>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em]">Architecture Simulator</p>
        </div>

        <nav className="flex-1 p-8 space-y-10">
          <section className="space-y-6">
            <h3 className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Simulation Progress</h3>
            <div className="space-y-4">
              {STATES.map((s) => (
                <div key={s.id} className="flex gap-4 group">
                  <div className="flex flex-col items-center">
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all duration-500 ${
                      currentStep > s.id ? 'bg-[#FF5A2D] text-white shadow-[0_0_15px_rgba(255,90,45,0.5)]' : 
                      currentStep === s.id ? 'bg-[#FF5A2D]/20 border border-[#FF5A2D]/50 oc-accent-text' : 
                      'bg-white/5 border border-white/10 text-[#141210]'
                    }`}>
                      {currentStep > s.id ? <CheckCircle2 size={12} /> : <span className="text-[9px] font-bold">{s.id}</span>}
                    </div>
                    {s.id < 6 && <div className={`w-[1px] h-8 my-1 transition-colors duration-500 ${currentStep > s.id ? 'bg-[#FF5A2D]/30' : 'bg-white/5'}`} />}
                  </div>
                  <div className={`transition-all duration-300 ${currentStep === s.id ? 'translate-x-1' : ''}`}>
                    <p className={`text-[11px] font-bold uppercase tracking-wider ${currentStep >= s.id ? 'text-white' : 'text-[#8B7F77]'}`}>{s.title}</p>
                    <p className={`text-[9px] font-medium ${currentStep >= s.id ? 'oc-muted' : 'text-[#141210]'}`}>{s.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Available Commands</h3>
            <div className="space-y-3">
              {['Start Simulation', 'Next', 'Reset'].map(cmd => (
                <div key={cmd} className="flex justify-between items-center group cursor-pointer" onClick={() => setCommand(cmd)}>
                  <span className="text-[10px] oc-muted font-medium group-hover:text-slate-300 transition-colors">{cmd}</span>
                  <code className="text-[9px] oc-bg oc-border px-2 py-1 rounded oc-accent-bright/70 group-hover:oc-accent-bright transition-colors">{cmd}</code>
                </div>
              ))}
            </div>
          </section>
        </nav>

        <div className="p-8 border-t border-white/5">
          <div className="flex items-center gap-2 text-[10px] oc-muted font-mono">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF5A2D] animate-pulse" />
            SYSTEM_UPTIME: 99.99%
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-transparent flex flex-col relative">
        {/* Top Right Creator Info & Connect Button */}
        <div className="absolute top-8 right-8 z-50 flex items-center gap-6">
          <div className="text-right hidden sm:block">
            <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest leading-none mb-1">Architect</p>
            <p className="text-[11px] font-medium text-white leading-none">Akul S. Malhotra</p>
          </div>
          
          <div className="flex items-center gap-3">
            <a 
              href="https://www.linkedin.com/in/malhotraakulsuhail/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 oc-bg oc-border rounded-xl text-[11px] font-bold text-white hover:bg-white/5 transition-all group shadow-2xl"
            >
              <Linkedin size={14} className="oc-accent-text group-hover:scale-110 transition-transform" />
              Connect
            </a>
          </div>
        </div>

        <div className="flex-1 p-12 lg:p-20 space-y-20 max-w-5xl mx-auto w-full pb-40">
          <AnimatePresence mode="wait">
            {currentStep === 0 ? (
              <motion.div 
                key="idle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-10"
              >
                <div className="relative">
                  <div className="w-24 h-24 oc-bg oc-border rounded-2xl flex items-center justify-center relative z-10 shadow-2xl">
                    <TerminalIcon className="w-10 h-10 oc-accent-text" />
                  </div>
                  <div className="absolute inset-0 bg-[#FF5A2D]/10 blur-3xl rounded-full scale-150" />
                </div>
                <div className="space-y-6">
                  <h2 className="text-6xl font-display font-bold text-white tracking-tighter uppercase oc-gradient-text">Simulator Standby</h2>
                  <p className="oc-muted text-sm max-w-md mx-auto leading-relaxed">
                    Interactive architectural trace of the OpenClaw framework. <br/>
                    Click on <span className="oc-accent-text font-mono">highlighted terms</span> to learn more.
                  </p>
                  <button 
                    onClick={() => { setCommand('Start Simulation'); handleCommand({ preventDefault: () => {} } as any); }}
                    className="mt-8 px-10 py-4 bg-[#FF5A2D] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-[#FF7A3D] transition-all active:scale-95 shadow-[0_0_30px_rgba(255,90,45,0.4)]"
                  >
                    Initialize Trace
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="space-y-16"
              >
                {/* Header */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-bold oc-accent-text uppercase tracking-[0.5em]">Active State</span>
                    <div className="h-[1px] flex-1 bg-white/5" />
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <h2 className="text-5xl font-display font-bold text-white tracking-tighter uppercase leading-none">
                        {STATES[currentStep - 1].title}
                      </h2>
                      <p className="text-slate-500 text-xs uppercase tracking-[0.3em] font-bold mt-4">
                        {STATES[currentStep - 1].subtitle}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono text-slate-700 block">STATE_ID</span>
                      <span className="text-xl font-mono text-white/20">0{currentStep}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 gap-12">
                  <div className="space-y-10">
                    <div className="oc-bg oc-border rounded-3xl p-10 relative group">
                      <div className="relative z-10">
                        {STATES[currentStep - 1].content}
                      </div>
                    </div>

                    {/* System Logs */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Activity size={12} className="oc-muted" />
                        <span className="text-[10px] font-bold oc-muted uppercase tracking-widest">System Trace Log</span>
                      </div>
                      <div 
                        ref={scrollRef}
                        className="oc-bg oc-border rounded-xl p-6 h-48 overflow-y-auto font-mono text-[10px] space-y-2 scroll-smooth"
                      >
                        {logs.map((log, i) => (
                          <div key={i} className={`flex gap-3 ${log.startsWith('⟩') ? 'oc-accent-bright' : 'oc-muted'}`}>
                            <span className="opacity-30">[{new Date().toLocaleTimeString()}]</span>
                            <span>{log}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Command Input */}
        <div className="sticky bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#030712] via-[#030712] to-transparent z-30">
          <form onSubmit={handleCommand} className="max-w-3xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-[#FF5A2D]/5 blur-xl group-focus-within:bg-[#FF5A2D]/10 transition-all" />
              <div className="relative flex items-center oc-bg oc-border rounded-2xl p-2 pl-6 shadow-2xl">
                <Command size={16} className="oc-muted mr-4" />
                <input 
                  type="text"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  placeholder={currentStep === 0 ? "Type 'Start Simulation' to begin..." : "Type 'Next' to advance or 'Reset'..."}
                  className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder:text-[#141210] font-medium py-3"
                />
                <button 
                  type="submit"
                  className="px-6 py-3 bg-[#FF5A2D] text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#FF7A3D] transition-all shadow-[0_0_15px_rgba(255,90,45,0.2)]"
                >
                  Execute
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
