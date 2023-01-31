const form = document.querySelector('#contasForm');

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(form);
    const conta = {};
    for (let [key, value] of formData) {
        conta[key] = value;
    }
});