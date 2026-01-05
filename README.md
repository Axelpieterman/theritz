# The Ritz - Lloret de Mar 🐢

A modern, multi-language restaurant website for The Ritz in Lloret de Mar, Spain. Built with Astro, React, Tailwind CSS, and shadcn/ui components.

## ✨ Features

- 🌍 **Multi-language Support** - English, Spanish, Catalan, Dutch, and French
- 🎨 **Beautiful Beach-Themed Design** - Sandy colors and coastal vibes inspired by Ibiza
- 📱 **Fully Responsive** - Mobile-first design that looks great on all devices
- ⚡ **Lightning Fast** - Built with Astro for optimal performance
- 🍹 **Complete Menu System** - Showcasing signature drinks and food items
- 📅 **Events Section** - Featuring special events like Kingsday
- 💬 **WhatsApp Integration** - Direct reservation system via WhatsApp
- 🎯 **SEO Optimized** - Built-in SEO best practices

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd theritz-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:4321`

## 🛠️ Built With

- [Astro](https://astro.build/) - The web framework for content-driven websites
- [React](https://react.dev/) - For interactive components
- [Tailwind CSS](https://tailwindcss.com/) - For styling
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Lucide React](https://lucide.dev/) - Icon library

## 📁 Project Structure

```
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── ui/         # shadcn/ui components
│   │   ├── Navigation.tsx
│   │   └── Footer.tsx
│   ├── i18n/           # Internationalization
│   │   ├── languages.ts
│   │   └── ui.ts
│   ├── layouts/        # Page layouts
│   │   └── Layout.astro
│   ├── lib/            # Utility functions
│   │   └── utils.ts
│   ├── pages/          # Page components
│   │   ├── index.astro
│   │   └── [lang]/     # Multi-language routes
│   │       ├── index.astro
│   │       ├── menu.astro
│   │       ├── about.astro
│   │       ├── events.astro
│   │       └── contact.astro
│   └── styles/         # Global styles
│       └── global.css
├── astro.config.mjs    # Astro configuration
├── package.json
└── tsconfig.json
```

## 🌍 Supported Languages

- **English (en)** - Default
- **Spanish (es)** - Español
- **Catalan (ca)** - Català
- **Dutch (nl)** - Nederlands
- **French (fr)** - Français

## 🎨 Color Scheme

The website uses a beach-inspired color palette:

- **Background**: Cream/Sand (#EDE9E0)
- **Primary**: Terracotta/Brown (#9A6B4D)
- **Accent**: Coral/Orange (#E8945F)
- **Text**: Dark Brown (#3D2E24)

## 📞 Contact Information

- **Address**: Carrer del Carme 43, Lloret de Mar
- **Phone**: +31 6 18758383
- **WhatsApp**: [Send Message](https://wa.me/31618758383)

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run astro` - Run Astro CLI commands

## 📝 To-Do / Future Enhancements

- [ ] Add real images (replace placeholder gradients)
- [ ] Integrate Google Maps API
- [ ] Add image gallery with lightbox
- [ ] Implement online ordering system
- [ ] Add Instagram feed integration
- [ ] Set up analytics
- [ ] Add sitemap and robots.txt
- [ ] Implement structured data for SEO

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

© 2025 The Ritz. All rights reserved.

---

Built with ❤️ for The Ritz - Lloret de Mar
