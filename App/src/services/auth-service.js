import http from "../http-requests-area";

export async function login(email, password) {
    return await http.get('/logs/login', {
        params: {
            email: email,
            password: password
        }
    });
}

export async function loginGoogle(email) {
    return await http.get('/logs/logingoogle', {
        params: {
            email: email
        }
    });
}

export async function logout() {
    return await http.get('/logs/logout');
}

export async function register(name, surname, email, password) {
    return await http.get('/logs/register', {
        params: {
            name: name,
            surname: surname,
            email: email,
            password: password
        }
    });
}
