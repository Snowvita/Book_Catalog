function showHomePage() {
    document.getElementById('homePage').style.display = 'block';
    document.getElementById('bookList').style.display = 'none';
    document.getElementById('favoriteList').style.display = 'none'; 
    document.getElementById('addBookForm').style.display = 'none';
    document.getElementById('onlineBookList').style.display = 'none'; 
}
function showBookList() {
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('bookList').style.display = 'block';
    document.getElementById('favoriteList').style.display = 'none'; 
    document.getElementById('addBookForm').style.display = 'none';
    document.getElementById('onlineBookList').style.display = 'none';
    loadBooks('bookList'); 
}
function showOnlineBooks() {
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('bookList').style.display = 'none';
    document.getElementById('favoriteList').style.display = 'none'; 
    document.getElementById('addBookForm').style.display = 'none';
}
function addBook() {
    var title = document.getElementById('title').value;
    var author = document.getElementById('author').value;
    if (title.trim() !== '' && author.trim() !== '') {
        var bookList = JSON.parse(localStorage.getItem('bookList')) || [];
        var newBook = {
            title: title,
            author: author
        };
        bookList.push(newBook);
        localStorage.setItem('bookList', JSON.stringify(bookList));
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('addBookForm').style.display = 'none';
        showBookList();
    } else {
        alert('Please enter both title and author.');
    }
}
function deleteBook(index, storageKey) {
    var bookList = JSON.parse(localStorage.getItem(storageKey)) || [];
    var favoriteList = JSON.parse(localStorage.getItem('favoriteList')) || [];
    var deletedBook = bookList[index];
    var favoriteIndex = favoriteList.findIndex(book => book.title === deletedBook.title && book.author === deletedBook.author);
    if (favoriteIndex !== -1) {
        favoriteList.splice(favoriteIndex, 1);
        localStorage.setItem('favoriteList', JSON.stringify(favoriteList));
    }
    bookList.splice(index, 1);
    localStorage.setItem(storageKey, JSON.stringify(bookList));
    loadBooks(storageKey);
    showBookList();
}
function showAddBookForm() {
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('bookList').style.display = 'none';
    document.getElementById('favoriteList').style.display = 'none'; 
    document.getElementById('addBookForm').style.display = 'block';
}
function loadBooks(storageKey) {
    var bookList = JSON.parse(localStorage.getItem(storageKey)) || [];
    var bookListContainer = document.getElementById('bookList');
    var favoriteListContainer = document.getElementById('favoriteList');
    if (storageKey === 'bookList') {
        bookListContainer.style.display = 'block';
        favoriteListContainer.style.display = 'none';
    } else if (storageKey === 'favoriteList') {
        bookListContainer.style.display = 'none';
        favoriteListContainer.style.display = 'block';
    }
    bookListContainer.innerHTML = '';
    favoriteListContainer.innerHTML = '';
    if (bookList.length > 0) {
        bookList.forEach(function (book, index) {
            var bookItem = document.createElement('div');
            bookItem.className = 'bookItem';
            bookItem.innerHTML = `<strong>${book.title}</strong> by ${book.author} 
                                  <button onclick="deleteBook(${index}, '${storageKey}')">Delete</button>
                                  <button onclick="addToFavorites(${index})">Add to Favorites</button>`;
            bookListContainer.appendChild(bookItem);
        });
    } else {
        if (storageKey === 'bookList') {
            bookListContainer.innerText = 'No books in the catalog.';
        } else if (storageKey === 'favoriteList') {
            favoriteListContainer.innerText = 'No books in favorites.';
        }
    }
}
function addToFavorites(index) {
    var bookList = JSON.parse(localStorage.getItem('bookList')) || [];
    var favoriteList = JSON.parse(localStorage.getItem('favoriteList')) || [];
    var selectedBook = bookList[index];
    if (!isBookInFavorites(selectedBook, favoriteList)) {
        favoriteList.push(selectedBook);
        localStorage.setItem('favoriteList', JSON.stringify(favoriteList));
        showFavorites();
    } else {
        alert('This book is already in your favorites.');
    }
}
function isBookInFavorites(book, favorites) {
    return favorites.some(favorite => favorite.title === book.title && favorite.author === book.author);
}
function showFavorites() {
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('bookList').style.display = 'none';
    document.getElementById('addBookForm').style.display = 'none';
    document.getElementById('favoriteList').style.display = 'block';
    document.getElementById('onlineBookList').style.display = 'none';

    var favoriteList = JSON.parse(localStorage.getItem('favoriteList')) || [];
    var favoriteListContainer = document.getElementById('favoriteList');
    favoriteListContainer.innerHTML = '';

    if (favoriteList.length > 0) {
        favoriteList.forEach(function (book, index) {
            var bookItem = document.createElement('div');
            bookItem.className = 'bookItem';
            bookItem.innerHTML = `<strong>${book.title}</strong> by ${book.author} 
                                  <button onclick="removeFromFavorites(${index})">Remove from Favorites</button>`;
            favoriteListContainer.appendChild(bookItem);
        });
    } else {
        favoriteListContainer.innerText = 'No books in favorites.';
    }
}

function removeFromFavorites(index) {
    var favoriteList = JSON.parse(localStorage.getItem('favoriteList')) || [];

    favoriteList.splice(index, 1);
    localStorage.setItem('favoriteList', JSON.stringify(favoriteList));

    showFavorites();
}

function showOnlineBooks() {
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('bookList').style.display = 'none';
    document.getElementById('favoriteList').style.display = 'none';
    document.getElementById('addBookForm').style.display = 'none';
    document.getElementById('onlineBookList').style.display = 'block';
    fetchOnlineBooks();
}
function fetchOnlineBooks() {
    const onlineBooks = [
        { title: 'Adventures of Sherlock Holmes', link: 'https://archive.org/details/adventuresofsher00doylrich/mode/2up?ref=ol&view=theater' },
        { title: 'Bricks without straw', link: 'https://archive.org/details/brickswithout00tourrich/mode/2up?ref=ol&view=theater' },
        { title: 'The House without a Key', link: 'https://archive.org/details/housewithoutkey00bigg/mode/2up?ref=ol&view=theater' },
        { title: "Brewster's Millions", link: 'https://archive.org/details/brewstersmill00mccurich/mode/2up?ref=ol&view=theater' },
        { title: 'The Mystery of Cloomber', link: 'https://archive.org/details/mysteryofcloombe00doyliala/mode/2up?ref=ol&view=theater' },
        { title: 'The Lone Wolf', link: 'https://archive.org/details/lonewolfmelodram00vanciala/mode/2up?ref=ol&view=theater' },
        { title: 'Midwinter', link: 'https://archive.org/details/midwinter00buch/mode/2up?ref=ol&view=theater' },
        { title: 'The Haunted Man', link: 'https://archive.org/details/hauntedmanghosts00dick/mode/2up?ref=ol&view=theater' },
        { title: 'The Great Shadow', link: 'https://archive.org/details/greatshadowbeyon00doylrich/mode/2up?ref=ol&view=theater' },
    ];
    const onlineBooksContainer = document.getElementById('onlineBooks');
    onlineBooksContainer.innerHTML = ''; 
    onlineBooks.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.classList.add('online-book');
        const titleElement = document.createElement('h3');
        titleElement.textContent = book.title;
        const linkElement = document.createElement('a');
        linkElement.href = book.link;
        linkElement.textContent = 'Read Now';
        bookElement.appendChild(titleElement);
        bookElement.appendChild(linkElement);
        onlineBooksContainer.appendChild(bookElement);
    });
}