import http from './http-requests-area';

export async function fetchCards(userIdValue) {
    console.log(userIdValue);
    return await http.get(`/cards/`, {
        params: {
            userId: userIdValue
        }
    });
}

export async function fetchId(userIdValue) {
    console.log(userIdValue);
    return await http.get(`/cards/id`, {
        params: {
            userId: userIdValue
        }
    });
}

export async function addCard(userIdValue) {
    return await http.get(`/cards/add`, {
        params: {
            userId: userIdValue,
        }
    });
}

export async function removeCard(cardIdValue) {
    return await http.get(`/cards/delete`, {
        params: {
            cardId: cardIdValue
        }
    });
}

export async function activateCard(actionValue, reactionValue, botTokenValue, messageValue, channelValue, serviceActionValue, serviceReactionValue, specificMessageValue, frequencyValue, idValue, tokenCheckMessageValue, jokeChannelValue, subredditValue, rTit, rDesc, weatherChannelValue, cityValue, cityActionValue, redditWebhookValue, playerValue, riotKeyValue, userIdValue) {
    console.log(serviceActionValue);
    console.log(serviceReactionValue);
    return await http.get(`/actions/activate`, {
        params: {
            action: actionValue,
            reaction: reactionValue,
            serviceAction: serviceActionValue,
            serviceReaction: serviceReactionValue,
            botToken: botTokenValue,
            message: messageValue,
            channel: channelValue,
            id: idValue,
            frequency: frequencyValue,
            specificMessage: specificMessageValue,
            tokenCheckMessage: tokenCheckMessageValue,
            jokeChannel: jokeChannelValue,
            weatherChannel: weatherChannelValue,
            city: cityValue,
            cityAction: cityActionValue,
            subreddit: subredditValue,
            redditDescription: rDesc,
            redditTitle: rTit,
            redditWebhook: redditWebhookValue,
            player: playerValue,
            riotKey: riotKeyValue,
            userId: userIdValue
        }
    });
}

export async function deactivateCard(idValue) {
    return await http.get(`/actions/deactivate`, {
        params: {
            id: idValue,
        }
    });
}

export async function updateCardsAction(serviceActionValue, actionValue, fieldValue, valueValue, idValue, userIdValue) {
    return await http.get(`/cards/updateAction`, {
        params: {
            serviceAction: serviceActionValue,
            action: actionValue,
            field: fieldValue,
            value: valueValue,
            id: idValue,
            userId: userIdValue
        }
    });
}

export async function updateCardsReaction(serviceReactionValue, reactionValue, fieldValue, valueValue, idValue, userIdValue) {
    return await http.get(`/cards/updateReaction`, {
        params: {
            serviceReaction: serviceReactionValue,
            reaction: reactionValue,
            field: fieldValue,
            value: valueValue,
            id: idValue,
            userId: userIdValue
        }
    });
}

export async function fetchUserRedditOAuth(id) {
    return await http.get(`/cards/redditAuth`, {
        params: {
            userId: id
        }
    });
}