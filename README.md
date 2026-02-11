# ChurchDay Marketing Website

A modern, high-converting landing page for ChurchDay - the all-in-one church management platform.

## Features

- 🎯 **Conversion-Optimized** - Designed specifically to convert church leaders to demo requests
- 🎨 **Warm & Welcoming Design** - Professional yet approachable aesthetic suitable for faith communities
- 📱 **Fully Responsive** - Perfect on desktop, tablet, and mobile devices
- ⚡ **Fast & Modern** - Built with Next.js, React, and Tailwind CSS
- ♿ **Accessible** - Semantic HTML and accessible component structure
- 🔍 **SEO Ready** - Optimized for search engines

## Design Highlights

### Color Palette
- **Primary Blue**: Trust, faith, and reliability
- **Warm Accent**: Community, engagement, and connection
- **Stone/Neutral**: Professionalism and readability

### Key Sections
1. **Navigation** - Sticky header with smooth scrolling
2. **Hero** - Compelling headline with dual CTAs
3. **Pain Points** - Addresses church leaders' challenges
4. **Features** - Six key capabilities with icons
5. **How It Works** - Simple 3-step onboarding flow
6. **Testimonial** - Social proof from existing users
7. **Demo Form** - Conversion-focused lead capture
8. **Footer** - Navigation and legal links

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
cd /Users/dannielfrancis/churchday-website
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
churchday-website/
├── app/
│   ├── globals.css      # Global styles & utilities
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Landing page (all sections)
├── package.json
├── next.config.js
├── tsconfig.json
├── tailwind.config.js
└── postcss.config.js
```

## Customization

### Colors
Edit `tailwind.config.js` to customize the color palette:
```js
colors: {
  primary: { ... },
  warm: { ... },
  accent: { ... }
}
```

### Content
All text content is in `app/page.tsx`. Search and replace:
- "ChurchDay" → Your app name
- Church-specific features
- Testimonial content

### Demo Form Integration
The demo form in `app/page.tsx` currently logs to console. To integrate with your backend:

```tsx
const handleDemoSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  // Send to your backend
  const response = await fetch('/api/demo-requests', {
    method: 'POST',
    body: JSON.stringify(demoForm)
  })
  // Handle response...
}
```

## Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Other Platforms
- **AWS Amplify**: Supports Next.js natively
- **Netlify**: Use Next.js adapter
- **Docker**: Create your own Dockerfile

## Performance Tips

1. **Images**: Use Next.js Image component for optimization
2. **Fonts**: Consider using system fonts or Google Fonts
3. **Analytics**: Add your analytics script to `layout.tsx`
4. **SEO**: Update metadata in `layout.tsx`

## Future Enhancements

- [ ] Blog section for church management tips
- [ ] Pricing table/plans section
- [ ] Customer logos carousel
- [ ] Video demo embed
- [ ] Live chat support widget
- [ ] Newsletter signup
- [ ] Case studies section
- [ ] Email integration for demo requests

## Support

For issues or questions about the landing page:
1. Check this README
2. Review the code comments in `app/page.tsx`
3. Consult Next.js documentation: https://nextjs.org/docs

## License

Internal use only. Part of ChurchDay project.
