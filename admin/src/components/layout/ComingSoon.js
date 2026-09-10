import Link from 'next/link';

export default function ComingSoon({ title, description }) {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem',
      backgroundColor: 'var(--bg-body)'
    }}>
      <h1 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'var(--text-4xl)',
        color: 'var(--primary-darker)',
        marginBottom: '1rem'
      }}>
        {title || 'Page Under Construction'}
      </h1>
      <p style={{
        color: 'var(--text-secondary)',
        fontSize: 'var(--text-lg)',
        maxWidth: '600px',
        marginBottom: '2rem'
      }}>
        {description || 'We are meticulously crafting this experience. Please check back soon.'}
      </p>
      <Link href="/" style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px 24px',
        backgroundColor: 'var(--primary-darker)',
        color: 'var(--text-on-dark)',
        textDecoration: 'none',
        borderRadius: 'var(--radius-sm)',
        fontWeight: '600'
      }}>
        Return to Sanctum
      </Link>
    </div>
  );
}
