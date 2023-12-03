const { Client, Collection, Intents } = require('discord.js')
const db = require('quick.db')
const fs = require('fs')
global.print = console.log

class bot extends Client {
    constructor(options = {
        intents: [Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING]
    }) {
        super(options);
        this.setMaxListeners(15)
        this.db = db
        this.color = "#1519f0"
        this.footer = "© SupremeBots 2023 by nekrxs. & uhql"
        this.link = "https://discord.gg/nekobots"
        this.prefix = db.get(`mainprefix`) || "&"
        this.dev = "nekrxs. & uhql"
        this.staff = ["276705058370879489", "160766688529219584"]
        this.version = 'By nekrxs. & uhql',
        this.snipe = new Collection()
        this.config = require('../../config')
        this.commands = new Collection()
        this.aliases = new Collection()
        this.loadCommands()
        this.loadEvents()
        this.login(this.config.token)
    }

    loadCommands() {
        const subFolders = fs.readdirSync('./commands')
        for (const category of subFolders) {
            const commandsFiles = fs.readdirSync(`./commands/${category}`).filter(file => file.endsWith('.js'))
            for (const commandFile of commandsFiles) {
                const command = require(`../../commands/${category}/${commandFile}`)
                this.commands.set(command.name, command)
                if (command.aliases && command.aliases.length > 0) {
                    command.aliases.forEach(alias => this.aliases.set(alias, command))
                }
            }
        }
    }

    loadEvents() {
        const subFolders = fs.readdirSync(`./events`)
        for (const category of subFolders) {
            const eventsFiles = fs.readdirSync(`./events/${category}`).filter(file => file.endsWith(".js"))
            for (const eventFile of eventsFiles) {
                const event = require(`../../events/${category}/${eventFile}`)
                this.on(event.name, (...args) => event.run(this, ...args))
            }
        }
    }
}

exports.bot = bot