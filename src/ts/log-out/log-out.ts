export function logOut() {
    fetch("https://d-kanto-backend.onrender.com/users/logOut", {
        method: "POST",
        credentials: "include"
    }).then(res => {
        if (res.ok) {
            localStorage.removeItem("session-data");
            location.href = window.origin + "/";
        }
    }).catch(err => {
        if (err) {
            location.href = window.origin + "/src/pages/500.html";
        }
    })
}