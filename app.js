// app.js
var promiseForm = document.getElementById('promiseForm');
var promiseNameInput = document.getElementById('promiseName');
var promiseList = document.getElementById('promiseList');

function addPromise() {
    var promiseName = promiseNameInput.value;

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
    db.collection('promessas').onSnapshot(function (snapshot) {
        promiseList.innerHTML = '';
        snapshot.forEach(function (doc) {
            var promiseData = doc.data();
            var listItem = document.createElement('li');
            listItem.textContent = promiseData.name;

            if (promiseData.completed) {
                listItem.classList.add('completed');
            }

            listItem.addEventListener('click', function () {
                return togglePromiseCompletion(doc.id, !promiseData.completed);
            });

            promiseList.appendChild(listItem);
        });
    });
}

function togglePromiseCompletion(id, completed) {
    db.collection('promessas').doc(id).update({ completed: completed });
}

// Verifica se o Firebase foi inicializado corretamente antes de chamar displayPromises
if (typeof db !== 'undefined') {
    displayPromises();
} else {
    console.error('Firebase não inicializado corretamente.');
}
