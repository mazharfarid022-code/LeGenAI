import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import type { Lead, LeadFilter, DashboardStats } from '@/types/lead';
import {
  Users, Flame, Snowflake, Sun, TrendingUp, Download,
  Search, Filter, ChevronDown, Trash2, ExternalLink,
  MessageSquare, Sparkles, Plus, X, Calendar
} from 'lucide-react';

interface Props {
  leads: Lead[];
  stats: DashboardStats;
  filter: LeadFilter;
  onFilterChange: (f: LeadFilter) => void;
  onViewLead: (l: Lead) => void;
  onDeleteLead: (id: string) => void;
  onExportCSV: () => void;
  onOpenOutreach: (l: Lead) => void;
  onOpenGenerate: () => void;
  isDark: boolean;
}

const statusConfig = {
  hot: { label: 'Hot', icon: <Flame className="w-3.5 h-3.5" />, color: 'text-red-500 bg-red-500/10 border-red-500/20' },
  warm: { label: 'Warm', icon: <Sun className="w-3.5 h-3.5" />, color: 'text-orange-500 bg-orange-500/10 border-orange-500/20' },
  cold: { label: 'Cold', icon: <Snowflake className="w-3.5 h-3.5" />, color: 'text-blue-500 bg-blue-500/10 border-blue-500/20' },
};

const sourceLabels: Record<string, string> = {
  linkedin: 'LinkedIn', upwork: 'Upwork', fiverr: 'Fiverr', directory: 'Directory', manual: 'Manual',
};

export default function Dashboard({
  leads, stats, filter, onFilterChange,
  onViewLead, onDeleteLead, onExportCSV, onOpenOutreach, onOpenGenerate, isDark,
}: Props) {
  const dashboardRef = useRef<HTMLDivElement>(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stat-card', { opacity: 0, y: 30, stagger: 0.1, duration: 0.6, ease: 'power3.out' });
      gsap.from('.action-bar', { opacity: 0, y: 20, duration: 0.5, ease: 'power3.out', delay: 0.3 });
      gsap.from('.leads-table', { opacity: 0, y: 30, duration: 0.6, ease: 'power3.out', delay: 0.5 });
    }, dashboardRef);
    return () => ctx.revert();
  }, []);

  const statCards = [
    { label: 'Total Leads', value: stats.totalLeads, icon: <Users className="w-5 h-5" />, trend: '+12%', color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-500/10' },
    { label: 'Hot Leads', value: stats.hotLeads, icon: <Flame className="w-5 h-5" />, trend: '+8%', color: 'from-red-500 to-red-600', bgColor: 'bg-red-500/10' },
    { label: 'Warm Leads', value: stats.warmLeads, icon: <Sun className="w-5 h-5" />, trend: '+15%', color: 'from-orange-500 to-amber-500', bgColor: 'bg-orange-500/10' },
    { label: 'Cold Leads', value: stats.coldLeads, icon: <Snowflake className="w-5 h-5" />, trend: '+5%', color: 'from-cyan-500 to-blue-500', bgColor: 'bg-cyan-500/10' },
    { label: 'This Week', value: stats.thisWeek, icon: <Calendar className="w-5 h-5" />, trend: '+20%', color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-500/10' },
    { label: 'Conversion Rate', value: `${stats.conversionRate}%`, icon: <TrendingUp className="w-5 h-5" />, trend: '+3%', color: 'from-purple-500 to-violet-500', bgColor: 'bg-purple-500/10' },
  ];

  return (
    <div ref={dashboardRef} className="min-h-screen px-4 lg:px-8 pt-24 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className={`text-3xl font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Dashboard
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Manage and track your leads
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onExportCSV}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                isDark ? 'glass-dark hover:bg-white/10' : 'glass hover:bg-white shadow-md'
              } ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
            <button
              onClick={onOpenGenerate}
              className="btn-primary text-sm flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Generate Leads
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {statCards.map((s, i) => (
            <div
              key={i}
              className={`stat-card p-5 rounded-2xl border transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                isDark
                  ? 'bg-white/5 border-white/10 hover:bg-white/10'
                  : 'bg-white/80 border-gray-200/60 shadow-lg'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${s.bgColor} flex items-center justify-center`}>
                  <span className={`bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}>
                    {s.icon}
                  </span>
                </div>
                <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                  {s.trend}
                </span>
              </div>
              <div className={`text-2xl font-bold mb-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>{s.value}</div>
              <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Action Bar */}
        <div className="action-bar flex flex-col lg:flex-row gap-4 mb-6">
          {/* Search */}
          <div className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 ${
            isDark ? 'bg-white/5 border-white/10 focus-within:border-orange-500/50' : 'bg-white border-gray-200 shadow-sm focus-within:border-orange-300'
          }`}>
            <Search className={`w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
            <input
              type="text"
              placeholder="Search by name, company, industry, location..."
              value={filter.search || ''}
              onChange={(e) => onFilterChange({ ...filter, search: e.target.value })}
              className={`flex-1 bg-transparent outline-none text-sm ${isDark ? 'text-white placeholder-gray-500' : 'text-slate-900 placeholder-gray-400'}`}
            />
            {filter.search && (
              <button onClick={() => onFilterChange({ ...filter, search: '' })} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
              showFilters
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                : isDark ? 'glass-dark text-gray-300 hover:bg-white/10' : 'glass text-gray-700 hover:bg-white shadow-md'
            }`}
          >
            <Filter className="w-4 h-4" />
            Filters
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className={`p-5 rounded-2xl border mb-6 animate-scale-in ${
            isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-lg'
          }`}>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className={`block text-xs font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Status</label>
                <select
                  value={filter.status || 'all'}
                  onChange={(e) => onFilterChange({ ...filter, status: e.target.value as any })}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all ${
                    isDark ? 'bg-white/5 border-white/10 text-white focus:border-orange-500/50' : 'bg-gray-50 border-gray-200 text-slate-900 focus:border-orange-300'
                  }`}
                >
                  <option value="all">All Statuses</option>
                  <option value="hot">Hot</option>
                  <option value="warm">Warm</option>
                  <option value="cold">Cold</option>
                </select>
              </div>
              <div>
                <label className={`block text-xs font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Source</label>
                <select
                  value={filter.source || 'all'}
                  onChange={(e) => onFilterChange({ ...filter, source: e.target.value as any })}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all ${
                    isDark ? 'bg-white/5 border-white/10 text-white focus:border-orange-500/50' : 'bg-gray-50 border-gray-200 text-slate-900 focus:border-orange-300'
                  }`}
                >
                  <option value="all">All Sources</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="upwork">Upwork</option>
                  <option value="fiverr">Fiverr</option>
                  <option value="directory">Directory</option>
                  <option value="manual">Manual</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => onFilterChange({ status: 'all', source: 'all', search: '' })}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isDark ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Leads Table */}
        <div className={`leads-table rounded-2xl border overflow-hidden ${
          isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-lg'
        }`}>
          {/* Table Header */}
          <div className={`grid grid-cols-12 gap-4 px-6 py-4 border-b text-xs font-semibold uppercase tracking-wider ${
            isDark ? 'border-white/10 text-gray-400 bg-white/5' : 'border-gray-200 text-gray-500 bg-gray-50/50'
          }`}>
            <div className="col-span-3">Lead</div>
            <div className="col-span-2 hidden lg:block">Company</div>
            <div className="col-span-2 hidden md:block">Industry</div>
            <div className="col-span-1">Score</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100 dark:divide-white/5 max-h-[600px] overflow-y-auto scrollbar-thin">
            {leads.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>No leads yet</h3>
                <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Generate your first batch of leads to get started</p>
                <button onClick={onOpenGenerate} className="btn-primary text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Generate Leads
                </button>
              </div>
            ) : (
              leads.map((lead) => (
                <div
                  key={lead.id}
                  className={`grid grid-cols-12 gap-4 px-6 py-4 items-center transition-all duration-200 cursor-pointer group ${
                    isDark ? 'hover:bg-white/5' : 'hover:bg-orange-50/50'
                  }`}
                  onClick={() => onViewLead(lead)}
                >
                  {/* Lead Info */}
                  <div className="col-span-3 flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                      isDark ? 'bg-gradient-to-br from-orange-500 to-amber-500 text-white' : 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white'
                    }`}>
                      {lead.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <div className={`text-sm font-semibold truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>{lead.name}</div>
                      <div className={`text-xs truncate ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{lead.email}</div>
                    </div>
                  </div>

                  {/* Company */}
                  <div className="col-span-2 hidden lg:block">
                    <div className={`text-sm truncate ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>{lead.company}</div>
                    <div className={`text-xs truncate ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{lead.location}</div>
                  </div>

                  {/* Industry */}
                  <div className="col-span-2 hidden md:block">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                      isDark ? 'bg-white/10 text-gray-300' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {lead.industry}
                    </span>
                    <div className={`text-xs mt-1 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>{sourceLabels[lead.source]}</div>
                  </div>

                  {/* Score */}
                  <div className="col-span-1">
                    <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                      lead.score >= 70 ? 'bg-red-500/10 text-red-500' :
                      lead.score >= 40 ? 'bg-orange-500/10 text-orange-500' :
                      'bg-blue-500/10 text-blue-500'
                    }`}>
                      {lead.score}
                    </div>
                  </div>

                  {/* Status */}
                  <div className="col-span-2">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${
                      statusConfig[lead.status].color
                    }`}>
                      {statusConfig[lead.status].icon}
                      {statusConfig[lead.status].label}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="col-span-2 flex items-center justify-end gap-1">
                    <button
                      onClick={(e) => { e.stopPropagation(); onOpenOutreach(lead); }}
                      className={`p-2 rounded-lg transition-all ${
                        isDark ? 'text-gray-400 hover:text-orange-400 hover:bg-white/10' : 'text-gray-500 hover:text-orange-500 hover:bg-orange-50'
                      }`}
                      title="Generate Outreach"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); onViewLead(lead); }}
                      className={`p-2 rounded-lg transition-all ${
                        isDark ? 'text-gray-400 hover:text-blue-400 hover:bg-white/10' : 'text-gray-500 hover:text-blue-500 hover:bg-blue-50'
                      }`}
                      title="View Details"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); onDeleteLead(lead.id); }}
                      className={`p-2 rounded-lg transition-all ${
                        isDark ? 'text-gray-400 hover:text-red-400 hover:bg-white/10' : 'text-gray-500 hover:text-red-500 hover:bg-red-50'
                      }`}
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Table Footer */}
          {leads.length > 0 && (
            <div className={`px-6 py-4 border-t text-sm ${
              isDark ? 'border-white/10 text-gray-400' : 'border-gray-200 text-gray-500'
            }`}>
              Showing {leads.length} lead{leads.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
