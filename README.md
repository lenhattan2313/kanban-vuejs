# Vue.js Kanban Board

A modern, responsive Kanban board application built with Vue.js 3, featuring drag-and-drop functionality, real-time updates, and a clean, intuitive interface.

## 🚀 Features

- **Drag & Drop**: Intuitive card and column management
- **Real-time Updates**: Live collaboration capabilities
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Dark/Light Mode**: Toggle between themes
- **Local Storage**: Persistent data storage
- **TypeScript Support**: Full type safety
- **Component Architecture**: Modular and maintainable codebase

## 🛠️ Tech Stack

- **Frontend**: Vue.js 3 with Composition API
- **Styling**: Tailwind CSS + Shadcn UI
- **State Management**: Pinia
- **Build Tool**: Vite
- **TypeScript**: For type safety
- **Linting**: ESLint + Prettier

## 📦 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd kanban

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

npm run lint         # Lint code
npm run format       # Format code
```

## 📁 Project Structure

```
kanban/
├── docs/                    # Documentation
├── public/                  # Static assets
├── src/
│   ├── components/          # Vue components
│   ├── composables/         # Vue composables
│   ├── stores/             # Pinia stores
│   ├── types/              # TypeScript types
│   ├── utils/              # Utility functions
│   ├── App.vue             # Root component
│   └── main.ts             # Application entry

├── .eslintrc.js           # ESLint configuration
├── .prettierrc            # Prettier configuration
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── package.json           # Dependencies and scripts
```

## 🚀 Project Phases

### Phase 1: Foundation & Setup

- **Project Initialization**: Set up Vue.js 3 project with TypeScript
- **Development Environment**: Configure Vite, ESLint, Prettier
- **Project Structure**: Establish folder structure and conventions
- **Basic Configuration**: Environment variables and build setup

### Phase 2: Core Architecture

- **State Management**: Implement Pinia stores for Kanban data
- **Component Architecture**: Create base UI components
- **Type System**: Define TypeScript interfaces and types
- **Routing**: Set up Vue Router for navigation

### Phase 3: Kanban Features

- **Board Management**: Create, edit, and delete boards
- **Column System**: Implement column creation and management
- **Card System**: Build card creation, editing, and display
- **Drag & Drop**: Implement drag and drop functionality

### Phase 4: Advanced Features

- **User Authentication**: Implement user login and registration
- **Real-time Updates**: Add WebSocket integration
- **Collaboration**: Multi-user editing and sharing
- **Advanced UI**: Dark mode, responsive design, animations

### Phase 5: Polish & Deployment

- **Performance Optimization**: Bundle optimization and caching
- **Testing & Validation**: Manual testing and bug fixes
- **Documentation**: Complete API and user documentation
- **Deployment**: Production deployment and monitoring

## 📚 Documentation

- [Development Guide](./docs/development.md) - Development setup and guidelines
- [Architecture Guide](./docs/architecture.md) - Project architecture and patterns
- [Component Guide](./docs/components.md) - Component development guidelines
- [Deployment Guide](./docs/deployment.md) - Deployment instructions
- [API Documentation](./docs/api.md) - API endpoints and data structures

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions, please:

1. Check the [documentation](./docs/)
2. Search existing [issues](../../issues)
3. Create a new issue with detailed information

---

Built with ❤️ using Vue.js
