# Étape 1 : Image Node.js
FROM node:18

# Étape 2 : Définir le répertoire de travail
WORKDIR /usr/src/app

# Étape 3 : Copier les fichiers package.json
COPY package*.json ./

# Étape 4 : Installer les dépendances
RUN npm install

# Étape 5 : Copier le code source
COPY . .

# Étape 6 : Construire le projet TypeScript
RUN npm run build

# Étape 7 : Exposer le port
EXPOSE 3000

# Étape 8 : Commande par défaut
CMD ["npm", "start"]
