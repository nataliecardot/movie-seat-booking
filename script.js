const container = document.querySelector('.container');
// querySelectorAll takes them all and puts them into a (static) NodeList, which is similar to an array (can use some array methods like forEach on it)
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count'); // Seat count (span)
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie'); // Select list

// Initial selected ticket price from select list (we got select element, but want value inside it)
// The value in <select> -> <option> is a string by default; using unary plus to cast to number. Easier than using parseInt()
let ticketPrice = +movieSelect.value;

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  // Goal: Save selected seats. Problem: selectedSeats is a NodeList of elements with div.seat.selected. This is the solution:
  // Copy selected seats into array using spread operator (NodeList is converted to a regular array, without brackets; just values are passed in), so can use map and indexOf array methods on it
  // Map through array
  // Return a new array of indexes
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  console.log(seatsIndex);

  // length is a property that will get # elements in array, or in this case, a NodeList
  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Movie select event
// change event is fired, not click, when a new option is clicked
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  updateSelectedCount();
});

// Seat click event
container.addEventListener('click', (e) => {
  // e.target: element that's clicked on
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});
