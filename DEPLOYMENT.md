# Churchday Marketing Website - Deployment Guide

## Quick Start (Development)

```bash
cd churchday-website
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## Production Deployment Options

### **Option 1: Vercel (Recommended) ⭐**

Vercel is the optimal choice for Next.js apps, especially with animations and dynamic imports.

#### Steps:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial Churchday marketing site"
   git remote add origin <your-github-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js and configures build settings
   - Click "Deploy"

3. **Custom Domain** (Optional)
   - In Vercel dashboard, go to Project Settings
   - Add your domain under "Domains"
   - Update DNS records with Vercel's instructions

#### Vercel Benefits:
- ✅ Auto-deploys on git push
- ✅ Free SSL certificates
- ✅ Global CDN
- ✅ Serverless functions (for contact API)
- ✅ Environment variables management
- ✅ Analytics and monitoring
- ✅ Edge middleware support

---

### **Option 2: Netlify**

Alternative hosting with good Next.js support.

#### Steps:

1. **Create Netlify.toml**
   ```toml
   [build]
   command = "npm run build"
   publish = ".next"

   [[redirects]]
   from = "/*"
   to = "/index.html"
   status = 200
   ```

2. **Deploy**
   - Push code to GitHub
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Select your repository
   - Click "Deploy"

#### Netlify Benefits:
- ✅ Easy GitHub integration
- ✅ Built-in CI/CD
- ✅ Free HTTPS
- ✅ Form submissions captured
- ✅ Serverless functions (paid)

---

### **Option 3: Self-Hosted (AWS, DigitalOcean, etc.)**

For more control and potentially lower costs at scale.

#### Using AWS EC2:

1. **Build the app**
   ```bash
   npm run build
   ```

2. **Deploy**
   ```bash
   # SSH into your EC2 instance
   ssh -i your-key.pem ec2-user@your-ip

   # Install Node.js
   curl -sL https://rpm.nodesource.com/setup_18.x | sudo bash -
   sudo yum install -y nodejs

   # Upload your project
   scp -i your-key.pem -r churchday-website/ ec2-user@your-ip:~/

   # Install and run
   cd churchday-website
   npm install
   npm run build
   npm run start
   ```

3. **Setup PM2 for process management**
   ```bash
   npm install -g pm2
   pm2 start "npm start" --name "churchday-website"
   pm2 startup
   pm2 save
   ```

4. **Setup Nginx as reverse proxy**
   ```nginx
   server {
     listen 80;
     server_name churchday.app;

     location / {
       proxy_pass http://localhost:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

---

## Environment Variables

Create `.env.local` for local development:

```env
# Contact form (when integrated with email service)
NEXT_PUBLIC_CONTACT_EMAIL=hello@churchday.app
CONTACT_API_KEY=your_api_key_here
```

For production, set these in your hosting platform's dashboard.

---

## Email Integration (Contact Form)

The contact form API is ready for email integration. Choose one:

### **Resend (Recommended)**

```javascript
// pages/api/contact.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, church, message } = req.body;

  try {
    const response = await resend.emails.send({
      from: 'Churchday <contact@churchday.app>',
      to: 'hello@churchday.app',
      subject: `New contact from ${church}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Church:</strong> ${church}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: email,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
```

1. Sign up at [resend.com](https://resend.com)
2. Get API key
3. Set `RESEND_API_KEY` environment variable
4. `npm install resend`
5. Update contact API as shown above

### **SendGrid**

Similar process using SendGrid's Node.js SDK:
```bash
npm install @sendgrid/mail
```

### **Mailgun**

```bash
npm install mailgun.js
```

---

## Performance Optimization

### Pre-deployment Checklist:

- [ ] Run `npm run lint` and fix any issues
- [ ] Test all pages locally: `/`, `/contact`
- [ ] Test contact form submission
- [ ] Verify all links work
- [ ] Check responsive design on mobile
- [ ] Lighthouse score (target: 90+)

### Check Lighthouse:

```bash
npm install -g lighthouse
lighthouse http://localhost:3000 --view
```

### Image Optimization:

If you add images, use Next.js Image component:

```jsx
import Image from 'next/image';

export default function HeroImage() {
  return (
    <Image
      src="/images/hero.jpg"
      alt="Hero"
      width={800}
      height={600}
      priority // Only for above-the-fold images
    />
  );
}
```

---

## Post-Deployment

### 1. **Setup Monitoring**
   - Vercel: Built-in analytics
   - Self-hosted: Use PM2 Plus or Datadog

### 2. **Setup Error Tracking**
   - Sentry.io for error monitoring
   ```bash
   npm install @sentry/nextjs
   ```

### 3. **Setup Analytics**
   - Google Analytics 4
   - Vercel Analytics
   - Plausible Analytics (privacy-focused)

### 4. **Setup Email Alerts**
   - Contact form notifications
   - Error alerts
   - Deployment notifications

### 5. **SSL Certificate**
   - Vercel/Netlify: Automatic
   - Self-hosted: Let's Encrypt (automatic with Certbot)

---

## Continuous Integration / Continuous Deployment (CI/CD)

### GitHub Actions Example:

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: vercel/action@v24
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## Troubleshooting

### **Issue: Contact form not sending emails**
- Check API key is set correctly
- Verify email service account is active
- Check spam folder for test emails
- Review API service logs

### **Issue: Animations not showing**
- Clear browser cache: Ctrl+Shift+Delete
- Check browser console for JS errors
- Verify Framer Motion is loaded: Open DevTools → Network tab

### **Issue: Slow performance**
- Run Lighthouse audit
- Check bundle size: `npm run build` and review `.next` folder
- Enable image optimization
- Consider CDN for static assets

### **Issue: Mobile responsive issues**
- Test on real devices (not just Chrome DevTools)
- Check viewport meta tag is set
- Test touch interactions

---

## Support & Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Docs**: https://vercel.com/docs
- **Framer Motion**: https://www.framer.com/motion/
- **Tailwind CSS**: https://tailwindcss.com/docs

---

## Summary

| Option | Easiest | Best Performance | Best Value | Scalability |
|--------|---------|-----------------|------------|------------|
| Vercel | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| Netlify | ⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| Self-hosted | ⭐ | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |

**Recommendation**: Start with Vercel for simplicity and performance. Migrate to self-hosted only if you have specific requirements.
