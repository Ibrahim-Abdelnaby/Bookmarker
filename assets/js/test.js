var siteName = document.getElementById('siteName');
var siteUrl = document.getElementById('siteUrl');
var popup = document.getElementById('cardWrapper');
var tbody = document.getElementById('tableBody');
var search = document.getElementById('search');
var cardTitle = document.getElementById('cardTitle');
var addBtn = document.getElementById('addBtn');
var saveBtn = document.getElementById('saveBtn');
// Main Array for Saving all of my Objects
var bookmarkList = [];
// Check if the User already have Data to Display or not
if(localStorage.getItem('bookmarks') !== null) {
    bookmarkList = JSON.parse(localStorage.getItem('bookmarks'));
    displayBookmark();
}
// Add Bookmark
function addBookmark() {
    var bookmarks = {
        websiteName: siteName.value,
        websiteUrl: siteUrl.value
    }
    bookmarkList.push(bookmarks);
    setLocalStorage();
    clearForm();
    hidePopup();
    displayBookmark();
}
// Set Local Storage
function setLocalStorage() {
    localStorage.setItem('bookmarks',JSON.stringify(bookmarkList));
}
// Clear Function
function clearForm() {
    siteName.value = null;
    siteUrl.value = null;
}
// Hide Popup
function hidePopup() {
    popup.classList.add('d-none');
    defaultCard();
}
// Display Product
function displayBookmark() {
    var tableRow = ``;
    for (var i = 0; i < bookmarkList.length; i++) {
        tableRow += `
        <tr>
            <th scope="row">${i + 1}</th>
            <td>${bookmarkList[i].websiteName}</td>
            <td class="text-secondary">${bookmarkList[i].websiteUrl}</td>
            <td class="text-center"><a href="https://${bookmarkList[i].websiteUrl}" target="_blank" aria-label="link icon for viewing website"><i class="fa-solid fa-eye text-primary fa-lg"></i></a></td>
            <td class="text-center" onclick="deleteBookmark(${i})"><i class="fa-solid fa-trash-alt text-danger fa-lg"></i></td>
            <td class="text-center" onclick="editIcon(${i})"><i class="fa-solid fa-pen-to-square text-success fa-lg"></i></td>
        </tr>
        `
    }
    tbody.innerHTML = tableRow;
}
// Delete Bookmark
function deleteBookmark(index) {
    bookmarkList.splice(index, 1);
    displayBookmark();
    setLocalStorage();
}
// Update
var globalIndex;
function editIcon(index) {
    globalIndex = index;
    showPopup();
    updatedCard();
    siteName.value = bookmarkList[index].websiteName;
    siteUrl.value = bookmarkList[index].websiteUrl;
}
// Show Popup
function showPopup() {
    popup.classList.remove('d-none');
}
// Updated Card
function updatedCard() {
    cardTitle.innerHTML = 'Edit Bookmark';
    addBtn.classList.add('d-none');
    saveBtn.classList.remove('d-none');
}
// SaveChanges Btn
function saveChanges() {
    bookmarkList[globalIndex].websiteName = siteName.value;
    bookmarkList[globalIndex].websiteUrl = siteUrl.value;
    displayBookmark();
    setLocalStorage();
    hidePopup();
    defaultCard();
}
// Default Card Content
function defaultCard() {
    cardTitle.innerHTML = 'Add Bookmark';
    addBtn.classList.remove('d-none');
    saveBtn.classList.add('d-none');
}
// Search
function searchBookmark() {
    var term = search.value;
    var tableRow = ``

    for(var i = 0; i < bookmarkList.length; i++) {
        if(bookmarkList[i].websiteName.toLowerCase().includes(term.toLowerCase())) {
            tableRow += `
            <tr>
                <th scope="row">${i + 1}</th>
                <td>${bookmarkList[i].websiteName}</td>
                <td class="text-secondary">${bookmarkList[i].websiteUrl}</td>
                <td class="text-center"><a href="https://${bookmarkList[i].websiteUrl}" target="_blank" aria-label="link icon for viewing website"><i class="fa-solid fa-eye text-primary fa-lg"></i></a></td>
                <td class="text-center" onclick="deleteBookmark(${i})"><i class="fa-solid fa-trash-alt text-danger fa-lg"></i></td>
                <td class="text-center" onclick="editIcon(${i})"><i class="fa-solid fa-pen-to-square text-success fa-lg"></i></td>
            </tr>
            `
        }
        tbody.innerHTML = tableRow;
    }
}