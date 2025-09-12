import { Router } from 'express';
import { postTranscription, getTranscriptions } from '../controllers/transcriptionController';

const router = Router();

router.post('/', postTranscription);
router.get('/', getTranscriptions);

export default router;
