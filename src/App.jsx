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
  Repeat,
  Plus,
  Minus,
  Home
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

  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'category') setOpenFaq(0);
  };

  const handleCategorySelect = (category) => {
    setFormData(prev => ({ ...prev, category }));
    setOpenFaq(0);
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

  // Removed static reviews array since we are using Elfsight now

  const faqData = {
    'Deluxe Houseboat': [
      {
        question: 'What is included in deluxe houseboat booking in Alleppey?',
        answer: (
          <>
            Deluxe houseboat booking includes:
            <ul style={{ paddingLeft: '1.2rem', marginTop: '0.5rem', listStyleType: 'disc' }}>
              <li>AC accommodation with comfortable beds</li>
              <li>All meals (breakfast, lunch, dinner, tea/snacks)</li>
              <li>Professional crew (captain, chef, helper)</li>
              <li>Full-day backwater cruise</li>
              <li>Village visits and cultural activities</li>
              <li>Safety equipment (life jackets, first aid)</li>
              <li>WiFi and basic amenities</li>
              <li>Traditional welcome and departure</li>
            </ul>
          </>
        )
      },
      { question: 'What are the available options for deluxe houseboat in Alleppey?', answer: 'We offer 1-bedroom to 6-bedroom deluxe houseboats suitable for couples, families, and large groups. You can choose between private and sharing options.' },
      { question: 'How to book deluxe houseboat in Alleppey?', answer: 'You can book easily by filling out the form on this page, or by contacting us directly via WhatsApp or phone. We require a small advance payment to confirm the booking.' },
      { question: 'Is deluxe houseboat suitable for families with children?', answer: 'Yes, absolutely! Our houseboats are very safe for families and children. We provide safety precautions and life jackets. The crew is always there to assist.' },
      { question: 'What is the best time to book deluxe houseboat in Alleppey?', answer: 'The best time is from September to March when the weather is pleasant. However, backwater cruising is available year-round.' },
      { question: 'What amenities are provided in deluxe houseboats?', answer: 'Amenities include air-conditioned bedrooms, attached bathrooms, a viewing deck, a dining area, a television, and a music system.' },
      { question: 'Can I customize my deluxe houseboat itinerary?', answer: 'Yes, we can customize your itinerary based on your preferences. You can choose specific routes or request special arrangements like a candlelight dinner.' },
      { question: 'What is the cancellation policy for deluxe houseboat booking?', answer: 'Cancellations made 15 days prior to the journey receive a full refund (minus processing fees). Cancellations within 15 days may incur charges. Please refer to our detailed policy.' }
    ],
    'Premium Houseboat': [
      {
        question: 'What is included in a premium houseboat booking?',
        answer: (
          <>
            Premium houseboat booking includes all standard features plus:
            <ul style={{ paddingLeft: '1.2rem', marginTop: '0.5rem', listStyleType: 'disc' }}>
              <li>Full-time AC in bedrooms (not just at night)</li>
              <li>Premium menu with extra non-veg options and fruit basket</li>
              <li>Glass-covered dining and living area</li>
              <li>Upgraded toiletries and premium linen</li>
              <li>More spacious bedrooms with better views</li>
            </ul>
          </>
        )
      },
      { question: 'What is the difference between deluxe and premium houseboats?', answer: 'The main difference is the AC usage and the interiors. Premium houseboats provide full-time AC, while deluxe usually provides AC only from 9 PM to 6 AM. Premium boats also feature glass windows in the living area and upgraded food options.' },
      { question: 'Is the premium houseboat completely private?', answer: 'Yes, if you book the entire boat, it is completely private for your group along with the 3 crew members.' },
      { question: 'What kind of food is served on a premium houseboat?', answer: 'We serve traditional Kerala cuisine. The premium menu includes welcome drinks, elaborate lunch with fish fry, evening tea/snacks, and a dinner featuring chicken or other special dishes. We also accommodate dietary restrictions if informed in advance.' },
      { question: 'Are there any extra activities included?', answer: 'Yes, premium bookings often include a complimentary canoe ride or village walk, allowing you to explore the narrower canals that the houseboat cannot enter.' }
    ],
    'Luxury Houseboat': [
      {
        question: 'What defines the luxury houseboat experience?',
        answer: (
          <>
            Our luxury houseboats offer a 5-star experience on water, including:
            <ul style={{ paddingLeft: '1.2rem', marginTop: '0.5rem', listStyleType: 'disc' }}>
              <li>Fully glass-covered upper deck with 360-degree views</li>
              <li>Centralized AC throughout the boat</li>
              <li>Luxurious bedrooms with en-suite jacuzzis or premium bathtubs</li>
              <li>Customized fine-dining menu prepared by a private chef</li>
              <li>Premium entertainment systems and unlimited WiFi</li>
            </ul>
          </>
        )
      },
      { question: 'Can we customize the menu on a luxury houseboat?', answer: 'Absolutely. A dedicated chef will prepare meals according to your exact preferences, whether you prefer continental, North Indian, or authentic Kerala delicacies with premium seafood like tiger prawns or pearl spot.' },
      { question: 'Is the luxury houseboat suitable for corporate events or small parties?', answer: 'Yes, our luxury houseboats have spacious upper decks that are perfect for corporate meetings, honeymoons, anniversaries, and intimate parties. We can arrange special decorations and cakes upon request.' },
      { question: 'What are the check-in and check-out timings for luxury boats?', answer: 'Check-in is typically at 12:00 PM and check-out at 9:00 AM the next day. We ensure a seamless, priority boarding process for our luxury guests.' },
      { question: 'Do luxury houseboats have safety certifications?', answer: 'Yes, all our luxury houseboats hold premium safety certifications, are equipped with modern navigation and safety gear, and are operated by highly experienced, bilingual crew members.' }
    ]
  };

  const currentFaqs = faqData[formData.category] || faqData['Deluxe Houseboat'];

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

                    <div className="form-group">
                      <label className="form-label">Select Houseboat Category</label>
                      <div className="input-with-icon">
                        <Home size={18} className="input-icon" style={{ backgroundColor: '#fef3c7', color: '#d97706', padding: '4px', borderRadius: '4px', width: '28px', height: '28px', boxSizing: 'border-box' }} />
                        <select 
                          name="category" 
                          className="form-input"
                          style={{paddingLeft: '3.5rem'}}
                          value={formData.category}
                          onChange={handleChange}
                          required
                        >
                          <option value="" disabled>Select a category</option>
                          <option value="Deluxe Houseboat">Deluxe Houseboat</option>
                          <option value="Premium Houseboat">Premium Houseboat</option>
                          <option value="Luxury Houseboat">Luxury Houseboat</option>
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
        <section className="reviews-section" style={{ minHeight: '500px' }}>
          <div className="elfsight-app-88b398f6-613d-4ac2-821e-06e6df158390" data-elfsight-app-lazy="true"></div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section">
          <div className="faq-header">
            <h3 className="faq-cursive">Frequently Asked Questions</h3>
            <h2 className="faq-title">{formData.category || 'Deluxe Houseboat'} Booking</h2>
            <p className="faq-subtitle">Get answers to common questions about {formData.category ? formData.category.toLowerCase() : 'deluxe houseboat'} booking in Alleppey, Kerala.</p>
          </div>
          
          <div className="faq-list">
            {currentFaqs.map((faq, index) => (
              <div key={index} className={`faq-item ${openFaq === index ? 'open' : ''}`}>
                <button 
                  className="faq-question" 
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openFaq === index}
                >
                  {faq.question}
                  <span className="faq-icon">
                    {openFaq === index ? <Minus size={18} /> : <Plus size={18} />}
                  </span>
                </button>
                {openFaq === index && (
                  <div className="faq-answer">
                    <div className="faq-answer-content">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
