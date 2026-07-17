import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import type { Lead } from '@/types/lead';
import {
  ArrowLeft, Trash2, MessageSquare, ExternalLink,
  Mail, Phone, MapPin, Globe, Linkedin, Building2,
  Calendar, Tag, Flame, Sun, Snowflake, TrendingUp
} from 'lucide-react';

interface Props {
  lead: Lead;
  onBack: () => void;
  onDelete: () => void;
  onOutreach: () => void;
  isDark: boolean;
}

const statusConfig = {
  hot: { label: 'Hot Lead', icon: <Flame className="w-5 h-5" />, color: 'text-red-500 bg-red-500/10 border-red-500/20', bar: 'from-red-500 to-red-600' },
  warm: { label: 'Warm Lead', icon: <Sun className="w-5 h-5" />, color: 'text-orange-500 bg-orange-500/10 border-orange-500/20', bar: 'from-orange-500 to-amber-500' },
  cold: { label: 'Cold Lead', icon: <Snowflake className="w-5 h-5" />, color: 'text-blue-500 bg-blue-500/10 border-blue-500/20', bar: 'from-blue-500 to-cyan-500' },
};

export default function LeadDetail({ lead, onBack, onDelete, onOutreach, isDark }: Props) {
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.detail-header', { opacity: 0, y: 20, duration: 0.5, ease: 'power3.out' });
      gsap.from('.detail-card', { opacity: 0, y: 30, stagger: 0.1, duration: 0.6, ease: 'power3.out', delay: 0.2 });
      gsap.from('.score-ring', { scale: 0, duration: 0.6, ease: 'back.out(1.7)', delay: 0.4 });
    }, detailRef);
    return () => ctx.revert();
  }, []);

  const infoItems = [
    { icon: <Mail className="w-4 h-4" />, label: 'Email', value: lead.email, href: `mailto:${lead.email}` },
    { icon: <Phone className="w-4 h-4" />, label: 'Phone', value: lead.phone || 'N/A' },
    { icon: <MapPin className="w-4 h-4" />, label: 'Location', value: lead.location },
    { icon: <Globe className="w-4 h-4" />, label: 'Website', value: lead.website, href: lead.website, external: true },
    { icon: <Linkedin className="w-4 h-4" />, label: 'LinkedIn', value: lead.linkedin ? 'View Profile' : 'N/A', href: lead.linkedin, external: true },
    { icon: <Building2 className="w-4 h-4" />, label: 'Company Size', value: lead.companySize || 'Unknown' },
    { icon: <Calendar className="w-4 h-4" />, label: 'Added', value: new Date(lead.createdAt).toLocaleDateString() },
  ];

  return (
    <div ref={detailRef} className="min-h-screen px-4 lg:px-8 pt-24 pb-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="detail-header flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
              isDark ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={onOutreach}
              className="btn-primary text-sm flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              Generate Outreach
            </button>
            <button
              onClick={onDelete}
              className={`p-2.5 rounded-xl transition-all ${
                isDark ? 'text-red-400 hover:bg-red-500/10' : 'text-red-500 hover:bg-red-50'
              }`}
              title="Delete Lead"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Profile Card */}
        <div className={`detail-card p-8 rounded-3xl border mb-6 ${
          isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-xl'
        }`}>
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className={`w-24 h-24 rounded-3xl flex items-center justify-center text-2xl font-bold ${
                isDark ? 'bg-gradient-to-br from-orange-500 to-amber-500 text-white' : 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white'
              }`}>
                {lead.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
              </div>
              <div className={`absolute -bottom-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                isDark ? 'border-gray-900' : 'border-white'
              } ${statusConfig[lead.status].color}`}>
                {statusConfig[lead.status].icon}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{lead.name}</h1>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${statusConfig[lead.status].color}`}>
                  {statusConfig[lead.status].icon}
                  {statusConfig[lead.status].label}
                </span>
              </div>
              <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{lead.title} at {lead.company}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium ${
                  isDark ? 'bg-white/10 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>
                  <Building2 className="w-3 h-3" />
                  {lead.industry}
                </span>
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium ${
                  isDark ? 'bg-white/10 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>
                  <Tag className="w-3 h-3" />
                  {lead.source}
                </span>
                {lead.tags.map((tag, i) => (
                  <span key={i} className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-medium ${
                    isDark ? 'bg-orange-500/10 text-orange-400' : 'bg-orange-50 text-orange-600'
                  }`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Score Ring */}
            <div className="score-ring flex-shrink-0 text-center">
              <div className={`w-20 h-20 rounded-full border-4 flex items-center justify-center ${
                isDark ? 'border-white/10' : 'border-gray-200'
              }`} style={{
                background: `conic-gradient(from 0deg, ${lead.score >= 70 ? '#ef4444' : lead.score >= 40 ? '#f97316' : '#3b82f6'} ${lead.score * 3.6}deg, transparent ${lead.score * 3.6}deg)`,
              }}>
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                  <span className={`text-lg font-bold ${
                    lead.score >= 70 ? 'text-red-500' : lead.score >= 40 ? 'text-orange-500' : 'text-blue-500'
                  }`}>{lead.score}</span>
                </div>
              </div>
              <p className={`text-xs mt-2 font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>AI Score</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Contact Info */}
          <div className={`detail-card p-6 rounded-2xl border ${
            isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-lg'
          }`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Contact Information</h3>
            <div className="space-y-4">
              {infoItems.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    isDark ? 'bg-white/10 text-gray-400' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{item.label}</div>
                    {item.href && item.value !== 'N/A' ? (
                      <a
                        href={item.href}
                        target={item.external ? '_blank' : undefined}
                        rel={item.external ? 'noopener noreferrer' : undefined}
                        className="text-sm font-medium text-orange-500 hover:text-orange-600 truncate flex items-center gap-1"
                      >
                        {item.value}
                        {item.external && <ExternalLink className="w-3 h-3" />}
                      </a>
                    ) : (
                      <div className={`text-sm font-medium truncate ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pain Points & Hiring Signals */}
          <div className={`detail-card p-6 rounded-2xl border ${
            isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-lg'
          }`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>AI Insights</h3>

            <div className="mb-6">
              <h4 className={`text-sm font-medium mb-3 flex items-center gap-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <TrendingUp className="w-4 h-4 text-orange-500" />
                Pain Points
              </h4>
              <div className="space-y-2">
                {(lead.painPoints || ['No pain points identified']).map((point, i) => (
                  <div key={i} className={`flex items-start gap-2 p-3 rounded-xl text-sm ${
                    isDark ? 'bg-white/5' : 'bg-gray-50'
                  }`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className={`text-sm font-medium mb-3 flex items-center gap-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <Flame className="w-4 h-4 text-green-500" />
                Hiring Signals
              </h4>
              <div className="space-y-2">
                {(lead.hiringSignals || ['No hiring signals detected']).map((signal, i) => (
                  <div key={i} className={`flex items-start gap-2 p-3 rounded-xl text-sm ${
                    isDark ? 'bg-white/5' : 'bg-gray-50'
                  }`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{signal}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className={`detail-card p-6 rounded-2xl border mt-6 ${
          isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-lg'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Notes</h3>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {lead.notes || 'No notes added yet.'}
          </p>
        </div>
      </div>
    </div>
  );
}
