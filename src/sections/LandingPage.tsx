import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import type { DashboardStats } from '@/types/lead';
import { Zap, Target, MessageSquare, TrendingUp, Users, BarChart3, ArrowRight, Sparkles, Shield } from 'lucide-react';

interface Props {
  onStart: () => void;
  onGenerate: () => void;
  stats: DashboardStats;
  isDark: boolean;
}

export default function LandingPage({ onStart, onGenerate, stats, isDark }: Props) {
  const heroRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.from('.hero-title', { opacity: 0, y: 40, duration: 1, ease: 'power3.out', delay: 0.2 });
      gsap.from('.hero-subtitle', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out', delay: 0.5 });
      gsap.from('.hero-cta', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out', delay: 0.8 });
      gsap.from('.hero-stats', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out', delay: 1 });
      gsap.from('.feature-card', {
        opacity: 0, y: 40, stagger: 0.15, duration: 0.7, ease: 'power3.out', delay: 1.2,
      });

      // Floating particles
      const particles = particlesRef.current?.children;
      if (particles) {
        Array.from(particles).forEach((p, i) => {
          gsap.to(p, {
            y: `random(-100, 100)`,
            x: `random(-50, 50)`,
            duration: `random(3, 6)`,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.3,
          });
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'AI Lead Generator',
      description: 'Automatically discover and scrape qualified leads from LinkedIn, Upwork, Fiverr, and business directories.',
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Smart Qualification',
      description: 'AI-powered scoring system labels leads as Hot, Warm, or Cold based on company size, signals, and fit.',
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'Outreach Generator',
      description: 'Generate personalized LinkedIn DMs, cold emails, and WhatsApp messages tailored to each lead.',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Analytics Dashboard',
      description: 'Track your pipeline with beautiful charts, filter leads, and export data to CSV with one click.',
    },
  ];

  return (
    <div ref={heroRef} className="relative overflow-hidden min-h-screen">
      {/* Animated Background Particles */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.15 + Math.random() * 0.1,
            }}
          />
        ))}
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} 1px, transparent 1px),
                           linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between px-6 lg:px-12 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            LeadGen<span className="gradient-text"> AI</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={onStart}
            className={`hidden sm:block px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
              isDark ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            Dashboard
          </button>
          <button onClick={onStart} className="btn-primary text-sm flex items-center gap-2">
            Get Started <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 lg:px-12 pt-12 lg:pt-20 pb-20">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div className="hero-title inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-sm font-medium mb-8">
            <Shield className="w-4 h-4" />
            AI-Powered Lead Generation for Virtual Assistants
          </div>

          {/* Title */}
          <h1 className={`hero-title text-5xl lg:text-7xl font-bold leading-tight mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Find & Convert
            <br />
            <span className="gradient-text">High-Value Leads</span>
            <br />
            on Autopilot
          </h1>

          {/* Subtitle */}
          <p className={`hero-subtitle text-lg lg:text-xl max-w-2xl mx-auto mb-10 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            The intelligent lead generation system that scrapes, qualifies, and creates personalized outreach
            for your Virtual Assistant business — all powered by AI.
          </p>

          {/* CTAs */}
          <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={onGenerate}
              className="btn-primary text-lg px-8 py-4 flex items-center gap-3"
            >
              <Zap className="w-5 h-5" />
              Generate 50 Leads Now
            </button>
            <button
              onClick={onStart}
              className={`px-8 py-4 rounded-xl font-medium flex items-center gap-2 transition-all duration-300 ${
                isDark ? 'btn-secondary' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg hover:shadow-xl'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              View Dashboard
            </button>
          </div>

          {/* Stats Preview */}
          <div className="hero-stats grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto mb-20">
            {[
              { label: 'Total Leads', value: stats.totalLeads, icon: <Users className="w-5 h-5" />, color: 'blue' },
              { label: 'Hot Leads', value: stats.hotLeads, icon: <Zap className="w-5 h-5" />, color: 'red' },
              { label: 'This Week', value: stats.thisWeek, icon: <TrendingUp className="w-5 h-5" />, color: 'green' },
              { label: 'Conversion', value: `${stats.conversionRate}%`, icon: <Target className="w-5 h-5" />, color: 'orange' },
            ].map((s, i) => (
              <div
                key={i}
                className={`p-5 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                  isDark
                    ? 'bg-white/5 border-white/10 hover:bg-white/10'
                    : 'bg-white/80 border-gray-200/60 shadow-lg hover:shadow-xl'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                  s.color === 'blue' ? 'bg-blue-500/10 text-blue-500' :
                  s.color === 'red' ? 'bg-red-500/10 text-red-500' :
                  s.color === 'green' ? 'bg-green-500/10 text-green-500' :
                  'bg-orange-500/10 text-orange-500'
                }`}>
                  {s.icon}
                </div>
                <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{s.value}</div>
                <div className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Feature Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((f, i) => (
              <div
                key={i}
                className={`feature-card group p-6 rounded-2xl border text-left transition-all duration-500 hover:scale-105 ${
                  isDark
                    ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-orange-500/30'
                    : 'bg-white/80 border-gray-200/60 shadow-lg hover:shadow-2xl hover:border-orange-500/30'
                }`}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/10 to-amber-500/10 flex items-center justify-center text-orange-500 mb-4 group-hover:from-orange-500 group-hover:to-amber-500 group-hover:text-white transition-all duration-300">
                  {f.icon}
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{f.title}</h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{f.description}</p>
              </div>
            ))}
          </div>

          {/* How It Works */}
          <div className="mt-24 max-w-4xl mx-auto">
            <h2 className={`text-3xl lg:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className={`mb-12 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Three simple steps to supercharge your lead generation
            </p>
            <div className="grid sm:grid-cols-3 gap-8">
              {[
                { step: '01', title: 'Generate Leads', desc: 'Use AI to find leads from multiple sources or type a natural language command.' },
                { step: '02', title: 'AI Qualifies', desc: 'Our AI automatically scores each lead as Hot, Warm, or Cold based on fit.' },
                { step: '03', title: 'Outreach Ready', desc: 'Generate personalized messages for LinkedIn, email, or WhatsApp in seconds.' },
              ].map((s, i) => (
                <div key={i} className="relative">
                  <div className="text-6xl font-bold text-orange-500/10 mb-2">{s.step}</div>
                  <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{s.title}</h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <footer className={`mt-24 pt-8 border-t ${isDark ? 'border-white/10 text-gray-500' : 'border-gray-200 text-gray-500'}`}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-500" />
                <span className={`font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>LeadGen AI</span>
              </div>
              <p className="text-sm">AI-powered lead generation for Virtual Assistant businesses</p>
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
}
