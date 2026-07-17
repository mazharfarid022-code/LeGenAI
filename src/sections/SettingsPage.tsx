import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import type { AppSettings } from '@/types/lead';
import {
  Settings, Key, Mail, MessageCircle,
  Bell, Moon, Sun, Save, Eye, EyeOff, Sparkles, Shield
} from 'lucide-react';

interface Props {
  settings: AppSettings;
  onUpdate: (s: AppSettings) => void;
  isDark: boolean;
}

export default function SettingsPage({ settings, onUpdate, isDark }: Props) {
  const pageRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<AppSettings>({ ...settings });
  const [showApiKey, setShowApiKey] = useState(false);
  const [showLinkedInPassword, setShowLinkedInPassword] = useState(false);

  useEffect(() => {
    setForm({ ...settings });
  }, [settings]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.settings-card', { opacity: 0, y: 30, stagger: 0.1, duration: 0.6, ease: 'power3.out' });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const handleSave = () => {
    onUpdate({ ...form });
  };

  const inputClasses = `w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
    isDark
      ? 'bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-orange-500/50'
      : 'bg-gray-50 border-gray-200 text-slate-900 placeholder-gray-400 focus:border-orange-300'
  }`;

  const labelClasses = `block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`;

  return (
    <div ref={pageRef} className="min-h-screen px-4 lg:px-8 pt-24 pb-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className={`text-3xl font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Settings
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Configure your AI integrations and preferences
            </p>
          </div>
          <button onClick={handleSave} className="btn-primary text-sm flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>

        {/* AI Integration */}
        <div className={`settings-card p-6 rounded-2xl border mb-6 ${
          isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-lg'
        }`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 flex items-center justify-center">
              <Key className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>AI Integration</h3>
              <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Connect OpenAI for real AI-generated outreach</p>
            </div>
          </div>

          <div className="mb-4">
            <label className={labelClasses}>OpenAI API Key</label>
            <div className="relative">
              <input
                type={showApiKey ? 'text' : 'password'}
                value={form.openaiApiKey}
                onChange={(e) => setForm({ ...form, openaiApiKey: e.target.value })}
                placeholder="sk-..."
                className={`${inputClasses} pr-12`}
              />
              <button
                onClick={() => setShowApiKey(!showApiKey)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className={`text-xs mt-2 ${isDark ? 'text-gray-600' : 'text-gray-500'}`}>
              Your API key is stored locally in your browser. Leave empty to use template-based generation.
            </p>
          </div>
        </div>

        {/* LinkedIn Integration */}
        <div className={`settings-card p-6 rounded-2xl border mb-6 ${
          isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-lg'
        }`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>LinkedIn Integration</h3>
              <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>For automated LinkedIn outreach (coming soon)</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClasses}>LinkedIn Email</label>
              <input
                type="email"
                value={form.linkedinEmail}
                onChange={(e) => setForm({ ...form, linkedinEmail: e.target.value })}
                placeholder="you@example.com"
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>LinkedIn Password</label>
              <div className="relative">
                <input
                  type={showLinkedInPassword ? 'text' : 'password'}
                  value={form.linkedinPassword}
                  onChange={(e) => setForm({ ...form, linkedinPassword: e.target.value })}
                  placeholder="••••••••"
                  className={`${inputClasses} pr-12`}
                />
                <button
                  onClick={() => setShowLinkedInPassword(!showLinkedInPassword)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  {showLinkedInPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Message Settings */}
        <div className={`settings-card p-6 rounded-2xl border mb-6 ${
          isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-lg'
        }`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/10 to-amber-500/10 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Message Settings</h3>
              <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Customize your outreach message style</p>
            </div>
          </div>

          <div>
            <label className={labelClasses}>Default Message Tone</label>
            <div className="grid grid-cols-3 gap-3">
              {(['professional', 'friendly', 'casual'] as const).map((tone) => (
                <button
                  key={tone}
                  onClick={() => setForm({ ...form, defaultMessageTone: tone })}
                  className={`px-4 py-3 rounded-xl text-sm font-medium border transition-all duration-300 ${
                    form.defaultMessageTone === tone
                      ? 'border-orange-500 bg-orange-500/10 text-orange-500 shadow-lg shadow-orange-500/10'
                      : isDark
                        ? 'border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-300'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-800'
                  }`}
                >
                  {tone.charAt(0).toUpperCase() + tone.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* App Preferences */}
        <div className={`settings-card p-6 rounded-2xl border mb-6 ${
          isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-lg'
        }`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/10 to-violet-500/10 flex items-center justify-center">
              <Settings className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>App Preferences</h3>
              <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Customize your app experience</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Dark Mode */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isDark ? <Moon className="w-5 h-5 text-gray-400" /> : <Sun className="w-5 h-5 text-gray-500" />}
                <div>
                  <div className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Dark Mode</div>
                  <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Toggle dark theme</div>
                </div>
              </div>
              <button
                onClick={() => setForm({ ...form, darkMode: !form.darkMode })}
                className={`relative w-12 h-7 rounded-full transition-all duration-300 ${
                  form.darkMode ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-700'
                }`}
              >
                <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300 ${
                  form.darkMode ? 'left-6' : 'left-1'
                }`} />
              </button>
            </div>

            {/* Auto Qualify */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-gray-400" />
                <div>
                  <div className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Auto-Qualify Leads</div>
                  <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Automatically score leads on generation</div>
                </div>
              </div>
              <button
                onClick={() => setForm({ ...form, autoQualify: !form.autoQualify })}
                className={`relative w-12 h-7 rounded-full transition-all duration-300 ${
                  form.autoQualify ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-700'
                }`}
              >
                <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300 ${
                  form.autoQualify ? 'left-6' : 'left-1'
                }`} />
              </button>
            </div>

            {/* Notifications */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-400" />
                <div>
                  <div className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Notifications</div>
                  <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Show toast notifications</div>
                </div>
              </div>
              <button
                onClick={() => setForm({ ...form, notifications: !form.notifications })}
                className={`relative w-12 h-7 rounded-full transition-all duration-300 ${
                  form.notifications ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-700'
                }`}
              >
                <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300 ${
                  form.notifications ? 'left-6' : 'left-1'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className={`settings-card p-6 rounded-2xl border ${
          isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-lg'
        }`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/10 to-pink-500/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Data Management</h3>
              <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Manage your stored data</p>
            </div>
          </div>

          <button
            onClick={() => {
              if (confirm('Are you sure you want to clear all leads? This cannot be undone.')) {
                localStorage.removeItem('leadgen_leads');
                window.location.reload();
              }
            }}
            className={`px-5 py-3 rounded-xl text-sm font-medium border transition-all ${
              isDark
                ? 'border-red-500/30 text-red-400 hover:bg-red-500/10'
                : 'border-red-200 text-red-600 hover:bg-red-50'
            }`}
          >
            Clear All Leads
          </button>
          <p className={`text-xs mt-3 ${isDark ? 'text-gray-600' : 'text-gray-500'}`}>
            This will permanently delete all your saved leads from local storage.
          </p>
        </div>
      </div>
    </div>
  );
}
