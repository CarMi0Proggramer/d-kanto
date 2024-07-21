export async function isSignedIn() {
    if (!("session-data" in localStorage)) {
        return false;
    }

    const res = await fetch("https://d-kanto-backend.onrender.com/users/isSignedIn",{
        credentials: "include"
    });

    if (res.ok) {
        return true;
    }

    return false;
}