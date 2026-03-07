# Admin Panel Quick Reference

## 🔐 Login Credentials

**Default Credentials:**
- **Username:** `admin`
- **Password:** `admin123`

⚠️ **Important:** Change these credentials after first login!

---

## 📋 Admin Panel Features

### 1. Dashboard Statistics
- **Total Pages:** Count of all landing pages
- **Total Views:** Sum of all page views
- **Categories:** Number of available categories
- **Admin:** Current logged-in user

### 2. Add New Landing Page
Click the "Add New Page" button and fill in:
- **Title:** Name of the landing page (required)
- **Description:** Brief description (required)
- **Image URL:** URL for the card thumbnail (required)
- **Live URL:** URL of the actual landing page (required, must be valid URL)
- **Category:** Select from dropdown (E-commerce, SaaS, Health, etc.)

### 3. Edit Existing Page
- Click the **pencil icon** (✏️) on any page row
- Update the form fields
- Click "Update Page" to save changes

### 4. Delete Landing Page
- Click the **trash icon** (🗑️) on any page row
- Confirm deletion in the popup dialog
- ⚠️ This action cannot be undone!

### 5. View Live Page
- Click the **eye icon** (👁️) to open the landing page in a new tab
- This opens the live URL directly (not in a modal)

### 6. Search & Filter
- **Search Bar:** Type to search by title or description
- **Category Filter:** Select a category from the dropdown
- Both filters work together

### 7. Settings Panel
Click the **gear icon** (⚙️) in the top right:
- **Update Username:** Change admin username
- **Update Password:** Change admin password
- Click "Save Settings" to apply changes
- You'll need to login again with new credentials

### 8. Logout
Click the "Logout" button in the top right:
- Ends your session
- Returns to login screen
- Clear browser cache if you want to completely remove session

---

## 🎯 Best Practices

### Image URLs
- Use high-quality images (recommended: 800x600 pixels)
- Use reliable image hosting (Unsplash, Cloudinary, etc.)
- Ensure images are publicly accessible
- Test image URLs before adding

### Live URLs
- Must be valid URLs (https://example.com)
- Should be publicly accessible
- Consider CORS policies for iframe embedding
- Test URLs before publishing

### Descriptions
- Keep descriptions concise (1-2 sentences)
- Highlight key features or benefits
- Use compelling language
- Include target audience if relevant

### Categories
- Choose appropriate category for each page
- Consistent categorization helps users find pages
- All 7 categories are available:
  - E-commerce
  - SaaS
  - Health & Wellness
  - Portfolio
  - Food & Beverage
  - Finance

---

## 🔒 Security Tips

1. **Change Default Credentials:** Immediately after first login
2. **Use Strong Passwords:** Mix of letters, numbers, and symbols
3. **Regular Updates:** Update credentials periodically
4. **Secure URLs:** Only add landing pages from trusted sources
5. **Monitor Activity:** Keep track of added/modified pages

---

## 🐛 Troubleshooting

### Can't Login
- Check username and password (case-sensitive)
- Try clearing browser cache
- Verify credentials haven't been changed

### Images Not Loading
- Check if image URL is accessible
- Verify image hosting service is up
- Ensure URL is correct (https://)

### Live Preview Not Working
- Check if live URL is valid
- Verify the page allows iframe embedding
- Some sites block iframe embedding (X-Frame-Options)

### Changes Not Saving
- Check form validation errors
- Ensure all required fields are filled
- Try refreshing the page

### Data Lost
- Data is stored in localStorage
- Clear browser cache to reset
- Consider implementing backend storage for production

---

## 📊 Data Structure

Each landing page has this structure:
```json
{
  "id": "unique_id",
  "title": "Page Title",
  "description": "Page description",
  "imageUrl": "https://example.com/image.jpg",
  "liveUrl": "https://example.com",
  "category": "ecommerce",
  "views": 0,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

---

## 🎨 Customization

### Adding New Categories
Edit the `categories` array in `src/pages/AdminPanel.tsx`:
```typescript
const categories = [
  { id: 'ecommerce', name: 'E-commerce' },
  // Add new category:
  { id: 'new-category', name: 'New Category Name' },
];
```

### Changing Default Pages
Edit the default pages array in `src/pages/HomePage.tsx`

### Updating Branding
- Change logo in `src/pages/HomePage.tsx` and `AdminPanel.tsx`
- Update company name in both files
- Modify color scheme in `src/index.css`

---

## 📞 Support

For issues or questions:
1. Check this documentation
2. Review the README.md file
3. Check browser console for errors
4. Verify all dependencies are installed

---

**Remember:** This is a client-side application. All data is stored in the browser's localStorage. For production use, consider implementing a backend database for persistent storage.
