# Frontend Setup & Structure

## Files and Folders

```
frontend/
├── package.json, tsconfig.json, tailwind.config.js, postcss.config.js   # Project configs
├── src/
│   ├── main.tsx                      # React entry point
│   ├── App.tsx                        # Main app (form, list)
│   ├── components/
│   │   └── TranscriptionList.tsx      # Table for transcriptions
│   ├── index.css                      # Tailwind base styles
│   ├── services/                      # (Optional) API service helpers
│   └── types/                         # (Optional) TypeScript types
├── index.html                         # Vite HTML entry
```

## How to Run
1. Install dependencies:
   ```sh
   cd frontend
   npm install
   ```
2. Start dev server:
   ```sh
   npm run dev
   ```
3. Build for production:
   ```sh
   npm run build
   ```
4. Preview production build locally:
   ```sh
   npm run preview
   ```

## Features
- Input form for audio URL
- List of all transcriptions
- Uses backend at http://localhost:3000

## Assumptions
- No authentication, no file upload, just URL input
- Minimal error handling for demo

---

For improvements, see root README.md.
