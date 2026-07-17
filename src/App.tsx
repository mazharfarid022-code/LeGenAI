import { useState, useEffect, useCallback } from 'react';
import type { Lead, LeadFilter, AppSettings, DashboardStats } from '@/types/lead';
import { getLeads, saveLeads, deleteLead, getSettings, saveSettings } from '@/utils/storage';
import { generateMockLeads } from '@/utils/mockData';
import { exportToCSV, downloadCSV } from '@/utils/storage';
import { generateOutreachMessage, generateAICommandLeads } from '@/utils/aiService';
import LandingPage from '@/sections/LandingPage';
import Dashboard from '@/sections/Dashboard';
import LeadDetail from '@/sections/LeadDetail';
import SettingsPage from '@/sections/SettingsPage';
import GenerateLeadsModal from '@/sections/GenerateLeadsModal';
import OutreachModal from '@/sections/OutreachModal';
import { Toaster, toast } from 'sonner';
import './App.css';

export type View = 'landing' | 'dashboard' | 'lead-detail' | 'settings';

function App() {
  const [view, setView] = useState<View>('landing');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [settings, setSettings] = useState<AppSettings>(getSettings());
  const [isDark, setIsDark] = useState(false);
  const [showGenModal, setShowGenModal] = useState(false);
  const [showOutreachModal, setShowOutreachModal] = useState(false);
  const [outreachLead, setOutreachLead] = useState<Lead | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [filter, setFilter] = useState<LeadFilter>({ status: 'all', source: 'all', search: '' });

  useEffect(() => {
    const stored = getLeads();
    setLeads(stored);
    const s = getSettings();
    setSettings(s);
    setIsDark(s.darkMode);
    if (s.darkMode) document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const refreshLeads = useCallback(() => {
    setLeads(getLeads());
  }, []);

  const handleNavigate = useCallback((v: View) => {
    setView(v);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleDeleteLead = useCallback((id: string) => {
    deleteLead(id);
    refreshLeads();
    toast.success('Lead deleted');
    if (view === 'lead-detail') handleNavigate('dashboard');
  }, [refreshLeads, view, handleNavigate]);

  const handleGenerateLeads = useCallback((count: number, source?: string) => {
    setIsGenerating(true);
    setTimeout(() => {
      const newLeads = generateMockLeads(count, source as any);
      const current = getLeads();
      saveLeads([...newLeads, ...current]);
      refreshLeads();
      setIsGenerating(false);
      setShowGenModal(false);
      toast.success(`${count} leads generated successfully!`);
      if (view === 'landing') handleNavigate('dashboard');
    }, 2000);
  }, [refreshLeads, view, handleNavigate]);

  const handleAICommand = useCallback(async (command: string) => {
    setIsGenerating(true);
    try {
      const { count, filters } = await generateAICommandLeads(command);
      await new Promise((r) => setTimeout(r, 1500));
      const newLeads = generateMockLeads(count, filters.source as any);
      const filtered = newLeads.map((l) => {
        if (filters.industry) l.industry = filters.industry;
        return l;
      });
      const current = getLeads();
      saveLeads([...filtered, ...current]);
      refreshLeads();
      setIsGenerating(false);
      setShowGenModal(false);
      toast.success(`AI found ${count} leads matching "${command}"`);
      if (view === 'landing') handleNavigate('dashboard');
    } catch {
      setIsGenerating(false);
      toast.error('Failed to generate leads');
    }
  }, [refreshLeads, view, handleNavigate]);

  const handleExportCSV = useCallback(() => {
    const csv = exportToCSV(leads);
    downloadCSV(csv, `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
    toast.success('Leads exported to CSV');
  }, [leads]);

  const handleViewLead = useCallback((lead: Lead) => {
    setSelectedLead(lead);
    handleNavigate('lead-detail');
  }, [handleNavigate]);

  const handleOpenOutreach = useCallback((lead: Lead) => {
    setOutreachLead(lead);
    setShowOutreachModal(true);
  }, []);

  const handleUpdateSettings = useCallback((s: AppSettings) => {
    setSettings(s);
    saveSettings(s);
    setIsDark(s.darkMode);
    toast.success('Settings saved');
  }, []);

  const handleToggleDark = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      const s = getSettings();
      s.darkMode = next;
      saveSettings(s);
      setSettings(s);
      return next;
    });
  }, []);

  const filteredLeads = leads.filter((l) => {
    if (filter.status && filter.status !== 'all' && l.status !== filter.status) return false;
    if (filter.source && filter.source !== 'all' && l.source !== filter.source) return false;
    if (filter.industry && l.industry !== filter.industry) return false;
    if (filter.search) {
      const q = filter.search.toLowerCase();
      const matches =
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.company.toLowerCase().includes(q) ||
        l.industry.toLowerCase().includes(q) ||
        l.location.toLowerCase().includes(q);
      if (!matches) return false;
    }
    return true;
  });

  const stats: DashboardStats = {
    totalLeads: leads.length,
    hotLeads: leads.filter((l) => l.status === 'hot').length,
    warmLeads: leads.filter((l) => l.status === 'warm').length,
    coldLeads: leads.filter((l) => l.status === 'cold').length,
    thisWeek: leads.filter((l) => {
      const d = new Date(l.createdAt);
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return d >= weekAgo;
    }).length,
    conversionRate: leads.length > 0 ? Math.round((leads.filter((l) => l.status === 'hot').length / leads.length) * 100) : 0,
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'gradient-bg' : 'gradient-bg-light'}`}>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: isDark ? '#1e293b' : '#fff',
            color: isDark ? '#e2e8f0' : '#1e293b',
            border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
          },
        }}
      />

      {/* Floating Navigation */}
      {view !== 'landing' && (
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
          <div className={`flex items-center gap-1 px-2 py-2 rounded-2xl shadow-2xl ${isDark ? 'glass-dark' : 'glass'} animate-slide-down`}>
            <button
              onClick={() => handleNavigate('dashboard')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                view === 'dashboard'
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                  : `${isDark ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setShowGenModal(true)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                isDark ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Generate
            </button>
            <button
              onClick={() => handleNavigate('settings')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                view === 'settings'
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                  : `${isDark ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`
              }`}
            >
              Settings
            </button>
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />
            <button
              onClick={handleToggleDark}
              className={`p-2 rounded-xl transition-all duration-300 ${
                isDark ? 'text-yellow-400 hover:bg-white/10' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="relative">
        {view === 'landing' && (
          <LandingPage
            onStart={() => handleNavigate('dashboard')}
            onGenerate={() => setShowGenModal(true)}
            stats={stats}
            isDark={isDark}
          />
        )}
        {view === 'dashboard' && (
          <Dashboard
            leads={filteredLeads}
            stats={stats}
            filter={filter}
            onFilterChange={setFilter}
            onViewLead={handleViewLead}
            onDeleteLead={handleDeleteLead}
            onExportCSV={handleExportCSV}
            onOpenOutreach={handleOpenOutreach}
            onOpenGenerate={() => setShowGenModal(true)}
            isDark={isDark}
          />
        )}
        {view === 'lead-detail' && selectedLead && (
          <LeadDetail
            lead={selectedLead}
            onBack={() => handleNavigate('dashboard')}
            onDelete={() => handleDeleteLead(selectedLead.id)}
            onOutreach={() => handleOpenOutreach(selectedLead)}
            isDark={isDark}
          />
        )}
        {view === 'settings' && (
          <SettingsPage
            settings={settings}
            onUpdate={handleUpdateSettings}
            isDark={isDark}
          />
        )}
      </main>

      {/* Modals */}
      {showGenModal && (
        <GenerateLeadsModal
          onClose={() => setShowGenModal(false)}
          onGenerate={handleGenerateLeads}
          onAICommand={handleAICommand}
          isGenerating={isGenerating}
          isDark={isDark}
        />
      )}
      {showOutreachModal && outreachLead && (
        <OutreachModal
          lead={outreachLead}
          onClose={() => setShowOutreachModal(false)}
          generateMessage={generateOutreachMessage}
          isDark={isDark}
        />
      )}
    </div>
  );
}

export default App;
