import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TranscriptionList from './components/TranscriptionList';

const API_URL = 'http://localhost:3000/transcription';

function App() {
  const [audioUrl, setAudioUrl] = useState('');
  const [message, setMessage] = useState('');
  const [transcriptions, setTranscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTranscriptions = async () => {
    try {
      const res = await axios.get(API_URL);
      setTranscriptions(res.data);
    } catch {
      setMessage('Failed to fetch transcriptions');
    }
  };

  useEffect(() => {
    fetchTranscriptions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    try {
      const res = await axios.post(API_URL, { audioUrl });
      setMessage(`Transcription created! ID: ${res.data.id}`);
      setAudioUrl('');
      fetchTranscriptions();
    } catch (err: any) {
      setMessage(err?.response?.data?.error || 'Error creating transcription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4">
      <div className="max-w-2xl mx-auto bg-white shadow-2xl rounded-2xl p-8 border border-gray-200">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-700 tracking-tight drop-shadow">Audio Transcription Demo</h1>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            className="flex-1 border-2 border-blue-200 focus:border-blue-500 rounded-lg px-4 py-2 text-lg outline-none transition"
            placeholder="Enter audio URL (e.g. https://...)"
            value={audioUrl}
            onChange={e => setAudioUrl(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg font-semibold shadow hover:from-blue-600 hover:to-purple-600 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
        {message && <div className="mb-4 text-base text-center text-purple-700 font-medium animate-pulse">{message}</div>}
        <TranscriptionList transcriptions={transcriptions} />
      </div>
    </div>
  );
}

export default App;
