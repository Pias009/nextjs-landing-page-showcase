# 360Organic Marketing Team - Landing Page Showcase

A stunning, modern landing page showcase application with a secure admin panel, built with React, Vite, Tailwind CSS, GSAP, and Framer Motion.

## 🚀 Features

### Public Showcase Page
- **Beautiful 3D Animated Background**: Floating orbs, rotating 3D cube, particle effects, and perspective grid
- **Premium Typography**: Space Grotesk for headings, Outfit for body text
- **Dark Theme**: Pure black background with vibrant gradient accents
- **Landing Page Gallery**: Display all landing pages with images, descriptions, and categories
- **Search & Filter**: Find landing pages by name or category
- **Live Preview**: Click any card to view the landing page in a modal iframe
- **Smooth Animations**: GSAP scroll triggers and Framer Motion transitions

### Admin Panel (Protected)
- **Secure Authentication**: Login with username and password
- **Full CRUD Operations**:
  - Add new landing pages
  - Edit existing pages
  - Delete landing pages
  - View live preview
- **Dashboard Statistics**: Total pages, views, categories, and admin info
- **Category Management**: Filter by E-commerce, SaaS, Health, Portfolio, Food & Beverage, Finance
- **Settings Panel**: Update admin credentials (username and password)
- **Responsive Design**: Works on all devices

## 🔐 Security Features

- **Authentication Required**: Admin panel is protected with login
- **Default Demo Credentials**:
  - **Email**: `360organic@gmail.com`
  - **Password**: `SecurePass2024!`
- **Change Credentials**: Update username and password in the settings panel after login
- **LocalStorage Storage**: User session and data stored securely in browser
- **Iframe Sandboxing**: Live preview uses sandboxed iframes for security

> 💡 **Note**: See `CREDENTIALS.md` for detailed admin panel documentation and usage guide.

## 📁 Project Structure

```
src/
├── App.tsx              # Main app with routing
├── main.tsx             # Entry point
├── index.css            # Global styles and animations
├── pages/
│   ├── HomePage.tsx     # Public showcase page
│   └── AdminPanel.tsx   # Protected admin panel
```

## 🎨 Design Features

### 3D Animated Background
- Floating colorful orbs with smooth animations
- Rotating glassmorphic 3D cube
- Perspective grid with movement
- 20 floating particles
- Radial gradient overlays

### UI Components
- Glassmorphism cards with frosted glass effects
- Gradient buttons with shadow effects
- Hover animations with 3D transforms
- Neon glow effects on interactive elements
- Custom scrollbar with gradient colors

### Typography
- **Headings**: Space Grotesk (Google Fonts)
- **Body**: Outfit (Google Fonts)
- Multiple weights for hierarchy
- Gradient text effects

## 🛠️ How to Use

### Getting Started

1. **Install Dependencies** (already done):
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

### Using the Application

#### Public Page
1. Visit the homepage to see all landing pages
2. Use the search bar to find specific pages
3. Click category buttons to filter by category
4. Click "View Live" to see a landing page in a modal
5. Click "Visit Live Site" to open in a new tab

#### Admin Panel
1. Click "Admin Panel" button on the homepage
2. Login with credentials (default: admin/admin123)
3. **Add New Page**:
   - Click "Add New Page" button
   - Fill in the form:
     - Title
     - Description
     - Image URL (thumbnail for the card)
     - Live URL (URL of the actual landing page)
     - Category
   - Click "Add Page"
4. **Edit Page**:
   - Click the edit icon (pencil) on any page
   - Update the form fields
   - Click "Update Page"
5. **Delete Page**:
   - Click the trash icon on any page
   - Confirm deletion
6. **View Live**:
   - Click the eye icon to open the landing page in a new tab
7. **Update Credentials**:
   - Click the settings icon (gear) in the top right
   - Enter new username and password
   - Click "Save Settings"
8. **Logout**:
   - Click "Logout" button in the top right

### Adding Landing Pages

When creating a landing page, you need to provide:

1. **Title**: Name of the landing page
2. **Description**: Brief description of the page
3. **Image URL**: URL of an image to use as the card thumbnail
   - Use high-quality images (800x600 recommended)
   - Can use Unsplash, your own images, or any image URL
4. **Live URL**: The actual URL of the landing page
   - Must be a valid URL (https://example.com)
   - This will be displayed in an iframe when users click "View Live"
   - Can be your own hosted landing pages or external demos

### Sample Landing Page Template

See `sample-landing-page.html` for a template of how to create HTML/CSS/JS landing pages with GSAP animations.

## 🎯 Categories

The application supports 7 categories:
- **E-commerce**: Online stores and product pages
- **SaaS**: Software as a Service product pages
- **Health & Wellness**: Health, fitness, and wellness apps
- **Portfolio**: Creative portfolios and personal sites
- **Food & Beverage**: Restaurant and food service pages
- **Finance**: Fintech and financial service pages

## 📦 Dependencies

- **React** - UI library
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **GSAP** - Professional animation library
- **Lucide React** - Beautiful icon library

## 🔧 Customization

### Changing Colors
Edit `src/index.css` to modify:
- Gradient colors
- Orb colors
- Grid colors
- Button colors

### Adding Categories
Edit the `categories` array in both `HomePage.tsx` and `AdminPanel.tsx`:

```typescript
const categories = [
  { id: 'new-category', name: 'New Category', icon: IconName },
  // ...
];
```

### Updating Default Data
Edit the default pages array in `HomePage.tsx` to change pre-loaded landing pages.

## 🚀 Deployment

### Vercel
```bash
npm run build
# Deploy the dist folder to Vercel
```

### Netlify
```bash
npm run build
# Deploy the dist folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Deploy the dist folder to GitHub Pages
```

## 📝 Notes

- All data is stored in browser's localStorage
- Clear browser cache to reset data
- Admin credentials are also stored in localStorage
- For production, consider implementing a backend for persistent storage
- The iframe sandbox prevents potential security issues from embedded pages

## 🎨 Credits

- **Design**: 360Organic Marketing Team
- **Icons**: Lucide React
- **Fonts**: Space Grotesk & Outfit (Google Fonts)
- **Animations**: GSAP & Framer Motion

## 📄 License

© 2024 360Organic Marketing Team. All rights reserved.

---

Built with ❤️ using React, Vite, Tailwind CSS, GSAP, and Framer Motion
