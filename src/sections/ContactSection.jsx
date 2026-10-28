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
import { useTheme } from '../context/ThemeContext';
import MagneticButton from '../components/MagneticButton';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [focusedField, setFocusedField] = useState(null);
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { isCream } = useTheme();

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
      className="relative py-20 sm:py-32 px-4 sm:px-8 md:px-12 bg-[var(--bg)] overflow-hidden transition-colors duration-500"
    >
      {/* Background Accent Glow */}
      <div
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[200px] pointer-events-none ${
          isCream ? 'bg-emerald-500/10' : 'bg-[#C6FF3D]/5'
        }`}
      />

      <div className="max-w-6xl mx-auto">
        {/* Giant Heading with Masked Reveal */}
        <div
          className={`mb-12 sm:mb-20 pb-6 sm:pb-8 border-b ${
            isCream ? 'border-black/10' : 'border-white/[0.08]'
          }`}
        >
          <div
            className={`inline-flex items-center gap-2 text-xs font-heading font-semibold uppercase tracking-[0.2em] mb-4 ${
              isCream ? 'text-emerald-700' : 'text-[#C6FF3D]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>07 // START A CONVERSATION</span>
          </div>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 80, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight leading-[0.95] ${
                isCream ? 'text-neutral-900' : 'text-white'
              }`}
            >
              LET'S BUILD <br />
              <span className={isCream ? 'text-emerald-700' : 'text-[#C6FF3D] text-glow-accent'}>
                SOMETHING
              </span>{' '}
              AMAZING
            </motion.h2>
          </div>

          <p
            className={`text-base sm:text-xl font-heading max-w-2xl mt-6 ${
              isCream ? 'text-neutral-600' : 'text-[#A1A1AA]'
            }`}
          >
            {contactData.subheading}
          </p>
        </div>

        {/* Two-Column Grid: Form & Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* LEFT: Contact Form */}
          <div className="lg:col-span-7">
            <div
              className={`p-6 sm:p-10 md:p-12 rounded-3xl border shadow-2xl relative transition-all duration-300 ${
                isCream
                  ? 'bg-white/85 border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] backdrop-blur-xl'
                  : 'bg-[#0D0D0D]/90 border-white/[0.08] backdrop-blur-xl'
              }`}
            >
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-12 flex flex-col items-center text-center"
                  >
                    {/* Animated Checkmark */}
                    <div
                      className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 border-2 ${
                        isCream
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-700 shadow-lg shadow-emerald-700/20'
                          : 'bg-[#C6FF3D]/10 border-[#C6FF3D] text-[#C6FF3D] shadow-[0_0_25px_rgba(198,255,61,0.4)]'
                      }`}
                    >
                      <motion.svg
                        className="w-10 h-10"
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

                    <h3
                      className={`font-display font-extrabold text-2xl sm:text-3xl uppercase mb-2 ${
                        isCream ? 'text-neutral-900' : 'text-white'
                      }`}
                    >
                      MESSAGE RECEIVED!
                    </h3>
                    <p
                      className={`text-sm font-heading max-w-sm mb-8 ${
                        isCream ? 'text-neutral-600' : 'text-[#A1A1AA]'
                      }`}
                    >
                      Thank you for reaching out. I will review your message and reply within 12 hours.
                    </p>

                    <button
                      onClick={() => setStatus('idle')}
                      className={`px-6 py-2.5 rounded-full text-xs font-heading font-semibold uppercase tracking-wider transition-colors ${
                        isCream
                          ? 'bg-neutral-100 hover:bg-neutral-200 text-neutral-900'
                          : 'bg-white/[0.06] hover:bg-white/[0.12] text-white'
                      }`}
                    >
                      SEND ANOTHER MESSAGE
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8" key="form">
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
                        className={`w-full bg-transparent pt-6 pb-2 text-base font-heading focus:outline-none border-b transition-colors peer ${
                          isCream
                            ? 'text-neutral-900 border-black/10'
                            : 'text-white border-white/[0.1]'
                        }`}
                      />
                      <label
                        htmlFor="name"
                        className={`absolute left-0 text-xs font-heading uppercase tracking-widest transition-all duration-200 pointer-events-none ${
                          focusedField === 'name' || formData.name
                            ? isCream
                              ? 'top-0 text-emerald-700 font-semibold'
                              : 'top-0 text-[#C6FF3D]'
                            : 'top-4 text-[#71717A]'
                        }`}
                      >
                        YOUR NAME
                      </label>
                      <div
                        className={`h-[2px] transition-all duration-300 ${
                          isCream ? 'bg-emerald-700' : 'bg-[#C6FF3D]'
                        } ${
                          focusedField === 'name' ? 'w-full shadow-sm' : 'w-0'
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
                        className={`w-full bg-transparent pt-6 pb-2 text-base font-heading focus:outline-none border-b transition-colors peer ${
                          isCream
                            ? 'text-neutral-900 border-black/10'
                            : 'text-white border-white/[0.1]'
                        }`}
                      />
                      <label
                        htmlFor="email"
                        className={`absolute left-0 text-xs font-heading uppercase tracking-widest transition-all duration-200 pointer-events-none ${
                          focusedField === 'email' || formData.email
                            ? isCream
                              ? 'top-0 text-emerald-700 font-semibold'
                              : 'top-0 text-[#C6FF3D]'
                            : 'top-4 text-[#71717A]'
                        }`}
                      >
                        EMAIL ADDRESS
                      </label>
                      <div
                        className={`h-[2px] transition-all duration-300 ${
                          isCream ? 'bg-emerald-700' : 'bg-[#C6FF3D]'
                        } ${
                          focusedField === 'email' ? 'w-full shadow-sm' : 'w-0'
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
                        className={`w-full bg-transparent pt-6 pb-2 text-base font-heading focus:outline-none border-b transition-colors peer resize-none ${
                          isCream
                            ? 'text-neutral-900 border-black/10'
                            : 'text-white border-white/[0.1]'
                        }`}
                      />
                      <label
                        htmlFor="message"
                        className={`absolute left-0 text-xs font-heading uppercase tracking-widest transition-all duration-200 pointer-events-none ${
                          focusedField === 'message' || formData.message
                            ? isCream
                              ? 'top-0 text-emerald-700 font-semibold'
                              : 'top-0 text-[#C6FF3D]'
                            : 'top-4 text-[#71717A]'
                        }`}
                      >
                        PROJECT DETAILS / MESSAGE
                      </label>
                      <div
                        className={`h-[2px] transition-all duration-300 ${
                          isCream ? 'bg-emerald-700' : 'bg-[#C6FF3D]'
                        } ${
                          focusedField === 'message' ? 'w-full shadow-sm' : 'w-0'
                        }`}
                      />
                    </div>

                    {errorMessage && (
                      <p className="text-xs text-red-500 font-heading">{errorMessage}</p>
                    )}

                    {/* Submit Button */}
                    <MagneticButton strength={0.35} className="w-full">
                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className={`w-full py-4 rounded-full font-heading font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 ${
                          isCream
                            ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-lg shadow-emerald-700/20'
                            : 'bg-[#C6FF3D] hover:bg-[#B5F22B] text-[#050505] shadow-[0_0_25px_rgba(198,255,61,0.35)]'
                        }`}
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
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 sm:space-y-8">
            <div className="space-y-4">
              {/* Email Card with Copy Button */}
              <div
                className={`p-6 rounded-2xl border transition-colors ${
                  isCream
                    ? 'bg-white/80 border-black/10 shadow-sm hover:border-emerald-600'
                    : 'bg-[#0D0D0D] border-white/[0.08] hover:border-[#C6FF3D]/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[11px] font-heading uppercase tracking-wider flex items-center gap-1.5 ${
                      isCream ? 'text-neutral-500' : 'text-[#71717A]'
                    }`}
                  >
                    <Mail
                      className={`w-3.5 h-3.5 ${
                        isCream ? 'text-emerald-700' : 'text-[#C6FF3D]'
                      }`}
                    />
                    <span>DIRECT INBOX</span>
                  </span>

                  <button
                    onClick={handleCopyEmail}
                    className={`p-1.5 rounded-lg transition-all ${
                      isCream
                        ? 'bg-black/5 hover:bg-emerald-700 text-neutral-600 hover:text-white'
                        : 'bg-white/[0.04] hover:bg-[#C6FF3D] text-[#A1A1AA] hover:text-[#050505]'
                    }`}
                    title="Copy Email"
                  >
                    {copiedEmail ? (
                      <Check className={`w-4 h-4 ${isCream ? 'text-emerald-700' : 'text-[#C6FF3D]'}`} />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <a
                  href={`mailto:${personalData.email}`}
                  className={`font-display font-bold text-lg sm:text-xl break-all transition-colors ${
                    isCream
                      ? 'text-neutral-900 hover:text-emerald-700'
                      : 'text-white hover:text-[#C6FF3D]'
                  }`}
                >
                  {personalData.email}
                </a>

                {copiedEmail && (
                  <p
                    className={`text-[11px] font-heading mt-2 flex items-center gap-1 ${
                      isCream ? 'text-emerald-700' : 'text-[#C6FF3D]'
                    }`}
                  >
                    <Check className="w-3 h-3" /> Email address copied to clipboard!
                  </p>
                )}
              </div>

              {/* Phone Card */}
              <div
                className={`p-6 rounded-2xl border transition-colors ${
                  isCream
                    ? 'bg-white/80 border-black/10 shadow-sm hover:border-emerald-600'
                    : 'bg-[#0D0D0D] border-white/[0.08] hover:border-[#C6FF3D]/40'
                }`}
              >
                <span
                  className={`text-[11px] font-heading uppercase tracking-wider flex items-center gap-1.5 mb-2 ${
                    isCream ? 'text-neutral-500' : 'text-[#71717A]'
                  }`}
                >
                  <Phone
                    className={`w-3.5 h-3.5 ${
                      isCream ? 'text-emerald-700' : 'text-[#C6FF3D]'
                    }`}
                  />
                  <span>DIRECT CALL / WHATSAPP</span>
                </span>
                <a
                  href={`tel:${personalData.phone}`}
                  className={`font-display font-bold text-lg sm:text-xl transition-colors ${
                    isCream
                      ? 'text-neutral-900 hover:text-emerald-700'
                      : 'text-white hover:text-[#C6FF3D]'
                  }`}
                >
                  {personalData.phone}
                </a>
              </div>

              {/* Socials Grid */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-4 sm:p-5 rounded-2xl border flex items-center justify-between group transition-colors ${
                    isCream
                      ? 'bg-white/80 border-black/10 hover:border-emerald-700 shadow-sm'
                      : 'bg-[#0D0D0D] border-white/[0.08] hover:border-[#C6FF3D]/40'
                  }`}
                >
                  <span
                    className={`font-heading font-semibold text-xs uppercase flex items-center gap-2 ${
                      isCream ? 'text-neutral-900' : 'text-white'
                    }`}
                  >
                    <Linkedin
                      className={`w-4 h-4 ${
                        isCream ? 'text-emerald-700' : 'text-[#C6FF3D]'
                      }`}
                    />
                    <span>LINKEDIN</span>
                  </span>
                  <ArrowUpRight
                    className={`w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all ${
                      isCream ? 'text-neutral-400 group-hover:text-emerald-700' : 'text-[#71717A] group-hover:text-[#C6FF3D]'
                    }`}
                  />
                </a>

                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-4 sm:p-5 rounded-2xl border flex items-center justify-between group transition-colors ${
                    isCream
                      ? 'bg-white/80 border-black/10 hover:border-emerald-700 shadow-sm'
                      : 'bg-[#0D0D0D] border-white/[0.08] hover:border-[#C6FF3D]/40'
                  }`}
                >
                  <span
                    className={`font-heading font-semibold text-xs uppercase flex items-center gap-2 ${
                      isCream ? 'text-neutral-900' : 'text-white'
                    }`}
                  >
                    <Github
                      className={`w-4 h-4 ${
                        isCream ? 'text-emerald-700' : 'text-[#C6FF3D]'
                      }`}
                    />
                    <span>GITHUB</span>
                  </span>
                  <ArrowUpRight
                    className={`w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all ${
                      isCream ? 'text-neutral-400 group-hover:text-emerald-700' : 'text-[#71717A] group-hover:text-[#C6FF3D]'
                    }`}
                  />
                </a>
              </div>
            </div>

            {/* Developer Avatar Badge & Availability */}
            <div
              className={`p-5 sm:p-6 rounded-2xl border space-y-4 ${
                isCream
                  ? 'bg-white/90 border-black/5 shadow-sm'
                  : 'bg-white/[0.02] border-white/[0.06]'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <img
                  src={personalData.avatar || "/my_photo.png"}
                  alt={personalData.name}
                  className={`w-12 h-12 rounded-full object-cover object-top border-2 ${
                    isCream ? 'border-emerald-600' : 'border-[#C6FF3D]'
                  }`}
                />
                <div>
                  <div
                    className={`font-display font-bold text-sm ${
                      isCream ? 'text-neutral-900' : 'text-white'
                    }`}
                  >
                    {personalData.name}
                  </div>
                  <div
                    className={`text-[11px] font-heading flex items-center gap-1.5 ${
                      isCream ? 'text-emerald-700 font-semibold' : 'text-[#C6FF3D]'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full animate-ping ${
                        isCream ? 'bg-emerald-600' : 'bg-[#C6FF3D]'
                      }`}
                    />
                    <span>{personalData.availability}</span>
                  </div>
                </div>
              </div>
              <div
                className={`flex items-center gap-2 text-xs font-heading ${
                  isCream ? 'text-neutral-500' : 'text-[#71717A]'
                }`}
              >
                <Clock
                  className={`w-3.5 h-3.5 ${
                    isCream ? 'text-emerald-700' : 'text-[#C6FF3D]'
                  }`}
                />
                <span>Response Time: {contactData.typicalResponseTime}</span>
              </div>
              <div
                className={`flex items-center gap-2 text-xs font-heading ${
                  isCream ? 'text-neutral-500' : 'text-[#71717A]'
                }`}
              >
                <MapPin
                  className={`w-3.5 h-3.5 ${
                    isCream ? 'text-emerald-700' : 'text-[#C6FF3D]'
                  }`}
                />
                <span>Location: {personalData.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
