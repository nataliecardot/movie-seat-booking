# movie-seat-booking

Movie seat booking app made with vanilla JavaScript.

You can select a movie and view/select available seats. The total price is calculated.
Data is saved to session storage and the UI is populated with that data, so data won't be lost on a page reload (it will be available for the duration of the session, across page reloads, as long as the browser is open. Compare with local storage, in which data persists even when the browser is closed and reopened).
