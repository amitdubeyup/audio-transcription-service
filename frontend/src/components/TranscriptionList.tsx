import React from 'react';

type Transcription = {
  id: string;
  audioUrl: string;
  transcription: string;
  createdAt: string;
};

interface Props {
  transcriptions: Transcription[];
}

const TranscriptionList: React.FC<Props> = ({ transcriptions }) => {
  console.log('[TranscriptionList] Rendering with transcriptions:', transcriptions);
  if (!transcriptions.length)
    return <div className="text-center text-gray-500 italic mt-8">No transcriptions found.</div>;
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4 text-blue-800 text-center">Transcriptions</h2>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-3 py-2 border text-xs font-semibold">ID</th>
              <th className="px-3 py-2 border text-xs font-semibold">Audio URL</th>
              <th className="px-3 py-2 border text-xs font-semibold">Transcription</th>
              <th className="px-3 py-2 border text-xs font-semibold">Created At</th>
            </tr>
          </thead>
          <tbody>
            {transcriptions.map(t => (
              <tr key={t.id} className="hover:bg-blue-50 transition">
                <td className="px-3 py-2 border text-xs font-mono text-gray-700">{t.id}</td>
                <td className="px-3 py-2 border text-xs break-all text-blue-700 underline underline-offset-2">{t.audioUrl}</td>
                <td className="px-3 py-2 border text-xs text-gray-800">{t.transcription}</td>
                <td className="px-3 py-2 border text-xs text-gray-500">{new Date(t.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TranscriptionList;
