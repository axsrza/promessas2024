// app.js

function addPromise() {
    if (typeof db !== 'undefined') {
        var promiseName = document.getElementById('promiseName').value;

        if (promiseName.trim() === '') {
            alert('Por favor, insira o nome da promessa.');
            return;
        }

        db.collection('promessas').add({
            name: promiseName,
            completed: false
        });

        document.getElementById('promiseName').value = '';
    } else {
        console.error('Firebase não inicializado corretamente.');
    }
}

function displayPromises() {
    var promiseList = document.getElementById('promiseList');

    console.log("promiseList:", promiseList);

    if (typeof db !== 'undefined') {
        db.collection('promessas').onSnapshot(function (snapshot) {
            if (promiseList === null) {
                console.error("promiseList é null.");
                return;
            }

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
    } else {
        console.error('Firebase não inicializado corretamente.');
    }
}

function togglePromiseCompletion(id, completed) {
    if (typeof db !== 'undefined') {
        db.collection('promessas').doc(id).update({ completed: completed });
    } else {
        console.error('Firebase não inicializado corretamente.');
    }
}

if (typeof db !== 'undefined') {
    displayPromises();
} else {
    console.error('Firebase não inicializado corretamente.');
}
