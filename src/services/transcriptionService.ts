import axios from 'axios';
import Transcription, { ITranscription } from '../models/transcription';

export async function downloadAudioWithRetry(audioUrl: string, maxAttempts = 3): Promise<Buffer> {
  let attempt = 0;
  let lastError: any;
  while (attempt < maxAttempts) {
    try {
      const response = await axios.get(audioUrl, { responseType: 'arraybuffer' });
      return Buffer.from(response.data);
    } catch (err) {
      lastError = err;
      attempt++;
      if (attempt >= maxAttempts) throw lastError;
    }
  }
  throw lastError;
}

export async function createTranscription(audioUrl: string): Promise<ITranscription> {
  // Mock download (retry logic)
  await downloadAudioWithRetry(audioUrl);
  // Mock transcription
  const transcription = 'This is a mocked transcription from the audio file.';
  // Save to DB
  const doc = new Transcription({ audioUrl, transcription });
  return await doc.save();
}

export async function getAllTranscriptions(): Promise<ITranscription[]> {
  return Transcription.find().sort({ createdAt: -1 });
}
