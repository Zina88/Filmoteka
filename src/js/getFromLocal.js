export default function getFromLocal(key) {
  return JSON.parse(localStorage.getItem(key));
}
