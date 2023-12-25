// app.js
import { db } from './firebase';

const promiseForm = document.getElementById('promiseForm');
const promiseNameInput = document.getElementById('promiseName');
const promiseList = document.getElementById('promiseList');

function addPromise() {
    const promiseName = promiseNameInput.value;

    if (promiseName.trim() === '') {
        alert('Por favor, insira o nome da promessa.');
        return;
    }

    db.collection('promessas').add({
        name: promiseName,
        completed: false
    });

    promiseNameInput.value = '';
}

function displayPromises() {
    db.collection('promessas').onSnapshot(snapshot => {
        promiseList.innerHTML = '';
        snapshot.forEach(doc => {
            const promiseData = doc.data();
            const listItem = document.createElement('li');
            listItem.textContent = promiseData.name;

            if (promiseData.completed) {
                listItem.classList.add('completed');
            }

            listItem.addEventListener('click', () => togglePromiseCompletion(doc.id, !promiseData.completed));

            promiseList.appendChild(listItem);
        });
    });
}

function togglePromiseCompletion(id, completed) {
    db.collection('promessas').doc(id).update({ completed });
}

// Chama displayPromises diretamente, pois o Firebase já foi importado
displayPromises();
