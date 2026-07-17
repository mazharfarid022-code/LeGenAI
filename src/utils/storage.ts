import type { Lead, AppSettings } from '@/types/lead';

const LEADS_KEY = 'leadgen_leads';
const SETTINGS_KEY = 'leadgen_settings';

export const defaultSettings: AppSettings = {
  openaiApiKey: '',
  linkedinEmail: '',
  linkedinPassword: '',
  defaultMessageTone: 'professional',
  autoQualify: true,
  darkMode: false,
  notifications: true,
};

export function getLeads(): Lead[] {
  try {
    const data = localStorage.getItem(LEADS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveLead(lead: Lead): void {
  const leads = getLeads();
  const exists = leads.findIndex((l) => l.id === lead.id);
  if (exists >= 0) {
    leads[exists] = lead;
  } else {
    leads.unshift(lead);
  }
  localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
}

export function saveLeads(leads: Lead[]): void {
  localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
}

export function deleteLead(id: string): void {
  const leads = getLeads().filter((l) => l.id !== id);
  localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
}

export function getSettings(): AppSettings {
  try {
    const data = localStorage.getItem(SETTINGS_KEY);
    return data ? { ...defaultSettings, ...JSON.parse(data) } : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

export function saveSettings(settings: AppSettings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function exportToCSV(leads: Lead[]): string {
  const headers = [
    'Name',
    'Email',
    'Company',
    'Website',
    'Industry',
    'Location',
    'Title',
    'Phone',
    'Status',
    'Score',
    'Source',
    'Tags',
    'Created At',
    'Notes',
  ];
  const rows = leads.map((l) => [
    l.name,
    l.email,
    l.company,
    l.website,
    l.industry,
    l.location,
    l.title,
    l.phone || '',
    l.status,
    String(l.score),
    l.source,
    l.tags.join(', '),
    l.createdAt,
    l.notes,
  ]);
  return [headers, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
}

export function downloadCSV(csv: string, filename: string): void {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
