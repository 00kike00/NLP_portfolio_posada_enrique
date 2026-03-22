# Smart Daily Planner

A simple, clean web app that converts your messy daily plans into organized schedules using AI.

## Features

- **Clean UI**: Modern, minimal interface built with Next.js and Tailwind CSS
- **AI-Powered Organization**: Transforms unstructured text into structured daily schedules
- **Timeline View**: Shows your day broken down into time blocks
- **Priority Tasks**: Displays tasks in order of importance
- **Smart Reasoning**: Explains why tasks are ordered the way they are
- **Regenerate Option**: Get different organization suggestions
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Next.js API routes
- **AI**: Ready for OpenAI integration (currently using mock responses)

## Setup Instructions

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. **Navigate to the project directory**:
   ```bash
   cd Forum_3_Windsurf
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

### Environment Variables (Optional)

To integrate with OpenAI instead of using mock responses:

1. Create a `.env.local` file in the project root:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

2. Update the API route in `src/app/api/organize/route.ts` to use the OpenAI API (instructions included in the code comments)

## Usage

1. **Type your messy daily plan** in the textarea
   - Example: "need to email boss, call dentist, workout, buy groceries, finish project report, meet friend for coffee"

2. **Click "Organize my day"** to process your plan

3. **View your organized schedule** with:
   - Timeline with time blocks
   - Prioritized task list
   - Reasoning for the task order

4. **Use "Regenerate"** to get alternative organization suggestions

## Project Structure

```
smart-daily-planner/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── organize/
│   │   │       └── route.ts      # API endpoint for AI processing
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout component
│   │   └── page.tsx              # Main page component
│   └── ...
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## Customization

### Adding OpenAI Integration

1. Install the OpenAI package:
   ```bash
   npm install openai
   ```

2. Update `src/app/api/organize/route.ts` to use the OpenAI API (uncomment the OpenAI code and remove the mock function)

### Styling

The app uses Tailwind CSS. You can customize the theme by modifying:
- `tailwind.config.js` for theme configuration
- `src/app/globals.css` for global styles
- Component-level styles in the respective files

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Building for Production

```bash
npm run build
npm run start
```

## Future Enhancements

- [ ] Real OpenAI integration
- [ ] Dark mode toggle
- [ ] Save/load plans
- [ ] Export to calendar
- [ ] Task completion tracking
- [ ] Multiple plan templates

## License

This project is open source and available under the [MIT License](LICENSE).
