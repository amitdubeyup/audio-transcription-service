# Backend Setup & Structure

## Files and Folders

```
audio-transcription/
├── package.json, tsconfig.json, jest.config.js   # Project configs (root)
├── .env                                        # Environment variables
├── src/
│   ├── app.ts                                  # Express server entry
│   ├── models/
│   │   └── transcription.ts                    # Mongoose model
│   ├── services/
│   │   └── transcriptionService.ts             # Business logic (download, mock transcription, DB)
│   ├── controllers/
│   │   └── transcriptionController.ts          # Handles requests/responses
│   └── routes/
│       └── transcription.ts                    # Express routes
├── tests/
│   └── transcription.test.ts                   # Basic Jest test (mocked)
```

## How to Run
1. Install dependencies:
   ```sh
   npm install
   ```
2. Copy the provided `.env.example` to `.env` in the root directory:
   ```sh
   cp .env.example .env
   ```
   Then, edit `.env` if you need to change any environment variables.
3. Start dev server:
   ```sh
   npm run dev
   ```
4. Build for production:
   ```sh
   npm run build
   ```
5. Start production server:
   ```sh
   npm start
   ```
6. Run tests:
   ```sh
   npm test
   ```

## API Endpoints
- `POST /transcription` — Body: `{ audioUrl: string }` → `{ id }`
- `GET /transcription` — List all transcriptions

## Assumptions
- Audio download/transcription is mocked
- Local MongoDB for dev

---

Next: Frontend setup in `/frontend` (React + TypeScript)
