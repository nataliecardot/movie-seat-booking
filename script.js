const container = document.querySelector('.container');
// querySelectorAll takes them all and puts them into a (static) NodeList, which is similar to an array (can use array methods with it)
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
