export async function isSignedIn() {
    if (!("session-data" in localStorage)) {
        return false;
    }

    const res = await fetch("http://localhost:3000/users/isSignedIn",{
        credentials: "include"
    });

    if (res.ok) {
        return true;
    }

    return false;
}