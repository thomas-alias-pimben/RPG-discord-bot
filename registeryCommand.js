const { REST } = require("@discordjs/rest");
const { Routes } = require("discord.js");
const { clientId, guildId, token } = require("./config.json");

const fs = require("node:fs");
const path = require("node:path");

const commands = [];

// Récupère tous les dossiers de commandes
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  // Récupère tous les fichiers de commandes dans chaque dossier
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    // Vérification pour éviter les erreurs
    if (!command.data || !command.data.toJSON) {
      console.error(` Commande invalide : ${filePath}`);
      continue;
    }

    // Ajoute la commande au tableau
    commands.push(command.data.toJSON());
  }
}

// Crée une instance REST avec le token du bot
const rest = new REST().setToken(token);

// Déploie les commandes slash
(async () => {
  try {
    console.log(
      `Mise à jour de ${commands.length} commandes slash en cours...`,
    );

    // Met à jour toutes les commandes du serveur (guild)
    const data = await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands },
    );

    console.log(`${data.length} commandes slash mises à jour avec succès.`);
  } catch (error) {
    console.error("Erreur lors du déploiement des commandes :", error);
  }
})();
