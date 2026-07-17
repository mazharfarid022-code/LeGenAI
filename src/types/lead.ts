export type LeadStatus = 'hot' | 'warm' | 'cold';
export type LeadSource = 'linkedin' | 'upwork' | 'fiverr' | 'directory' | 'manual';
export type MessageType = 'linkedin' | 'email' | 'whatsapp';

export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  website: string;
  industry: string;
  location: string;
  title: string;
  phone?: string;
  linkedin?: string;
  status: LeadStatus;
  score: number;
  source: LeadSource;
  notes: string;
  tags: string[];
  createdAt: string;
  lastContacted?: string;
  companySize?: string;
  hiringSignals?: string[];
  painPoints?: string[];
}

export interface OutreachMessage {
  type: MessageType;
  subject?: string;
  body: string;
  generatedAt: string;
}

export interface LeadFilter {
  status?: LeadStatus | 'all';
  source?: LeadSource | 'all';
  industry?: string;
  search?: string;
  dateRange?: 'today' | 'week' | 'month' | 'all';
}

export interface AppSettings {
  openaiApiKey: string;
  linkedinEmail: string;
  linkedinPassword: string;
  defaultMessageTone: 'professional' | 'friendly' | 'casual';
  autoQualify: boolean;
  darkMode: boolean;
  notifications: boolean;
}

export interface DashboardStats {
  totalLeads: number;
  hotLeads: number;
  warmLeads: number;
  coldLeads: number;
  thisWeek: number;
  conversionRate: number;
}
