export default function CareersLoading() {
    return (
      <div className="careers-page">
        {/* Hero Skeleton */}
        <section className="hero" style={{
          padding: '5rem 2rem 4rem',
          background: 'linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%)',
          textAlign: 'center',
          position: 'relative'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 1
          }}>
            <div style={{
              width: '200px',
              height: '36px',
              background: '#e0e0e0',
              borderRadius: '50px',
              margin: '0 auto 2rem',
              animation: 'pulse 1.5s ease-in-out infinite'
            }} />
            <div style={{
              width: '80%',
              height: '56px',
              background: '#e0e0e0',
              borderRadius: '12px',
              margin: '0 auto 1.5rem',
              animation: 'pulse 1.5s ease-in-out 0.1s infinite'
            }} />
            <div style={{
              width: '60%',
              height: '24px',
              background: '#e0e0e0',
              borderRadius: '8px',
              margin: '0 auto',
              animation: 'pulse 1.5s ease-in-out 0.2s infinite'
            }} />
          </div>
        </section>
  
        {/* Job Card Skeleton */}
        <section className="jobs-section" style={{
          padding: '5rem 2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '4rem'
          }}>
            <div style={{
              width: '300px',
              height: '40px',
              background: '#e0e0e0',
              borderRadius: '12px',
              margin: '0 auto 1rem',
              animation: 'pulse 1.5s ease-in-out infinite'
            }} />
            <div style={{
              width: '400px',
              height: '24px',
              background: '#e0e0e0',
              borderRadius: '8px',
              margin: '0 auto',
              animation: 'pulse 1.5s ease-in-out 0.1s infinite'
            }} />
          </div>
  
          <div style={{
            background: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: '16px',
            padding: '2.5rem'
          }}>
            <div style={{
              width: '300px',
              height: '32px',
              background: '#e0e0e0',
              borderRadius: '8px',
              marginBottom: '1rem',
              animation: 'pulse 1.5s ease-in-out infinite'
            }} />
            <div style={{
              width: '200px',
              height: '24px',
              background: '#e0e0e0',
              borderRadius: '8px',
              marginBottom: '2rem',
              animation: 'pulse 1.5s ease-in-out 0.1s infinite'
            }} />
            <div style={{
              width: '100%',
              height: '80px',
              background: '#e0e0e0',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              animation: 'pulse 1.5s ease-in-out 0.2s infinite'
            }} />
            <div style={{
              width: '100%',
              height: '120px',
              background: '#e0e0e0',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              animation: 'pulse 1.5s ease-in-out 0.3s infinite'
            }} />
            <div style={{
              width: '150px',
              height: '48px',
              background: '#5B4EF5',
              borderRadius: '12px',
              animation: 'pulse 1.5s ease-in-out 0.4s infinite'
            }} />
          </div>
        </section>
  
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes pulse {
              0%, 100% {
                opacity: 1;
              }
              50% {
                opacity: 0.5;
              }
            }
          `
        }} />
      </div>
    );
  }