var siteName = document.getElementById('siteName');
var siteUrl = document.getElementById('siteUrl');
var cardWrapper = document.getElementById('cardWrapper');
var tableWrapper = document.getElementById('tableWrapper');
var closeIcon = document.getElementById('closeIcon');

var bookmarkList = [];

// if(localStorage.getItem('products') !== null) {
//     bookmarkList = JSON.parse(localStorage.getItem('products'));
//     displayTableRow();
// }

function addBookmark() {
    var bookmark = {
        websiteName: siteName.value,
        websiteUrl: siteUrl.value,
    }
    bookmarkList.push(bookmark)
    clearForm();
    hideAndShow();
    displayTableRow();
    localStorage.setItem('products', JSON.stringify(bookmarkList));
}

function clearForm() {
    siteName.value = null;
    siteUrl.value = null;
}

function hideAndShow() {
    cardWrapper.classList.add('d-none');
}

function displayTableRow() {
    var tableRow = ``;

    for(var i = 0; i < bookmarkList.length; i++) {

        tableRow+= `
        <tr class="no-border">
            <th scope="row">${i}</th>
            <td>${bookmarkList[i].websiteName}</td>
            <td class="text-secondary">${bookmarkList[i].websiteUrl}</td>
            <td class="text-center"><a href="https://${bookmarkList[i].websiteUrl}" target="_blank" aria-label="link icon for viewing website"><i class="fa-solid fa-eye text-primary"></i></a></td>
            <td class="text-center"><i class="fa-solid fa-trash text-danger"></i></td>
            <td class="text-center"><i class="fa-solid fa-pen-to-square text-success"></i></td>
        </tr>
        `

    };

    document.getElementById('tableBody').innerHTML = tableRow;
}



function showModal() {
    cardWrapper.classList.remove('d-none');
}

function closeModal() {
    cardWrapper.classList.add('d-none');
}