let myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];

// removeBooksDB() uncomment this whenever want to delete books database from localstorage
function removeBooksDB() {
    window.onbeforeunload = function () {
        localStorage.removeItem('myLibrary');
        return '';
    };
}

function addBookToLibrary(myLibrary) {
    $('.card-container').empty();
    var newbook = myLibrary.map((singleBook, i) => {
        return `<div class="row" data-index=${i} id="book${i}">
    <div class="column">
            
        <div class="card" >
            <h3>${singleBook.title}</h3>
            <p>${singleBook.author}</p>
            <p>${singleBook.number} </p>  
            <div class="btn-group">
            <button type="button" class="button" id="read-status">${singleBook.status}</button>
            <button type="button" class="button" id = "removeBook">Remove</button>
        </div>
        </div>
    </div>`;
    }).join('');

    $(".card-container").append(newbook);
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));

}
$(document).ready(function () {
    $("#book-list").on("click", function (e) {
console.log("delete function is working")

        if (e.target.id === "removeBook") {
console.log(e.target.parentNode.parentNode.parentNode)
            e.target.parentNode.parentNode.parentNode.remove();
        }
        if (e.target.id === "read-status") {

            if (e.target.innerHTML === "Read") {
                e.target.innerHTML = "Not Read"
            
            } else {
                e.target.innerHTML = "Read";
            }
        }
    })
})


$(document).ready(function () {

    console.log("Now Document is ready");

    $("#bookForm").on("submit", function (event) {
        // myLibrary = [];
        event.preventDefault();
        var author = $("#author").val();
        var title = $("#title").val();
        var number = $("#number").val();
        var status = $("#reading-status option:selected").text();

        console.log(status);
        var singleBook = {
            "author": author,
            "title": title,
            "number": number,
            "status": status
        }

        myLibrary.push(singleBook)
        addBookToLibrary(myLibrary)
        this.reset();
    })
    addBookToLibrary(myLibrary)

})

let modal = document.getElementById('myModal');
let btn = document.getElementById("btn");
let span = document.getElementsByClassName("close")[0];
btn.onclick = function () {
    modal.style.display = "block";
}
span.onclick = function () {
    modal.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}