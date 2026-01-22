
import React, { useState, useEffect } from 'react';
import { generateSetlist } from './geminiService';
import { SetlistItem, GenerationResponse, Song, UserProfile, Tempo } from './types';
import SetlistTable from './components/SetlistTable';
import ShareActions from './components/ShareActions';
import ProfileForm from './components/ProfileForm';
import { SONG_INVENTORY } from './constants';

type Theme = 'light' | 'dark' | 'auto';

const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [showProfileForm, setShowProfileForm] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>('Genera una lista para este domingo, quiero que el bloque de júbilo sea en Sol (G)');
  const [openingSongTitle, setOpeningSongTitle] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [setlist, setSetlist] = useState<SetlistItem[] | null>(null);
  const [commentary, setCommentary] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'auto';
  });

  // Theme effect
  useEffect(() => {
    const root = window.document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const applyTheme = () => {
      const isDark = theme === 'dark' || (theme === 'auto' && mediaQuery.matches);
      if (isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    applyTheme();
    localStorage.setItem('theme', theme);

    if (theme === 'auto') {
      mediaQuery.addEventListener('change', applyTheme);
      return () => mediaQuery.removeEventListener('change', applyTheme);
    }
  }, [theme]);

  // Load profile from local storage
  useEffect(() => {
    const saved = localStorage.getItem('alabanza_flow_profile');
    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, []);

  const saveProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
    localStorage.setItem('alabanza_flow_profile', JSON.stringify(newProfile));
    setShowProfileForm(false);
  };

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim() || !profile) return;

    setLoading(true);
    setError(null);
    try {
      const selectedOpening = SONG_INVENTORY.find(s => s.title === openingSongTitle);
      const result = await generateSetlist(prompt, profile, selectedOpening);
      setSetlist(result.setlist);
      setCommentary(result.commentary);
    } catch (err) {
      setError("Hubo un error al generar la lista. Por favor intenta de nuevo.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateSong = (index: number, newSong: Song) => {
    if (!setlist) return;
    const newSetlist = [...setlist];
    newSetlist[index] = {
      ...newSetlist[index],
      title: newSong.title,
      key: newSong.key,
      tempo: newSong.tempo,
    };
    setSetlist(newSetlist);
  };

  const updateKey = (index: number, newKey: string) => {
    if (!setlist) return;
    const newSetlist = [...setlist];
    newSetlist[index] = { ...newSetlist[index], key: newKey };
    setSetlist(newSetlist);
  };

  const updateBlockKey = (tempo: string, newKey: string) => {
    if (!setlist) return;
    const newSetlist = setlist.map(item => 
      item.tempo === tempo ? { ...item, key: newKey } : item
    );
    setSetlist(newSetlist);
  };

  const fastSongs = SONG_INVENTORY.filter(s => s.tempo === Tempo.FAST);

  const ThemeSelector = () => (
    <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl print:hidden">
      {(['light', 'dark', 'auto'] as Theme[]).map((t) => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          className={`px-3 py-1 text-xs font-bold rounded-lg transition-all capitalize ${
            theme === t 
              ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' 
              : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          {t === 'auto' ? 'Auto' : t === 'light' ? 'Claro' : 'Oscuro'}
        </button>
      ))}
    </div>
  );

  if (!profile || showProfileForm) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="absolute top-4 right-4">
          <ThemeSelector />
        </div>
        <ProfileForm onSave={saveProfile} initialData={profile} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-6 shadow-sm print:hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="bg-indigo-600 p-2 rounded-xl shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <div className="text-left">
                <h1 className="text-xl font-serif text-slate-900 dark:text-white font-bold leading-tight">Alabanza Flow</h1>
                <p className="text-slate-400 dark:text-slate-500 text-xs font-semibold uppercase tracking-widest">{profile.ministryName}</p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <ThemeSelector />
              
              <div className="flex items-center space-x-4 border-l border-slate-200 dark:border-slate-800 pl-6">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{profile.userName}</p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-tighter">{profile.churchName}</p>
                </div>
                <button 
                  onClick={() => setShowProfileForm(true)}
                  className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-800 rounded-full transition-all"
                  title="Editar Perfil"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Print Header */}
      <div className="hidden print:block text-center py-6 border-b-2 border-slate-900 mb-8">
        <h1 className="text-2xl font-bold uppercase tracking-widest">Setlist: {profile.ministryName}</h1>
        <p className="text-sm italic">{profile.churchName} • {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <section className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 mb-8 print:hidden transition-colors">
          <form onSubmit={handleGenerate} className="flex flex-col space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 ml-1">Instrucciones del Setlist</label>
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={`Hola ${profile.userName.split(' ')[0]}, ¿qué necesitas hoy?`}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-700 dark:text-slate-200"
                />
              </div>
              
              <div className="sm:w-1/3">
                <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 ml-1">Canción de Apertura (Opcional)</label>
                <select
                  value={openingSongTitle}
                  onChange={(e) => setOpeningSongTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-700 dark:text-slate-200 appearance-none"
                >
                  <option value="">-- Aleatoria --</option>
                  {fastSongs.map(s => (
                    <option key={s.title} value={s.title}>{s.title}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold shadow-md hover:bg-indigo-700 transition-all ${loading ? 'opacity-70' : ''}`}
            >
              {loading ? 'Generando Setlist Personalizado...' : 'Generar Setlist'}
            </button>
          </form>
        </section>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl mb-8 flex items-center">
            {error}
          </div>
        )}

        {setlist && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/50 p-6 rounded-2xl print:bg-white print:border-none print:p-0 print:mb-4">
              <p className="text-indigo-800 dark:text-indigo-300 italic leading-relaxed print:text-black print:not-italic print:font-medium">
                "{commentary}"
              </p>
            </div>

            <SetlistTable 
              items={setlist} 
              onSongUpdate={updateSong} 
              onKeyUpdate={updateKey}
              onBlockKeyUpdate={updateBlockKey}
            />

            <ShareActions setlist={setlist} commentary={commentary} />
          </div>
        )}

        {!setlist && !loading && !error && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-300 dark:text-slate-700">
             <p className="text-lg font-light italic text-center">Esperando instrucciones para {profile.ministryName}...</p>
          </div>
        )}
      </main>

      <footer className="py-8 text-center text-slate-400 dark:text-slate-600 text-xs border-t border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-950 print:hidden transition-colors">
        <p>© {new Date().getFullYear()} Alabanza Flow • Ministerio {profile.ministryName}</p>
      </footer>
    </div>
  );
};

export default App;
