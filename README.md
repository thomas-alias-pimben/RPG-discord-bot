# Avant de démarrer le bot

## ajouter le fichier de config

créez un fichier config.json :
mettez le token de votre bot, l'id de votre bot, l'id du serveur et l'id de votre propre compte discord avec ce style :

```json
{
  "token": "your Token",
  "clientId": "your ClientId",
  "guildId": "your GuildId",
  "adminId": "your AdminId"
}
```

### les attributs obligatoires 

- **token** : la clé privé de votre bot
- **clientId** : l'identifiant utilisateur du bot <br/> _(accéssible en faisant un clic-droit et appuyer sur "copier l'idendifiant utilisateur" sur la page de profil du bot)_
- **guildId** : l'identifiant de votre salon <br/>_(accéssible en faisant un clic-droit puis et appuyer "copier l'idendifiant du salon" sur la page du salon)_
- **adminId** : l'identifiant de votre salon <br/>_(accéssible en faisant un clic-droit puis et appuyer "copier l'idendifiant utilisateur" sur votre page de profil)_

### les attributs non obligatoires

- **portServer** : le port de votre serveur <br/> _si cet attribut est absent, le port sera à 8000_
- **isVocal** : pour savoir si le bot se connecte au vocal automatiquement<br/>_(si il existe et est à true, le bot se connectera au vocal dès qu'il s'allume )_

le fichier avec tout les attributs :

```json
{
  "token": "your Token",
  "clientId": "your ClientId",
  "guildId": "your GuildId",
  "adminId": "your AdminId",
  "portServer": 8000,
  "isVocal": true
}
```

## ajouter le fichier pour les gifs

créer un dossier appellé "source" et ajouter le fichier "gif.json" avec :

```json
{}
```

## installer les pakage

faites ensuite un `npm install` pour installer les paquets nécéssaires



# pour lancer le bot

faites un `npm start`
