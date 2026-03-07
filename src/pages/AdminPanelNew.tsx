import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Settings, 
  LogOut, 
  Save, 
  X,
  Search,
  Filter,
  Code,
  Type,
  DollarSign,
  Smartphone,
  Tablet,
  Monitor,
  Maximize2,
  Check,
  AlertCircle,
  Lock,
  User,
  Key,
  Play,
  RefreshCw
} from 'lucide-react';

interface LandingPage {
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

interface User {
  username: string;
  isAuthenticated: boolean;
}

const categories = [
  { id: 'ecommerce', name: 'E-commerce' },
  { id: 'saas', name: 'SaaS' },
  { id: 'health', name: 'Health & Wellness' },
  { id: 'portfolio', name: 'Portfolio' },
  { id: 'food', name: 'Food & Beverage' },
  { id: 'finance', name: 'Finance' },
  { id: 'marketing', name: 'Marketing' },
];

const AdminPanelNew: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [landingPages, setLandingPages] = useState<LandingPage[]>([]);
  const [filteredPages, setFilteredPages] = useState<LandingPage[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<LandingPage | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    category: 'ecommerce',
    html: '',
    css: '',
    js: '',
    cta: '',
    price: '',
    status: 'published' as 'published' | 'draft' | 'future',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({
    username: '360organic@gmail.com',
    password: 'SecurePass2024!'
  });
  const [previewMode, setPreviewMode] = useState<'mobile' | 'tablet' | 'desktop' | 'full'>('desktop');
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [previewContent, setPreviewContent] = useState('');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('adminUser');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const storedPages = localStorage.getItem('landingPages');
    if (storedPages) {
      const pages = JSON.parse(storedPages);
      setLandingPages(pages);
      setFilteredPages(pages);
    }
  }, []);

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
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loginForm.username === adminCredentials.username && 
        loginForm.password === adminCredentials.password) {
      const userData: User = {
        username: loginForm.username,
        isAuthenticated: true,
      };
      setUser(userData);
      setIsLoggedIn(true);
      localStorage.setItem('adminUser', JSON.stringify(userData));
      setNotification({ message: 'Login successful!', type: 'success' });
      setLoginForm({ username: '', password: '' });
    } else {
      setNotification({ message: 'Invalid credentials!', type: 'error' });
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('adminUser');
    setNotification({ message: 'Logged out successfully!', type: 'success' });
  };

  const openModal = (page?: LandingPage) => {
    if (page) {
      setEditingPage(page);
      setFormData({
        name: page.name,
        type: page.type,
        category: page.category,
        html: page.html,
        css: page.css,
        js: page.js,
        cta: page.cta,
        price: page.price,
        status: page.status,
      });
    } else {
      setEditingPage(null);
      setFormData({
        name: '',
        type: '',
        category: 'ecommerce',
        html: '',
        css: '',
        js: '',
        cta: '',
        price: '',
        status: 'published',
      });
    }
    setFormErrors({});
    setIsModalOpen(true);
    setIsPreviewing(false);
    setPreviewContent('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPage(null);
    setFormData({
      name: '',
      type: '',
      category: 'ecommerce',
      html: '',
      css: '',
      js: '',
      cta: '',
      price: '',
      status: 'published',
    });
    setFormErrors({});
    setIsPreviewing(false);
    setPreviewContent('');
  };

  const generatePreview = () => {
    const { html, css, js } = formData;
    const fullHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          ${css || ''}
        </style>
      </head>
      <body>
        ${html}
        <script>
          ${js || ''}
        </script>
      </body>
      </html>
    `;
    setPreviewContent(fullHTML);
    setIsPreviewing(true);
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!formData.type.trim()) {
      errors.type = 'Type is required';
    }
    if (!formData.html.trim()) {
      errors.html = 'HTML code is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (editingPage) {
      const updatedPages = landingPages.map(page =>
        page.id === editingPage.id
          ? { ...page, ...formData }
          : page
      );
      setLandingPages(updatedPages);
      localStorage.setItem('landingPages', JSON.stringify(updatedPages));
      setNotification({ message: 'Landing page updated successfully!', type: 'success' });
    } else {
      const newPage: LandingPage = {
        id: Date.now().toString(),
        ...formData,
        views: 0,
        createdAt: new Date().toISOString(),
      };
      const updatedPages = [newPage, ...landingPages];
      setLandingPages(updatedPages);
      localStorage.setItem('landingPages', JSON.stringify(updatedPages));
      setNotification({ message: 'Landing page added successfully!', type: 'success' });
    }
    
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this landing page?')) {
      const updatedPages = landingPages.filter(page => page.id !== id);
      setLandingPages(updatedPages);
      localStorage.setItem('landingPages', JSON.stringify(updatedPages));
      setNotification({ message: 'Landing page deleted successfully!', type: 'success' });
    }
  };

  const handleUpdateSettings = () => {
    if (adminCredentials.username && adminCredentials.password) {
      localStorage.setItem('adminCredentials', JSON.stringify(adminCredentials));
      setNotification({ message: 'Admin credentials updated successfully!', type: 'success' });
      setShowSettings(false);
    }
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-4">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_70%)]"></div>
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                Admin Login
              </h2>
              <p className="text-gray-400">360Organic Marketing Team</p>
              <div className="mt-4 p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
                <p className="text-xs text-indigo-300 font-medium mb-1">📧 Demo Credentials:</p>
                <p className="text-xs text-gray-300">Username: <span className="text-white font-mono">360organic@gmail.com</span></p>
                <p className="text-xs text-gray-300">Password: <span className="text-white font-mono">SecurePass2024!</span></p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Username
                </label>
                <input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                  placeholder="Enter username"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Key className="w-4 h-4 inline mr-2" />
                  Password
                </label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                  placeholder="Enter password"
                  required
                />
              </div>

              {notification && (
                <div className={`p-4 rounded-xl flex items-center space-x-2 ${
                  notification.type === 'success' 
                    ? 'bg-green-500/20 border border-green-500/30 text-green-400' 
                    : 'bg-red-500/20 border border-red-500/30 text-red-400'
                }`}>
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm">{notification.message}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-medium text-white hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
              >
                Login to Dashboard
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => navigate('/')}
                className="text-sm text-gray-400 hover:text-indigo-400 transition-colors"
              >
                ← Back to Home
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Animation */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.15),transparent_50%)] animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.15),transparent_50%)] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 border-b border-white/10 backdrop-blur-xl bg-black/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">360</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Admin Panel
                </h1>
                <p className="text-xs text-gray-400">360Organic Marketing Team</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-600/30 transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative z-40 bg-white/5 backdrop-blur-xl border-b border-white/10"
          >
            <div className="max-w-7xl mx-auto px-6 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Admin Username</label>
                  <input
                    type="text"
                    value={adminCredentials.username}
                    onChange={(e) => setAdminCredentials({ ...adminCredentials, username: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    placeholder="Enter admin username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Admin Password</label>
                  <input
                    type="password"
                    value={adminCredentials.password}
                    onChange={(e) => setAdminCredentials({ ...adminCredentials, password: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    placeholder="Enter admin password"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-3">
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateSettings}
                  className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white font-medium hover:from-indigo-700 hover:to-purple-700 transition-all"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Add New Landing Page</h2>
            <p className="text-gray-400">Create and showcase your landing pages</p>
          </div>
          <button
            onClick={() => openModal()}
            className="mt-4 md:mt-0 flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-medium text-white hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Page</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Total Pages</p>
                <p className="text-3xl font-bold text-white">{landingPages.length}</p>
              </div>
              <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                <Code className="w-6 h-6 text-indigo-400" />
              </div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Published</p>
                <p className="text-3xl font-bold text-white">
                  {landingPages.filter(p => p.status === 'published').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Check className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Future Products</p>
                <p className="text-3xl font-bold text-white">
                  {landingPages.filter(p => p.status === 'future').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Admin</p>
                <p className="text-3xl font-bold text-white">{user?.username}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search landing pages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-400 w-5 h-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Landing Pages Table */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Page</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Status</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredPages.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                      <div className="flex flex-col items-center">
                        <Code className="w-12 h-12 mb-4 text-gray-600" />
                        <p className="text-lg font-medium">No landing pages found</p>
                        <p className="text-sm mt-2">Click "Add New Page" to create your first landing page</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredPages.map((page) => (
                    <tr key={page.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-white">{page.name}</p>
                          <p className="text-sm text-gray-400">{page.cta}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {page.type}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-indigo-600/20 text-indigo-400 rounded-full text-sm">
                          {categories.find(c => c.id === page.category)?.name || page.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        ${page.price}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          page.status === 'published' ? 'bg-green-600/20 text-green-400' :
                          page.status === 'future' ? 'bg-purple-600/20 text-purple-400' :
                          'bg-gray-600/20 text-gray-400'
                        }`}>
                          {page.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => {
                              setEditingPage(page);
                              setFormData({
                                name: page.name,
                                type: page.type,
                                category: page.category,
                                html: page.html,
                                css: page.css,
                                js: page.js,
                                cta: page.cta,
                                price: page.price,
                                status: page.status,
                              });
                              setIsModalOpen(true);
                              setIsPreviewing(false);
                            }}
                            className="p-2 text-gray-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(page.id)}
                            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal with Live Preview */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl h-[90vh] bg-gray-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-700 flex-shrink-0">
                <h3 className="text-xl font-bold text-white">
                  {editingPage ? 'Edit Landing Page' : 'Add New Landing Page'}
                </h3>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 flex overflow-hidden">
                {/* Left Panel - Form */}
                <div className="w-1/2 overflow-y-auto p-6 border-r border-gray-700">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Type className="w-4 h-4 inline mr-2" />
                        Page Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-4 py-3 bg-white/5 border ${
                          formErrors.name ? 'border-red-500' : 'border-white/10'
                        } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all`}
                        placeholder="Enter page name"
                      />
                      {formErrors.name && <p className="mt-1 text-sm text-red-400">{formErrors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Type className="w-4 h-4 inline mr-2" />
                        Type *
                      </label>
                      <input
                        type="text"
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className={`w-full px-4 py-3 bg-white/5 border ${
                          formErrors.type ? 'border-red-500' : 'border-white/10'
                        } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all`}
                        placeholder="e.g., Marketing, E-commerce"
                      />
                      {formErrors.type && <p className="mt-1 text-sm text-red-400">{formErrors.type}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Filter className="w-4 h-4 inline mr-2" />
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                      >
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <DollarSign className="w-4 h-4 inline mr-2" />
                        Price ($)
                      </label>
                      <input
                        type="text"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                        placeholder="e.g., 99.99"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Type className="w-4 h-4 inline mr-2" />
                        CTA Text
                      </label>
                      <input
                        type="text"
                        value={formData.cta}
                        onChange={(e) => setFormData({ ...formData, cta: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                        placeholder="e.g., Buy Now, Get Started"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Code className="w-4 h-4 inline mr-2" />
                        HTML Code *
                      </label>
                      <textarea
                        value={formData.html}
                        onChange={(e) => setFormData({ ...formData, html: e.target.value })}
                        rows={6}
                        className={`w-full px-4 py-3 bg-white/5 border ${
                          formErrors.html ? 'border-red-500' : 'border-white/10'
                        } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none font-mono text-sm`}
                        placeholder="Paste your HTML code here..."
                      />
                      {formErrors.html && <p className="mt-1 text-sm text-red-400">{formErrors.html}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Code className="w-4 h-4 inline mr-2" />
                        CSS Code (Optional)
                      </label>
                      <textarea
                        value={formData.css}
                        onChange={(e) => setFormData({ ...formData, css: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none font-mono text-sm"
                        placeholder="Paste your CSS code here..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Code className="w-4 h-4 inline mr-2" />
                        JavaScript Code (Optional)
                      </label>
                      <textarea
                        value={formData.js}
                        onChange={(e) => setFormData({ ...formData, js: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none font-mono text-sm"
                        placeholder="Paste your JavaScript code here..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as 'published' | 'draft' | 'future' })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                      >
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="future">Future Product</option>
                      </select>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={generatePreview}
                        className="flex items-center space-x-2 px-6 py-3 bg-purple-600 rounded-xl font-medium text-white hover:bg-purple-700 transition-all"
                      >
                        <Play className="w-4 h-4" />
                        <span>Preview</span>
                      </button>
                      <button
                        type="button"
                        onClick={closeModal}
                        className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-medium text-white hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
                      >
                        <Save className="w-4 h-4" />
                        <span>{editingPage ? 'Update' : 'Add'} Page</span>
                      </button>
                    </div>
                  </form>
                </div>

                {/* Right Panel - Live Preview */}
                <div className="w-1/2 bg-black flex flex-col">
                  <div className="p-4 border-b border-gray-700 flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-300">Live Preview:</span>
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
                    </div>
                    {isPreviewing && (
                      <button
                        onClick={generatePreview}
                        className="flex items-center space-x-2 px-3 py-1 bg-indigo-600/20 border border-indigo-500/30 rounded-lg text-indigo-400 hover:bg-indigo-600/30 transition-all"
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span className="text-xs">Refresh</span>
                      </button>
                    )}
                  </div>

                  <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
                    {isPreviewing && previewContent ? (
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
                          srcDoc={previewContent}
                          className="w-full h-full border-0"
                          title="Live Preview"
                          sandbox="allow-scripts allow-same-origin"
                        />
                      </div>
                    ) : (
                      <div className="text-center text-gray-500">
                        <Code className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium">Click "Preview" to see your landing page</p>
                        <p className="text-sm mt-2">Fill in the HTML, CSS, and JS code to preview</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-xl flex items-center space-x-3 shadow-2xl ${
              notification.type === 'success'
                ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                : 'bg-red-500/20 border border-red-500/30 text-red-400'
            } backdrop-blur-xl`}
          >
            {notification.type === 'success' ? (
              <Check className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span className="font-medium">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="relative z-10 border-t border-white/10 bg-black/50 backdrop-blur-xl py-6 px-6">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
          <p>&copy; 2024 360Organic Marketing Team. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanelNew;
