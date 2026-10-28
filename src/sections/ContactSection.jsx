import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  Copy,
  Check,
  Send,
  Loader2,
  Sparkles,
  ArrowUpRight,
  MapPin,
  Clock
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { personalData, contactData } from '../data/content';
import MagneticButton from '../components/MagneticButton';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [focusedField, setFocusedField] = useState(null);
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please complete all fields before sending.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      // Check if real EmailJS keys are provided
      if (
        contactData.emailPublicKey !== 'YOUR_EMAILJS_PUBLIC_KEY' &&
        contactData.emailServiceId !== 'service_portfolio'
      ) {
        await emailjs.send(
          contactData.emailServiceId,
          contactData.emailTemplateId,
          {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            to_name: personalData.name,
          },
          contactData.emailPublicKey
        );
      } else {
        // Realistic simulation fallback for testing
        await new Promise((resolve) => setTimeout(resolve, 1200));
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage('Failed to send message. Please contact directly via email.');
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-36 px-4 sm:px-8 md:px-12 bg-[#050505] overflow-hidden"
    >
      {/* Background Accent Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#C6FF3D]/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Giant Heading with Masked Reveal */}
        <div className="mb-16 sm:mb-24 pb-8 border-b border-white/[0.08]">
          <div className="inline-flex items-center gap-2 text-xs font-heading font-semibold uppercase tracking-[0.2em] text-[#C6FF3D] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>07 // START A CONVERSATION</span>
          </div>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 80, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight text-white leading-[0.95]"
            >
              LET'S BUILD <br />
              <span className="text-[#C6FF3D] text-glow-accent">SOMETHING</span> AMAZING
            </motion.h2>
          </div>

          <p className="text-base sm:text-xl font-heading text-[#A1A1AA] max-w-2xl mt-6">
            {contactData.subheading}
          </p>
        </div>

        {/* Two-Column Grid: Form & Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* LEFT: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-12 rounded-3xl bg-[#0D0D0D]/90 backdrop-blur-xl border border-white/[0.08] relative shadow-2xl">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-12 flex flex-col items-center text-center"
                  >
                    {/* Animated Checkmark Draw */}
                    <div className="w-20 h-20 rounded-full bg-[#C6FF3D]/10 border-2 border-[#C6FF3D] flex items-center justify-center text-[#C6FF3D] mb-6 shadow-[0_0_25px_rgba(198,255,61,0.4)]">
                      <motion.svg
                        className="w-10 h-10 text-[#C6FF3D]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <motion.path
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </motion.svg>
                    </div>

                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white uppercase mb-2">
                      MESSAGE RECEIVED!
                    </h3>
                    <p className="text-sm font-heading text-[#A1A1AA] max-w-sm mb-8">
                      Thank you for reaching out. I will review your message and reply within 12 hours.
                    </p>

                    <button
                      onClick={() => setStatus('idle')}
                      className="px-6 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-xs font-heading font-semibold uppercase tracking-wider text-white transition-colors"
                    >
                      SEND ANOTHER MESSAGE
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8" key="form">
                    {/* Name Input with Floating Label */}
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full bg-transparent text-white pt-6 pb-2 text-base font-heading focus:outline-none border-b border-white/[0.1] peer"
                      />
                      <label
                        htmlFor="name"
                        className={`absolute left-0 text-xs font-heading uppercase tracking-widest transition-all duration-200 pointer-events-none ${
                          focusedField === 'name' || formData.name
                            ? 'top-0 text-[#C6FF3D]'
                            : 'top-4 text-[#71717A]'
                        }`}
                      >
                        YOUR NAME
                      </label>
                      <div
                        className={`h-[2px] bg-[#C6FF3D] transition-all duration-300 ${
                          focusedField === 'name' ? 'w-full shadow-[0_0_8px_#C6FF3D]' : 'w-0'
                        }`}
                      />
                    </div>

                    {/* Email Input with Floating Label */}
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full bg-transparent text-white pt-6 pb-2 text-base font-heading focus:outline-none border-b border-white/[0.1] peer"
                      />
                      <label
                        htmlFor="email"
                        className={`absolute left-0 text-xs font-heading uppercase tracking-widest transition-all duration-200 pointer-events-none ${
                          focusedField === 'email' || formData.email
                            ? 'top-0 text-[#C6FF3D]'
                            : 'top-4 text-[#71717A]'
                        }`}
                      >
                        EMAIL ADDRESS
                      </label>
                      <div
                        className={`h-[2px] bg-[#C6FF3D] transition-all duration-300 ${
                          focusedField === 'email' ? 'w-full shadow-[0_0_8px_#C6FF3D]' : 'w-0'
                        }`}
                      />
                    </div>

                    {/* Message Input with Floating Label */}
                    <div className="relative">
                      <textarea
                        id="message"
                        rows="4"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full bg-transparent text-white pt-6 pb-2 text-base font-heading focus:outline-none border-b border-white/[0.1] peer resize-none"
                      />
                      <label
                        htmlFor="message"
                        className={`absolute left-0 text-xs font-heading uppercase tracking-widest transition-all duration-200 pointer-events-none ${
                          focusedField === 'message' || formData.message
                            ? 'top-0 text-[#C6FF3D]'
                            : 'top-4 text-[#71717A]'
                        }`}
                      >
                        PROJECT DETAILS / MESSAGE
                      </label>
                      <div
                        className={`h-[2px] bg-[#C6FF3D] transition-all duration-300 ${
                          focusedField === 'message' ? 'w-full shadow-[0_0_8px_#C6FF3D]' : 'w-0'
                        }`}
                      />
                    </div>

                    {errorMessage && (
                      <p className="text-xs text-red-400 font-heading">{errorMessage}</p>
                    )}

                    {/* Submit Button */}
                    <MagneticButton strength={0.35} className="w-full">
                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full py-4 rounded-full bg-[#C6FF3D] hover:bg-[#B5F22B] text-[#050505] font-heading font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(198,255,61,0.35)] disabled:opacity-60"
                      >
                        {status === 'loading' ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>TRANSMITTING MESSAGE...</span>
                          </>
                        ) : (
                          <>
                            <span>SEND MESSAGE</span>
                            <Send className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </MagneticButton>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT: Direct Contact Details & Quick Links */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            {/* Direct Cards */}
            <div className="space-y-4">
              {/* Email Card with Copy Button */}
              <div className="p-6 rounded-2xl bg-[#0D0D0D] border border-white/[0.08] relative group hover:border-[#C6FF3D]/40 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-heading uppercase tracking-wider text-[#71717A] flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#C6FF3D]" />
                    <span>DIRECT INBOX</span>
                  </span>

                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-[#C6FF3D] text-[#A1A1AA] hover:text-[#050505] transition-all"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-[#C6FF3D]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <a
                  href={`mailto:${personalData.email}`}
                  className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-[#C6FF3D] transition-colors break-all"
                >
                  {personalData.email}
                </a>

                {copiedEmail && (
                  <p className="text-[11px] text-[#C6FF3D] font-heading mt-2 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Email address copied to clipboard!
                  </p>
                )}
              </div>

              {/* Phone Card */}
              <div className="p-6 rounded-2xl bg-[#0D0D0D] border border-white/[0.08] relative group hover:border-[#C6FF3D]/40 transition-colors">
                <span className="text-[11px] font-heading uppercase tracking-wider text-[#71717A] flex items-center gap-1.5 mb-2">
                  <Phone className="w-3.5 h-3.5 text-[#C6FF3D]" />
                  <span>DIRECT CALL / WHATSAPP</span>
                </span>
                <a
                  href={`tel:${personalData.phone}`}
                  className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-[#C6FF3D] transition-colors"
                >
                  {personalData.phone}
                </a>
              </div>

              {/* Socials Grid */}
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl bg-[#0D0D0D] border border-white/[0.08] hover:border-[#C6FF3D]/40 flex items-center justify-between group transition-colors"
                >
                  <span className="font-heading font-semibold text-xs text-white uppercase flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-[#C6FF3D]" />
                    <span>LINKEDIN</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#71717A] group-hover:text-[#C6FF3D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>

                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl bg-[#0D0D0D] border border-white/[0.08] hover:border-[#C6FF3D]/40 flex items-center justify-between group transition-colors"
                >
                  <span className="font-heading font-semibold text-xs text-white uppercase flex items-center gap-2">
                    <Github className="w-4 h-4 text-[#C6FF3D]" />
                    <span>GITHUB</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#71717A] group-hover:text-[#C6FF3D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              </div>
            </div>

            {/* Availability & Response Time Card */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-4">
              <div className="flex items-center gap-3.5">
                <img
                  src={personalData.avatar}
                  alt={personalData.name}
                  className="w-12 h-12 rounded-full object-cover object-top border-2 border-[#C6FF3D]"
                />
                <div>
                  <div className="font-display font-bold text-sm text-white">
                    {personalData.name}
                  </div>
                  <div className="text-[11px] font-heading text-[#C6FF3D] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF3D] animate-ping" />
                    <span>{personalData.availability}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-heading text-[#71717A]">
                <Clock className="w-3.5 h-3.5 text-[#C6FF3D]" />
                <span>Response Time: {contactData.typicalResponseTime}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-heading text-[#71717A]">
                <MapPin className="w-3.5 h-3.5 text-[#C6FF3D]" />
                <span>Location: {contactData.officeLocation}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
