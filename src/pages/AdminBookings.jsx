import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { Trash2, RefreshCw, Calendar } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';

const AdminBookings = () => {
  const { getAdminHeaders } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(null);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/bookings/list', { headers: getAdminHeaders() });
      const data = await res.json();
      if (data.bookings) setBookings(data.bookings);
    } catch (err) {
      console.error('fetch bookings error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  const handleCancel = async (booking) => {
    if (!window.confirm(`Boeking annuleren voor ${booking.customerName} op ${booking.date} om ${booking.time}?`)) return;
    setCancelling(booking.id);
    try {
      const res = await fetch('/api/bookings/cancel', {
        method: 'POST',
        headers: getAdminHeaders(),
        body: JSON.stringify({ id: booking.id, date: booking.date }),
      });
      const data = await res.json();
      if (data.ok) {
        setBookings(prev => prev.filter(b => b.id !== booking.id));
      }
    } catch (err) {
      console.error('cancel error:', err);
    } finally {
      setCancelling(null);
    }
  };

  const upcoming = bookings.filter(b => new Date(b.date) >= new Date(new Date().toDateString()));
  const past = bookings.filter(b => new Date(b.date) < new Date(new Date().toDateString()));

  return (
    <AdminLayout title="Boekingen" backTo="/admin">
      <div className="animate-fade-in">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0, color: 'var(--color-accent)' }}>Alle boekingen</h2>
          <button onClick={fetchBookings} className="btn btn-outline"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem' }}>
            <RefreshCw size={16} /> Vernieuwen
          </button>
        </div>

        {loading ? (
          <p style={{ color: 'var(--color-text-light)' }}>Boekingen laden...</p>
        ) : bookings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-light)' }}>
            <Calendar size={48} style={{ margin: '0 auto 1rem', opacity: 0.4 }} />
            <p>Nog geen boekingen.</p>
          </div>
        ) : (
          <>
            {upcoming.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ color: 'var(--color-text)', marginBottom: '1rem', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Aankomende afspraken ({upcoming.length})
                </h3>
                {upcoming.map(b => (
                  <BookingCard key={b.id} booking={b} onCancel={handleCancel} cancelling={cancelling} />
                ))}
              </div>
            )}
            {past.length > 0 && (
              <div>
                <h3 style={{ color: 'var(--color-text-light)', marginBottom: '1rem', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Voorbije afspraken ({past.length})
                </h3>
                {past.map(b => (
                  <BookingCard key={b.id} booking={b} onCancel={handleCancel} cancelling={cancelling} isPast />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  );
};

const BookingCard = ({ booking: b, onCancel, cancelling, isPast }) => (
  <div style={{
    background: 'var(--color-surface)',
    border: `1px solid ${isPast ? 'var(--color-border)' : 'var(--color-secondary)'}`,
    borderRadius: 'var(--radius-md)',
    padding: '1.25rem 1.5rem',
    marginBottom: '0.75rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    opacity: isPast ? 0.6 : 1,
  }}>
    <div style={{ flex: 1 }}>
      <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{b.serviceName}</div>
      <div style={{ fontSize: '0.9rem', color: 'var(--color-accent)', marginBottom: '0.25rem' }}>
        📅 {b.date} om {b.time}
      </div>
      <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>
        {b.customerName} · {b.customerEmail} · {b.customerPhone}
      </div>
      <div style={{ fontSize: '0.82rem', color: 'var(--color-text-light)', marginTop: '0.15rem' }}>
        Aanbetaling: €{b.depositAmount}
      </div>
    </div>
    {!isPast && (
      <button
        onClick={() => onCancel(b)}
        disabled={cancelling === b.id}
        style={{
          background: 'none',
          border: '1px solid #e53e3e',
          borderRadius: 'var(--radius-sm)',
          color: '#e53e3e',
          padding: '0.5rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.3rem',
          fontSize: '0.82rem',
          flexShrink: 0,
        }}
        title="Annuleren"
      >
        <Trash2 size={16} />
        {cancelling === b.id ? 'Bezig...' : 'Annuleer'}
      </button>
    )}
  </div>
);

export default AdminBookings;
