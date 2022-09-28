"use strict"

let ul;
let newToDoForm;
let toDoList = [];

document.addEventListener('DOMContentLoaded', () => {
     ul = document.getElementById('toDoList');
     newToDoForm = document.getElementById('toDoForm');
     let toDoNameError = document.getElementById('toDoNameError');
     let toDoDescError = document.getElementById('toDoDescError');
     getToDoList();

     if (toDoName.value.length > 2) {
        toDoName.classList.remove('input-danger');
        toDoNameError.innerText = "";
    }

    if (toDoDesc.value.length > 10) {//poprosić o pomoc warunek nie działa tak jak powinien!
        toDoDesc.classList.remove('input-danger');
        toDoDescError.innerText = "";
    }

    newToDoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let toDoName = event.target.elements[0];
        let toDoDesc = event.target.elements[1];
        
        if (toDoName.value.length > 2 && toDoDesc.value.length > 10) {
            let newToDo = {
                name: toDoName.value,
                desc: toDoDesc.value,
                done: false
            }

            for (let toDo of toDoList) {
                if (toDo.name === toDoName.value && toDo.desc === toDoDesc.value) {
                    return;
                }
            }

            toDoList.push(newToDo);
            localStorage.setItem('toDoList', JSON.stringify(toDoList));
           
            toDoName.value = "";
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

const renderList = () => { 
    let liList = Array.from(ul.getElementsByTagName('li'))

    liList.forEach((li) => {
        let button = li.getElementsByTagName('button')[0];
        button.removeEventListener("click", changeTaskStatus);
    })
    console.log(liList);
    ul.innerHTML = "";

    toDoList.forEach((toDo, index) => {
        let li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

        let main = document.createElement('main');
        let heading = document.createElement('h5');
        let paragraph = document.createElement('p');
        let button = document.createElement('button');

        button.addEventListener("click", changeTaskStatus);
        button.dataset.taskId = index;

        if (!toDo.done) {
            button.innerText = "finish";
            button.classList.add('btn', 'btn-primary', 'btn-sm');
        } else {
            button.innerText = "revert";
            button.classList.add('btn', 'btn-danger', 'btn-sm');
            main.style.textDecoration = "line-through";
        }

        heading.innerText = toDo.name;
        paragraph.innerText = toDo.desc;

        main.appendChild(heading);
        main.appendChild(paragraph);

        li.appendChild(main);
        li.appendChild(button);

        ul.appendChild(li);
    })
}

const changeTaskStatus = (event) => {
    let toDo = toDoList[Math.round(event.target.dataset.taskId)];

    if (toDo.done === true) {
        toDo.done = false;
    } else { toDo.done = true }

    renderList();
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
}

const getToDoList = () => {
    if (localStorage.getItem('toDoList')) {
        toDoList = JSON.parse(localStorage.getItem('toDoList'))
        renderList()
    } else {
        toDoList = []
    }
}