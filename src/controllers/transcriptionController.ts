import { Request, Response } from 'express';
import { createTranscription, getAllTranscriptions } from '../services/transcriptionService';


export async function postTranscription(req: Request, res: Response) {
  const { audioUrl } = req.body;
  console.log('[POST /transcription] Request body:', req.body);
  if (!audioUrl || typeof audioUrl !== 'string') {
    console.log('[POST /transcription] Invalid or missing audioUrl');
    return res.status(400).json({ error: 'Invalid or missing audioUrl' });
  }
  try {
    const doc = await createTranscription(audioUrl);
    console.log('[POST /transcription] Transcription created with id:', doc._id);
    return res.status(201).json({ id: doc._id });
  } catch (err) {
    console.error('[POST /transcription] Error:', err);
    return res.status(500).json({ error: 'Failed to process transcription' });
  }
}


export async function getTranscriptions(req: Request, res: Response) {
  console.log('[GET /transcription] Fetching all transcriptions');
  try {
    const docs = await getAllTranscriptions();
    console.log(`[GET /transcription] Found ${docs.length} transcriptions`);
    return res.json(docs.map(doc => ({
      id: doc._id,
      audioUrl: doc.audioUrl,
      transcription: doc.transcription,
      createdAt: doc.createdAt,
    })));
  } catch (err) {
    console.error('[GET /transcription] Error:', err);
    return res.status(500).json({ error: 'Failed to fetch transcriptions' });
  }
}
