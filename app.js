// app.js

// Função para aguardar o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function () {
    // Obtenha referências aos elementos depois que o DOM estiver totalmente carregado
    var promiseForm = document.getElementById('promiseForm');
    var promiseNameInput = document.getElementById('promiseName');
    var promiseList = document.getElementById('promiseList');

    // Função para adicionar uma promessa
    function addPromise() {
        // Verifique se os elementos do DOM foram encontrados corretamente
        if (!promiseForm || !promiseNameInput || !promiseList) {
            console.error('Elementos do DOM não encontrados.');
            return;
        }

        if (typeof db !== 'undefined') {
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
        } else {
            console.error('Firebase não inicializado corretamente.');
        }
    }

    // Função para exibir as promessas
    function displayPromises() {
        // Verifique se os elementos do DOM foram encontrados corretamente
        if (!promiseList) {
            console.error('Elementos do DOM não encontrados.');
            return;
        }

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

    // Função para alternar o status de conclusão de uma promessa
    function togglePromiseCompletion(id, completed) {
        if (typeof db !== 'undefined') {
            db.collection('promessas').doc(id).update({ completed: completed });
        } else {
            console.error('Firebase não inicializado corretamente.');
        }
    }

    // Verifica se o Firebase foi inicializado corretamente antes de chamar displayPromises
    if (typeof db !== 'undefined') {
        displayPromises();
    } else {
        console.error('Firebase não inicializado corretamente.');
    }

    // Adiciona o evento de clique para o botão
    if (promiseForm) {
        promiseForm.addEventListener('submit', function (event) {
            event.preventDefault();  // Evita o envio do formulário padrão
            addPromise();
        });
    }
});
