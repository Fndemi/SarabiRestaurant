# The Sarabi Restaurant Website

A modern, responsive restaurant website featuring Pan-African fusion cuisine, built with Tailwind CSS v4 and vanilla JavaScript. The site showcases an elegant design with interactive carousel, integrated chatbot, and comprehensive menu system.

## 🎯 Project Overview

The Sarabi Restaurant is a sophisticated web application for a Pan-African fusion restaurant located in Westlands, Nairobi. The website emphasizes **Freshness | Culture | Community** and provides a seamless user experience for browsing menus, making reservations, and engaging with the restaurant's story.

## 📁 Project Structure

```
sarabi-restaurant/
├── index.html                      # Main landing page
├── README.md                       # Project documentation
├── package.json                    # Node.js dependencies and scripts
├── package-lock.json               # Locked dependency versions
├── postcss.config.js               # PostCSS configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── css/                           
│   ├── input.css                   # Tailwind CSS source file
│   └── output.css                  # Compiled Tailwind CSS
├── js/
│   ├── header.js                   # Mobile navigation & header logic
│   ├── chatbot-logic.js            # AI chatbot functionality
│   ├── chatbot-ui.js               # Chatbot user interface
│   ├── carousel.js                 # Hero carousel implementation
│   ├── theme.js                    # Theme and UI enhancements
│   ├── order.js                    # Online ordering functionality
│   ├── reservation.js              # Reservation system logic
│   └── feedback.js                 # Feedback form handling
├── img/
│   ├── logo.png                    # Restaurant logo
│   ├── centercarousel.jpg          # Hero carousel images
│   ├── rightcarousel.jpg
│   ├── leftcarousel.jpg
│   ├── story.png                   # About section image
│   ├── order1.png                  # Order process images
│   ├── order2.png
│   ├── order3.png
│   ├── icon-park--message-emoji.png # Chatbot icon
│   └── [dish-images].png          # Signature dishes gallery
│       ├── chicken-pizza.png
│       ├── sarabi-burger.png
│       ├── pork-loin.png
│       ├── steak.png
│       ├── creamy.png
│       ├── swahili.png
│       ├── lentil.png
│       ├── salmon.png
│       ├── berry.png
│       ├── cucumber.png
│       ├── decadent.png
│       ├── gnocchi.png
│       ├── mango.png
│       ├── mezze pletter.png
│       ├── pink frosted.png
│       ├── spicy pan.png
│       └── crispy.png
├── components/
│   ├── header.html                 # Header component
│   ├── footer.html                 # Footer component
│   ├── hero.html                   # Hero section component
│   ├── story.html                  # Our story component
│   ├── signature-dishes.html       # Signature dishes component
│   ├── chatbot.html                # Chatbot component
│   ├── appetizer.html              # Appetizers menu page
│   ├── main-dishes.html            # Main courses menu page
│   └── dessert.html                # Desserts menu page
├── pages/
│   ├── order.html                  # Online ordering system
│   ├── Reservation.html            # Table reservation form
│   └── feedback.html               # Contact and feedback form
└── node_modules/                   # Node.js dependencies
    ├── @tailwindcss/
    ├── tailwindcss/
    └── [other dependencies]
```

## ✨ Key Features

### 🎨 Design & UI
- **Responsive Design**: Mobile-first approach with Tailwind CSS v4
- **Color Scheme**: Elegant brown tones (#836262, #C39797, #EB9D69)
- **Typography**: Clean, readable fonts with proper hierarchy
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Component-Based Architecture**: Modular HTML components for maintainability

### 🖥️ Navigation
- **Fixed Header**: Persistent navigation with restaurant branding
- **Mobile Menu**: Animated hamburger menu with slide-out navigation
- **Dropdown Menus**: Organized menu categories (Appetizers, Main Courses, Desserts)
- **Smooth Scrolling**: Enhanced user experience with scroll-smooth

### 🎠 Hero Section
- **Interactive Carousel**: Three-slide hero carousel with navigation
- **Compelling CTAs**: "Order Now" and "Reserve Now" buttons
- **Responsive Images**: Optimized for all screen sizes
- **Brand Messaging**: Consistent tagline across all slides

### 🤖 Interactive Chatbot
- **AI Assistant**: "Sarabi Dining Assistant" for customer queries
- **Dual Architecture**: Separate logic (`chatbot-logic.js`) and UI (`chatbot-ui.js`) files
- **Quick Prompts**: Pre-defined buttons for common questions
- **Typing Animation**: Realistic bot response indicators
- **Responsive Design**: Mobile-optimized chat interface

### 📖 Our Story Section
- **Brand Narrative**: Authentic storytelling about restaurant origins
- **Visual Appeal**: High-quality interior photography
- **Accessibility**: Proper semantic HTML and ARIA labels

### 🍽️ Signature Dishes
- **Grid Layout**: Responsive 4-column grid (1-2-4 on mobile-tablet-desktop)
- **Hover Effects**: Scale and shadow animations on dish cards
- **Comprehensive Gallery**: 16+ featured Pan-African fusion dishes
- **Diverse Menu**: Appetizers, mains, and desserts representation

## 🛠️ Technical Stack

### Frontend Technologies
- **HTML5**: Semantic markup with component-based structure
- **Tailwind CSS v4**: Latest utility-first CSS framework with CLI
- **Vanilla JavaScript**: No framework dependencies, modular approach
- **PostCSS**: Enhanced CSS processing
- **Component Architecture**: Reusable HTML components

### Build Tools & Configuration
- **Tailwind CSS CLI**: v4.1.10 for compilation and optimization
- **Node.js**: Package management and build scripts
- **PostCSS**: Advanced CSS processing configuration
- **NPM Scripts**: Development, build, and formatting workflows

### External Libraries
- **Font Awesome**: Icon library for UI elements
- **Modern JavaScript**: ES6+ features and modular code organization

### Performance Optimizations
- **Lazy Loading**: Images load only when needed
- **Responsive Images**: Proper sizing for different viewports
- **Minified Assets**: Optimized CSS through Tailwind build process
- **Semantic HTML**: Better SEO and accessibility
- **Component Separation**: Modular architecture for better maintainability

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v14+ (for Tailwind CSS compilation)
- **NPM**: Package manager (comes with Node.js)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation & Setup

1. **Clone/Download the project**
   ```bash
   git clone [repository-url]
   cd sarabi-restaurant
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Development workflow**
   ```bash
   # Start Tailwind CSS watch mode (automatically compiles changes)
   npm run dev
   
   # In another terminal, serve the files locally
   # Using Python 3
   python -m http.server 8000
   
   # Or using Node.js
   npx http-server
   
   # Or using PHP
   php -S localhost:8000
   ```

4. **Open in browser**
   ```
   http://localhost:8000
   ```

### Development Commands

```bash
# Watch for changes and compile CSS (development)
npm run dev

# Build optimized CSS for production
npm run build

# Format HTML files with Prettier
npm run prettier
```

### Development Workflow

1. **CSS Changes**: Modify Tailwind classes in HTML, CSS auto-compiles with `npm run dev`
2. **JavaScript**: Edit modular files in `/js/` directory
3. **Components**: Update reusable components in `/components/`
4. **Images**: Add new images to `/img/` directory
5. **Pages**: Create new pages in `/pages/` directory

## 📱 Responsive Breakpoints

- **Mobile**: `< 768px` (sm)
- **Tablet**: `768px - 1024px` (md)
- **Desktop**: `1024px+` (lg, xl)

### Layout Adaptations
- **Navigation**: Hamburger menu on mobile, horizontal nav on desktop
- **Hero**: Stacked CTAs on mobile, side-by-side on desktop
- **Dishes Grid**: 1 column (mobile) → 2 columns (tablet) → 4 columns (desktop)
- **Story Section**: Stacked layout on mobile, side-by-side on desktop

## 🎯 User Experience Features

### Navigation Flow
```
Home → Our Story → Signature Dishes → Menu Categories → Order/Reserve → Feedback
```

### Interactive Elements
- **Chatbot**: Customer service and FAQ assistance with dedicated UI
- **Carousel**: Hero section with multiple restaurant highlights
- **Dropdown Menus**: Organized menu category navigation
- **Order System**: Complete online ordering functionality
- **Reservation System**: Table booking with form validation
- **Feedback System**: Customer feedback and contact forms

### Accessibility
- **ARIA Labels**: Screen reader support
- **Semantic HTML**: Proper document structure
- **Color Contrast**: WCAG compliant color combinations
- **Keyboard Navigation**: Full keyboard accessibility

## 🍽️ Menu Structure

### Categories
- **Appetizers** (`/components/appetizer.html`)
- **Main Courses** (`/components/main-dishes.html`)
- **Desserts** (`/components/dessert.html`)

### Featured Dishes (Signature Gallery)
1. Pan-African Spiced Chicken Pizza
2. Sarabi Gourmet Beef Burger
3. Rosemary & Garlic Pork Loin
4. Signature Dry-Aged Steak
5. Creamy Tilapia & Spinach Curry
6. Swahili Seafood Coconut Noodles
7. African Lentil Bolognese
8. Lakeside Salmon with Mango Salsa
9. Mixed Berry Parfait
10. Cucumber Mint Cooler
11. Decadent Chocolate Tart
12. Herb-Crusted Gnocchi
13. Tropical Mango Salad
14. Mediterranean Mezze Platter
15. Pink Frosted Delight
16. Spicy Pan-Seared Prawns
17. Crispy Calamari Rings

## 📞 Contact Information

- **Phone**: +111 01 22 32 23
- **Email**: TheSarabi@gmail.com
- **Hours**: Daily 9:00 AM - 12:00 AM
- **Location**: Westlands, Nairobi
- **Social**: @TheSarabiRestaurant2025

## 🔧 Project Architecture

### Component System
The project uses a modular component system with separate HTML files for:
- **Header/Footer**: Reusable navigation and footer components
- **Hero Section**: Homepage carousel and CTAs
- **Story Section**: About us content
- **Signature Dishes**: Featured menu items
- **Chatbot**: Interactive customer service

### JavaScript Modules
- **header.js**: Navigation and mobile menu functionality
- **carousel.js**: Hero section carousel logic
- **chatbot-logic.js**: Core chatbot functionality and responses
- **chatbot-ui.js**: Chatbot user interface interactions
- **order.js**: Online ordering system
- **reservation.js**: Table reservation system
- **feedback.js**: Contact and feedback forms
- **theme.js**: UI enhancements and theme management

### Tailwind CSS v4 Setup
```json
{
  "scripts": {
    "dev": "npx tailwindcss -i ./css/input.css -o ./css/output.css --watch",
    "build": "npx tailwindcss -i ./css/input.css -o ./css/output.css --minify",
    "prettier": "npx prettier --write **/*.html"
  }
}
```

## 🎨 Customization Guide

### Color Scheme
```css
Primary: #836262 (Brown)
Secondary: #C39797 (Light Brown)
Accent: #EB9D69 (Orange)
Background: #F8F1F1 (Light Pink)
```

### Adding New Components
1. Create HTML file in `/components/` directory
2. Add corresponding JavaScript in `/js/` if needed
3. Include component in main pages
4. Update navigation if necessary

### Adding New Dishes
1. Add image to `/img/` directory
2. Update signature dishes component
3. Create detailed page in `/components/` if needed
4. Update menu category files

## 🚀 Deployment

### Production Build
```bash
# Build optimized CSS
npm run build

# Format all HTML files
npm run prettier
```

### Production Checklist
- [ ] Run `npm run build` for optimized CSS
- [ ] Optimize images (compress, proper formats)
- [ ] Test on multiple devices and browsers
- [ ] Validate HTML and accessibility
- [ ] Configure proper caching headers
- [ ] Set up analytics tracking

### Hosting Options
- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **Traditional Hosting**: Any web hosting provider with Node.js support
- **CDN**: CloudFlare for global performance

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Install dependencies (`npm install`)
4. Start development server (`npm run dev`)
5. Make changes and test
6. Commit changes (`git commit -m 'Add amazing feature'`)
7. Push to branch (`git push origin feature/amazing-feature`)
8. Open Pull Request

## 📝 Dependencies

### Production Dependencies
- **@tailwindcss/cli**: ^4.1.10
- **tailwindcss**: ^4.1.10

### Development Tools
- **PostCSS**: CSS processing
- **Prettier**: Code formatting
- **Node.js**: Build environment

## 🎉 Acknowledgments

- **Design Inspiration**: Modern restaurant websites and Pan-African culture
- **Tailwind CSS v4**: For the latest utility-first styling approach
- **Font Awesome**: For the comprehensive icon library
- **Component Architecture**: For maintainable and scalable code structure

---

**The Sarabi Restaurant** - *Freshness | Culture | Community*
