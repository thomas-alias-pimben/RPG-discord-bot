# Avant de démarrer le bot

## ajouter le fichier de config

créer un fichier config.json :
mettez le token de votre bot, l'id de votre bot, l'id du serveur et l'id de votre propre compte discord avec ce style :

```json
{
  "token": "",
  "clientId": "",
  "guildId": "",
  "adminId": "",
  "portServer": 8000
}
```

- **token** : la clé privé de votre bot
- **clientId** : l'identifiant utilisateur du bot <br/> _(accéssible en faisant un clic-droit et appuyer sur "copier l'idendifiant utilisateur sur sa page de profil")_
- **guildId** : l'identifiant de votre salon <br/>_(accéssible en faisant un clic-droit puis et appuyer "copier l'idendifiant du salon sur sa page de profil")_
- **adminId** : l'identifiant de votre salon <br/>_(accéssible en faisant un clic-droit puis et appuyer "copier l'idendifiant utilisateur sur votre page de profil")_
- **portServer** : le port de votre serveur <br/> _si non précisé, le port sera à 8000_

## installer les pakages

faite ensuite un `npm install` pour installer les paquets nécéssaires

# pour lancer le bot

faite un `npm start`
