export default class MailApi {
    static async login(username, password){
        const response = await fetch('https://api.mail.tm/token', {
            method: 'POST',
            headers: { 
                'accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                address: username,
                password: password
            })
        });

        return response;
    }

    static async getMessages(token){
        const response = await fetch('https://api.mail.tm/messages?page=1', {
            method: 'GET',
            headers: {
                'accept': 'application/ld+json',
                'Authorization': 'Bearer '+ token.token 
            }
        });

        return response;
    }

    static async getMessageBody(messageid, token){
        const response = await fetch('https://api.mail.tm/messages/' + messageid, {
            method: 'GET',
            headers: {
                'accept': 'application/ld+json',
                'Authorization': 'Bearer '+ token.token 
            }
        });

        return response;
    }

    static async messageSeen(messageid, token)
    {
        const response = await fetch('https://api.mail.tm/messages/' + messageid, {
            method: 'PATCH',
            headers: {
                'accept': 'application/ld+json',
                'Authorization': 'Bearer '+ token.token,
                'Content-Type': 'application/merge-patch+json'
            },
            body: JSON.stringify({
                seen: true
            })
        });
    }
}