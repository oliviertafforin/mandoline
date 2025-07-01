# Étape 1: Build de l'application
FROM node:18-alpine AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le code source
COPY . .

# Builder l'application pour la production
RUN npm run build

# Exposer le port 3000
EXPOSE 3000

# Define the command to run your app
# CMD ["npm", "start"]
CMD npm start --host 0.0.0.0 --port 3000 --disableHostCheck true