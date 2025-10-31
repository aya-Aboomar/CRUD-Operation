var form = document.getElementById('bookmarkForm');
var siteNameInput = document.getElementById('siteName');
var siteUrlInput = document.getElementById('siteUrl');
var nameError = document.getElementById('nameError');
var urlError = document.getElementById('urlError');
var tableBody = document.querySelector('#bookmarksTable tbody');
var editIndex = null;
siteNameInput.addEventListener('input', () => validateInputs(siteNameInput.value.trim(), siteUrlInput.value.trim()));
siteUrlInput.addEventListener('input', () => validateInputs(siteNameInput.value.trim(), siteUrlInput.value.trim()));

document.addEventListener('DOMContentLoaded', displayBookmarks);
form.addEventListener('submit', (e) => {
    e.preventDefault();

    var siteName = siteNameInput.value.trim();
    var siteUrl = siteUrlInput.value.trim();

    if (!validateInputs(siteName, siteUrl)) return;

    var bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    if (bookmarks.some(b => b.name.toLowerCase() === siteName.toLowerCase()) && editIndex === null) {
        nameError.textContent = "This website already exists!";
        siteNameInput.classList.add('invalid');
        return;
    }

    var bookmark = { name: siteName, url: siteUrl };

    if (editIndex !== null) {
        bookmarks[editIndex] = bookmark;
        editIndex = null;
    } else {
        bookmarks.push(bookmark);
    }

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    form.reset();
    clearValidation();
    displayBookmarks();
});

// function validateInputs(name, url) {
//     var urlPattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\/\w .-])\/?$/;
//     var isValid = true;

//     if (name.length < 3) {
//         nameError.textContent = "Site name must be at least 3 characters.";
//         siteNameInput.classList.add('invalid');
//         isValid = false;
//     } else {
//         nameError.textContent = "";
//         siteNameInput.classList.remove('invalid');
//         siteNameInput.classList.add('valid');
//     }

//     if (!urlPattern.test(url)) {
//         urlError.textContent = "Please enter a valid URL (e.g., https://example.com)";
//         siteUrlInput.classList.add('invalid');
//         isValid = false;
//     } else {
//         urlError.textContent = "";
//         siteUrlInput.classList.remove('invalid');
//         siteUrlInput.classList.add('valid');
//     }

//     return isValid;
// }
function validateInputs(name, url) {
  var urlPattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\/\w .-])\/?$/;
  var isValid = true;
  if (name.length < 3) {
    nameError.textContent = "Site name must be at least 3 characters.";
    siteNameInput.classList.add('invalid');
    siteNameInput.classList.remove('valid');
    isValid = false;
  } else {
    nameError.textContent = "";
    siteNameInput.classList.remove('invalid');
    siteNameInput.classList.add('valid');
  }

  if (!urlPattern.test(url)) {
    urlError.textContent = "Please enter a valid URL (e.g., https://example.com)";
    siteUrlInput.classList.add('invalid');
    siteUrlInput.classList.remove('valid');
    isValid = false;
  } else {
    urlError.textContent = "";
    siteUrlInput.classList.remove('invalid');
    siteUrlInput.classList.add('valid');
  }

  return isValid;
}


function clearValidation() {
    nameError.textContent = "";
    urlError.textContent = "";
    siteNameInput.classList.remove('valid', 'invalid');
    siteUrlInput.classList.remove('valid', 'invalid');
}

function displayBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    tableBody.innerHTML = '';

    bookmarks.forEach((bookmark, index) => {
        var row = document.createElement('tr');
        row.innerHTML = `
      <td>${index + 1}</td>
      <td>${bookmark.name}</td>
      <td><a href="${bookmark.url}" target="_blank" class="visit-btn">Visit</a></td>
      <td>
        <button class="edit-btn" onclick="editBookmark(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteBookmark(${index})">Delete</button>
      </td>
    `;
        tableBody.appendChild(row);
    });
}

function deleteBookmark(index) {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    bookmarks.splice(index, 1);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    displayBookmarks();
}

function editBookmark(index) {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    var bookmark = bookmarks[index];

    siteNameInput.value = bookmark.name;
    siteUrlInput.value = bookmark.url;
    editIndex = index;
}
