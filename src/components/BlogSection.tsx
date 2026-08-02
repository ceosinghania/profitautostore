import React from 'react';
import { BookOpen, Clock, ChevronRight, User } from 'lucide-react';
import { BLOG_POSTS } from '../data/storeData';

export const BlogSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#0E0E0E] text-white border-b border-red-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-red-950/80 rounded-full border border-red-700/40 text-red-400 text-xs font-bold uppercase tracking-widest mb-2">
              Automotive Maintenance Intelligence
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase font-display tracking-tight">
              EXPERT <span className="text-red-600">AUTOMOBILE TIPS</span>
            </h2>
            <p className="text-gray-400 text-sm mt-1 max-w-xl">
              Engine oil guides, battery health maintenance, detailing secrets, and seasonal service advice written by master mechanics.
            </p>
          </div>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.id}
              className="bg-[#121212] rounded-2xl border border-red-900/30 hover:border-red-600/50 overflow-hidden group shadow-xl flex flex-col justify-between transition-all"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-black">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 bg-red-600 text-white font-bold text-[10px] uppercase px-2.5 py-1 rounded">
                    {post.category}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-4 text-[10px] text-gray-400">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-red-500" /> {post.readTime}</span>
                    <span>{post.date}</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-red-400 transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                    {post.summary}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-gray-800/60 mt-4 flex items-center justify-between">
                <span className="text-[11px] text-gray-400 flex items-center gap-1 font-semibold">
                  <User className="w-3 h-3 text-red-500" /> {post.author}
                </span>
                <span className="text-xs font-bold text-red-400 group-hover:text-red-300 flex items-center gap-1">
                  Read Article <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
