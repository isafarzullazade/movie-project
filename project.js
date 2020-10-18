const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardbody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");


// Upload All Events

eventListener();

function eventListener() {
    form.addEventListener("submit", addFilm);
    document.addEventListener("DOMContentLoaded", function () {
        let films = Storage.getFilmsFromStorage();
        UI.loadAllFilms(films);
    });

    cardbody.addEventListener("click", deleteFilm);
    clear.addEventListener("click", clearAllFilms);
}


function addFilm(e) {
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if (title === "" || director === "" || url === "") {
        // Error Message
        UI.displayMessages("Please fill in all fields...", "danger")
    } else {
        // New Film

        const newFilm = new Film(title, director, url);

        UI.addFilmToUI(newFilm); // Adding Film to UI
        Storage.addFilmToStorage(newFilm); // Adding Film to storage
        UI.displayMessages("Movie Successfully Added...", "success"); // Success Message
    }

    UI.clearInputs(titleElement, urlElement, directorElement);


    e.preventDefault();
}

function deleteFilm(e){
if(e.target.id === "delete-film"){
    UI.deleteFilmFromUI(e.target);
    Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);

    UI.displayMessages("Movie Successfully Deleted...", "success");
}

}

function clearAllFilms(){
    if (confirm("Are you sure?"))
    UI.clearAllFilmsFromUI();
    Storage.clearAllFilmsFromStorage();
}