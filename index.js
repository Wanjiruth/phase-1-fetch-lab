function fetchBooks() {
  // Make a fetch request to the Game of Thrones API
  return fetch("https://anapioficeandfire.com/api/books")
    // Convert the response to JSON
    .then((resp) => resp.json())
    // Call renderBooks() with the JSON data
    .then((json) => {
      renderBooks(json);
      // Strategies to find the requested information
      // 1. The 5th book in the series
      const fifthBook = json[4]; // Arrays are zero-indexed
      console.log("The 5th book in the series:", fifthBook.name);
      
      // 2. The 1031st character in the series
      fetch("https://anapioficeandfire.com/api/characters/1031")
        .then((resp) => resp.json())
        .then((character) => {
          console.log("The 1031st character in the series:", character.name);
        })
        .catch((error) => console.error("Error fetching character:", error));
      
      // 3. The total number of pages of all the books
      const totalPages = json.reduce((total, book) => total + book.numberOfPages, 0);
      console.log("The total number of pages of all the books:", totalPages);
    });
}

function renderBooks(books) {
  const main = document.querySelector('main');
  books.forEach(book => {
    const h2 = document.createElement('h2');
    h2.innerHTML = book.name;
    main.appendChild(h2);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  fetchBooks();
});
