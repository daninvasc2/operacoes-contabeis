function saveToLocalStorage(key, object) {
    localStorage.setItem(key, JSON.stringify(object));
}

function getFromLocalStorage(key) {
    const item = localStorage.getItem(key);
    if (item == null || item == '') {
        return [];
    }

    return JSON.parse(item);
}

function clearLocalStorage() {
    localStorage.clear();
}