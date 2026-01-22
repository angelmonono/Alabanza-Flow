
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface ProfileFormProps {
  onSave: (profile: UserProfile) => void;
  initialData?: UserProfile | null;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onSave, initialData }) => {
  const [formData, setFormData] = useState<UserProfile>(
    initialData || { userName: '', churchName: '', ministryName: '' }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.userName && formData.churchName && formData.ministryName) {
      onSave(formData);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 animate-in fade-in zoom-in duration-300">
      <div className="text-center mb-8">
        <div className="bg-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-200 dark:shadow-indigo-900/40">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h2 className="text-2xl font-serif text-slate-900 dark:text-white font-bold">Configuración de Perfil</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">Personaliza tu experiencia en el ministerio</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 ml-1">Tu Nombre</label>
          <input
            required
            type="text"
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-black dark:text-white font-medium"
            placeholder="Ej: Pastor Angel"
            value={formData.userName}
            onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 ml-1">Nombre de la Iglesia</label>
          <input
            required
            type="text"
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-black dark:text-white font-medium"
            placeholder="Ej: Iglesia Central"
            value={formData.churchName}
            onChange={(e) => setFormData({ ...formData, churchName: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 ml-1">Ministerio de Alabanza</label>
          <input
            required
            type="text"
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-black dark:text-white font-medium"
            placeholder="Ej: Adoración Profética"
            value={formData.ministryName}
            onChange={(e) => setFormData({ ...formData, ministryName: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 dark:shadow-indigo-900/20 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all active:scale-95"
        >
          {initialData ? 'Actualizar Perfil' : 'Comenzar'}
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
