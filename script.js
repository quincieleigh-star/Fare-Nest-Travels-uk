// ============================================
// GLOBAL VARIABLES
// ============================================
let currentMap = null;
let markers = [];
let flightsData = [];

// ============================================
// AIRLINES DATA
// ============================================
const airlinesData = [
    { name: "Emirates", code: "EK", icon: "fas fa-plane", color: "#ff0000" },
    { name: "Etihad Airways", code: "EY", icon: "fas fa-plane", color: "#ff6600" },
    { name: "Qatar Airways", code: "QR", icon: "fas fa-plane", color: "#660000" },
    { name: "British Airways", code: "BA", icon: "fas fa-plane", color: "#003366" },
    { name: "Air France", code: "AF", icon: "fas fa-plane", color: "#002b56" },
    { name: "Lufthansa", code: "LH", icon: "fas fa-plane", color: "#0a1f44" },
    { name: "Singapore Airlines", code: "SQ", icon: "fas fa-plane", color: "#d2122e" },
    { name: "Cathay Pacific", code: "CX", icon: "fas fa-plane", color: "#ed1c24" },
    { name: "Delta Air Lines", code: "DL", icon: "fas fa-plane", color: "#003a70" },
    { name: "United Airlines", code: "UA", icon: "fas fa-plane", color: "#002244" },
    { name: "American Airlines", code: "AA", icon: "fas fa-plane", color: "#002d62" },
    { name: "Turkish Airlines", code: "TK", icon: "fas fa-plane", color: "#b11226" },
    { name: "Thai Airways", code: "TG", icon: "fas fa-plane", color: "#660066" },
    { name: "Malaysia Airlines", code: "MH", icon: "fas fa-plane", color: "#004b87" },
    { name: "Qantas", code: "QF", icon: "fas fa-plane", color: "#e1001a" },
    { name: "Air New Zealand", code: "NZ", icon: "fas fa-plane", color: "#000000" },
    { name: "Japan Airlines", code: "JL", icon: "fas fa-plane", color: "#c60c30" },
    { name: "ANA", code: "NH", icon: "fas fa-plane", color: "#000000" },
    { name: "Korean Air", code: "KE", icon: "fas fa-plane", color: "#0066b3" },
    { name: "China Airlines", code: "CI", icon: "fas fa-plane", color: "#003b6f" }
];

// ============================================
// DESTINATIONS DATA
// ============================================
const destinationsData = [
    { name: "Dubai, UAE", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500", price: "$450" },
    { name: "Paris, France", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500", price: "$520" },
    { name: "London, UK", image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=500", price: "$480" },
    { name: "New York, USA", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500", price: "$650" },
    { name: "Tokyo, Japan", image: "https://images.unsplash.com/photo-1534374793070-7c47c3acfe0b?w=500", price: "$780" },
    { name: "Sydney, Australia", image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=500", price: "$1150" }
];

// ============================================
// TESTIMONIALS DATA
// ============================================
const testimonialsData = [
    { name: "Sarah Johnson", location: "London, UK", rating: 5, text: "Amazing service! Booked my Dubai flight through Farenest Travels. Got the best price and excellent support." },
    { name: "Michael Chen", location: "Singapore", rating: 5, text: "Best travel agency I've ever worked with. They found me amazing flight deals and their customer service is outstanding!" },
    { name: "Emily Rodriguez", location: "New York, USA", rating: 5, text: "The team went above and beyond to plan our honeymoon. Every detail was perfect. Thank you!" },
    { name: "David Miller", location: "Sydney, Australia", rating: 5, text: "I've been using Farenest Travels for 3 years now. They consistently provide the best prices and excellent service." },
    { name: "Lisa Thompson", location: "Toronto, Canada", rating: 5, text: "Professional, reliable, and great prices. Highly recommend Farenest Travels for all your travel needs." },
    { name: "James Wilson", location: "Dubai, UAE", rating: 5, text: "Exceptional service! They helped me find the perfect flight and hotel package for my business trip." }
];

// ============================================
// GENERATE FLIGHT DATA (1000+ Flights)
// ============================================
function generateFlights() {
    const flights = [];
    const airlinesList = ["Emirates", "Etihad Airways", "Qatar Airways", "British Airways", "Air France", "Lufthansa", "Singapore Airlines", "Delta Air Lines", "United Airlines", "Turkish Airlines", "Thai Airways", "Malaysia Airlines", "Qantas", "Cathay Pacific", "Korean Air"];
    
    for (let i = 0; i < 1000; i++) {
        const fromIndex = Math.floor(Math.random() * airportsData.length);
        let toIndex;
        do {
            toIndex = Math.floor(Math.random() * airportsData.length);
        } while (toIndex === fromIndex);
        
        const fromAirport = airportsData[fromIndex];
        const toAirport = airportsData[toIndex];
        const airline = airlinesList[Math.floor(Math.random() * airlinesList.length)];
        const basePrice = Math.floor(Math.random() * 2000) + 100;
        const date = new Date();
        date.setDate(date.getDate() + Math.floor(Math.random() * 180));
        
        flights.push({
            id: i + 1,
            airline: airline,
            flightNo: `${airline.substring(0, 2).toUpperCase()}${Math.floor(Math.random() * 900) + 100}`,
            from: fromAirport.code,
            to: toAirport.code,
            fromCity: fromAirport.city,
            toCity: toAirport.city,
            fromCountry: fromAirport.country,
            toCountry: toAirport.country,
            departure: `${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
            arrival: `${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
            duration: `${Math.floor(Math.random() * 15) + 1}h ${Math.floor(Math.random() * 60)}m`,
            price: basePrice,
            date: date.toISOString().split('T')[0]
        });
    }
    return flights;
}

flightsData = generateFlights();

// ============================================
// UTILITY FUNCTIONS
// ============================================
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) navLinks.classList.toggle('active');
}

function extractAirportCode(input) {
    if (!input) return "";
    const match = input.match(/^([A-Z]{3})/);
    if (match) return match[1];
    
    const airport = airportsData.find(a => 
        a.name.toLowerCase().includes(input.toLowerCase()) ||
        a.city.toLowerCase().includes(input.toLowerCase()) ||
        a.country.toLowerCase().includes(input.toLowerCase()) ||
        a.code.toLowerCase() === input.toLowerCase()
    );
    return airport ? airport.code : input.toUpperCase().substring(0, 3);
}

// ============================================
// AUTOCOMPLETE FUNCTIONS
// ============================================
function setupAutocomplete(inputId, suggestionsId) {
    const input = document.getElementById(inputId);
    const suggestionsDiv = document.getElementById(suggestionsId);
    
    if (!input || !suggestionsDiv) return;
    
    input.addEventListener('input', function() {
        const value = this.value.toLowerCase();
        
        if (value.length < 2) {
            suggestionsDiv.style.display = 'none';
            return;
        }
        
        const matches = airportsData.filter(airport => 
            airport.code.toLowerCase().includes(value) ||
            airport.name.toLowerCase().includes(value) ||
            airport.city.toLowerCase().includes(value) ||
            airport.country.toLowerCase().includes(value)
        ).slice(0, 10);
        
        if (matches.length > 0) {
            suggestionsDiv.innerHTML = matches.map(airport => `
                <div class="suggestion-item" onclick="selectAirport('${inputId}', '${airport.code}', '${airport.name}', '${airport.city}', '${airport.country}')">
                    <span class="suggestion-code">${airport.code}</span> - ${airport.name}<br>
                    <small>${airport.city}, ${airport.country}</small>
                </div>
            `).join('');
            suggestionsDiv.style.display = 'block';
            
            const rect = input.getBoundingClientRect();
            suggestionsDiv.style.position = 'absolute';
            suggestionsDiv.style.top = `${rect.bottom + window.scrollY}px`;
            suggestionsDiv.style.left = `${rect.left + window.scrollX}px`;
            suggestionsDiv.style.width = `${rect.width}px`;
        } else {
            suggestionsDiv.style.display = 'none';
        }
    });
    
    input.addEventListener('blur', function() {
        setTimeout(() => {
            suggestionsDiv.style.display = 'none';
        }, 200);
    });
}

function selectAirport(inputId, code, name, city, country) {
    const input = document.getElementById(inputId);
    if (input) {
        input.value = `${code} - ${name}, ${city}, ${country}`;
        const suggestionsDiv = input.nextElementSibling;
        if (suggestionsDiv && suggestionsDiv.classList.contains('suggestions')) {
            suggestionsDiv.style.display = 'none';
        }
    }
}

// ============================================
// QUICK SEARCH FUNCTION
// ============================================
function quickSearch() {
    const fromInput = document.getElementById('quickFrom')?.value;
    const toInput = document.getElementById('quickTo')?.value;
    const date = document.getElementById('quickDate')?.value;
    
    if (!fromInput || !toInput) {
        alert('Please enter both departure and arrival locations');
        return;
    }
    
    const fromCode = extractAirportCode(fromInput);
    const toCode = extractAirportCode(toInput);
    const resultsDiv = document.getElementById('quickResults');
    if (!resultsDiv) return;
    
    let availableFlights = flightsData.filter(flight => flight.from === fromCode && flight.to === toCode);
    
    if (availableFlights.length > 0) {
        if (date) {
            const searchDate = new Date(date);
            availableFlights = availableFlights.map(flight => {
                const flightDate = new Date(flight.date);
                const diffDays = Math.abs(flightDate - searchDate) / (1000 * 60 * 60 * 24);
                return { ...flight, diffDays };
            });
            availableFlights.sort((a, b) => a.diffDays - b.diffDays);
        }
        
        resultsDiv.innerHTML = `
            <h3 style="margin: 2rem 0 1rem;">Available Flights</h3>
            ${availableFlights.slice(0, 5).map(flight => createFlightCard(flight, 1)).join('')}
        `;
    } else {
        resultsDiv.innerHTML = `
            <div style="text-align: center; padding: 2rem; background: #f8f9fa; border-radius: 15px; margin-top: 2rem;">
                <i class="fas fa-plane-slash" style="font-size: 3rem; color: #f5576c;"></i>
                <h3>No flights found for ${fromCode} to ${toCode}</h3>
                <p>Contact us for personalized assistance!</p>
                <button class="btn" onclick="requestAssistance('${fromCode}', '${toCode}')">Request Assistance</button>
            </div>
        `;
    }
}

// ============================================
// SEARCH FLIGHTS FUNCTION
// ============================================
function searchFlights() {
    const fromInput = document.getElementById('from')?.value;
    const toInput = document.getElementById('to')?.value;
    const date = document.getElementById('date')?.value;
    const passengers = parseInt(document.getElementById('passengers')?.value || 1);
    
    if (!fromInput || !toInput) {
        alert('Please select departure and arrival locations');
        return;
    }
    
    const fromCode = extractAirportCode(fromInput);
    const toCode = extractAirportCode(toInput);
    
    let availableFlights = flightsData.filter(flight => flight.from === fromCode && flight.to === toCode);
    const resultsDiv = document.getElementById('flightResults');
    const alternativeDiv = document.getElementById('alternativeFlights');
    const dateInfo = document.getElementById('dateInfo');
    
    if (availableFlights.length === 0) {
        if (resultsDiv) {
            resultsDiv.innerHTML = `
                <div style="text-align: center; padding: 3rem; background: #f8f9fa; border-radius: 15px;">
                    <i class="fas fa-plane-slash" style="font-size: 4rem; color: #f5576c;"></i>
                    <h3>No direct flights found for ${fromCode} to ${toCode}</h3>
                    <p>Showing alternative flights near your selected date...</p>
                </div>
            `;
        }
        
        // Show alternative flights from nearby dates
        const allRoutes = flightsData.filter(flight => flight.from === fromCode && flight.to === toCode);
        if (allRoutes.length > 0 && date) {
            const searchDate = new Date(date);
            const flightsWithDiff = allRoutes.map(flight => {
                const flightDate = new Date(flight.date);
                const diffDays = Math.abs(flightDate - searchDate) / (1000 * 60 * 60 * 24);
                return { ...flight, diffDays };
            });
            flightsWithDiff.sort((a, b) => a.diffDays - b.diffDays);
            const nearestFlights = flightsWithDiff.slice(0, 5);
            
            if (alternativeDiv) {
                alternativeDiv.innerHTML = `
                    <h3 style="margin: 2rem 0 1rem;">✈️ Alternative Flights Near Your Date:</h3>
                    ${nearestFlights.map(flight => createFlightCard(flight, passengers)).join('')}
                `;
            }
        } else if (alternativeDiv) {
            alternativeDiv.innerHTML = `
                <div style="text-align: center; padding: 2rem;">
                    <p>No flights found. Please contact us for personalized assistance.</p>
                    <button class="btn" onclick="requestAssistance('${fromCode}', '${toCode}')">Request Assistance</button>
                </div>
            `;
        }
        return;
    }
    
    // Find nearest date if date is specified
    if (date && dateInfo) {
        const searchDate = new Date(date);
        availableFlights = availableFlights.map(flight => {
            const flightDate = new Date(flight.date);
            const diffDays = Math.abs(flightDate - searchDate) / (1000 * 60 * 60 * 24);
            return { ...flight, diffDays };
        });
        availableFlights.sort((a, b) => a.diffDays - b.diffDays);
        
        const nearestFlight = availableFlights[0];
        if (nearestFlight.diffDays === 0) {
            dateInfo.innerHTML = '<p style="color: #28a745; margin: 1rem 0; text-align: center;">✅ Flights available on your selected date!</p>';
        } else {
            dateInfo.innerHTML = `
                <p style="color: #ff9800; margin: 1rem 0; text-align: center;">
                    📅 Nearest flight is ${Math.round(Math.abs(nearestFlight.diffDays))} days 
                    ${nearestFlight.diffDays > 0 ? 'after' : 'before'} your selected date (${nearestFlight.date})
                </p>
            `;
        }
    }
    
    if (resultsDiv) {
        resultsDiv.innerHTML = availableFlights.slice(0, 10).map(flight => createFlightCard(flight, passengers)).join('');
    }
}

function createFlightCard(flight, passengers) {
    const totalPrice = flight.price * passengers;
    return `
        <div class="flight-card">
            <div class="flight-info">
                <div class="flight-airline">
                    <i class="fas fa-plane" style="color: #667eea;"></i>
                    <strong>${flight.airline}</strong> | ${flight.flightNo}
                </div>
                <div>✈️ ${flight.from} (${flight.fromCity}) → ${flight.to} (${flight.toCity})</div>
                <div>🕐 Departure: ${flight.departure} | Arrival: ${flight.arrival}</div>
                <div>⏱️ Duration: ${flight.duration}</div>
                <div>📅 Date: ${flight.date}</div>
                <div>👥 ${passengers} passenger(s)</div>
            </div>
            <div>
                <div class="flight-price">$${totalPrice}</div>
                <div style="font-size: 0.8rem; color: #666;">$${flight.price} per person</div>
                <button class="book-flight-btn" onclick="bookFlight('${flight.airline}', '${flight.from}', '${flight.to}', '${flight.date}', ${flight.price}, ${passengers})">Book Now</button>
            </div>
        </div>
    `;
}

// ============================================
// BOOKING FUNCTIONS
// ============================================
function bookFlight(airline, from, to, date, price, passengers) {
    const totalPrice = price * passengers;
    const message = `🛫 NEW FLIGHT BOOKING REQUEST 🛬\n\n` +
        `Airline: ${airline}\n` +
        `Route: ${from} → ${to}\n` +
        `Date: ${date}\n` +
        `Passengers: ${passengers}\n` +
        `Price per person: $${price}\n` +
        `Total: $${totalPrice}\n\n` +
        `Please contact me to complete the booking.`;
    
    const whatsappNumber = "44798515953";
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    window.open(`mailto:info@farenesttravels.com?subject=Flight Booking Request&body=${encodeURIComponent(message)}`, '_blank');
    
    alert('📱 Booking request sent!\n\n✓ WhatsApp opened\n✓ Email prepared\n\nSend both to confirm your booking.');
}

function bookPlace(name, type, location) {
    const message = `🏨 NEW ${type.toUpperCase()} BOOKING REQUEST 🏨\n\n` +
        `Place: ${name}\n` +
        `Type: ${type}\n` +
        `Location: ${location}\n\n` +
        `Please contact me to complete the reservation.`;
    
    const whatsappNumber = "44798515953";
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    window.open(`mailto:info@farenesttravels.com?subject=${type} Booking Request&body=${encodeURIComponent(message)}`, '_blank');
    
    alert('📱 Booking request sent! We will contact you shortly.');
}

function requestAssistance(from, to) {
    const message = `🛫 FLIGHT ASSISTANCE REQUEST 🛬\n\nI need help finding flights from ${from} to ${to}.\n\nPlease contact me with the best available options.`;
    window.open(`https://wa.me/44798515953?text=${encodeURIComponent(message)}`, '_blank');
    alert('Assistance request sent! Our travel expert will contact you on WhatsApp shortly.');
}

// ============================================
// GOOGLE MAPS / OPENSTREETMAP INTEGRATION
// ============================================
async function searchPlaces() {
    const location = document.getElementById('locationSearch')?.value;
    const placeType = document.getElementById('placeType')?.value;
    const resultsDiv = document.getElementById('placesResults');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const mapContainer = document.getElementById('mapContainer');
    
    if (!location) {
        alert('Please enter a location to search');
        return;
    }
    
    if (loadingSpinner) loadingSpinner.style.display = 'block';
    if (resultsDiv) resultsDiv.innerHTML = '';
    
    try {
        const geoResponse = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&limit=1`);
        const geoData = await geoResponse.json();
        
        if (geoData.length === 0) {
            alert('Location not found. Please try a different location.');
            if (loadingSpinner) loadingSpinner.style.display = 'none';
            return;
        }
        
        const lat = parseFloat(geoData[0].lat);
        const lon = parseFloat(geoData[0].lon);
        
        if (currentMap) currentMap.remove();
        
        currentMap = L.map(mapContainer).setView([lat, lon], 14);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(currentMap);
        
        const query = `[out:json][timeout:25];(node["${placeType}"](around:5000,${lat},${lon});way["${placeType}"](around:5000,${lat},${lon}););out body;>;out skel qt;`;
        
        const overpassResponse = await fetch('https://overpass-api.de/api/interpreter', {
            method: 'POST',
            body: query
        });
        
        const data = await overpassResponse.json();
        const places = data.elements.filter(el => el.tags && el.tags.name).slice(0, 30);
        
        if (places.length === 0) {
            if (resultsDiv) {
                resultsDiv.innerHTML = `<div style="text-align: center; padding: 3rem;"><i class="fas fa-search" style="font-size: 3rem; color: #ccc;"></i><h3>No ${placeType}s found in this area</h3></div>`;
            }
        } else {
            if (resultsDiv) {
                resultsDiv.innerHTML = `<div class="places-grid">${places.map(place => `
                    <div class="place-card">
                        <div class="place-image"><i class="fas fa-${placeType === 'hotel' ? 'hotel' : placeType === 'restaurant' ? 'utensils' : 'coffee'}"></i></div>
                        <div class="place-info">
                            <div class="place-name">${place.tags.name}</div>
                            <div class="place-location"><i class="fas fa-map-marker-alt"></i> ${place.tags['addr:city'] || location}</div>
                            <div class="place-rating">${'⭐'.repeat(Math.floor(Math.random() * 3) + 3)}</div>
                            <div class="place-price">${placeType === 'hotel' ? `$${Math.floor(Math.random() * 500) + 80}` : `$${Math.floor(Math.random() * 100) + 15}`}/night</div>
                            <button class="book-place-btn" onclick="bookPlace('${place.tags.name.replace(/'/g, "\\'")}', '${placeType}', '${location}')"><i class="fab fa-whatsapp"></i> Book via WhatsApp</button>
                        </div>
                    </div>
                `).join('')}</div>`;
            }
            
            places.forEach(place => {
                if (place.lat && place.lon) {
                    const marker = L.marker([place.lat, place.lon]).addTo(currentMap);
                    marker.bindPopup(`<b>${place.tags.name}</b><br><button onclick="bookPlace('${place.tags.name.replace(/'/g, "\\'")}', '${placeType}', '${location}')">Book via WhatsApp</button>`);
                    markers.push(marker);
                }
            });
        }
        
        if (loadingSpinner) loadingSpinner.style.display = 'none';
        
    } catch (error) {
        console.error('Error:', error);
        if (resultsDiv) resultsDiv.innerHTML = `<div style="text-align: center; padding: 3rem;"><h3>Error searching for places. Please try again.</h3></div>`;
        if (loadingSpinner) loadingSpinner.style.display = 'none';
    }
}

// ============================================
// SUBMIT INQUIRY
// ============================================
function submitInquiry(event) {
    event.preventDefault();
    
    const name = document.getElementById('inquiryName')?.value;
    const email = document.getElementById('inquiryEmail')?.value;
    const phone = document.getElementById('inquiryPhone')?.value;
    const inquiryType = document.getElementById('inquiryType')?.value;
    const message = document.getElementById('inquiryMessage')?.value;
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        alert('❌ Please enter a valid email address');
        return false;
    }
    
    if (!name || !message || !inquiryType) {
        alert('Please fill in all required fields');
        return false;
    }
    
    const fullMessage = `📧 NEW CUSTOMER INQUIRY 📧\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nInquiry Type: ${inquiryType}\nMessage: ${message}\n\nPlease respond to this customer.`;
    
    window.open(`https://wa.me/44798515953?text=${encodeURIComponent(fullMessage)}`, '_blank');
    window.open(`mailto:info@farenesttravels.com?subject=New Inquiry from ${name}&body=${encodeURIComponent(fullMessage)}`, '_blank');
    
    const form = document.getElementById('inquiryForm');
    const successDiv = document.getElementById('inquirySuccess');
    
    if (form && successDiv) {
        form.style.display = 'none';
        successDiv.style.display = 'block';
        setTimeout(() => {
            form.style.display = 'block';
            successDiv.style.display = 'none';
            form.reset();
        }, 5000);
    }
    
    alert('✅ Inquiry sent successfully! Our team will contact you within 24 hours.');
    return false;
}

// ============================================
// INITIALIZE PAGE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    setupAutocomplete('quickFrom', 'quickFromSuggestions');
    setupAutocomplete('quickTo', 'quickToSuggestions');
    setupAutocomplete('from', 'fromSuggestions');
    setupAutocomplete('to', 'toSuggestions');
    
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const dateValue = `${yyyy}-${mm}-${dd}`;
    
    const dateInput = document.getElementById('date');
    if (dateInput) dateInput.value = dateValue;
    const quickDateInput = document.getElementById('quickDate');
    if (quickDateInput) quickDateInput.value = dateValue;
    
    const airlinesGrid = document.getElementById('airlinesGrid');
    if (airlinesGrid) {
        airlinesGrid.innerHTML = airlinesData.map(a => `<div class="airline-card"><i class="${a.icon}" style="font-size: 2.5rem; color: ${a.color}"></i><h4>${a.name}</h4><p>${a.code}</p></div>`).join('');
    }
    
    const destinationsGrid = document.getElementById('destinationsGrid');
    if (destinationsGrid) {
        destinationsGrid.innerHTML = destinationsData.map(d => `<div class="destination-card"><img src="${d.image}" alt="${d.name}"><div class="destination-info"><h3>${d.name}</h3><p>Starting from ${d.price}</p><a href="flights.html" class="btn-small">Book Now</a></div></div>`).join('');
    }
    
    const testimonialsGrid = document.getElementById('testimonialsGrid');
    if (testimonialsGrid) {
        testimonialsGrid.innerHTML = testimonialsData.map(t => `<div class="testimonial-card"><div class="stars">${'⭐'.repeat(t.rating)}</div><p>"${t.text}"</p><h4>- ${t.name}</h4><p style="opacity: 0.8;">${t.location}</p></div>`).join('');
    }
    
    const reviewsGrid = document.getElementById('reviewsGrid');
    if (reviewsGrid) {
        reviewsGrid.innerHTML = testimonialsData.map(t => `<div class="review-box"><div class="stars">${'⭐'.repeat(t.rating)}</div><p>"${t.text}"</p><h4>- ${t.name}</h4><p style="color: #666;">${t.location}</p></div>`).join('');
    }
});
