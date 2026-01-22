
import React, { useState } from 'react';
import { SetlistItem } from '../types';

interface ShareActionsProps {
  setlist: SetlistItem[];
  commentary: string;
}

const ShareActions: React.FC<ShareActionsProps> = ({ setlist, commentary }) => {
  const [copied, setCopied] = useState(false);

  const formatText = () => {
    let text = `🎵 *Setlist de Alabanza* 🎵\n\n`;
    text += `${commentary}\n\n`;
    setlist.forEach((item) => {
      text += `${item.order}. *${item.title}* [${item.key}] - ${item.type}\n`;
    });
    text += `\nGenerado por Alabanza Flow`;
    return text;
  };

  const handleCopyNote = async () => {
    const text = formatText().replace(/\*/g, ''); // Remove asterisks for plain text notes
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  const handleDownloadDoc = () => {
    const text = formatText().replace(/\*/g, '');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const date = new Date().toISOString().split('T')[0];
    link.href = url;
    link.download = `Setlist_Alabanza_${date}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(formatText());
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  const buttonClass = "flex items-center justify-center space-x-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm hover:shadow-md transition-all group";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 print:hidden">
      {/* Botón Guardar como Nota (Copy) */}
      <button onClick={handleCopyNote} className={`${buttonClass} hover:border-indigo-300 dark:hover:border-indigo-900`}>
        <div className="bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded-lg group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
          </svg>
        </div>
        <div className="text-left">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider">Guardar como</p>
          <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{copied ? '¡Copiado!' : 'Nota / Portapapeles'}</p>
        </div>
      </button>

      {/* Botón Descargar Documento */}
      <button onClick={handleDownloadDoc} className={`${buttonClass} hover:border-blue-300 dark:hover:border-blue-900`}>
        <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div className="text-left">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider">Exportar como</p>
          <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Documento .TXT</p>
        </div>
      </button>

      {/* Botón WhatsApp */}
      <button onClick={handleWhatsApp} className={`${buttonClass} hover:border-emerald-300 dark:hover:border-emerald-900`}>
        <div className="bg-emerald-50 dark:bg-emerald-900/30 p-2 rounded-lg group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/50 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600 dark:text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.63 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </div>
        <div className="text-left">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider">Compartir en</p>
          <p className="text-sm font-bold text-slate-700 dark:text-slate-300">WhatsApp</p>
        </div>
      </button>

      {/* Botón Imprimir */}
      <button onClick={handlePrint} className={`${buttonClass} hover:border-slate-300 dark:hover:border-slate-700`}>
        <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-lg group-hover:bg-slate-100 dark:group-hover:bg-slate-700 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-600 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
        </div>
        <div className="text-left">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider">Vista de</p>
          <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Impresión</p>
        </div>
      </button>
    </div>
  );
};

export default ShareActions;
