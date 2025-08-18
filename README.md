# 🧠 Trivia Quiz App

A modern, interactive trivia quiz application built with React and TypeScript. Test your knowledge across various categories with real-time scoring, timer functionality, and a beautiful UI.

## ✨ Features

- 🎯 **Multiple Categories**: General Knowledge, Sports, History, Geography, Science, Movies, Music, and more
- 🏆 **Difficulty Levels**: Easy, Medium, Hard, or Mixed
- ⏱️ **Real-time Timer**: 15-second countdown per question
- 📊 **Live Progress Tracking**: Visual progress bar and score tracking
- 🎨 **Beautiful UI**: Modern design with gradient backgrounds and smooth animations
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🔄 **Instant Feedback**: Immediate answer validation with color-coded responses
- 🎉 **Performance Summary**: Detailed results with percentage scores

## 🚀 Demo

[Live Demo](your-demo-link-here) | [Video Demo](your-video-link-here)

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **API**: Open Trivia Database
- **Build Tool**: Vite
- **Type Safety**: Full TypeScript implementation

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/trivia-quiz-app.git
   cd trivia-quiz-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

## 📁 Project Structure

```
src/
├── components/
│   ├── QuizSetup.tsx      # Quiz configuration screen
│   ├── QuizGame.tsx       # Main game interface
│   └── QuizResults.tsx    # Results and scoring screen
├── types.ts               # TypeScript type definitions
├── utils.ts               # Utility functions and API calls
├── App.tsx               # Main application component
└── main.tsx              # Application entry point
```

## 🎮 How to Play

1. **Setup Phase**: Choose your quiz preferences
   - Select number of questions (5-20)
   - Pick a category or choose "Any Category"
   - Set difficulty level or choose "Any Difficulty"

2. **Game Phase**: Answer questions within the time limit
   - Read the question carefully
   - Click on your answer choice (A, B, C, or D)
   - Get immediate feedback on your answer
   - Watch your score and progress update in real-time

3. **Results Phase**: View your performance
   - See your final score and percentage
   - Get personalized feedback based on your performance
   - Play again with the same or different settings

## 🔧 Configuration

### Quiz Settings
```typescript
interface QuizSettings {
  amount: number;        // 5, 10, 15, or 20 questions
  category: string;      // Category ID or empty for any
  difficulty: string;    // 'easy', 'medium', 'hard', or empty
  type: string;         // 'multiple' for multiple choice
}
```

### Available Categories
- General Knowledge
- Sports
- History
- Geography
- Science & Nature
- Computers
- Movies
- Music
- And more...

### Customization Options

**Timer Duration**: Modify in `utils.ts`
```typescript
const TIMER_DURATION = 15; // seconds per question
```

**Score Thresholds**: Adjust in `utils.ts`
```typescript
export const getScoreColor = (score: number, total: number): string => {
  const percentage = (score / total) * 100;
  if (percentage >= 80) return 'text-green-600';    // Excellent
  if (percentage >= 60) return 'text-yellow-600';   // Good
  return 'text-red-600';                            // Keep practicing
};
```

## 🎨 Styling & Theming

The app uses Tailwind CSS for styling with a modern gradient theme:

- **Primary Colors**: Purple and Blue gradients
- **Success**: Green for correct answers
- **Error**: Red for incorrect answers
- **Neutral**: Gray for inactive elements

### Custom Background Images
You can customize background images in components:
```jsx
// In QuizGame.tsx and QuizResults.tsx
<div className="absolute inset-0 bg-[url('your-image-url')] bg-cover opacity-20 -z-10"></div>
```

## 📊 API Integration

The app integrates with the [Open Trivia Database API](https://opentdb.com/):

- **Base URL**: `https://opentdb.com/api.php`
- **No API Key Required**: Free to use
- **Question Format**: Multiple choice questions
- **Categories**: 20+ available categories
- **Difficulties**: Easy, Medium, Hard

### API Response Handling
```typescript
// Automatic HTML entity decoding
// Answer shuffling for randomization
// Error handling for failed requests
// Type-safe response processing
```

## 🧪 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

### Code Quality

- **TypeScript**: Full type safety with strict mode
- **ESLint**: Code linting and formatting
- **Type-only imports**: Optimized bundle size
- **Component separation**: Clean, maintainable architecture

### Adding New Features

1. **New Question Types**: Extend the `TriviaQuestion` interface
2. **Additional Categories**: Update the `CATEGORIES` array in `types.ts`
3. **Custom Themes**: Modify Tailwind classes in components
4. **Enhanced Scoring**: Update scoring logic in `utils.ts`

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style and structure
- Add TypeScript types for new features
- Test your changes thoroughly
- Update documentation as needed
- Write clear commit messages

## 🐛 Troubleshooting

### Common Issues

**API Request Failures**
```typescript
// Check network connectivity
// Verify API endpoint availability
// Handle empty response scenarios
```

**TypeScript Errors**
```bash
# For type-only import errors
import type { YourType } from './types';

# For verbatimModuleSyntax issues
npm run type-check
```

**Styling Issues**
```bash
# Ensure Tailwind is properly configured
# Check for conflicting CSS classes
# Verify responsive breakpoints
```

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Open Trivia Database](https://opentdb.com/) for providing the trivia questions API
- [Lucide](https://lucide.dev/) for the beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first styling
- [Unsplash](https://unsplash.com/) for the background images

## 📞 Support

If you encounter any issues or have questions:

- 🐛 [Report a Bug](https://github.com/yourusername/trivia-quiz-app/issues)
- 💡 [Request a Feature](https://github.com/yourusername/trivia-quiz-app/issues)
- 📧 [Email Support](mailto:your-email@example.com)

---

**Made with ❤️ by [Your Name]**

⭐ Don't forget to star this repo if you found it helpful!
