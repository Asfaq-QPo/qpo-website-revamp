# QPo Website Project

## Overview
QPo is a shared auto-rickshaw ride platform based in Chennai, India. This is the company's multi-page static website built with HTML, CSS, and vanilla JavaScript. No build tools or frameworks — served directly via `npx serve`.

## Dev Server
```bash
npx serve -l 3500
```
Configured in `.claude/launch.json` as `qpo-site`. Preview at `http://localhost:3500`.

## Project Structure
```
/
├── index.html              # Homepage (hero, features, benefits, media, testimonials)
├── about-us.html            # About Us (team, mission, impact stats)
├── For-enterprises.html    # B2B enterprise solutions
├── for-drivers.html        # Driver signup form + benefits
├── riders-faq.html         # FAQ accordion
├── policy.html             # Privacy Policy
├── refund_policy.html      # Refund Policy
├── tandc.html              # Terms & Conditions
├── main.css                # PRIMARY stylesheet (design system, all components)
├── animations.js           # Scroll reveal, header scroll, mobile menu, contact link handling
├── pictures/               # All images (logos, icons, illustrations, photos)
├── News channel logos/      # Media organization logos
├── css/                    # Page-specific CSS overrides
│   ├── policy.css
│   ├── styeforenterprises.css
│   └── styles_new.css
└── .claude/launch.json     # Dev server config
```

## Key Conventions

### HTML
- All pages share an identical header structure — edits to nav must be synced across all 8 HTML files
- Header uses fixed positioning with `.header-spacer` (76px) to offset content
- Navigation: `data-contact-link` attribute on Contact Us link enables special JS handling (scroll to footer, URL becomes `/contact-us`, nav highlight)
- Footer has `id="footer"` on all pages for Contact Us scroll target
- Image paths use absolute paths: `/pictures/filename.png`
- Logo file: `/pictures/QPo logo transparent bg.png` (transparent background version)

### CSS
- **Single primary stylesheet**: `main.css` contains the full design system
- **Class prefix**: All component classes use `qpo-` prefix (e.g., `.qpo-header`, `.qpo-hero`, `.qpo-section`)
- **Section variants**: `.qpo-section--dark` (dark gradient), `.qpo-section--surface` (light gradient)
- **Responsive**: Uses `clamp()` for fluid sizing; breakpoints at 1024px, 768px, 480px
- **Animations**: `.reveal` class triggers scroll-based entrance via IntersectionObserver

### Design Tokens (CSS Variables)
- **Primary blue**: `--color-primary: #0C6CFC`
- **Accent teal**: `--color-accent: #00D4AA`
- **Dark background**: `--color-dark: #0B1426`
- **Display font**: `--font-display: 'Poppins'` (headings)
- **Body font**: `--font-body: 'Inter'` (text)
- **Container max**: `--container-max: 1280px`
- **Primary gradient**: `--gradient-primary: linear-gradient(135deg, #0C6CFC, #00D4AA)`

### JavaScript
- `animations.js` is the only JS file — handles scroll reveal, header scroll effect, mobile menu, accordion, and Contact Us navigation
- Driver signup form in `for-drivers.html` POSTs to `http://localhost:3000/send` (backend endpoint)
- No npm dependencies for the frontend

## Navigation Structure
| Page | Path | Active Link |
|------|------|-------------|
| Home | `/index.html` | Home |
| About Us | `/about-us.html` | About Us |
| For Enterprises | `/For-enterprises.html` | For Enterprises |
| For Drivers | `/for-drivers.html` | For Drivers |
| Contact Us | scrolls to `#footer` | Contact Us (via JS) |

## Image Naming Patterns
- Logos: `logo-*.png`, `QPo logo transparent bg.png`
- Media logos: `logo-*.png` / `logo-*.jpg` (news outlets in pictures/)
- Feature icons: `why-choose-*.png`, `image-*.png`
- App store buttons: `apple-store.png`, `play-store.png`
- Social icons: `facebook.png`, `instagram.png`, `linkedin.png`, `X.png`, `youtube.png`

## Important Notes
- Store buttons in hero use custom styled `.qpo-store-btn` class (not image-based)
- Media section logos display on white cards without "Read Article" buttons (hidden via CSS)
- The `mix-blend-mode: multiply` on the header logo makes white backgrounds transparent
- Mobile hamburger activates below 768px
- Footer is shared across all pages with identical structure
