function saveToLocalStorage(key, object) {
    localStorage.setItem(key, JSON.stringify(object));
}

function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

function clearLocalStorage() {
    localStorage.clear();
}