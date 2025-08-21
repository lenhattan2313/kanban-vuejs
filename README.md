# Vue.js Kanban Board

A modern, responsive Kanban board application built with Vue.js 3, TypeScript, and Inspira UI.

## ✨ Features

- **Modern UI**: Beautiful interface built with Inspira UI components
- **Drag & Drop**: Intuitive card and column management
- **Real-time Updates**: Live collaboration features
- **Responsive Design**: Works seamlessly on all devices
- **Dark Mode**: Built-in theme support
- **TypeScript**: Full type safety throughout the application
- **State Management**: Pinia for efficient state management

## 🛠️ Tech Stack

- **Frontend**: Vue.js 3 with Composition API
- **Styling**: Tailwind CSS + Inspira UI
- **State Management**: Pinia
- **Build Tool**: Vite
- **Type System**: TypeScript
- **Linting/Formatting**: ESLint, Prettier
- **Animations**: Motion-v

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd kanban
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## 📁 Project Structure

```
src/
├── components/          # Vue components
│   ├── ui/             # Base UI components (Inspira UI)
│   ├── kanban/         # Kanban-specific components
│   └── layout/         # Layout components
├── composables/        # Vue composables
├── stores/            # Pinia stores
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
├── views/             # Page-level components
├── router/            # Vue Router configuration
└── assets/            # Static assets
```

## 🎯 Development Commands

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format code with Prettier
npm run type-check       # TypeScript type checking
```

## 🚀 Project Phases

### Phase 1: Foundation & Setup ✅

- [x] Vue.js 3 + TypeScript setup
- [x] Inspira UI integration
- [x] Tailwind CSS configuration
- [x] Basic project structure
- [x] Pinia store setup
- [x] Mock data implementation

### Phase 2: Core Architecture ✅

- [x] Component architecture
- [x] State management patterns
- [x] Routing configuration
- [x] Type definitions
- [x] Utility functions

### Phase 3: Kanban Features

- [ ] Board management
- [ ] Column operations
- [ ] Card functionality
- [ ] Drag & drop implementation
- [ ] Real-time updates

### Phase 4: Advanced Features

- [ ] User authentication
- [ ] Board sharing
- [ ] Activity tracking
- [ ] Search and filtering
- [ ] Export/import functionality

### Phase 5: Polish & Deployment

- [ ] Performance optimization
- [ ] Accessibility improvements
- [ ] Testing implementation
- [ ] CI/CD pipeline
- [ ] Production deployment

## 📚 Documentation

- [Architecture Guide](docs/architecture.md)
- [Development Guide](docs/development.md)
- [Component Guide](docs/components.md)
- [API Documentation](docs/api.md)
- [Deployment Guide](docs/deployment.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vue.js](https://vuejs.org/) - Progressive JavaScript framework
- [Inspira UI](https://inspira-ui.com/) - Beautiful Vue.js component library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Pinia](https://pinia.vuejs.org/) - Intuitive, type safe store for Vue
