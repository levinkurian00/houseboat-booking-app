import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  Award,
  Star,
  ChevronDown,
  MessageSquare,
  User,
  Calendar,
  Clock,
  CheckCircle2,
  Globe,
  Heart,
  Briefcase,
  Repeat
} from 'lucide-react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    date: '',
    adults: '2',
    children: '0',
    category: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategorySelect = (category) => {
    setFormData(prev => ({ ...prev, category }));
    // Smooth scroll to the form
    const formElement = document.getElementById('booking-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.whatsapp || !formData.date) {
      alert('Please fill all required details.');
      return;
    }

    const totalGuests = parseInt(formData.adults) + parseInt(formData.children);
    
    const dateObj = new Date(formData.date);
    const dateOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate = dateObj.toLocaleDateString('en-GB', dateOptions);

    const message = `Hello! I'd like to book a houseboat:

👤 Name: ${formData.name}
📞 WhatsApp: +91${formData.whatsapp}
🛥️ Category: ${formData.category || 'Not selected yet'}
📅 Travel Date: ${formattedDate}
👨‍👩‍👧‍👦 Adults: ${formData.adults}
🧒 Children: ${formData.children}
👥 Total Guests: ${totalGuests}

Please share availability and details.`;

    const targetNumber = '917012677589'; 
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${targetNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  const themeColors = {
    '': { main: '#3b48ff', hover: '#323ee6', heroBg: 'rgba(0,0,0,0.4)', blendMode: 'overlay' },
    'Deluxe Houseboat': { main: '#3b48ff', hover: '#323ee6', heroBg: '#3b48ff', blendMode: 'multiply' },
    'Premium Houseboat': { main: '#059669', hover: '#047857', heroBg: '#059669', blendMode: 'multiply' },
    'Luxury Houseboat': { main: '#d97706', hover: '#b45309', heroBg: '#d97706', blendMode: 'multiply' }
  };

  const currentTheme = themeColors[formData.category] || themeColors[''];
  const themeStyles = {
    '--primary': currentTheme.main,
    '--primary-hover': currentTheme.hover,
    '--hero-bg-color': currentTheme.heroBg,
    '--hero-blend-mode': currentTheme.blendMode,
  };

  const reviews = [
    {
      initials: 'R', name: 'Rajesh & Family', meta: 'Mumbai • Stayed Dec 2024', theme: 'theme-blue', badge: 'Verified Stay', badgeIcon: <CheckCircle2 size={14} />,
      text: '"Perfect deluxe houseboat experience! The AC rooms were comfortable, food was amazing, and the crew was very professional. Kids loved the village visit. Highly recommend for families!"'
    },
    {
      initials: 'A', name: 'Arjun & Priya', meta: 'Bangalore • Honeymoon Trip', theme: 'theme-green', badge: 'Honeymoon Special', badgeIcon: <Heart size={14} />,
      text: '"Romantic and peaceful! The deluxe houseboat exceeded our expectations. Beautiful sunset views, delicious Kerala cuisine, and excellent service. Perfect for our honeymoon!"'
    },
    {
      initials: 'S', name: 'Sarah Johnson', meta: 'UK Tourist • Group of 4', theme: 'theme-orange', badge: 'International Guest', badgeIcon: <Globe size={14} />,
      text: '"Absolutely magical experience! The backwaters of Kerala are stunning. Our deluxe houseboat was clean, comfortable, and the crew was incredibly helpful. Best part of our India trip!"'
    },
    {
      initials: 'M', name: 'Meera & Group', meta: 'Chennai • Corporate Retreat', theme: 'theme-purple', badge: 'Corporate Booking', badgeIcon: <Briefcase size={14} />,
      text: '"Excellent experience! The deluxe category offers wonderful amenities and great service. Perfect for our team outing. Booking process was smooth and hassle-free."'
    },
    {
      initials: 'K', name: 'Kumar Family', meta: 'Delhi • Weekend Getaway', theme: 'theme-teal', badge: 'Repeat Customer', badgeIcon: <Repeat size={14} />,
      text: '"Wonderful weekend escape from city life! The traditional Kerala meals were outstanding, and the crew made sure we had everything we needed. Will definitely book again!"'
    },
    {
      initials: 'V', name: 'Vikram & Parents', meta: 'Pune • Family Vacation', theme: 'theme-amber', badge: 'Senior Friendly', badgeIcon: <User size={14} />,
      text: '"Took my elderly parents on this trip and they absolutely loved it! The boat was comfortable, crew was respectful, and the slow pace was perfect for relaxation. Highly recommended for senior citizens."'
    }
  ];

  return (
    <div style={themeStyles}>
      <div className="header-wrapper">
        {/* Top Bar */}
        <div className="top-bar">
          <div className="top-bar-left">
            <span className="top-bar-item"><Phone size={14} /> +91 79076 89772</span>
            <span className="top-bar-item"><MessageCircle size={14} /> WhatsApp Support</span>
          </div>
          <div className="top-bar-right">
            <span className="top-bar-item accent"><Award size={14} /> Best Price Guarantee</span>
            <span className="top-bar-item success"><ShieldCheck size={14} /> 100% Safe & Secure</span>
            <span className="top-bar-item"><Star size={14} /> 4.8/5 Rating</span>
          </div>
        </div>

        {/* Main Header */}
        <header className="app-header">
          <a href="/" className="header-logo">
            <div className="header-logo-text">
              <span>bookyour</span>
              <span>houseboat.com</span>
            </div>
          </a>
          
          <nav className="header-nav">
            <div className="dropdown-container">
              <div className="nav-link">
                Houseboat Types <ChevronDown size={16} />
              </div>
              <div className="dropdown-menu">
                <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleCategorySelect('Deluxe Houseboat'); }}>
                  <span className="dropdown-item-title">Deluxe Houseboats</span>
                  <span className="dropdown-item-price">₹8,000+</span>
                </a>
                <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleCategorySelect('Premium Houseboat'); }}>
                  <span className="dropdown-item-title">Premium Houseboats</span>
                  <span className="dropdown-item-price">₹12,000+</span>
                </a>
                <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleCategorySelect('Luxury Houseboat'); }}>
                  <span className="dropdown-item-title">Luxury Houseboats</span>
                  <span className="dropdown-item-price">₹18,000+</span>
                </a>
              </div>
            </div>
            
            <div className="dropdown-container">
              <div className="nav-link">
                Travel Guide <ChevronDown size={16} />
              </div>
            </div>
            
            <a href="#" className="nav-link">Contact</a>
          </nav>

          <div className="header-actions">
            <a href="#" className="btn-outline"><MessageSquare size={16} /> Get Quote</a>
            <a href="tel:+917907689772" className="btn-solid"><Phone size={16} /> Call Now</a>
          </div>
        </header>
      </div>

      <div className="app-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-container">
            {/* Left Column */}
            <div className="hero-content">
              <div className="breadcrumbs">
                Home &gt; Houseboat Booking {formData.category ? `> ` : ''}<strong>{formData.category ? `${formData.category}s` : ''}</strong>
              </div>
              
              <div className="badge-outline">
                <Globe size={14} /> {formData.category ? `${formData.category.split(' ')[0]} Category` : 'All Categories'}
              </div>
              
              <h2 className="hero-cursive">{formData.category ? `${formData.category}s` : 'Alleppey Houseboats'}</h2>
              <h1 className="hero-title">Alleppey Backwater<br/>Experience</h1>
            </div>

            {/* Right Column - Form */}
            <div className="hero-form-wrapper" id="booking-form">
              <div className="booking-form-card">
                <div className="form-banner">
                  <div className="form-banner-text">
                    🔥 Limited Availability: Book Now for Instant Confirmation!
                  </div>
                  <Clock size={16} />
                </div>
                <div className="form-stats">
                  <span><span style={{color:'#fbbf24'}}>●</span> 26 people viewing this page now</span>
                  <span>Only 7 boats left!</span>
                </div>
                
                <div className="form-body">
                  <div className="form-header-inner">
                    <h2>Book Your Dream Houseboat</h2>
                    <div className="form-rating-row">
                      <Star size={14} fill="#fbbf24" color="#fbbf24" /> 4.8 (1,250+ reviews)
                      &nbsp;&nbsp;•&nbsp;&nbsp;
                      <span style={{color: '#10b981', display:'flex', alignItems:'center', gap:'0.25rem'}}>
                        <CheckCircle2 size={14} /> Instant Confirmation
                      </span>
                    </div>
                  </div>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label className="form-label">Your Name</label>
                      <div className="input-with-icon">
                        <User size={18} className="input-icon" />
                        <input 
                          type="text" 
                          name="name"
                          className="form-input" 
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleChange}
                          required 
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">WhatsApp Number</label>
                      <div className="input-with-icon">
                        <div className="input-prefix">
                          <MessageCircle size={18} color="#10b981" /> +91
                        </div>
                        <input 
                          type="tel" 
                          name="whatsapp"
                          className="form-input with-prefix" 
                          placeholder="Enter your WhatsApp number"
                          value={formData.whatsapp}
                          onChange={handleChange}
                          required 
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Select Travel Date</label>
                      <div className="input-with-icon">
                        <Calendar size={18} className="input-icon" />
                        <input 
                          type="date" 
                          name="date"
                          className="form-input"
                          value={formData.date}
                          onChange={handleChange}
                          required 
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Adults</label>
                        <select 
                          name="adults" 
                          className="form-input"
                          style={{paddingLeft: '1rem'}}
                          value={formData.adults}
                          onChange={handleChange}
                        >
                          {Array.from({ length: 99 }, (_, i) => i + 1).map(num => (
                            <option key={num} value={num}>{num} {num === 1 ? 'Adult' : 'Adults'}</option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Children (6-12 years)</label>
                        <select 
                          name="children" 
                          className="form-input"
                          style={{paddingLeft: '1rem'}}
                          value={formData.children}
                          onChange={handleChange}
                        >
                          <option value="0">No children</option>
                          {Array.from({ length: 99 }, (_, i) => i + 1).map(num => (
                            <option key={num} value={num}>{num} {num === 1 ? 'Child' : 'Children'}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <button type="submit" className="submit-btn">
                      Check Availability
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="reviews-section">
          <div className="reviews-header">
            <div className="stars">
              <Star fill="currentColor" size={24} />
              <Star fill="currentColor" size={24} />
              <Star fill="currentColor" size={24} />
              <Star fill="currentColor" size={24} />
              <Star fill="currentColor" size={24} />
            </div>
            <strong>4.8</strong> out of 5 &nbsp;|&nbsp; <strong>500+</strong> verified reviews
          </div>

          <div className="reviews-grid">
            {reviews.map((review, idx) => (
              <div key={idx} className={`review-card ${review.theme}`}>
                <div className="reviewer-info">
                  <div className="reviewer-avatar">
                    {review.initials}
                  </div>
                  <div className="reviewer-details">
                    <h4>{review.name}</h4>
                    <p>{review.meta}</p>
                  </div>
                </div>
                
                <div className="review-stars">
                  <Star fill="currentColor" size={14} />
                  <Star fill="currentColor" size={14} />
                  <Star fill="currentColor" size={14} />
                  <Star fill="currentColor" size={14} />
                  <Star fill="currentColor" size={14} />
                </div>
                
                <p className="review-text">{review.text}</p>
                
                <div className="review-badge">
                  {review.badgeIcon} {review.badge}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
