import http from './http-requests-area';

export async function activateCard(props) {
    return await http.get(`/actions/activate`, {
        params: {
            action: props.actionValue,
            reaction: props.reactionValue,
            botToken: props.botTokenValue,
            message: props.messageValue,
            channel: props.channelValue
        }
    });
}

export async function deactivateCard() {
    return await http.get('/actions/deactivate');
}

export async function fetchDiscordStatus() {
    return await http.get('/discord');
}