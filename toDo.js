"use strict"

let ul;
let newToDoForm;
let toDoList = [];

//załaduj cały dokument
document.addEventListener('DOMContentLoaded', () => {
     ul = document.getElementById('toDoList');
     newToDoForm = document.getElementById('toDoForm');
     let toDoNameError = document.getElementById('toDoNameError');
     let toDoDescError = document.getElementById('toDoDescError');
     const toDoName = document.getElementById('toDoName');
     const toDoDesc = document.getElementById('toDoDesc');
     getToDoList();
    toDoName.addEventListener('keyup', (event) => {
        //jeśli nazwa zadania ma więcej niż 3 znaki to
        if (event.target.value.length > 2) {
            //usuń z nazwy zadania 'input danger'
            event.target.classList.remove('input-danger');
            //zmień zawartość zmiennej nazwa zadania bład na pusty string
            toDoNameError.innerText = "";
        }
    })
    toDoDesc.addEventListener('keyup', (event) => {
        //jeśli nazwa zadania ma więcej niż 3 znaki to
        if (event.target.value.length > 10) {
            //usuń z nazwy zadania 'input danger'
            event.target.classList.remove('input-danger');
            //zmień zawartość zmiennej nazwa zadania bład na pusty string
            toDoDescError.innerText = "";
        }
    })
    //nowy formularzu nasłuchuj na kliknięcie w przycisk submit i wykonaj zdarzenie
    newToDoForm.addEventListener('submit', (event) => {
        //zapobiegnij wydarzeniu
        event.preventDefault();
        //stwórz zmienną nazwa zadania i przypisz do niej wpisaną treść
        const toDoName = event.target.elements[0];
        //stwórz zmienną opis zadania i przypisz do niego wpisaną treść 
        const toDoDesc = event.target.elements[1];
        // jeśli nazwa zadania ma conajmniej 3 znaki i opis ma conajmniej 10 znaków to
        if (toDoName.value.length > 2 && toDoDesc.value.length > 10) {
            //to powstaje zmienna newToDo która zawiera treść w nazwie zadania i opisie zadania
            const newToDo = {
                name: toDoName.value,
                desc: toDoDesc.value,
                done: false
            }
            // wykonaj pętle po zadaniach w liście zadań
            for (let toDo of toDoList) {
                //
                if (toDo.name === toDoName.value && toDo.desc === toDoDesc.value) {
                    toDoName.classList.add('input-danger');
                    toDoNameError.innerText = "Nazwa już istnieje";
                    toDoDesc.classList.add('input-danger');
                    toDoDescError.innerText = "Opis już istnieje";
                    return;
                }
            }
            //dodaj nowe zadanie do listy zadań
            toDoList.push(newToDo);
            //zapisz dane do odczytu ustaw pozycję na liście zadań , przekonwertuj wartość na ciąg znaków
            localStorage.setItem('toDoList', JSON.stringify(toDoList));
           //wyczyść pole nazwa zadania
            toDoName.value = "";
            //wyczyść pole opis zadania
            toDoDesc.value = "";

            renderList();
        } else {
            if (toDoName.value.length < 3){
                toDoName.classList.add('input-danger');
                toDoNameError.innerText = "Nazwa musi zawierać min 3 znaki";
            }
            if (toDoName.value.length < 10){
                toDoDesc.classList.add('input-danger');
                toDoDescError.innerText = "Opis musi zawierać min 10 znaków";
            }
        }
    })
})
//zmienna renderuj listę, funkcja strzałkowa
const renderList = () => { 
    //zmienna lilist zawiera tablicę z listą dodanego zadania
    let liList = Array.from(ul.getElementsByTagName('li'))
    //liList wykonaj pętle na swoich pozycjach listy i 
    liList.forEach((li) => {
        //zmienna zawierajaąca pozycję na liście z przyciskiem
        let button = li.getElementsByTagName('button')[0];
        // zmienna przycisk nasłuchuje na kliknięcie i wykonuje funkcję dodania zadania
        button.removeEventListener("click", changeTaskStatus);
    })
    //wyświetl zawartość pozycji na liście
    console.log(liList);
    //wyczyść zawartość listy
    ul.innerHTML = "";
    //listo zadań  wykonaj pętlę  na zadaniu i ilości indeksów i 
    toDoList.forEach((toDo, index) => {
        //weź zmienną li zawierającą element z html
        let li = document.createElement('li');
        //do zmiennej li przypisz klasę i nadaj jej style
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        //stwórz uchwyty do elementów html
        let div = document.createElement('div');
        let main = document.createElement('main');
        let heading = document.createElement('h5');
        let paragraph = document.createElement('p');
        let button = document.createElement('button');
        let buttonDelete = document.createElement('delete');
        //nasłuchiwanie na kliknięcie przycisku i wykonanie funkcji zmiany statusu zadania
        button.addEventListener("click", changeTaskStatus);
        button.dataset.taskId = index;
        //jeśli zadanie nie jest skończone
        if (!toDo.done) {
            //ma być dostępny przycisk z tekstem check
            button.innerText = "Check";
            //dodanie css do przycisku
            button.classList.add('btn', 'btn-success', 'btn-sm');
        } else { //w przeciwnym razie 
            //ma być dostępny przycisk z tekstem uncheck
            button.innerText = "Uncheck";
            //dodanie css do przycisku
            button.classList.add('btn', 'btn-danger', 'btn-sm');
            //dodanie przekreślenia całego wykonanego zadania
            main.style.textDecoration = "line-through";
        }
        buttonDelete.addEventListener("click", deleteTasks);
        buttonDelete.dataset.taskId = index;
        if (toDo.done) {
            buttonDelete.innerText = "Delete";
            buttonDelete.classList.add('btn', 'btn-primary', 'btn-sm');
        }

        heading.innerText = toDo.name;
        paragraph.innerText = toDo.desc;

        div.appendChild(main);

        main.appendChild(heading);
        main.appendChild(paragraph);

        li.appendChild(main);
        li.appendChild(button);
        li.appendChild(buttonDelete);

        ul.appendChild(li);
    })
}

//stała changeTaskStatus zawiera funkcję strzałkową zdarzenie ma się wykonać 
const changeTaskStatus = (event) => {

    let toDo = toDoList[parseInt(event.target.dataset.taskId, 10)];
    //jeśli zadanie wykonane jest równe prawdzie to
    if (toDo.done === true) {
        //przypisz mu fałsz
        toDo.done = false;
    } else //w przeciwnym razie przypisz mu prawdę
     { toDo.done = true }
    //renderuj listę
    renderList();
    //zapisz dane do odczytu po odpaleniu nowej sesji i ustaw pocyzję na liście, przekonwertuj ją na ciąg znaków
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
}

function deleteTasks (event) {
    const index = parseInt(event.target.dataset.taskId, 10);
    toDoList.splice(index, 1);
    renderList();
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
}

const getToDoList = () => {
    if (localStorage.getItem('toDoList')) {
        toDoList = JSON.parse(localStorage.getItem('toDoList'))
        renderList();
    } else {
        toDoList = [];
    }
}