
var form = document.getElementById('bookmarkForm');
var siteNameInput = document.getElementById('siteName');
var siteUrlInput = document.getElementById('siteUrl');
var tableBody = document.querySelector('#bookmarksTable tbody');

document.addEventListener('DOMContentLoaded', loadBookmarks);

form.addEventListener('submit', (e) => {
  e.preventDefault();

  var siteName = siteNameInput.value.trim();
   var siteUrl = siteUrlInput.value.trim();

  if (!siteName || !siteUrl) {
    alert('Please fill out both fields.');
    return;
  }

  if (!isValidUrl(siteUrl)) {
    alert('Please enter a valid URL (must start with http or https).');
    return;
  }

  var bookmark = { name: siteName, url: siteUrl };

  var bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  bookmarks.push(bookmark);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  form.reset();
  displayBookmarks();
});


function isValidUrl(url) {
  var pattern = /^(https?:\/\/)/i;
  return pattern.test(url);
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
      <td><button class="delete-btn" onclick="deleteBookmark(${index})">Delete</button></td>
    `;

    tableBody.appendChild(row);
  });
}


function loadBookmarks() {
  displayBookmarks();
}


function deleteBookmark(index) {
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  bookmarks.splice(index, 1);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  displayBookmarks();
}
