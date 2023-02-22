import http from './http-requests-area';

export async function fetchLogs(userIdValue) {
    console.log(userIdValue);
    return await http.get(`/logs/`, {
        params: {
            userId: userIdValue
        }
    });
}

export async function sendLog(userIdValue, messageValue, formValue) {
    return await http.get(`/logs/log`, {
        params: {
            userId: userIdValue,
            message: messageValue,
            from: formValue
        }
    });
}

export async function clearLogs(userIdValue) {
    console.log(userIdValue);
    return await http.get(`/logs/clear`, {
        params: {
            userId: userIdValue
        }
    });
}

export async function redditAuth(codeValue, id, rcli, rsec) {
    return await http.get(`/logs/reddit`, {
        params: {
            code: codeValue,
            userId: id,
            client: rcli,
            secret: rsec,
        }
    });
}