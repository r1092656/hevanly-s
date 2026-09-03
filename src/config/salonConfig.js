// ============================================================
// CENTRALE SALON CONFIGURATIE — pas hier aan, werkt overal
// ============================================================

export const SALON_INFO = {
  name: "Hevanly's Beautybar",
  email: 'hevanlysbeautybar2@outlook.be',
  phone: '+32 465 17 27 90',
  address: 'Graatakker 118, Bus B, 2300 Turnhout, België',
  instagram: 'https://www.instagram.com/Hevanlysbeautybar',
  mapsUrl: 'https://maps.google.com/?q=Graatakker+118,+2300+Turnhout',
  mapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2499.7820125807185!2d4.953531076625895!3d51.3146401255562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c14e1a0b5b1585%3A0xc3f58a3eeaa6de27!2sGraatakker%20118%2C%202300%20Turnhout%2C%20Belgium!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus',
};

// status: 'open' | 'gesloten' | 'op-afspraak'
// open/close: "HH:MM" formaat (24u) — alleen nodig bij status 'open' of 'op-afspraak'
export const OPENING_HOURS = [
  { day: 'Maandag',   jsDay: 1, status: 'gesloten',    label: 'Gesloten',      open: null,    close: null  },
  { day: 'Dinsdag',   jsDay: 2, status: 'open', label: '9:00 - 18:00', open: '09:00', close: '18:00' },
  { day: 'Woensdag',  jsDay: 3, status: 'open', label: '9:00 - 18:00', open: '09:00', close: '18:00' },
  { day: 'Donderdag', jsDay: 4, status: 'open', label: '9:00 - 18:00', open: '09:00', close: '18:00' },
  { day: 'Vrijdag',   jsDay: 5, status: 'open', label: '9:00 - 18:00', open: '09:00', close: '18:00' },
  { day: 'Zaterdag',  jsDay: 6, status: 'open', label: '9:00 - 18:00', open: '09:00', close: '18:00' },
  { day: 'Zondag',    jsDay: 0, status: 'op-afspraak', label: 'Op afspraak',   open: '12:00', close: '18:00' },
];

// Duur van een afspraak in minuten (blokkeert deze tijd na elk geboekt slot)
export const APPOINTMENT_DURATION = 90;

// Helper: geeft de config voor een datum string (YYYY-MM-DD)
export const getDayConfig = (dateString) => {
  if (!dateString) return null;
  const jsDay = new Date(dateString + 'T12:00:00').getDay();
  return OPENING_HOURS.find(d => d.jsDay === jsDay) || null;
};

// Helper: converteert "HH:MM" naar minuten vanaf middernacht
const toMinutes = (timeStr) => {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
};

// Helper: converteert minuten naar "H:MM" string
const toTimeStr = (minutes) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}:${m.toString().padStart(2, '0')}`;
};

// Genereer alle 30-min slots voor een dag, rekening houdend met de afspraakduur
export const generateSlots = (dayConfig) => {
  if (!dayConfig || dayConfig.status === 'gesloten' || !dayConfig.open || !dayConfig.close) {
    return [];
  }
  const startMin = toMinutes(dayConfig.open);
  const endMin = toMinutes(dayConfig.close);
  const lastSlot = endMin - APPOINTMENT_DURATION; // laatste slot zodat afspraak eindigt voor sluitingstijd
  const slots = [];
  for (let t = startMin; t <= lastSlot; t += 30) {
    slots.push(toTimeStr(t));
  }
  return slots;
};

// Geeft de geblokkeerde tijden op basis van bestaande boekingen
// bookedTimes: array van "H:MM" strings van geboekte afspraken op die dag
export const getBlockedSlots = (bookedTimes) => {
  const blocked = new Set();
  bookedTimes.forEach(timeStr => {
    const start = toMinutes(timeStr);
    // Blokkeer alle slots binnen APPOINTMENT_DURATION minuten na de boeking
    for (let t = start; t < start + APPOINTMENT_DURATION; t += 30) {
      blocked.add(toTimeStr(t));
    }
  });
  return blocked;
};
