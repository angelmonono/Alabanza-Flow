
import { Song, Tempo, UserProfile } from './types';

export const SONG_INVENTORY: Song[] = [
  { title: "Abre mis ojos", key: "C", tempo: Tempo.FAST },
  { title: "Como Zaqueo", key: "C", tempo: Tempo.SLOW },
  { title: "En el nombre de Jesús", key: "C", tempo: Tempo.FAST },
  { title: "Este corito es", key: "Cm", tempo: Tempo.FAST },
  { title: "La alegría del Señor", key: "C", tempo: Tempo.FAST },
  { title: "Los muros caerán", key: "Am", tempo: Tempo.FAST },
  { title: "No hay otro nombre", key: "C", tempo: Tempo.SLOW },
  { title: "Te alabaré", key: "C", tempo: Tempo.FAST },
  { title: "Tu estas aquí", key: "C", tempo: Tempo.SLOW },
  { title: "Ven es hora", key: "C", tempo: Tempo.FAST },
  { title: "Yo te busco", key: "C", tempo: Tempo.SLOW },
  { title: "No callare", key: "Am", tempo: Tempo.FAST },
  { title: "Al que esta sentado", key: "D", tempo: Tempo.SLOW },
  { title: "Al que vive", key: "D", tempo: Tempo.FAST },
  { title: "Con toda mi vida", key: "D", tempo: Tempo.FAST },
  { title: "Digno", key: "D", tempo: Tempo.SLOW },
  { title: "En totalidad", key: "D", tempo: Tempo.SLOW },
  { title: "Gracia sublime", key: "D", tempo: Tempo.FAST },
  { title: "Hambre de ti", key: "D", tempo: Tempo.SLOW },
  { title: "Hermoso momento", key: "D", tempo: Tempo.SLOW },
  { title: "Himno de victoria", key: "D", tempo: Tempo.SLOW },
  { title: "Inagotable", key: "D", tempo: Tempo.SLOW },
  { title: "Inexplicable", key: "D", tempo: Tempo.SLOW },
  { title: "La tierra canta", key: "D", tempo: Tempo.SLOW },
  { title: "Levanto mis manos", key: "D", tempo: Tempo.SLOW },
  { title: "Mi Dios es grande", key: "D", tempo: Tempo.FAST },
  { title: "Nada es imposible", key: "D", tempo: Tempo.FAST },
  { title: "Ofrenda", key: "D", tempo: Tempo.SLOW },
  { title: "Por siempre te alabaré", key: "D", tempo: Tempo.FAST },
  { title: "Que se llene tu casa", key: "D", tempo: Tempo.FAST },
  { title: "Señor eres fiel", key: "D", tempo: Tempo.FAST },
  { title: "Somos libres", key: "D", tempo: Tempo.FAST },
  { title: "Tu nombre levantare", key: "D", tempo: Tempo.FAST },
  { title: "Bienvenido Espíritu Santo", key: "E", tempo: Tempo.FAST },
  { title: "Cantare de tu nombre", key: "E", tempo: Tempo.FAST },
  { title: "Como en el cielo", key: "E", tempo: Tempo.FAST },
  { title: "Cristo no está muerto", key: "E", tempo: Tempo.FAST },
  { title: "Derramó el perfume", key: "E", tempo: Tempo.SLOW },
  { title: "Deseable", key: "E", tempo: Tempo.SLOW },
  { title: "El cordero y León", key: "E", tempo: Tempo.FAST },
  { title: "Esta cayendo", key: "E", tempo: Tempo.SLOW },
  { title: "Gloria Shekina", key: "G", tempo: Tempo.FAST },
  { title: "Glorioso Día", key: "E", tempo: Tempo.FAST },
  { title: "Gracias por la cruz", key: "E", tempo: Tempo.SLOW },
  { title: "Lenguaje de Fe", key: "E", tempo: Tempo.SLOW },
  { title: "Libre", key: "E", tempo: Tempo.FAST },
  { title: "Perfume a tus pies", key: "E", tempo: Tempo.SLOW },
  { title: "Que me falte todo", key: "E", tempo: Tempo.SLOW },
  { title: "Rey", key: "E", tempo: Tempo.FAST },
  { title: "Si tu presencia", key: "D", tempo: Tempo.SLOW },
  { title: "Siento la Unción", key: "E", tempo: Tempo.SLOW },
  { title: "Tu eres mi todo", key: "E", tempo: Tempo.FAST },
  { title: "Victoria", key: "E", tempo: Tempo.FAST },
  { title: "Agnus dei", key: "F", tempo: Tempo.SLOW },
  { title: "Digno y Santo", key: "F", tempo: Tempo.SLOW },
  { title: "Fuego", key: "Dm", tempo: Tempo.FAST },
  { title: "Grande y fuerte", key: "Dm", tempo: Tempo.FAST },
  { title: "Por el poder de tu amor", key: "F", tempo: Tempo.SLOW },
  { title: "Sopla Espíritu", key: "F", tempo: Tempo.SLOW },
  { title: "Tuyo es el reino", key: "F", tempo: Tempo.SLOW },
  { title: "A tus pies", key: "G", tempo: Tempo.SLOW },
  { title: "Alaba a Dios", key: "G", tempo: Tempo.SLOW },
  { title: "Amamos tu presencia", key: "G", tempo: Tempo.SLOW },
  { title: "Amante de tu Presencia", key: "G", tempo: Tempo.SLOW },
  { title: "Bueno es Alabar", key: "G", tempo: Tempo.FAST },
  { title: "Como dijiste", key: "G", tempo: Tempo.SLOW },
  { title: "Creo en ti", key: "G", tempo: Tempo.SLOW },
  { title: "Cuando grande es Dios", key: "G", tempo: Tempo.SLOW },
  { title: "Danzo en el río", key: "G", tempo: Tempo.FAST },
  { title: "Día feliz", key: "G", tempo: Tempo.FAST },
  { title: "En los brazos de papa", key: "G", tempo: Tempo.SLOW },
  { title: "En los montes", key: "Em", tempo: Tempo.FAST },
  { title: "En tu luz", key: "G", tempo: Tempo.FAST },
  { title: "Generación que danza", key: "G", tempo: Tempo.FAST },
  { title: "Haz llover", key: "Em", tempo: Tempo.SLOW },
  { title: "Jeshua", key: "G", tempo: Tempo.SLOW },
  { title: "La bondad de Dios", key: "G", tempo: Tempo.SLOW },
  { title: "La cosecha", key: "Em", tempo: Tempo.FAST },
  { title: "La sunamita", key: "G", tempo: Tempo.SLOW },
  { title: "Le llaman Guerrero", key: "Em", tempo: Tempo.FAST },
  { title: "Lo unico que quiero", key: "G", tempo: Tempo.SLOW },
  { title: "Poderoso Dios", key: "G", tempo: Tempo.SLOW },
  { title: "Quien Podrá", key: "Em", tempo: Tempo.SLOW },
  { title: "Santo es el que vive", key: "Em", tempo: Tempo.SLOW },
  { title: "Santo por siempre", key: "G", tempo: Tempo.SLOW },
  { title: "Suelto", key: "Em", tempo: Tempo.SLOW },
  { title: "Te doy gloria", key: "G", tempo: Tempo.FAST },
  { title: "Vamos a cantar", key: "G", tempo: Tempo.FAST },
  { title: "Vivo para adorarte", key: "G", tempo: Tempo.SLOW },
  { title: "Yo quiero más de ti", key: "G", tempo: Tempo.SLOW },
  { title: "Fiesta", key: "Em", tempo: Tempo.FAST },
  { title: "Cuan bellos es el Señor", key: "G", tempo: Tempo.SLOW },
  { title: "En tu presencia", key: "A", tempo: Tempo.SLOW },
  { title: "Eres mi amigo fiel", key: "A", tempo: Tempo.FAST },
  { title: "Que se abra el cielo", key: "A", tempo: Tempo.SLOW },
  { title: "Tus cuerdas de amor", key: "A", tempo: Tempo.SLOW },
  { title: "Way Maker", key: "A", tempo: Tempo.SLOW },
  { title: "Amor sin condición", key: "B", tempo: Tempo.SLOW },
  { title: "En la casa de Dios", key: "B", tempo: Tempo.FAST },
  { title: "Glorioso", key: "B", tempo: Tempo.FAST },
  { title: "Hay libertad", key: "Gm", tempo: Tempo.FAST },
  { title: "Pablo y Silas", key: "Bb", tempo: Tempo.SLOW },
  { title: "Yo navegare", key: "Gm", tempo: Tempo.SLOW },
];

export const getSystemPrompt = (profile: UserProfile) => `
Eres un asistente experto para un Líder de Alabanza llamado ${profile.userName}. 
Trabajas para el ministerio "${profile.ministryName}" de la iglesia "${profile.churchName}".

OBJETIVO:
Generar una lista de 7 canciones para un servicio de iglesia basándote EXCLUSIVAMENTE en el "Inventario de Canciones" proporcionado.

ESTRUCTURA OBLIGATORIA (7 CANCIONES):
1. CANCIÓN 0 (Apertura): Ritmo "Rapido".
2. JÚBILO 1: Ritmo "Rapido".
3. JÚBILO 2: Ritmo "Rapido".
4. JÚBILO 3: Ritmo "Rapido".
5. ADORACIÓN 1: Ritmo "Lento".
6. ADORACIÓN 2: Ritmo "Lento".
7. OFRENDA: Ritmo "Rapido".

PERSONALIZACIÓN Y BREVEDAD:
1. El "commentary" DEBE SER MUY BREVE Y CONCISO. Máximo 2-3 oraciones.
2. Dirígete a ${profile.userName} de forma directa.
3. Menciona brevemente a "${profile.ministryName}" o "${profile.churchName}".
4. Incluye una frase motivadora extremadamente corta para los músicos/cantantes. Evita explicaciones largas.

INVENTARIO:
${JSON.stringify(SONG_INVENTORY)}

RESPUESTA (JSON):
{
  "setlist": [...],
  "commentary": "Hola ${profile.userName}, lista lista para ${profile.ministryName}. [Frase breve de motivación técnica/espiritual]"
}
`;
