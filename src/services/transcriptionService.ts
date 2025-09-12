import axios from 'axios';
import Transcription, { ITranscription } from '../models/transcription';


export async function downloadAudioWithRetry(audioUrl: string, maxAttempts = 3): Promise<Buffer> {
  let attempt = 0;
  let lastError: any;
  while (attempt < maxAttempts) {
    try {
      console.log(`[downloadAudioWithRetry] Attempt ${attempt + 1} to download: ${audioUrl}`);
      const response = await axios.get(audioUrl, { responseType: 'arraybuffer' });
      console.log('[downloadAudioWithRetry] Download successful');
      return Buffer.from(response.data);
    } catch (err) {
      lastError = err;
      attempt++;
      console.error(`[downloadAudioWithRetry] Download failed on attempt ${attempt}:`, err);
      if (attempt >= maxAttempts) throw lastError;
    }
  }
  throw lastError;
}


export async function createTranscription(audioUrl: string): Promise<ITranscription> {
  console.log('[createTranscription] Creating transcription for:', audioUrl);
  // Mock download (retry logic)
  await downloadAudioWithRetry(audioUrl);
  // Mock transcription
  const transcription = 'This is a mocked transcription from the audio file.';
  // Save to DB
  const doc = new Transcription({ audioUrl, transcription });
  const savedDoc = await doc.save();
  console.log('[createTranscription] Transcription saved with id:', savedDoc._id);
  return savedDoc;
}


export async function getAllTranscriptions(): Promise<ITranscription[]> {
  console.log('[getAllTranscriptions] Fetching all transcriptions from DB');
  return Transcription.find().sort({ createdAt: -1 });
}
