# Kids Quiz Time! 🧠

An interactive educational quiz application designed for children, featuring STEAM (Science, Technology, Engineering, Arts, Mathematics) questions with a fun flip-card interface.

## Features

- 🎯 Age-appropriate questions (4-12 years)
- 🔄 Interactive flip cards
- 🎨 Beautiful, kid-friendly UI
- 🤖 AI-powered question generation
- 🎭 STEAM-focused content
- ⚡ Real-time question updates

## Technology Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **AI Integration**: Google's Gemini AI
- **Build Tool**: Vite
- **Icons**: Lucide React

## Project Structure

```
src/
├── components/          # React components
├── services/           # External services integration
├── store/              # State management
├── types/              # TypeScript type definitions
├── data/              # Static data and fallback content
└── utils/             # Utility functions
```

## Getting Started

1. **Clone the repository**

```bash
git clone <repository-url>
cd kids-quiz-time
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Setup**

Copy the example environment file and add your Gemini API key:

```bash
cp .env.example .env
```

Update `.env` with your Gemini API key:

```
VITE_GEMINI_API_KEY=your_api_key_here
```

4. **Start Development Server**

```bash
npm run dev
```

5. **Build for Production**

```bash
npm run build
```

## Architecture Overview

### Components
- `AgeSelector`: Handles age group selection
- `FlipCard`: Manages the flip card animation and display
- `QuizContainer`: Main quiz interface container
- `Navigation`: Quiz navigation controls
- `LoadingScreen`: Loading state display
- `ErrorMessage`: Error handling display

### State Management
- Uses Zustand for global state management
- Manages quiz state, navigation, and UI interactions
- Handles asynchronous operations with AI integration

### AI Integration
- Integrates with Gemini AI for question generation
- Implements fallback mechanism for offline/error scenarios
- Validates AI responses for data integrity

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.