import type { Lead, OutreachMessage, MessageType } from '@/types/lead';
import { getSettings } from './storage';

const messageTemplates: Record<MessageType, (lead: Lead, tone: string) => OutreachMessage> = {
  linkedin: (lead, tone) => {
    const intros: Record<string, string> = {
      professional: `Hi ${lead.name.split(' ')[0]}, I came across your profile and was impressed by your work at ${lead.company}.`,
      friendly: `Hey ${lead.name.split(' ')[0]}! Love what you and the team at ${lead.company} are building.`,
      casual: `Hi ${lead.name.split(' ')[0]}! Saw your profile and had to reach out.`,
    };
    const bodies: Record<string, string> = {
      professional: `I specialize in helping ${lead.industry.toLowerCase()} companies like yours streamline operations with dedicated Virtual Assistant support. Many of my clients have freed up 15+ hours per week by delegating admin tasks, scheduling, and customer support.\n\nWould you be open to a quick chat about how a VA could help ${lead.company} scale more efficiently?`,
      friendly: `I've been helping businesses in ${lead.industry} save tons of time with skilled Virtual Assistants. Whether it's inbox management, scheduling, or customer support — a good VA can be a game-changer.\n\nWould love to share how we've helped similar companies. Up for a quick chat sometime this week?`,
      casual: `Quick question — ever feel like admin tasks are eating up your day? I help ${lead.industry.toLowerCase()} biz owners find amazing VAs who handle the busywork so they can focus on growth.\n\nNo pressure at all, but happy to share some tips if you're curious!`,
    };
    const closings: Record<string, string> = {
      professional: `Best regards,\n[Your Name]`,
      friendly: `Cheers,\n[Your Name]`,
      casual: `Talk soon! \uD83D\uDC4B\n[Your Name]`,
    };
    return {
      type: 'linkedin',
      body: `${intros[tone]}\n\n${bodies[tone]}\n\n${closings[tone]}`,
      generatedAt: new Date().toISOString(),
    };
  },
  email: (lead, tone) => {
    const subjects: Record<string, string> = {
      professional: `Streamline ${lead.company}'s Operations — VA Support`,
      friendly: `Helping ${lead.company} grow faster (VA support inside)`,
      casual: `Quick win for ${lead.company} 🚀`,
    };
    const intros: Record<string, string> = {
      professional: `Dear ${lead.name},`,
      friendly: `Hi ${lead.name.split(' ')[0]}!`,
      casual: `Hey ${lead.name.split(' ')[0]}!`,
    };
    const bodies: Record<string, string> = {
      professional: `I hope this message finds you well. My name is [Your Name], and I help ${lead.industry.toLowerCase()} leaders like yourself optimize their workflows through dedicated Virtual Assistant services.\n\nAt ${lead.company}, I imagine you're juggling multiple priorities — from ${lead.painPoints?.[0] || 'daily operations'} to strategic growth initiatives. Our VAs specialize in:\n\n• Calendar & inbox management\n• Customer support & CRM updates\n• Data entry & research\n• Social media coordination\n• Travel & event planning\n\nWould you be available for a brief 15-minute call this week to explore how we can support ${lead.company}'s growth?`,
      friendly: `Hope you're having a great week! I wanted to reach out because I work with a lot of ${lead.industry.toLowerCase()} companies — and the one thing I hear most is how overwhelming the day-to-day admin can get.\n\nThat's exactly what we solve. Our Virtual Assistants help teams like yours reclaim 15+ hours every week by handling:\n\n✅ Email and calendar management\n✅ Client follow-ups and CRM updates\n✅ Research and data entry\n✅ Social media and content scheduling\n✅ Travel and meeting coordination\n\nI'd love to show you how it works — no commitment needed. Could we hop on a quick 15-minute call this week?`,
      casual: `So — real talk: how's the workload at ${lead.company}? I talk to a lot of ${lead.industry.toLowerCase()} founders, and the #1 thing they say is "I just need more hours in the day."\n\nThat's where we come in. We match busy teams with amazing Virtual Assistants who basically become your right-hand person:\n\n📅 Inbox zero (finally)\n📅 Calendar that actually makes sense\n📅 Customer follow-ups on autopilot\n📅 Research and data entry — done\n📅 Social media handled\n\nWant to see how it works? I promise it's not boring 😄 Let's do a quick 15-min call!`,
    };
    const closings: Record<string, string> = {
      professional: `Best regards,\n[Your Name]\n[Your Title]\n[Phone] | [Email]`,
      friendly: `Cheers,\n[Your Name]\n[Phone] | [Email]`,
      casual: `Catch you soon! \uD83D\uDC4B\n[Your Name]\n[Phone] | [Email]`,
    };
    return {
      type: 'email',
      subject: subjects[tone],
      body: `${intros[tone]}\n\n${bodies[tone]}\n\n${closings[tone]}`,
      generatedAt: new Date().toISOString(),
    };
  },
  whatsapp: (lead, tone) => {
    const intros: Record<string, string> = {
      professional: `Hello ${lead.name}, this is [Your Name] from [Your Company].`,
      friendly: `Hey ${lead.name.split(' ')[0]}! [Your Name] here 👋`,
      casual: `Yo ${lead.name.split(' ')[0]}! [Your Name] here \uD83D\uDC4B`,
    };
    const bodies: Record<string, string> = {
      professional: `I work with ${lead.industry.toLowerCase()} businesses to provide dedicated Virtual Assistant support. I noticed ${lead.company} might benefit from streamlined admin operations.\n\nWould you be interested in learning how a VA could save your team 15+ hours per week? Happy to share more details.`,
      friendly: `I help busy teams like yours find amazing Virtual Assistants. Whether it's inbox management, scheduling, or customer support — we've got you covered.\n\nWant me to send over how it works? No pressure at all! 😊`,
      casual: `Quick Q: ever wish you had a clone to handle all the boring stuff? That's basically what our VAs do 😄\n\nWant me to show you how it works? Super low-key, just sharing info!`,
    };
    return {
      type: 'whatsapp',
      body: `${intros[tone]}\n\n${bodies[tone]}`,
      generatedAt: new Date().toISOString(),
    };
  },
};

export async function generateOutreachMessage(lead: Lead, type: MessageType): Promise<OutreachMessage> {
  const settings = getSettings();

  // If API key is configured, attempt real AI generation
  if (settings.openaiApiKey && settings.openaiApiKey.startsWith('sk-')) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${settings.openaiApiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `You are an expert sales outreach specialist. Generate a ${type} outreach message for a Virtual Assistant service. Tone: ${settings.defaultMessageTone}.`,
            },
            {
              role: 'user',
              content: `Generate a ${type} message for:\nName: ${lead.name}\nCompany: ${lead.company}\nIndustry: ${lead.industry}\nTitle: ${lead.title}\nPain Points: ${lead.painPoints?.join(', ')}\nKeep it concise and personalized.`,
            },
          ],
          max_tokens: 300,
          temperature: 0.7,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          return {
            type,
            subject: type === 'email' ? `VA Support for ${lead.company}` : undefined,
            body: content,
            generatedAt: new Date().toISOString(),
          };
        }
      }
    } catch {
      // Fall back to templates
    }
  }

  // Use template-based generation (mock)
  return messageTemplates[type](lead, settings.defaultMessageTone);
}

export async function generateAICommandLeads(command: string): Promise<{ count: number; filters: Record<string, string> }> {
  const lower = command.toLowerCase();
  let count = 20;
  const filters: Record<string, string> = {};

  // Parse count
  const countMatch = lower.match(/(\d+)\s/);
  if (countMatch) count = Math.min(parseInt(countMatch[1]), 100);

  // Parse industry
  if (lower.includes('tech') || lower.includes('technology')) filters.industry = 'Technology';
  else if (lower.includes('health') || lower.includes('medical')) filters.industry = 'Healthcare';
  else if (lower.includes('finance') || lower.includes('financial')) filters.industry = 'Finance';
  else if (lower.includes('real estate')) filters.industry = 'Real Estate';
  else if (lower.includes('marketing') || lower.includes('agency')) filters.industry = 'Marketing';
  else if (lower.includes('e-commerce') || lower.includes('ecommerce') || lower.includes('retail')) filters.industry = 'E-commerce';

  // Parse location
  if (lower.includes('usa') || lower.includes('united states') || lower.includes('america')) filters.location = 'US';
  else if (lower.includes('uk') || lower.includes('united kingdom') || lower.includes('london')) filters.location = 'UK';
  else if (lower.includes('canada') || lower.includes('toronto')) filters.location = 'Canada';

  // Parse source
  if (lower.includes('linkedin')) filters.source = 'linkedin';
  else if (lower.includes('upwork')) filters.source = 'upwork';
  else if (lower.includes('fiverr')) filters.source = 'fiverr';

  return { count, filters };
}
