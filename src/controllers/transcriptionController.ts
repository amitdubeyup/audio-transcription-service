import { Request, Response } from 'express';
import { createTranscription, getAllTranscriptions } from '../services/transcriptionService';

export async function postTranscription(req: Request, res: Response) {
  const { audioUrl } = req.body;
  if (!audioUrl || typeof audioUrl !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing audioUrl' });
  }
  try {
    const doc = await createTranscription(audioUrl);
    return res.status(201).json({ id: doc._id });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to process transcription' });
  }
}

export async function getTranscriptions(req: Request, res: Response) {
  try {
    const docs = await getAllTranscriptions();
    return res.json(docs.map(doc => ({
      id: doc._id,
      audioUrl: doc.audioUrl,
      transcription: doc.transcription,
      createdAt: doc.createdAt,
    })));
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch transcriptions' });
  }
}
