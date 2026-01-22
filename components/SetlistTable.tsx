
import React, { useState } from 'react';
import { SetlistItem, Song, Tempo } from '../types';
import { SONG_INVENTORY } from '../constants';

interface SetlistTableProps {
  items: SetlistItem[];
  onSongUpdate: (index: number, newSong: Song) => void;
  onKeyUpdate: (index: number, newKey: string) => void;
  onBlockKeyUpdate: (tempo: string, newKey: string) => void;
}

const KEYS = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B', 'Am', 'Dm', 'Em', 'Gm'];

const SetlistTable: React.FC<SetlistTableProps> = ({ 
  items, 
  onSongUpdate, 
  onKeyUpdate, 
  onBlockKeyUpdate 
}) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingKeyIndex, setEditingKeyIndex] = useState<number | null>(null);

  const getSongsByTempo = (tempo: string) => {
    return SONG_INVENTORY.filter(s => s.tempo === tempo);
  };

  return (
    <div className="space-y-4">
      {/* Block Actions */}
      <div className="flex flex-wrap gap-4 print:hidden">
        <div className="flex items-center space-x-2 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50 px-3 py-2 rounded-lg">
          <span className="text-xs font-bold text-amber-700 dark:text-amber-500 uppercase">Tono Bloque Rápido:</span>
          <select 
            onChange={(e) => onBlockKeyUpdate('Rapido', e.target.value)}
            className="bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-900 rounded text-sm px-1 focus:outline-none focus:ring-1 focus:ring-amber-500 text-black dark:text-white font-bold"
            defaultValue=""
          >
            <option value="" disabled>--</option>
            {KEYS.map(k => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>
        <div className="flex items-center space-x-2 bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-200 dark:border-indigo-800/50 px-3 py-2 rounded-lg">
          <span className="text-xs font-bold text-indigo-700 dark:text-indigo-500 uppercase">Tono Bloque Lento:</span>
          <select 
            onChange={(e) => onBlockKeyUpdate('Lento', e.target.value)}
            className="bg-white dark:bg-slate-800 border border-indigo-300 dark:border-indigo-900 rounded text-sm px-1 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-black dark:text-white font-bold"
            defaultValue=""
          >
            <option value="" disabled>--</option>
            {KEYS.map(k => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-100 dark:border-slate-800">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
              <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300 uppercase text-xs tracking-wider">#</th>
              <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300 uppercase text-xs tracking-wider">Tipo</th>
              <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300 uppercase text-xs tracking-wider">Canción</th>
              <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300 uppercase text-xs tracking-wider">Tonalidad</th>
              <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300 uppercase text-xs tracking-wider">Ritmo</th>
              <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300 uppercase text-xs tracking-wider print:hidden">Editar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {items.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                <td className="px-6 py-4 text-slate-400 dark:text-slate-600 font-medium">{item.order}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                    item.tempo === 'Rapido' 
                      ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-500' 
                      : 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400'
                  }`}>
                    {item.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {editingIndex === idx ? (
                    <select
                      className="w-full bg-white dark:bg-slate-800 border border-indigo-300 dark:border-indigo-900 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-indigo-500 font-bold text-black dark:text-white"
                      onChange={(e) => {
                        const song = SONG_INVENTORY.find(s => s.title === e.target.value);
                        if (song) onSongUpdate(idx, song);
                        setEditingIndex(null);
                      }}
                      onBlur={() => setEditingIndex(null)}
                      autoFocus
                      defaultValue={item.title}
                    >
                      {getSongsByTempo(item.tempo).map(s => (
                        <option key={s.title} value={s.title}>{s.title}</option>
                      ))}
                    </select>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-slate-900 dark:text-slate-100">{item.title}</span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingKeyIndex === idx ? (
                    <select
                      className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-sm px-1 focus:ring-2 focus:ring-indigo-500 font-bold text-black dark:text-white"
                      onChange={(e) => {
                        onKeyUpdate(idx, e.target.value);
                        setEditingKeyIndex(null);
                      }}
                      onBlur={() => setEditingKeyIndex(null)}
                      autoFocus
                      defaultValue={item.key}
                    >
                      {KEYS.map(k => <option key={k} value={k}>{k}</option>)}
                    </select>
                  ) : (
                    <button 
                      onClick={() => setEditingKeyIndex(idx)}
                      className="font-mono font-bold text-black dark:text-white bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 px-3 py-1.5 rounded-md text-sm hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors cursor-pointer print:bg-transparent print:p-0 shadow-sm"
                    >
                      {item.key}
                    </button>
                  )}
                </td>
                <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-sm font-medium">
                  {item.tempo}
                </td>
                <td className="px-6 py-4 print:hidden">
                  <button
                    onClick={() => setEditingIndex(idx)}
                    className="p-2 text-slate-400 dark:text-slate-600 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-all"
                    title="Cambiar canción"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SetlistTable;
