const { Bot } = require('../../structures/client')

module.exports = {
    name: 'ready',

    /**
     * 
     * @param {Bot} client 
     */
    run: async (client) => {
       

        if (client.db.get(`isActivityOn`) === "remove") {
            
        }
        
        if (client.db.get(`isActivityOn`) === "invisible") {
            client.user.setPresence({ status: 'invisible' })
        }

        if (client.db.get(`isActivityOn`) === "dnd") {
            client.user.setPresence({ status: 'dnd' })
        }

        if (client.db.get(`isActivityOn`) === "idle") {
            client.user.setPresence({ status: 'idle' })
        }

        if (client.db.get(`isActivityOn`) === true) {
        client.user.setActivity(client.db.get(`texte.activity`), { type: client.db.get(`type.activity`), url: "https://www.twitch.tv/nekros_dsc" })
        }

        if (!client.db.get(`isActivityOn`) || client.db.get(`isActivityOn`) === null || client.db.get(`isActivityOn`) === undefined) {
            client.user.setActivity(`${client.version}`, { type: "STREAMING", url: "https://www.twitch.tv/nekros_dsc" })
        }

    }
}