const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, IntentsBitField, REST, Intents, ClientEvents } = require('discord.js');
//importation des autre fichier js
const { config, aff,afficherPlusieursPartie , afficherPerso, valeurAttribut, affAttribut, affSocial, afficherPersoNom, ajouterPv, ajouterPs, affPv, restaurerPv, restaurerPs, modifierPv, modifierPs, tableauChannel,getIdChannel,chercheChanel, cherchePerso, chercheMusiqueVocal, modifierXP, ajouterXP, getxp,  modifierverse, ajouterverse, getverse, valeurBonus } = require('./manipulerjson');
//initialisation du bot discord
const { SlashCommandIntegerOption } = require('@discordjs/builders');

const { token, adminId} = require('./config.json');


const idAdmin = adminId

let pageperso = false
let estEnVoc = false;
require("./registeryCommand");

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        IntentsBitField.Flags.GuildPresences] });

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}



client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
});



client.once('ready', (client) => {

    //connecterBotChannelVocal()
    usernameAdmin = client.users.cache.get(idAdmin);
    console.log(`${client.user.tag} connecter`);
    console.log('Je suis prêt pour détruire ton scénario '+usernameAdmin.username+' °( ^-^)°');

});


// Log in to Discord with your client's token
client.login(token);


