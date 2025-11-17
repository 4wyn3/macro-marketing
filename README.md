# SalesPro - Sales Company Website

A modern, responsive React website for a sales company built with React, React Router, and Vite.

## Features

- 🏠 **Home Page** - Hero section, features showcase, statistics, and call-to-action
- 📖 **About Page** - Company story, values, and team information
- 💼 **Services Page** - Comprehensive service offerings with detailed descriptions
- 📧 **Contact Page** - Contact form and company information
- 📱 **Responsive Design** - Mobile-friendly layout that works on all devices
- 🎨 **Modern UI** - Beautiful, professional design with smooth animations

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
website/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Header.css
│   │   ├── Footer.jsx
│   │   └── Footer.css
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Home.css
│   │   ├── About.jsx
│   │   ├── About.css
│   │   ├── Services.jsx
│   │   ├── Services.css
│   │   ├── Contact.jsx
│   │   └── Contact.css
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## Technologies Used

- **React 18** - UI library
- **React Router DOM** - Client-side routing
- **Vite** - Build tool and dev server
- **CSS3** - Styling with modern features

## Customization

You can easily customize the website by:

- Updating company information in the components
- Modifying colors in `src/index.css` (CSS variables)
- Adding new pages in `src/pages/`
- Updating content in each page component

## License

This project is open source and available for use.

