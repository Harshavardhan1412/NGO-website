// Mock data for the entire NGO Management System

export const ngoInfo = {
  name: "Prajwalaa Community Development Society",
  shortName: "PCDS",
  tagline: "Empowering Communities, Transforming Lives",
  mission: "We are committed to breaking the cycle of poverty and creating opportunities for vulnerable communities through education, healthcare, and sustainable development programs.",
  vision: "A world where every person has the opportunity to thrive and live a life of dignity and hope.",
  founded: 2019,
  email: "pcds.guntur@gmail.com",
  phone: "+91 95020 46096",
  address: "Regd No. 240/2019, Guntur, Andhra Pradesh, India",
  website: "www.pcdsngo.org",
};

export const impactStats = [
  { label: "Lives Impacted", value: 50000, icon: "Heart", color: "#EF4444", suffix: "+" },
  { label: "Communities Served", value: 120, icon: "Globe", color: "#2563EB", suffix: "+" },
  { label: "Countries Reached", value: 35, icon: "MapPin", color: "#10B981", suffix: "" },
  { label: "Active Volunteers", value: 500, icon: "Users", color: "#F59E0B", suffix: "+" },
];

export const programs = [
  {
    id: 1,
    title: "Education for All",
    description: "Providing quality education and learning resources to underprivileged children.",
    icon: "BookOpen",
    color: "#2563EB",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Healthcare Access",
    description: "Delivering essential medical care and health education to remote communities.",
    icon: "Stethoscope",
    color: "#10B981",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "Clean Water Initiative",
    description: "Building wells and water systems to provide safe drinking water.",
    icon: "Droplets",
    color: "#3B82F6",
    image: "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    title: "Housing & Shelter",
    description: "Constructing safe, sustainable homes for families in need.",
    icon: "Home",
    color: "#F59E0B",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Ramesh Sharma",
    role: "Resident Elder",
    text: "Asha Kiran gave me a second family. At 78, I never expected to be surrounded by such care and warmth. The staff here treat me like their own grandfather.",
    rating: 5,
    avatar: "RS",
    color: "#F59E0B",
  },
  {
    id: 2,
    name: "Priya Nair",
    role: "Volunteer Coordinator",
    text: "Volunteering here changed my perspective on life. Seeing how a smile and a meal can transform someone's day — it's the most rewarding work I've ever done.",
    rating: 5,
    avatar: "PN",
    color: "#10B981",
  },
  {
    id: 3,
    name: "Dr. Anika Mehta",
    role: "Medical Volunteer",
    text: "The mobile healthcare unit reaches people who haven't seen a doctor in years. Asha Kiran's commitment to healthcare equity is truly inspiring.",
    rating: 5,
    avatar: "AM",
    color: "#2563EB",
  },
  {
    id: 4,
    name: "Sunita Devi",
    role: "Beneficiary Mother",
    text: "Thanks to the food distribution program, my children never go to bed hungry. The foundation has been our lifeline through the hardest times.",
    rating: 5,
    avatar: "SD",
    color: "#EF4444",
  },
  {
    id: 5,
    name: "Vikram Joshi",
    role: "Corporate Donor",
    text: "I've donated to many NGOs but Asha Kiran's transparency and impact reports give me complete confidence that every rupee is used effectively.",
    rating: 5,
    avatar: "VJ",
    color: "#8B5CF6",
  },
];

export const events = [
  {
    id: 1,
    title: "Annual Health Camp 2026",
    date: "2026-06-15",
    time: "9:00 AM – 4:00 PM",
    location: "Dharavi Community Center, Mumbai",
    description: "Free health check-ups, blood tests, dental care, and eye testing for 500+ residents.",
    category: "Healthcare",
    color: "#10B981",
    spots: 500,
  },
  {
    id: 2,
    title: "Monsoon Food Drive",
    date: "2026-06-28",
    time: "8:00 AM – 6:00 PM",
    location: "Multiple locations across Mumbai",
    description: "Distribution of emergency ration kits to 1000 families ahead of the monsoon season.",
    category: "Food",
    color: "#F59E0B",
    spots: 1000,
  },
  {
    id: 3,
    title: "Volunteer Orientation Day",
    date: "2026-07-05",
    time: "10:00 AM – 1:00 PM",
    location: "Asha Kiran Foundation HQ",
    description: "Onboarding session for new volunteers with training modules and team introductions.",
    category: "Volunteer",
    color: "#2563EB",
    spots: 80,
  },
  {
    id: 4,
    title: "Women Skill Development Workshop",
    date: "2026-07-18",
    time: "11:00 AM – 3:00 PM",
    location: "Andheri Community Hall",
    description: "Tailoring, handicraft, and digital literacy workshops for 200 women beneficiaries.",
    category: "Empowerment",
    color: "#8B5CF6",
    spots: 200,
  },
];

export const donationTiers = [
  {
    id: 1,
    amount: 500,
    title: "Seed of Hope",
    description: "Provides one day's meals for 10 elderly residents",
    icon: "Leaf",
    color: "#10B981",
    progress: 72,
    goal: 50000,
    raised: 36000,
  },
  {
    id: 2,
    amount: 2000,
    title: "Care Champion",
    description: "Sponsors a month of medicines for one resident",
    icon: "Shield",
    color: "#2563EB",
    progress: 58,
    goal: 200000,
    raised: 116000,
    featured: true,
  },
  {
    id: 3,
    amount: 10000,
    title: "Life Transformer",
    description: "Funds a complete health camp for 50 people",
    icon: "Star",
    color: "#F59E0B",
    progress: 45,
    goal: 500000,
    raised: 225000,
  },
];

// ─── Admin Dashboard Data ───────────────────────────────────────────────

export const dashboardStats = [
  { label: "Total Elderly Residents", value: 148, change: "+5", positive: true, icon: "Users", color: "#2563EB", bg: "from-blue-500 to-blue-600" },
  { label: "Staff Present Today", value: 42, change: "of 48", positive: true, icon: "UserCheck", color: "#10B981", bg: "from-emerald-500 to-emerald-600" },
  { label: "Medicines Available", value: 324, change: "-12 today", positive: false, icon: "Pill", color: "#F59E0B", bg: "from-amber-500 to-orange-500" },
  { label: "Ration Stock (kg)", value: 2840, change: "+500 added", positive: true, icon: "Package", color: "#8B5CF6", bg: "from-purple-500 to-violet-600" },
  { label: "Donations This Month", value: "₹4.2L", change: "+18%", positive: true, icon: "TrendingUp", color: "#EF4444", bg: "from-rose-500 to-pink-500" },
  { label: "Volunteers Active", value: 87, change: "+12 new", positive: true, icon: "Heart", color: "#EC4899", bg: "from-pink-500 to-fuchsia-500" },
];

export const monthlyActivityData = [
  { month: "Jan", meals: 9200, medicines: 1800, volunteers: 65, donations: 320000 },
  { month: "Feb", meals: 8800, medicines: 2100, volunteers: 72, donations: 285000 },
  { month: "Mar", meals: 10500, medicines: 1950, volunteers: 78, donations: 410000 },
  { month: "Apr", meals: 11200, medicines: 2300, volunteers: 85, donations: 380000 },
  { month: "May", meals: 10800, medicines: 2150, volunteers: 87, donations: 420000 },
  { month: "Jun", meals: 12100, medicines: 2600, volunteers: 92, donations: 460000 },
  { month: "Jul", meals: 11500, medicines: 2400, volunteers: 88, donations: 390000 },
  { month: "Aug", meals: 13200, medicines: 2800, volunteers: 95, donations: 510000 },
  { month: "Sep", meals: 12800, medicines: 2650, volunteers: 91, donations: 480000 },
  { month: "Oct", meals: 14100, medicines: 3100, volunteers: 102, donations: 560000 },
  { month: "Nov", meals: 13600, medicines: 2900, volunteers: 98, donations: 520000 },
  { month: "Dec", meals: 15200, medicines: 3400, volunteers: 110, donations: 620000 },
];

export const donationPieData = [
  { name: "Healthcare", value: 35, color: "#10B981" },
  { name: "Food & Nutrition", value: 28, color: "#F59E0B" },
  { name: "Elderly Care", value: 20, color: "#2563EB" },
  { name: "Education", value: 10, color: "#8B5CF6" },
  { name: "Admin & Ops", value: 7, color: "#94A3B8" },
];

export const staffList = [
  { id: "S001", name: "Kavitha Reddy", role: "Head Nurse", department: "Healthcare", phone: "98765 11111", status: "Active", attendance: 96, joinDate: "2019-03-15", shift: "Morning", leaves: 2 },
  { id: "S002", name: "Mohan Pillai", role: "Cook / Nutritionist", department: "Kitchen", phone: "98765 22222", status: "Active", attendance: 92, joinDate: "2020-07-01", shift: "Morning", leaves: 4 },
  { id: "S003", name: "Deepa Nair", role: "Social Worker", department: "Welfare", phone: "98765 33333", status: "Active", attendance: 88, joinDate: "2018-11-20", shift: "Day", leaves: 6 },
  { id: "S004", name: "Arjun Singh", role: "Security Guard", department: "Security", phone: "98765 44444", status: "On Leave", attendance: 79, joinDate: "2021-02-10", shift: "Night", leaves: 8 },
  { id: "S005", name: "Lakshmi Iyer", role: "Physiotherapist", department: "Healthcare", phone: "98765 55555", status: "Active", attendance: 94, joinDate: "2020-09-05", shift: "Day", leaves: 3 },
  { id: "S006", name: "Rahul Gupta", role: "Administrator", department: "Admin", phone: "98765 66666", status: "Active", attendance: 98, joinDate: "2017-06-01", shift: "Morning", leaves: 1 },
  { id: "S007", name: "Meena Kumari", role: "Caregiver", department: "Elderly Care", phone: "98765 77777", status: "Active", attendance: 91, joinDate: "2022-01-15", shift: "Morning", leaves: 5 },
  { id: "S008", name: "Suresh Babu", role: "Driver", department: "Logistics", phone: "98765 88888", status: "Active", attendance: 85, joinDate: "2021-08-20", shift: "Day", leaves: 7 },
];

export const elderlyList = [
  { id: "E001", name: "Ramesh Sharma", age: 78, gender: "Male", room: "A-101", health: "Stable", admitted: "2022-03-10", condition: "Diabetes, Hypertension", contact: "Suresh Sharma (Son) - 98111 22222", diet: "Diabetic", attendance: 98 },
  { id: "E002", name: "Sumitra Devi", age: 74, gender: "Female", room: "B-205", health: "Good", admitted: "2021-07-22", condition: "Arthritis", contact: "Priya Singh (Daughter) - 98222 33333", diet: "Regular", attendance: 95 },
  { id: "E003", name: "Gopalakrishnan T", age: 82, gender: "Male", room: "A-103", health: "Critical", admitted: "2020-01-05", condition: "Heart Disease, COPD", contact: "Anand G (Son) - 98333 44444", diet: "Low-Sodium", attendance: 88 },
  { id: "E004", name: "Leela Menon", age: 69, gender: "Female", room: "C-302", health: "Good", admitted: "2023-05-18", condition: "Mild Dementia", contact: "Ravi Menon (Husband) - 98444 55555", diet: "Regular", attendance: 92 },
  { id: "E005", name: "Mohan Das", age: 75, gender: "Male", room: "B-208", health: "Stable", admitted: "2022-11-30", condition: "Hypertension", contact: "Kavita Das (Daughter) - 98555 66666", diet: "Low-Salt", attendance: 96 },
  { id: "E006", name: "Savitri Rao", age: 80, gender: "Female", room: "A-105", health: "Good", admitted: "2021-03-08", condition: "Osteoporosis", contact: "Raju Rao (Son) - 98666 77777", diet: "Calcium-rich", attendance: 94 },
];

export const medicineList = [
  { id: "M001", name: "Metformin 500mg", category: "Diabetes", stock: 450, unit: "Tablets", expiry: "2026-12-31", reorderLevel: 100, supplier: "MedSupply Co.", status: "Adequate" },
  { id: "M002", name: "Amlodipine 5mg", category: "Hypertension", stock: 38, unit: "Tablets", expiry: "2026-08-15", reorderLevel: 50, supplier: "PharmaCare", status: "Low Stock" },
  { id: "M003", name: "Atorvastatin 10mg", category: "Cholesterol", stock: 200, unit: "Tablets", expiry: "2027-03-20", reorderLevel: 80, supplier: "MedSupply Co.", status: "Adequate" },
  { id: "M004", name: "Vitamin D3 1000IU", category: "Supplement", stock: 12, unit: "Capsules", expiry: "2026-05-30", reorderLevel: 50, supplier: "NutriHealth", status: "Critical" },
  { id: "M005", name: "Omeprazole 20mg", category: "Gastro", stock: 180, unit: "Capsules", expiry: "2026-11-10", reorderLevel: 60, supplier: "PharmaCare", status: "Adequate" },
  { id: "M006", name: "Aspirin 75mg", category: "Cardiac", stock: 65, unit: "Tablets", expiry: "2026-09-25", reorderLevel: 100, supplier: "CardioMed", status: "Low Stock" },
  { id: "M007", name: "Calcium Carbonate 500mg", category: "Supplement", stock: 320, unit: "Tablets", expiry: "2027-06-15", reorderLevel: 80, supplier: "NutriHealth", status: "Adequate" },
  { id: "M008", name: "Salbutamol Inhaler", category: "Respiratory", stock: 8, unit: "Units", expiry: "2026-07-01", reorderLevel: 15, supplier: "RespiCare", status: "Critical" },
];

export const rationList = [
  { id: "R001", item: "Rice (Basmati)", category: "Grain", stock: 850, unit: "kg", reorderLevel: 200, lastRestocked: "2026-05-01", supplier: "AgriSupplies", status: "Adequate" },
  { id: "R002", item: "Wheat Flour", category: "Grain", stock: 420, unit: "kg", reorderLevel: 150, lastRestocked: "2026-05-03", supplier: "GrainMart", status: "Adequate" },
  { id: "R003", item: "Dal (Toor)", category: "Pulses", stock: 85, unit: "kg", reorderLevel: 100, lastRestocked: "2026-04-28", supplier: "PulseHub", status: "Low Stock" },
  { id: "R004", item: "Cooking Oil", category: "Oils & Fats", stock: 120, unit: "litres", reorderLevel: 50, lastRestocked: "2026-05-05", supplier: "OilMart", status: "Adequate" },
  { id: "R005", item: "Sugar", category: "Sweeteners", stock: 180, unit: "kg", reorderLevel: 60, lastRestocked: "2026-05-02", supplier: "SugarCo", status: "Adequate" },
  { id: "R006", item: "Salt", category: "Condiments", stock: 25, unit: "kg", reorderLevel: 30, lastRestocked: "2026-04-20", supplier: "SaltWorks", status: "Low Stock" },
  { id: "R007", item: "Milk (Packets)", category: "Dairy", stock: 48, unit: "litres/day", reorderLevel: 0, lastRestocked: "2026-05-13", supplier: "DairyFresh", status: "Daily" },
  { id: "R008", item: "Vegetables (Mixed)", category: "Produce", stock: 95, unit: "kg", reorderLevel: 30, lastRestocked: "2026-05-12", supplier: "VeggieFarm", status: "Adequate" },
];

export const donorList = [
  { id: "D001", name: "Tata Consultancy Services", type: "Corporate", amount: 500000, date: "2026-05-01", method: "Bank Transfer", purpose: "Healthcare Fund", status: "Received" },
  { id: "D002", name: "Rajesh & Sunita Patel", type: "Individual", amount: 25000, date: "2026-05-03", method: "Online", purpose: "Food Distribution", status: "Received" },
  { id: "D003", name: "Mumbai Lions Club", type: "Organization", amount: 150000, date: "2026-04-28", method: "Cheque", purpose: "General Fund", status: "Received" },
  { id: "D004", name: "Ananya Krishnan", type: "Individual", amount: 10000, date: "2026-05-08", method: "UPI", purpose: "Elderly Care", status: "Received" },
  { id: "D005", name: "Infosys Foundation", type: "Corporate", amount: 1000000, date: "2026-04-15", method: "Bank Transfer", purpose: "Infrastructure", status: "Received" },
  { id: "D006", name: "Rotary Club Andheri", type: "Organization", amount: 75000, date: "2026-05-10", method: "Cheque", purpose: "Medicine Fund", status: "Processing" },
  { id: "D007", name: "Vikram Mehta", type: "Individual", amount: 5000, date: "2026-05-12", method: "UPI", purpose: "General Fund", status: "Received" },
];

export const volunteerList = [
  { id: "V001", name: "Aditya Kumar", email: "aditya@mail.com", phone: "98100 11111", skills: ["First Aid", "Teaching"], area: "Healthcare", status: "Active", joined: "2025-01-15", hours: 120, rating: 5 },
  { id: "V002", name: "Nisha Patel", email: "nisha@mail.com", phone: "98100 22222", skills: ["Cooking", "Management"], area: "Food Services", status: "Active", joined: "2025-03-08", hours: 85, rating: 4 },
  { id: "V003", name: "Sanjay Mehta", email: "sanjay@mail.com", phone: "98100 33333", skills: ["Driving", "Logistics"], area: "Distribution", status: "Active", joined: "2024-11-20", hours: 200, rating: 5 },
  { id: "V004", name: "Preethi Ram", email: "preethi@mail.com", phone: "98100 44444", skills: ["Counselling", "Social Work"], area: "Welfare", status: "Inactive", joined: "2025-05-10", hours: 40, rating: 3 },
  { id: "V005", name: "Kiran Desai", email: "kiran@mail.com", phone: "98100 55555", skills: ["Photography", "Events"], area: "Communications", status: "Active", joined: "2025-02-14", hours: 65, rating: 4 },
];

export const notifications = [
  { id: 1, type: "danger", title: "Critical Stock Alert", message: "Vitamin D3 1000IU is critically low (12 units). Reorder immediately.", time: "10 mins ago", read: false },
  { id: 2, type: "danger", title: "Missed Medication", message: "Resident E003 (Gopalakrishnan) missed morning dose of Salbutamol Inhaler.", time: "1 hour ago", read: false },
  { id: 3, type: "warning", title: "Low Stock Warning", message: "Amlodipine 5mg stock is below reorder level (38/50 units).", time: "2 hours ago", read: false },
  { id: 4, type: "warning", title: "Attendance Alert", message: "Staff member S004 (Arjun Singh) absent without notification today.", time: "3 hours ago", read: true },
  { id: 5, type: "info", title: "Event Reminder", message: "Annual Health Camp is scheduled for June 15, 2026. 23 days remaining.", time: "5 hours ago", read: true },
  { id: 6, type: "success", title: "New Donation Received", message: "₹5,000 received from Vikram Mehta via UPI for General Fund.", time: "6 hours ago", read: true },
  { id: 7, type: "info", title: "New Volunteer", message: "Aditya Kumar has completed orientation and is now active.", time: "1 day ago", read: true },
  { id: 8, type: "warning", title: "Dal Stock Low", message: "Toor Dal stock (85kg) is approaching reorder level (100kg).", time: "1 day ago", read: true },
];

export const staffAttendanceData = [
  { id: "SA001", staffId: "S001", date: new Date().toISOString().split('T')[0], status: "Present", checkIn: "08:00 AM", checkOut: "04:00 PM" },
  { id: "SA002", staffId: "S002", date: new Date().toISOString().split('T')[0], status: "Present", checkIn: "07:30 AM", checkOut: "03:30 PM" },
  { id: "SA003", staffId: "S003", date: new Date().toISOString().split('T')[0], status: "Present", checkIn: "09:00 AM", checkOut: "05:00 PM" },
  { id: "SA004", staffId: "S004", date: new Date().toISOString().split('T')[0], status: "Leave", checkIn: "-", checkOut: "-" },
  { id: "SA005", staffId: "S005", date: new Date().toISOString().split('T')[0], status: "Present", checkIn: "09:15 AM", checkOut: "05:15 PM" },
];

export const elderlyAttendanceData = [
  { id: "EA001", residentId: "E001", date: new Date().toISOString().split('T')[0], status: "Present", notes: "Regular checkup done" },
  { id: "EA002", residentId: "E002", date: new Date().toISOString().split('T')[0], status: "Present", notes: "Participated in yoga" },
  { id: "EA003", residentId: "E003", date: new Date().toISOString().split('T')[0], status: "Hospitalized", notes: "Admitted to City Hospital for observation" },
  { id: "EA004", residentId: "E004", date: new Date().toISOString().split('T')[0], status: "Present", notes: "" },
  { id: "EA005", residentId: "E005", date: new Date().toISOString().split('T')[0], status: "Present", notes: "" },
];
