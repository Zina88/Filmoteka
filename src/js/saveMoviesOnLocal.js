export default function saveOnLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
