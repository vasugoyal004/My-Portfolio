# Vasu Goyal — Senior Full-Stack Developer Portfolio

An Awwwards-caliber, high-performance personal portfolio website built with **React 18**, **Tailwind CSS**, **Framer Motion**, **GSAP + ScrollTrigger**, **Lenis**, and **Three.js / React Three Fiber**.

Featuring an ultra-premium dark aesthetic, tactile kinetic micro-animations, interactive 3D particle landscape, full-screen preloader, and dedicated deep-dive case study pages.

---

## ⚡ Tech Stack

- **Core**: React 18, Vite 8, React Router v6
- **Styling**: Tailwind CSS with custom dark tokens & CSS variables
- **Motion & Scrolling**:
  - [Lenis](https://github.com/darkroomengineering/lenis) (inertia smooth scrolling)
  - [GSAP + ScrollTrigger](https://greensock.com/) (timeline drawing & pinned choreographies)
  - [Framer Motion](https://www.framer.com/motion/) (orchestrated component & page transitions)
- **3D / Canvas**: [Three.js](https://threejs.org/) + [React Three Fiber](https://r3f.docs.pmnd.rs/) (interactive particle swarm & geometric wireframe)
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Contact Service**: [EmailJS](https://www.emailjs.com/) browser SDK

---

## 🎨 Design System & Aesthetics

| Token | Value | Description |
| :--- | :--- | :--- |
| **Background** | `#050505` | Deep void black |
| **Surface** | `#0D0D0D` | Glass card elevation |
| **Primary Text** | `#FFFFFF` | Crisp white |
| **Secondary Text**| `#A1A1AA` | Cool zinc |
| **Accent Color** | `#C6FF3D` | Electric Lime (exclusive highlight hue) |
| **Borders** | `rgba(255,255,255,0.08)` | Minimal translucent glass borders |
| **Typography** | `Syne`, `Space Grotesk`, `Inter` | Editorial headings & body |

---

## 📂 Project Structure

```
├── public/
│   ├── robots.txt              # Search engine indexing rules
│   └── sitemap.xml             # Canonical sitemap
├── src/
│   ├── assets/                 # Static media and graphics
│   ├── components/             # Reusable UI systems
│   │   ├── CustomCursor.jsx    # Dot + lagging ring with 'VIEW' badge
│   │   ├── Footer.jsx          # Marquee strip, wordmark & SVG progress ring
│   │   ├── HeroScene.jsx       # Three.js / React Three Fiber interactive particle canvas
│   │   ├── MagneticButton.jsx  # Physics spring magnetic button wrapper
│   │   ├── Navbar.jsx          # Centered floating pill navbar & mobile circle drawer
│   │   ├── PageTransition.jsx  # Fullscreen curtain wipe route transition
│   │   ├── Preloader.jsx       # 0–100 counter & letter-by-letter reveal
│   │   ├── ScrollProgressBar.jsx # Accent progress bar at top edge
│   │   └── SmoothScroll.jsx    # Lenis + GSAP ScrollTrigger sync
│   ├── data/
│   │   └── content.js          # ⭐ SINGLE FILE FOR ALL PORTFOLIO DATA
│   ├── hooks/
│   │   ├── useMagnetic.js      # Magnetic attraction spring hook
│   │   ├── useMediaQuery.js    # Responsive media query observer
│   │   ├── useMousePosition.js # 2D cursor & normalized coordinates
│   │   └── useScrollSpy.js     # Section viewport observer
│   ├── pages/
│   │   ├── NotFoundPage.jsx    # Animated 404 error experience
│   │   └── ProjectDetailPage.jsx # Case study deep dive (/projects/:slug)
│   ├── sections/
│   │   ├── AboutSection.jsx    # 3D tilt card & word-by-word scroll highlighting
│   │   ├── ContactSection.jsx  # Form with floating labels & EmailJS validation
│   │   ├── ExperienceSection.jsx # Self-drawing vertical timeline
│   │   ├── HeroSection.jsx     # Masked line reveals & rotating roles
│   │   ├── ProjectsSection.jsx # Editorial grid with category filter
│   │   ├── ServicesTestimonialsSection.jsx # Accordion + draggable carousel
│   │   └── TechMarquee.jsx     # Dual-row infinite velocity slider
│   ├── App.jsx                 # Router & lazy code-splitting
│   ├── index.css               # Global CSS, noise overlay, custom scrollbar
│   └── main.jsx                # DOM root mount
├── tailwind.config.js          # Tailwind theme tokens
├── vite.config.js              # Rollup manual chunks & server settings
└── vercel.json                 # SPA rewrite rules for production
```

---

## 🛠️ How to Customize Your Content

All content is managed through a single file: **`src/data/content.js`**. You don't need to dig through component markup to make changes.

### 1. Update Profile & Bio
Edit `personalData` in `src/data/content.js`:
```javascript
export const personalData = {
  name: "Vasu Goyal",
  title: "Software Developer",
  roles: ["Full-Stack Developer", "Web Portal Specialist", ...],
  experienceYears: "3.5+",
  email: "vasugoyal.dev@gmail.com",
  phone: "+91 98765 43210",
  resumeUrl: "/path/to/resume.pdf",
  ...
};
```

### 2. Add or Edit Projects
Add an entry to `projectsData`:
```javascript
{
  id: "your-project-slug",
  slug: "your-project-slug",
  title: "Your Project Title",
  subtitle: "Project Tagline",
  category: "Portals", // 'Portals' | 'Websites' | 'Management Systems'
  categoryLabel: "Enterprise Platform",
  index: "04",
  coverImage: "https://images.unsplash.com/...",
  overview: "...",
  problem: "...",
  solution: "...",
  architecture: ["..."],
  keyFeatures: ["..."],
  techStack: ["React", "Node.js", ...],
  metrics: [{ label: "Metric", value: "Value" }],
  gallery: ["..."]
}
```

### 3. Connect EmailJS (Contact Form)
1. Sign up for a free account at [EmailJS](https://www.emailjs.com/).
2. Create an Email Service (e.g. Gmail) and get your **Service ID**.
3. Create an Email Template with variables `{{from_name}}`, `{{from_email}}`, `{{message}}` and get your **Template ID**.
4. In `src/data/content.js`, update `contactData`:
```javascript
export const contactData = {
  emailServiceId: "YOUR_SERVICE_ID",
  emailTemplateId: "YOUR_TEMPLATE_ID",
  emailPublicKey: "YOUR_PUBLIC_KEY",
  ...
};
```
*(If keys remain at defaults, the form automatically uses a safe simulation fallback for effortless local testing).*

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build locally
npm run preview
```

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)
1. Push your repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Framework Preset: **Vite**.
4. Build Command: `npm run build`.
5. Output Directory: `dist`.
6. Click **Deploy**. `vercel.json` already handles all SPA client-side routing.

### Deploy to Netlify
1. Connect repository at [netlify.com](https://www.netlify.com/).
2. Set Build command: `npm run build` and Publish directory: `dist`.
3. Create a `public/_redirects` file with `/*  /index.html  200`.

---

## 📄 License
MIT License © 2026 Vasu Goyal.
