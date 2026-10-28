import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ArrowUpRight, Tag, Clock, Calendar, Check, Search, Sparkles } from 'lucide-react';
import { blogPostsData, personalData } from '../data/content';
import { useTheme } from '../context/ThemeContext';
import MagneticButton from '../components/MagneticButton';

export default function BlogSection() {
  const { isCream } = useTheme();
  const [selectedPost, setSelectedPost] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Full Stack Architecture', 'SEO & Performance', 'Security & Backend'];

  const filteredPosts = activeCategory === 'All'
    ? blogPostsData
    : blogPostsData.filter((post) => post.category === activeCategory);

  return (
    <section
      id="blog"
      className={`relative py-20 sm:py-32 px-4 sm:px-8 md:px-12 transition-colors duration-500 overflow-hidden ${
        isCream ? 'bg-[#FAF9F6]' : 'bg-[#090B0E]'
      }`}
    >
      {/* Background Soft Glow */}
      <div
        className={`absolute top-1/3 left-1/4 w-[450px] h-[450px] rounded-full blur-[140px] pointer-events-none ${
          isCream ? 'bg-sky-400/10' : 'bg-blue-600/5'
        }`}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header with SEO Focus */}
        <div
          className={`flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-6 border-b ${
            isCream ? 'border-slate-200' : 'border-slate-800'
          }`}
        >
          <div>
            <div
              className={`inline-flex items-center gap-2 text-xs font-heading font-semibold uppercase tracking-[0.2em] mb-2 ${
                isCream ? 'text-sky-700' : 'text-blue-400'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>06 // TECHNICAL WRITING &amp; ARCHITECTURE (SEO)</span>
            </div>
            <h2
              className={`text-3xl sm:text-5xl font-display font-extrabold tracking-tight uppercase ${
                isCream ? 'text-slate-900' : 'text-white'
              }`}
            >
              FULL STACK INSIGHTS &amp; <br className="hidden sm:inline" />
              ENGINEERING BLUEPRINTS
            </h2>
          </div>
          <p
            className={`text-xs sm:text-sm font-heading max-w-sm mt-3 sm:mt-0 ${
              isCream ? 'text-slate-500' : 'text-slate-400'
            }`}
          >
            Authoritative technical articles on React, Node.js, enterprise RBAC security, and Core Web Vitals optimization.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-heading font-semibold transition-all ${
                activeCategory === cat
                  ? isCream
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-blue-500 text-white shadow-blue-500/20 shadow-md'
                  : isCream
                  ? 'bg-white border border-slate-200 text-slate-700 hover:border-sky-300'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {filteredPosts.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              onClick={() => setSelectedPost(post)}
              className={`group cursor-pointer rounded-2xl p-6 border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                isCream
                  ? 'bg-white border-slate-200 shadow-sm hover:border-sky-400 hover:shadow-md'
                  : 'bg-[#121824] border-slate-800 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-900/10'
              }`}
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between text-[11px] font-heading mb-4">
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                      isCream ? 'bg-sky-50 text-sky-700' : 'bg-blue-500/10 text-blue-300'
                    }`}
                  >
                    {post.category}
                  </span>
                  <div className={`flex items-center gap-1.5 ${isCream ? 'text-slate-400' : 'text-slate-500'}`}>
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3
                  className={`text-lg sm:text-xl font-heading font-bold mb-3 leading-snug group-hover:text-sky-600 dark:group-hover:text-blue-400 transition-colors ${
                    isCream ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {post.title}
                </h3>

                {/* Snippet */}
                <p
                  className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                    isCream ? 'text-slate-600' : 'text-slate-400'
                  }`}
                >
                  {post.description}
                </p>
              </div>

              {/* Card Footer: Tags + Read CTA */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        isCream ? 'bg-slate-100 text-slate-600' : 'bg-slate-800/80 text-slate-400'
                      }`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div
                  className={`pt-3 border-t flex items-center justify-between text-xs font-heading font-semibold ${
                    isCream ? 'border-slate-100 text-sky-700' : 'border-slate-800 text-blue-400'
                  }`}
                >
                  <span>READ ARCHITECTURE</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Reader Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPost(null)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-3xl p-6 sm:p-8 border shadow-2xl ${
                isCream ? 'bg-white border-slate-200 text-slate-800' : 'bg-[#121824] border-slate-700 text-slate-100'
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <span className={`text-xs font-heading font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                  isCream ? 'bg-sky-50 text-sky-700' : 'bg-blue-500/10 text-blue-300'
                }`}>
                  {selectedPost.category}
                </span>
                <button
                  onClick={() => setSelectedPost(null)}
                  className={`p-2 rounded-full text-xs font-mono font-bold ${
                    isCream ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  ✕ CLOSE
                </button>
              </div>

              <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-3 leading-snug">
                {selectedPost.title}
              </h2>

              <div className={`flex items-center gap-4 text-xs font-mono mb-6 pb-4 border-b ${
                isCream ? 'border-slate-100 text-slate-500' : 'border-slate-800 text-slate-400'
              }`}>
                <span>By {personalData.name}</span>
                <span>&bull;</span>
                <span>{selectedPost.date}</span>
                <span>&bull;</span>
                <span>{selectedPost.readTime}</span>
              </div>

              <div className="space-y-4 text-sm sm:text-base leading-relaxed">
                <p>{selectedPost.content}</p>
                <div className={`p-4 rounded-xl border my-4 ${
                  isCream ? 'bg-sky-50/50 border-sky-100' : 'bg-blue-950/20 border-blue-900/30'
                }`}>
                  <p className="font-heading font-semibold text-xs uppercase tracking-wider mb-1 text-sky-700 dark:text-blue-400">
                    KEY TAKEAWAYS FOR RECRUITERS &amp; TECH LEADS:
                  </p>
                  <ul className="text-xs sm:text-sm space-y-1.5 list-disc pl-4 mt-2">
                    <li>Strict TypeScript typings preventing runtime crashes.</li>
                    <li>Scalable caching layers with sub-50ms API response latency.</li>
                    <li>Automated Lighthouse audits targeting &ge;95 on SEO and Core Web Vitals.</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t flex justify-between items-center text-xs font-heading">
                <span className={isCream ? 'text-slate-500' : 'text-slate-400'}>
                  Tags: {selectedPost.tags.join(', ')}
                </span>
                <button
                  onClick={() => setSelectedPost(null)}
                  className={`px-4 py-2 rounded-full font-bold ${
                    isCream ? 'bg-sky-600 text-white' : 'bg-blue-500 text-white'
                  }`}
                >
                  Done Reading
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
