const container = document.querySelector('.container');
// querySelectorAll takes them all and puts them into a (static) NodeList, which is similar to an array (can use some array methods like forEach on it)
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count'); // Seat count (span)
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie'); // Select list

populateUI();

// Initial selected ticket price from select list (we got select element, but want value inside it)
// The value in <select> -> <option> is a string by default; using unary plus to cast to number. Easier than using parseInt()
let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  // Saves in browser's local storage, will populate UI with this saved data
  sessionStorage.setItem('selectedMovieIndex', movieIndex);
  sessionStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and count
function updateSelectedCountAndTotal() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  // Goal: Save selected seats. Problem: selectedSeats is a NodeList of elements with div.seat.selected. This is the solution:
  // Copy selected seats into array using spread operator (NodeList is converted to a regular array, without brackets; just values are passed in), so can use map and indexOf array methods on it
  // Map through array, comparing each of selected seats with array of seats not occupied, getting index of each. Return array of these indexes
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  // JSON.stringify() converts an array like [1, 2] to '[1, 2]', whereas toString would convert it to '1, 2'
  sessionStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  // length is a property that will get # elements in array, or in this case, a NodeList
  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from local storage and populate UI
function populateUI() {
  // JSON.parse to turn JSON string back into JS object (array)
  const selectedSeats = JSON.parse(sessionStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      // Could also use ES7 includes()
      if (selectedSeats.indexOf(index) > -1) {
        // classList property returns class name(s) of an element as a DOMTokenList object
        // This property is useful to add, remove and toggle CSS classes on an element
        // The classList property is read-only, however, you can modify it by using the add() and remove() methods
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = sessionStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    // selectedIndex property sets or returns index of selected option in a dropdown list
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event
// change event is fired, not click, when a new option is clicked
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCountAndTotal();
});

// Seat click event
container.addEventListener('click', (e) => {
  // e.target: element that's clicked on
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');

    updateSelectedCountAndTotal();
  }
});

// Calling here so correct amounts (count and total price) saved to local storage are reflected in UI
updateSelectedCountAndTotal();
