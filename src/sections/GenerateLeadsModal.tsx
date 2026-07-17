import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import {
  X, Sparkles, Zap, Linkedin, Globe, Briefcase,
  Loader2, MessageSquare, Users, Search
} from 'lucide-react';

interface Props {
  onClose: () => void;
  onGenerate: (count: number, source?: string) => void;
  onAICommand: (command: string) => void;
  isGenerating: boolean;
  isDark: boolean;
}

export default function GenerateLeadsModal({ onClose, onGenerate, onAICommand, isGenerating, isDark }: Props) {
  const [count, setCount] = useState(50);
  const [source, setSource] = useState('all');
  const [aiCommand, setAiCommand] = useState('');
  const [mode, setMode] = useState<'quick' | 'ai'>('quick');
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    gsap.fromTo(modalRef.current, { opacity: 0, y: 30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power3.out' });
  }, []);

  const handleClose = () => {
    gsap.to(modalRef.current, { opacity: 0, y: 20, scale: 0.95, duration: 0.3, ease: 'power3.in' });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, onComplete: onClose });
  };

  const handleGenerate = () => {
    onGenerate(count, source === 'all' ? undefined : source);
  };

  const handleAICommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (aiCommand.trim()) {
      onAICommand(aiCommand.trim());
    }
  };

  const quickPresets = [
    { label: 'LinkedIn Pros', icon: <Linkedin className="w-5 h-5" />, source: 'linkedin', count: 50 },
    { label: 'Upwork Clients', icon: <Briefcase className="w-5 h-5" />, source: 'upwork', count: 30 },
    { label: 'Local Business', icon: <Globe className="w-5 h-5" />, source: 'directory', count: 40 },
    { label: 'Mixed Sources', icon: <Users className="w-5 h-5" />, source: 'all', count: 50 },
  ];

  const aiExamples = [
    'Find 20 VA leads in USA',
    'Generate 30 tech startup leads from LinkedIn',
    'Find healthcare businesses needing admin support',
    'Get 50 marketing agency leads',
    'Find real estate professionals in California',
  ];

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div ref={modalRef} className={`w-full max-w-lg rounded-3xl border shadow-2xl overflow-hidden ${
        isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Generate Leads</h2>
              <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Find new prospects with AI</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={isGenerating}
            className={`p-2 rounded-xl transition-all ${
              isDark ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Toggle */}
        <div className={`flex p-2 mx-6 mt-6 rounded-xl ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
          <button
            onClick={() => setMode('quick')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
              mode === 'quick'
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Quick Generate
          </button>
          <button
            onClick={() => setMode('ai')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-1.5 ${
              mode === 'ai'
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            AI Command
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {mode === 'quick' ? (
            <div className="space-y-6">
              {/* Quick Presets */}
              <div className="grid grid-cols-2 gap-3">
                {quickPresets.map((preset, i) => (
                  <button
                    key={i}
                    onClick={() => { setSource(preset.source); setCount(preset.count); }}
                    className={`p-4 rounded-xl border text-left transition-all duration-300 ${
                      source === preset.source
                        ? 'border-orange-500 bg-orange-500/5 shadow-lg shadow-orange-500/10'
                        : isDark ? 'border-white/10 hover:border-white/20 bg-white/5' : 'border-gray-200 hover:border-gray-300 bg-gray-50/50'
                    }`}
                  >
                    <div className={`mb-2 ${source === preset.source ? 'text-orange-500' : isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {preset.icon}
                    </div>
                    <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{preset.label}</div>
                    <div className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{preset.count} leads</div>
                  </button>
                ))}
              </div>

              {/* Count Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Number of Leads</label>
                  <span className="text-2xl font-bold text-orange-500">{count}</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={100}
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer accent-orange-500"
                />
                <div className="flex justify-between mt-1">
                  <span className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>5</span>
                  <span className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>100</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* AI Command Input */}
              <form onSubmit={handleAICommand}>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Tell AI what leads you want
                </label>
                <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${
                  isDark ? 'bg-white/5 border-white/10 focus-within:border-orange-500/50' : 'bg-gray-50 border-gray-200 focus-within:border-orange-300'
                }`}>
                  <Search className={`w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                  <input
                    type="text"
                    value={aiCommand}
                    onChange={(e) => setAiCommand(e.target.value)}
                    placeholder="e.g., Find 20 VA leads in USA"
                    className={`flex-1 bg-transparent outline-none text-sm ${isDark ? 'text-white placeholder-gray-600' : 'text-slate-900 placeholder-gray-400'}`}
                  />
                </div>
              </form>

              {/* Example Commands */}
              <div>
                <label className={`block text-xs font-medium mb-3 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  Try these examples:
                </label>
                <div className="flex flex-wrap gap-2">
                  {aiExamples.map((example, i) => (
                    <button
                      key={i}
                      onClick={() => setAiCommand(example)}
                      className={`px-3 py-2 rounded-lg text-xs transition-all ${
                        isDark
                          ? 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
                      }`}
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`p-6 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <button
            onClick={mode === 'ai' ? handleAICommand : handleGenerate}
            disabled={isGenerating || (mode === 'ai' && !aiCommand.trim())}
            className={`w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
              isGenerating || (mode === 'ai' && !aiCommand.trim())
                ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'btn-primary'
            }`}
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating Leads...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                {mode === 'ai' ? 'Run AI Command' : `Generate ${count} Leads`}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
