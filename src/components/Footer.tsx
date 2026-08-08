import { personal } from '../data/resume'

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer style={{
      padding: '2.5rem 6vw',
      borderTop: '1px solid var(--border)',
      background: 'var(--bg-1)',
    }}>
      <div style={{
        maxWidth: 1300, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: '1rem', flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--accent)', letterSpacing: '0.08em' }}>
            MB
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-3)' }}>
            {personal.title}
          </span>
        </div>

        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-3)', textAlign: 'center' }}>
          © 2026 Mohan Babu M
        </p>

        <button
          onClick={scrollToTop}
          style={{
            padding: '0.5rem 1.1rem',
            borderRadius: 999,
            background: 'transparent',
            border: '1px solid var(--border)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--text-2)',
            cursor: 'none',
            letterSpacing: '0.1em',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            const btn = e.currentTarget as HTMLElement
            btn.style.borderColor = 'var(--accent)'
            btn.style.color = 'var(--accent)'
          }}
          onMouseLeave={(e) => {
            const btn = e.currentTarget as HTMLElement
            btn.style.borderColor = 'var(--border)'
            btn.style.color = 'var(--text-2)'
          }}
        >
          TOP ↑
        </button>
      </div>

      <style>{`
        @media(max-width:600px){
          footer > div { flex-direction: column; text-align: center; }
        }
      `}</style>
    </footer>
  )
}
