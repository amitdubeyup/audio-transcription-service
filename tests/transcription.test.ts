import request from 'supertest';
import express from 'express';
import * as service from '../src/services/transcriptionService';
import transcriptionRoutes from '../src/routes/transcription';

jest.mock('../src/services/transcriptionService');

const app = express();
app.use(express.json());
app.use('/transcription', transcriptionRoutes);

describe('POST /transcription', () => {
  it('should return 201 and id for valid audioUrl', async () => {
    (service.createTranscription as jest.Mock).mockResolvedValue({ _id: 'mockid' });
    const res = await request(app)
      .post('/transcription')
      .send({ audioUrl: 'http://example.com/audio.mp3' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id', 'mockid');
  });

  it('should return 400 for missing audioUrl', async () => {
    const res = await request(app)
      .post('/transcription')
      .send({});
    expect(res.status).toBe(400);
  });
});
