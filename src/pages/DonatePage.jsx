import { Link } from 'react-router-dom';
import { ArrowLeft, Copy, CheckCircle, Landmark, QrCode, ShieldCheck, Heart } from 'lucide-react';
import { useState } from 'react';
import Navbar from '../components/public/Navbar';
import Footer from '../components/public/Footer';
import SocialFAB from '../components/public/SocialFAB';

export default function DonatePage() {
  const [copied, setCopied] = useState(null);

  const bankDetails = {
    accountName: "PRAJWALAA COMMUNITY DEVELOPMENT SOCIETY",
    accountNumber: "987654321098",
    bankName: "HDFC Bank",
    ifscCode: "HDFC0001234",
    branch: "Main Branch, Mumbai",
    upiId: "pcds@upi"
  };

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      
      <main className="pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fadeInUp">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 mb-4">
              <Heart className="w-8 h-8 fill-current" />
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
              Support Our Mission
            </h1>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
              Your contribution helps us provide education, healthcare, and essential resources to those in need. Every donation makes a difference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Bank Details Card */}
            <div className="card p-8 animate-fadeInLeft" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center">
                  <Landmark className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Bank Transfer</h3>
              </div>

              <div className="space-y-5">
                {[
                  { label: 'Account Name', value: bankDetails.accountName, key: 'name' },
                  { label: 'Account Number', value: bankDetails.accountNumber, key: 'acc' },
                  { label: 'Bank Name', value: bankDetails.bankName, key: 'bank' },
                  { label: 'IFSC Code', value: bankDetails.ifscCode, key: 'ifsc' },
                  { label: 'UPI ID', value: bankDetails.upiId, key: 'upi' },
                ].map((item) => (
                  <div key={item.key} className="group relative">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">{item.label}</p>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 group-hover:border-blue-300 dark:group-hover:border-blue-500 transition-all">
                      <span className="font-mono text-slate-800 dark:text-slate-200 break-all pr-8">{item.value}</span>
                      <button 
                        onClick={() => copyToClipboard(item.value, item.key)}
                        className="absolute right-3 p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all"
                      >
                        {copied === item.key ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800">
                <ShieldCheck className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                <p className="text-xs text-emerald-800 dark:text-emerald-400 font-medium">
                  Secure direct bank transfer. All donations are 100% transparent and tracked.
                </p>
              </div>
            </div>

            {/* QR Code Card */}
            <div className="card p-8 text-center animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center">
                  <QrCode className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Scan to Pay</h3>
              </div>

              <div className="relative inline-block p-4 bg-white rounded-3xl shadow-inner mb-6 border-4 border-slate-50 dark:border-slate-800">
                <img 
                  src="/src/assets/qr_code.png" 
                  alt="Donation QR Code" 
                  className="w-64 h-64 object-contain rounded-2xl mx-auto"
                />
                <div className="absolute inset-0 border-2 border-dashed border-blue-200 dark:border-blue-900/50 rounded-3xl pointer-events-none" />
              </div>

              <p className="text-slate-600 dark:text-slate-400 text-sm mb-8 leading-relaxed">
                Scan this QR code using any UPI app (Google Pay, PhonePe, Paytm, etc.) to make a quick contribution.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Receipts</p>
                  <p className="text-xs text-slate-800 dark:text-slate-200 font-semibold">Available on Request</p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Tax Benefit</p>
                  <p className="text-xs text-slate-800 dark:text-slate-200 font-semibold">80G Applicable</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-12 text-center animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-semibold transition-all">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <SocialFAB />
    </div>
  );
}
