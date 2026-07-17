import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import type { Lead, OutreachMessage, MessageType } from '@/types/lead';
import {
  X, MessageSquare, Mail, Linkedin, Copy, Check, Loader2,
  RefreshCw, Sparkles, Send
} from 'lucide-react';
import { toast } from 'sonner';

interface Props {
  lead: Lead;
  onClose: () => void;
  generateMessage: (lead: Lead, type: MessageType) => Promise<OutreachMessage>;
  isDark: boolean;
}

const messageTypes: { type: MessageType; label: string; icon: React.ReactNode; color: string }[] = [
  { type: 'linkedin', label: 'LinkedIn DM', icon: <Linkedin className="w-5 h-5" />, color: 'from-blue-500 to-blue-600' },
  { type: 'email', label: 'Cold Email', icon: <Mail className="w-5 h-5" />, color: 'from-orange-500 to-amber-500' },
  { type: 'whatsapp', label: 'WhatsApp', icon: <MessageSquare className="w-5 h-5" />, color: 'from-green-500 to-emerald-500' },
];

export default function OutreachModal({ lead, onClose, generateMessage, isDark }: Props) {
  const [selectedType, setSelectedType] = useState<MessageType>('linkedin');
  const [message, setMessage] = useState<OutreachMessage | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    gsap.fromTo(modalRef.current, { opacity: 0, y: 30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power3.out' });
    generateForType('linkedin');
  }, []);

  const handleClose = () => {
    gsap.to(modalRef.current, { opacity: 0, y: 20, scale: 0.95, duration: 0.3, ease: 'power3.in' });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, onComplete: onClose });
  };

  const generateForType = async (type: MessageType) => {
    setIsGenerating(true);
    setSelectedType(type);
    try {
      const msg = await generateMessage(lead, type);
      setMessage(msg);
    } catch {
      toast.error('Failed to generate message');
    }
    setIsGenerating(false);
  };

  const handleCopy = async () => {
    if (!message) return;
    const text = message.subject ? `Subject: ${message.subject}\n\n${message.body}` : message.body;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  };

  const handleSend = () => {
    if (!message) return;
    let url = '';
    if (message.type === 'email') {
      const subject = encodeURIComponent(message.subject || '');
      const body = encodeURIComponent(message.body);
      url = `mailto:${lead.email}?subject=${subject}&body=${body}`;
    } else if (message.type === 'linkedin') {
      url = lead.linkedin || '#';
    } else if (message.type === 'whatsapp') {
      const text = encodeURIComponent(message.body);
      url = `https://wa.me/?text=${text}`;
    }
    if (url) window.open(url, '_blank');
  };

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div ref={modalRef} className={`w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden ${
        isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>AI Outreach Generator</h2>
              <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>For {lead.name} at {lead.company}</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className={`p-2 rounded-xl transition-all ${
              isDark ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Type Selector */}
        <div className="p-6 pb-0">
          <div className="grid grid-cols-3 gap-3">
            {messageTypes.map((mt) => (
              <button
                key={mt.type}
                onClick={() => generateForType(mt.type)}
                disabled={isGenerating}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium transition-all duration-300 ${
                  selectedType === mt.type
                    ? `border-orange-500 bg-orange-500/5 text-orange-500 shadow-lg shadow-orange-500/10`
                    : isDark
                      ? 'border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-300 bg-white/5'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-800 bg-gray-50/50'
                }`}
              >
                {mt.icon}
                {mt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Message Content */}
        <div className="p-6">
          <div className={`relative p-6 rounded-2xl border ${
            isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
          }`}>
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500 mb-4" />
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>AI is crafting your personalized message...</p>
              </div>
            ) : message ? (
              <>
                {message.subject && (
                  <div className="mb-4">
                    <label className={`text-xs font-medium mb-1 block ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Subject</label>
                    <div className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{message.subject}</div>
                  </div>
                )}
                <div>
                  <label className={`text-xs font-medium mb-1 block ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Message</label>
                  <div className={`text-sm whitespace-pre-line leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {message.body}
                  </div>
                </div>
                <div className={`flex items-center gap-2 mt-6 pt-4 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                  <Sparkles className="w-3 h-3 text-orange-500" />
                  <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                    Generated {new Date(message.generatedAt).toLocaleTimeString()}
                  </span>
                </div>
              </>
            ) : null}
          </div>
        </div>

        {/* Actions */}
        <div className={`p-6 border-t flex items-center justify-between ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <button
            onClick={() => generateForType(selectedType)}
            disabled={isGenerating}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all ${
              isDark ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            Regenerate
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              disabled={!message || isGenerating}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium border transition-all ${
                copied
                  ? 'bg-green-500 text-white border-green-500'
                  : isDark
                    ? 'border-white/10 text-gray-300 hover:bg-white/10'
                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button
              onClick={handleSend}
              disabled={!message || isGenerating}
              className="btn-primary text-sm flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
