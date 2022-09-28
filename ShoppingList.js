//zmienna będąca listą zakupów
let ul;
//uchwyt do formularza-okna dodawania nowego produktu
let newItemForm;
//zmienna zawierająca listę produktów
let shoppingList = [
    "Mleko",
    "Masło",
    "Śmietana",
    "Twaróg",
    "Żółty ser",
    "Jajka",
    "Chleb",
    "Bułki",
    "Wędlina",
    "Kawa",
    "Herbata"
]
//zdarzenie nasłuchiwania na załadowany dokument
document.addEventListener('DOMContentLoaded',() => {
    // zmienna ul zawierająca elementy obiektu html (o podanym id)
     ul = document.getElementById('shoppingList');
     // zmienna zawierająca element obiektu html (o podanym id)
     inputError = document.getElementById('inputError');
     // formularz zawierający element obiektu html (o podanym id)
     newItemForm = document.getElementById('newItemForm');
    //w formularzu nasłuchuj na kliknięcie w przycisk typu submit, a wynik wrzuć do event
     newItemForm.addEventListener('submit', (event) => {
        // nie wiem ?
        event.preventDefault();
        //zmienna input zawierający wpisany tekst
        let input = event.target.elements[0];
        //jeśli długość wpisanego tekstu przekracza dwa znaki i nie ma na początku spacji to
        if (input.value.length > 2 && !input.value.startsWith(' ')){
             //wykonaj funkcję dodania nowego produktu do listy
            addListItem(event.target.elements[0].value);
            // wyczyść wpisaną w input wartość
            input.value = "";
            //
            input.classList.remove('input-danger');
            //jeśli długość wpisanego tekstu jest mniejsza niż dwa znaki to
            inputError.innerText = "";
        } else {
            inputError.innerText = "Tekst nie spełnia kryteriów"
            //dodaj czerwoną ramkę w polu wpisywania produktu
            input.classList.add('input-danger');
        }
    })

    
    //wyświetl kolejno wszystkie elementy"shoppingItem" z tablicy"shoppingList"
     for (let shoppingItem of shoppingList) {
        //wykonaj funkcję"addListItem dodania nowego elementu 
        addListItem(shoppingItem);
     }
})

//funkcja dodawania obiektu dla zmiennej (shoppingItem)
function addListItem(shoppingItem) {
    //zmienna li zawiera stworzony tag (li) w dokumencie html
    let li = document.createElement('li');
    // zmiennej li przypisuje tekst
    li.innerText = shoppingItem;
    //zmiennej ul dodaje na końcu listy produktów"appendChild" kolejny element "li"
    ul.appendChild(li);
} 