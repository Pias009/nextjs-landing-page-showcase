import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Share2, 
  Zap,
  TrendingUp,
  Globe,
  Palette,
  Code,
  Rocket,
  Smartphone,
  Tablet,
  Monitor,
  Maximize2,
  Tag,
  Play,
  Heart
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { landingPages as allLandingPages } from '../data/landingPages';

gsap.registerPlugin(ScrollTrigger);

export interface LandingPage {
  id: string;
  name: string;
  type: string;
  category: string;
  html: string;
  css: string;
  js: string;
  cta: string;
  price: string;
  status: 'published' | 'draft' | 'future';
  createdAt: string;
  views: number;
}

const categories = [
  { id: 'all', name: 'All Pages', icon: Globe },
  { id: 'ecommerce', name: 'E-commerce', icon: TrendingUp },
  { id: 'saas', name: 'SaaS', icon: Zap },
  { id: 'health', name: 'Health & Wellness', icon: Heart },
  { id: 'portfolio', name: 'Portfolio', icon: Palette },
  { id: 'food', name: 'Food & Beverage', icon: Rocket },
  { id: 'finance', name: 'Finance', icon: Code },
  { id: 'marketing', name: 'Marketing', icon: Rocket },
];

const HomePage: React.FC = () => {
  const [landingPages, setLandingPages] = useState<LandingPage[]>(allLandingPages);
  const [filteredPages, setFilteredPages] = useState<LandingPage[]>(allLandingPages);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPage, setSelectedPage] = useState<LandingPage | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState<'mobile' | 'tablet' | 'desktop' | 'full'>('desktop');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    let filtered = landingPages;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(page => page.category === selectedCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(page => 
        page.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredPages(filtered);
  }, [selectedCategory, searchQuery, landingPages]);

  useEffect(() => {
    const initScrollTriggers = () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());

      const heroElements = document.querySelectorAll('.hero-element');
      heroElements.forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top center+=200',
            toggleActions: 'play none none reverse',
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
      });

      const categoryBtns = document.querySelectorAll('.category-btn');
      categoryBtns.forEach((btn, i) => {
        gsap.from(btn, {
          scrollTrigger: {
            trigger: btn,
            start: 'top center+=150',
            toggleActions: 'play none none reverse',
          },
          y: 30,
          opacity: 0,
          duration: 0.5,
          delay: i * 0.05,
          ease: 'back.out(1.7)',
        });
      });

      const cards = gsap.utils.toArray('.card-item') as HTMLElement[];
      cards.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse',
            onEnter: () => {
              gsap.to(card, {
                y: 0,
                opacity: 1,
                duration: 0.6,
                delay: i * 0.1,
                ease: 'power3.out',
              });
            },
            onEnterBack: () => {
              gsap.to(card, {
                y: 0,
                opacity: 1,
                duration: 0.4,
                ease: 'power3.out',
              });
            }
          },
          y: 80,
          opacity: 0,
          duration: 0,
        });
      });

      const footer = document.querySelector('footer');
      if (footer) {
        gsap.from(footer, {
          scrollTrigger: {
            trigger: footer,
            start: 'top bottom+=200',
            toggleActions: 'play none none reverse',
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
      }
      
      ScrollTrigger.refresh();
    };

    const timer = setTimeout(() => {
      initScrollTriggers();
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [filteredPages.length]);

  const generatePreviewContent = (page: LandingPage) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${page.name}</title>
        <style>
          ${page.css || ''}
        </style>
      </head>
      <body style="margin: 0; padding: 0;">
        ${page.html}
        <script>
          ${page.js || ''}
        </script>
      </body>
      </html>
    `;
  };

  const getPreviewWidth = () => {
    switch (previewMode) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      case 'desktop': return '1024px';
      case 'full': return '100%';
      default: return '1024px';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-600/20 text-green-400 border-green-500/30';
      case 'future': return 'bg-purple-600/20 text-purple-400 border-purple-500/30';
      case 'draft': return 'bg-gray-600/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-600/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* 3D Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.15),transparent_50%)] animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.15),transparent_50%)] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_60%,rgba(236,72,153,0.1),transparent_40%)] animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
        
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[linear-gradient(to_bottom,transparent,rgba(99,102,241,0.05))] transform-style-3d perspective-1000">
          <div className="grid-3d animate-grid-move"></div>
        </div>

        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
        <div className="orb orb-4"></div>
        <div className="orb orb-5"></div>

        <div className="cube-container">
          <div className="cube">
            <div className="cube-face front"></div>
            <div className="cube-face back"></div>
            <div className="cube-face right"></div>
            <div className="cube-face left"></div>
            <div className="cube-face top"></div>
            <div className="cube-face bottom"></div>
          </div>
        </div>

        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-50 border-b border-white/10 backdrop-blur-xl bg-black/50"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">360</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  360Organic
                </h1>
                <p className="text-xs text-gray-400">Marketing Team</p>
              </div>
            </div>
            
          
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 pt-20 pb-16 px-6"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 hero-element"
          >
            <span className="text-sm text-gray-300">🚀 Premium Landing Page Showcase</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight hero-element">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Stunning Landing Pages
            </span>
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              That Convert
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed hero-element">
            Discover our collection of high-converting landing pages crafted with precision, 
            animated with GSAP, and designed to captivate your audience.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search landing pages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 bg-white/60 rounded-full"
              />
            </motion.div>
            <p className="text-xs text-gray-500 mt-2 text-center">Scroll to explore</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Category Filters */}
      <section className="relative z-10 py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-5 py-2.5 rounded-full border transition-all duration-300 category-btn ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 border-transparent text-white shadow-lg shadow-indigo-500/25'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{category.name}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Landing Pages Grid */}
      <section className="relative z-10 py-12 px-6 pb-32">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-96 bg-white/5 rounded-2xl animate-pulse"></div>
              ))}
            </div>
          ) : filteredPages.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 bg-white/5 rounded-full flex items-center justify-center">
                <Search className="w-10 h-10 text-gray-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No landing pages found</h3>
              <p className="text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredPages.map((page, index) => (
                  <motion.div
                    key={page.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="card-item group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/20"
                    style={{ perspective: '1000px' }}
                  >
                    <div className="relative h-48 bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-pink-600/20 overflow-hidden flex items-center justify-center">
                      <Code className="w-16 h-16 text-indigo-400/50" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="inline-block px-3 py-1 bg-indigo-600/80 backdrop-blur-sm rounded-full text-xs font-medium text-white mb-2">
                          {categories.find(c => c.id === page.category)?.name || page.category}
                        </span>
                        <h3 className="text-xl font-bold text-white mb-1">{page.name}</h3>
                        <p className="text-sm text-gray-300">{page.type}</p>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2 text-sm">
                          <Tag className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-300">${page.price}</span>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(page.status)}`}>
                          {page.status}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-1 text-sm text-gray-400">
                          <span>CTA:</span>
                          <span className="text-white font-medium">{page.cta || 'N/A'}</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-3">
                        <button
                          onClick={() => setSelectedPage(page)}
                          className="flex-1 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-medium text-white hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
                        >
                          <Play className="w-4 h-4" />
                          <span>Preview</span>
                        </button>
                        <button className="p-2.5 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* Live Preview Modal */}
      <AnimatePresence>
        {selectedPage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedPage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl h-[90vh] bg-gray-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700 flex-shrink-0">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-white font-medium">{selectedPage.name}</span>
                  <span className="text-gray-400 text-sm">| ${selectedPage.price}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1 bg-white/5 rounded-lg p-1">
                    <button
                      onClick={() => setPreviewMode('mobile')}
                      className={`p-2 rounded ${previewMode === 'mobile' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'}`}
                      title="Mobile (375px)"
                    >
                      <Smartphone className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setPreviewMode('tablet')}
                      className={`p-2 rounded ${previewMode === 'tablet' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'}`}
                      title="Tablet (768px)"
                    >
                      <Tablet className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setPreviewMode('desktop')}
                      className={`p-2 rounded ${previewMode === 'desktop' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'}`}
                      title="Desktop (1024px)"
                    >
                      <Monitor className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setPreviewMode('full')}
                      className={`p-2 rounded ${previewMode === 'full' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'}`}
                      title="Full Screen"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => setSelectedPage(null)}
                    className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>
              
              <div className="flex-1 flex items-center justify-center p-4 overflow-hidden bg-black">
                <div 
                  className="w-full h-full bg-white rounded-lg overflow-hidden shadow-2xl transition-all duration-300"
                  style={{ 
                    maxWidth: previewMode === 'full' ? '100%' : getPreviewWidth(),
                    width: previewMode === 'full' ? '100%' : getPreviewWidth(),
                    height: '100%',
                  }}
                >
                  <iframe
                    ref={iframeRef}
                    srcDoc={generatePreviewContent(selectedPage)}
                    className="w-full h-full border-0"
                    title={selectedPage.name}
                    sandbox="allow-scripts allow-same-origin"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black/50 backdrop-blur-xl py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">360</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    360Organic
                  </h3>
                  <p className="text-xs text-gray-400">Marketing Team</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Creating stunning, high-converting landing pages that drive results.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Showcase</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>hello@360organic.com</li>
                <li>+1 (555) 123-4567</li>
                <li>New York, NY</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-gray-500">
            <p>&copy; 2024 360Organic Marketing Team. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
