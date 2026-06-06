import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const { data, error } = await supabase
          .from('photos')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPhotos(data || []);
      } catch (error) {
        console.error('Error fetching photos:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#6b7280' }}>
        Loading gallery...
      </div>
    );
  }

  if (photos.length === 0) {
    return null; // Don't show the section if no photos
  }

  return (
    <section className="gallery-section" style={{ padding: '4rem 2rem', backgroundColor: '#fff', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div 
          className="gallery-header"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <h3 className="faq-cursive" style={{ color: 'var(--primary)', fontFamily: '"Caveat", cursive', fontSize: '2rem', marginBottom: '0.5rem' }}>Experience the Magic</h3>
          <h2 className="faq-title" style={{ fontSize: '2.5rem', fontWeight: 700, color: '#1e293b' }}>Our Houseboat Gallery</h2>
        </motion.div>
        
        <div style={{ position: 'relative', padding: '0 10px' }}>
          {/* Left Arrow */}
          <button 
            onClick={() => scroll('left')}
            className="gallery-nav-btn"
            style={{
              position: 'absolute',
              left: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              background: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
              cursor: 'pointer',
              color: 'var(--primary, #3b48ff)',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(1)'}
            aria-label="Scroll left"
          >
            <ChevronLeft size={28} />
          </button>

          <div 
            ref={scrollContainerRef}
            className="gallery-scroll-container"
            style={{
              display: 'flex',
              gap: '1.5rem',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none', // Firefox
              msOverflowStyle: 'none', // IE and Edge
              paddingBottom: '1rem',
              paddingTop: '0.5rem'
            }}
          >
            <style dangerouslySetInnerHTML={{__html: `
              .gallery-scroll-container::-webkit-scrollbar {
                display: none;
              }
              .gallery-item {
                flex: 0 0 calc(33.333% - 1rem);
                scroll-snap-align: start;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                aspect-ratio: 4/3;
                position: relative;
              }
              @media (max-width: 1024px) {
                .gallery-item {
                  flex: 0 0 calc(50% - 0.75rem);
                }
              }
              @media (max-width: 768px) {
                .gallery-nav-btn {
                  display: none !important;
                }
                .gallery-item {
                  flex: 0 0 calc(85% - 1rem);
                }
              }
            `}} />
            
            {photos.map((photo, index) => (
              <motion.div 
                key={photo.id}
                className="gallery-item"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.5) }}
                viewport={{ once: true }}
              >
                <img 
                  src={photo.url} 
                  alt="Houseboat Gallery" 
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              </motion.div>
            ))}
          </div>

          {/* Right Arrow */}
          <button 
            onClick={() => scroll('right')}
            className="gallery-nav-btn"
            style={{
              position: 'absolute',
              right: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              background: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
              cursor: 'pointer',
              color: 'var(--primary, #3b48ff)',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(1)'}
            aria-label="Scroll right"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Gallery;
