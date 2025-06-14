# Story Generator

A modern web application that allows users to create characters and generate AI-powered stories based on those characters. Built with React, Vite, and TailwindCSS.

## Live Demo

Check out the live application at [https://quirktale.xyz/](https://quirktale.xyz/)

## Features

- Create and manage story characters with detailed descriptions
- Generate AI-powered stories based on your characters
- Modern and responsive UI with beautiful gradients and animations
- Real-time story generation with loading states
- Character management system with detailed views

## Tech Stack

- **Frontend Framework:** React 19
- **Build Tool:** Vite
- **Styling:** TailwindCSS
- **Icons:** Lucide React
- **Development Tools:**
  - ESLint for code linting
  - PostCSS for CSS processing
  - Autoprefixer for CSS compatibility

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (Latest LTS version recommended)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd story_generator
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
story_generator/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   ├── index.css        # Global styles
│   └── assets/          # Static assets
├── public/              # Public assets
├── index.html          # HTML template
└── package.json        # Project dependencies and scripts
```

## API Integration

The application integrates with a backend API at `https://backend.quirktale.xyz` for:
- Character management (CRUD operations)
- Story generation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- Icons provided by [Lucide React](https://lucide.dev/)
- Styling powered by [TailwindCSS](https://tailwindcss.com/)
