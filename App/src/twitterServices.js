import http from './http-requests-area';

export async function activateTwitter(messageValue, channelValue) {
    return await http.get(`/twitter/activate`, {
        params: {
            message: messageValue,
            channel: channelValue
        }
    });
}

export async function deactivateTwitter() {
    return await http.get('/twitter/deactivate');
}

export async function fetchTwitterStatus() {
    return await http.get('/twitter');
}