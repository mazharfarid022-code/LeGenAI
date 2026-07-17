import type { Lead, LeadStatus, LeadSource } from '@/types/lead';

const firstNames = [
  'James', 'Sarah', 'Michael', 'Emily', 'David', 'Jessica', 'John', 'Ashley',
  'Robert', 'Amanda', 'William', 'Jennifer', 'Richard', 'Elizabeth', 'Thomas',
  'Stephanie', 'Charles', 'Nicole', 'Daniel', 'Michelle', 'Matthew', 'Lisa',
  'Anthony', 'Rebecca', 'Mark', 'Laura', 'Donald', 'Kimberly', 'Steven',
  'Amy', 'Paul', 'Angela', 'Andrew', 'Melissa', 'Joshua', 'Christina',
  'Kenneth', 'Rachel', 'Kevin', 'Lauren', 'Brian', 'Emma', 'George', 'Olivia',
  'Edward', 'Sophia', 'Ronald', 'Isabella', 'Timothy', 'Mia', 'Jason',
  'Alexandra', 'Jeffrey', 'Morgan', 'Ryan', 'Katherine', 'Jacob', 'Lily',
  'Gary', 'Ella', 'Nicholas', 'Abigail', 'Eric', 'Addison', 'Jonathan',
  'Aubrey', 'Stephen', 'Natalie', 'Larry', 'Hannah', 'Justin', 'Brooklyn',
  'Scott', 'Victoria', 'Brandon', 'Lillian', 'Benjamin', 'Savannah', 'Samuel',
  'Zoey', 'Gregory', 'Leah', 'Frank', 'Zoe', 'Alexander', 'Stella',
  'Raymond', 'Haley', 'Patrick', 'Alyssa', 'Jack', 'Taylor', 'Dennis',
  'Kayla', 'Jerry', 'Hailey', 'Tyler', 'Brianna'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller',
  'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez',
  'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
  'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark',
  'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King',
  'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green',
  'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell',
  'Carter', 'Roberts', 'Gomez', 'Phillips', 'Evans', 'Turner', 'Diaz',
  'Parker', 'Cruz', 'Edwards', 'Collins', 'Reyes', 'Stewart', 'Morris',
  'Morales', 'Murphy', 'Cook', 'Rogers', 'Gutierrez', 'Ortiz', 'Morgan',
  'Cooper', 'Peterson', 'Bailey', 'Reed', 'Kelly', 'Howard', 'Ramos',
  'Kim', 'Cox', 'Ward', 'Richardson', 'Watson', 'Brooks', 'Chavez',
  'Wood', 'James', 'Bennett', 'Gray', 'Mendoza', 'Ruiz', 'Hughes',
  'Price', 'Alvarez', 'Castillo', 'Sanders', 'Patel', 'Myers', 'Long'
];

const companies = [
  'TechFlow Solutions', 'Digital Horizons', 'CloudPeak Systems', 'NexGen Innovations',
  'DataPulse Analytics', 'Streamline Ops', 'Velocity Partners', 'Apex Strategies',
  'Summit Digital', 'Pinnacle Growth', 'BrightPath Media', 'CoreVenture Labs',
  'Synapse Creative', 'Horizon Scale', 'Elevate Marketing', 'Zenith Consulting',
  'FusionPoint Co', 'Atlas Dynamics', 'QuantumLeap Inc', 'NovaSphere',
  'PulseBridge', 'OptimaWorks', 'Stratos Ventures', 'Catalyst Digital',
  'Momentum IQ', 'VividEdge', 'Sparkline Group', 'BoldScale Agency',
  'TrueNorth Labs', 'Kinetic Brands', 'Propel Studios', 'CipherWorks',
  'AuroraTech', 'BeaconForce', 'ClarityHub', 'Drive Results Co',
  'EmberSoft', 'FluxMedia', 'Gridline Partners', 'Helix Digital',
  'Ignite Consulting', 'Jolt Creative', 'Keystone Systems', 'LuminaWorks',
  'MetricFlow', 'NexusBridge', 'OrbitScale', 'PrismPoint', 'Questline',
  'RiseUp Digital', 'SignalForge', 'TitanGrowth', 'Uplift Labs',
  'VertexMedia', 'Waveform Co', 'YieldCraft', 'Zenbridge',
  'AdaptIQ', 'Boostline', 'Crafted Digital', 'Delve Systems',
  'EchoPoint', 'Formulated', 'Grit Agency', 'Harness Labs',
  'Inventive Co', 'Jumpstart Media', 'Karat Consulting', 'Launchpad IQ',
  'Magnify Digital', 'NobleScale', 'Outlier Ventures', 'PivotPoint',
  'Quake Digital', 'RallyWorks', 'Sprint Media', 'Thrive Systems',
  'Upward Labs', 'Vantage Co', 'Wavelength', 'XenonWorks',
  'Yardstick Digital', 'Zestful Media', 'Arcane Tech', 'Blaze Consulting'
];

const industries = [
  'Technology', 'Healthcare', 'Finance', 'E-commerce', 'Real Estate',
  'Marketing', 'Education', 'Legal', 'Consulting', 'Manufacturing',
  'Hospitality', 'Retail', 'SaaS', 'Startup', 'Agency',
  'Non-profit', 'Media', 'Construction', 'Transportation', 'Energy'
];

const locations = [
  'New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX',
  'Phoenix, AZ', 'Philadelphia, PA', 'San Antonio, TX', 'San Diego, CA',
  'Dallas, TX', 'San Jose, CA', 'Austin, TX', 'Jacksonville, FL',
  'Fort Worth, TX', 'Columbus, OH', 'Charlotte, NC', 'San Francisco, CA',
  'Indianapolis, IN', 'Seattle, WA', 'Denver, CO', 'Washington, DC',
  'Boston, MA', 'El Paso, TX', 'Nashville, TN', 'Detroit, MI',
  'Oklahoma City, OK', 'Portland, OR', 'Las Vegas, NV', 'Louisville, KY',
  'Baltimore, MD', 'Milwaukee, WI', 'Albuquerque, NM', 'Tucson, AZ',
  'Fresno, CA', 'Sacramento, CA', 'Mesa, AZ', 'Kansas City, MO',
  'Atlanta, GA', 'Long Beach, CA', 'Colorado Springs, CO', 'Raleigh, NC',
  'Omaha, NE', 'Miami, FL', 'Oakland, CA', 'Minneapolis, MN',
  'Tulsa, OK', 'Cleveland, OH', 'Wichita, KS', 'Arlington, TX',
  'New Orleans, LA', 'Bakersfield, CA', 'Tampa, FL', 'Honolulu, HI',
  'Anaheim, CA', 'Aurora, CO', 'Santa Ana, CA', 'St. Louis, MO',
  'Riverside, CA', 'Corpus Christi, TX', 'Lexington, KY', 'Pittsburgh, PA',
  'Anchorage, AK', 'Stockton, CA', 'Cincinnati, OH', 'Henderson, NV'
];

const titles = [
  'CEO', 'Founder', 'COO', 'VP of Operations', 'Director of Marketing',
  'CMO', 'CTO', 'Managing Director', 'Business Owner', 'President',
  'General Manager', 'Head of Growth', 'Operations Manager', 'Executive Assistant',
  'Chief of Staff', 'VP of Sales', 'Marketing Manager', 'Product Manager',
  'HR Director', 'Finance Director'
];

const companySizes = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'];

const painPoints = [
  'Overwhelmed with administrative tasks',
  'Need help with customer support',
  'Struggling with social media management',
  'Looking to scale operations',
  'Need email and calendar management',
  'Bookkeeping taking too much time',
  'Missing follow-ups with clients',
  'Data entry backlog',
  'Need research assistance',
  'Travel coordination is chaotic',
  'Inbox zero is impossible',
  'Meeting scheduling is a nightmare',
  'CRM management falling behind',
  'Need help with content creation',
  'Project management gaps',
  'Invoice processing delays',
  'HR paperwork piling up',
  'Event planning needs support',
  'Lead follow-up inconsistent',
  'Report generation taking too long'
];

const hiringSignals = [
  'Recently posted job openings',
  'Growing team rapidly',
  'New funding announced',
  'Expanding to new markets',
  'Website redesign in progress',
  'Hiring for operations roles',
  'New product launch',
  'Active on job boards',
  'Company restructuring',
  'Opening new offices'
];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomItems<T>(arr: T[], min: number, max: number): T[] {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateEmail(firstName: string, lastName: string, company: string): string {
  const patterns = [
    `${firstName.toLowerCase()}.${lastName.toLowerCase()}`,
    `${firstName.toLowerCase()[0]}${lastName.toLowerCase()}`,
    `${firstName.toLowerCase()}`,
    `${lastName.toLowerCase()}.${firstName.toLowerCase()[0]}`,
  ];
  const domains = [
    company.toLowerCase().replace(/[^a-z]/g, '') + '.com',
    company.toLowerCase().replace(/[^a-z]/g, '') + '.io',
    company.toLowerCase().replace(/[^a-z]/g, '') + '.co',
    'gmail.com',
    'outlook.com',
  ];
  return `${randomItem(patterns)}@${randomItem(domains)}`;
}

function generateWebsite(company: string): string {
  const domains = ['.com', '.io', '.co', '.net'];
  return `https://www.${company.toLowerCase().replace(/[^a-z]/g, '')}${randomItem(domains)}`;
}

function scoreLead(companySize: string, painPointsCount: number, hiringSignalsCount: number): { score: number; status: LeadStatus } {
  let score = 0;
  score += painPointsCount * 8;
  score += hiringSignalsCount * 12;
  if (companySize === '1-10') score += 15;
  else if (companySize === '11-50') score += 25;
  else if (companySize === '51-200') score += 20;
  else if (companySize === '201-500') score += 15;
  else score += 10;
  score += Math.floor(Math.random() * 15);

  let status: LeadStatus;
  if (score >= 70) status = 'hot';
  else if (score >= 40) status = 'warm';
  else status = 'cold';

  return { score: Math.min(score, 100), status };
}

export function generateMockLeads(count: number, source?: LeadSource): Lead[] {
  const leads: Lead[] = [];
  const sources: LeadSource[] = ['linkedin', 'upwork', 'fiverr', 'directory', 'manual'];

  for (let i = 0; i < count; i++) {
    const firstName = randomItem(firstNames);
    const lastName = randomItem(lastNames);
    const company = randomItem(companies);
    const companySize = randomItem(companySizes);
    const leadPainPoints = randomItems(painPoints, 1, 4);
    const leadHiringSignals = randomItems(hiringSignals, 0, 3);
    const { score, status } = scoreLead(companySize, leadPainPoints.length, leadHiringSignals.length);
    const leadSource = source || randomItem(sources);

    const lead: Lead = {
      id: `lead_${Date.now()}_${i}_${Math.random().toString(36).substr(2, 9)}`,
      name: `${firstName} ${lastName}`,
      email: generateEmail(firstName, lastName, company),
      company,
      website: generateWebsite(company),
      industry: randomItem(industries),
      location: randomItem(locations),
      title: randomItem(titles),
      phone: `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      linkedin: `https://linkedin.com/in/${firstName.toLowerCase()}-${lastName.toLowerCase()}-${Math.floor(Math.random() * 900) + 100}`,
      status,
      score,
      source: leadSource,
      notes: '',
      tags: randomItems(['VA-Needed', 'Follow-Up', 'High-Value', 'SMB', 'Enterprise', 'Startup', 'Decision-Maker'], 1, 4),
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
      companySize,
      hiringSignals: leadHiringSignals,
      painPoints: leadPainPoints,
    };

    leads.push(lead);
  }

  return leads;
}

export function getIndustryOptions(): string[] {
  return industries;
}

export function getLocationOptions(): string[] {
  return locations;
}
