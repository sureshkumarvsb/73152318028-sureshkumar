import { useState } from 'react'
import './App.css'

function App() {
  // Available movies/events
  const movies = [
    { id: 1, name: 'Avatar: The Way of Water', price: 250 },
    { id: 2, name: 'Avengers: Endgame', price: 300 },
    { id: 3, name: 'Inception', price: 200 },
    { id: 4, name: 'The Dark Knight', price: 200 },
  ];

  // State management
  const [selectedMovie, setSelectedMovie] = useState(movies[0]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([5, 12, 18, 25, 30]); // Pre-booked seats

  // Generate seat layout (8 rows x 8 seats = 64 seats)
  const rows = 8;
  const seatsPerRow = 8;
  const totalSeats = rows * seatsPerRow;

  // Handle seat selection
  const handleSeatClick = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) {
      return; // Can't select already booked seats
    }

    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  // Handle booking confirmation
  const handleBooking = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }

    const totalPrice = selectedSeats.length * selectedMovie.price;
    alert(`Booking Confirmed!\n\nMovie: ${selectedMovie.name}\nSeats: ${selectedSeats.sort((a, b) => a - b).join(', ')}\nTotal: ₹${totalPrice}`);
    
    // Move selected seats to booked
    setBookedSeats([...bookedSeats, ...selectedSeats]);
    setSelectedSeats([]);
  };

  // Calculate total price
  const totalPrice = selectedSeats.length * selectedMovie.price;

  return (
    <div className="app">
      <header className="header">
        <h1>🎬 Ticket Booking System</h1>
        <p className="subtitle">Select your movie and seats</p>
      </header>

      {/* Movie Selection */}
      <div className="movie-selection">
        <h2>Choose a Movie</h2>
        <div className="movie-container">
          {movies.map(movie => (
            <div
              key={movie.id}
              className={`movie-card ${selectedMovie.id === movie.id ? 'selected' : ''}`}
              onClick={() => setSelectedMovie(movie)}
            >
              <h3>{movie.name}</h3>
              <p className="price">₹{movie.price} per seat</p>
            </div>
          ))}
        </div>
      </div>

      {/* Screen */}
      <div className="screen-container">
        <div className="screen">SCREEN</div>
      </div>

      {/* Seat Selection */}
      <div className="seat-selection">
        <div className="seats-container">
          {Array.from({ length: totalSeats }, (_, index) => {
            const seatNumber = index + 1;
            const isBooked = bookedSeats.includes(seatNumber);
            const isSelected = selectedSeats.includes(seatNumber);
            
            return (
              <div
                key={seatNumber}
                className={`seat ${isBooked ? 'booked' : ''} ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSeatClick(seatNumber)}
                title={`Seat ${seatNumber}`}
              >
                {seatNumber}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="legend">
        <div className="legend-item">
          <div className="seat available"></div>
          <span>Available</span>
        </div>
        <div className="legend-item">
          <div className="seat selected"></div>
          <span>Selected</span>
        </div>
        <div className="legend-item">
          <div className="seat booked"></div>
          <span>Booked</span>
        </div>
      </div>

      {/* Booking Summary */}
      <div className="booking-summary">
        <div className="summary-content">
          <div className="summary-item">
            <span>Movie:</span>
            <strong>{selectedMovie.name}</strong>
          </div>
          <div className="summary-item">
            <span>Seats Selected:</span>
            <strong>{selectedSeats.length}</strong>
          </div>
          <div className="summary-item">
            <span>Total Price:</span>
            <strong>₹{totalPrice}</strong>
          </div>
        </div>
        <button 
          className="book-button" 
          onClick={handleBooking}
          disabled={selectedSeats.length === 0}
        >
          Book Tickets
        </button>
      </div>

      <footer className="footer">
        <p>Developed by SureshKumar V - 73152318028</p>
        <p>Computer Science and Design</p>
      </footer>
    </div>
  )
}

export default App
