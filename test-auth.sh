#!/bin/bash

# 1. Test d'inscription
echo "\nTest d'inscription..."
curl -X POST http://localhost:3000/api/auth/local/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123", "name": "Test User"}'

echo "\nTest d'inscription avec email existant..."
curl -X POST http://localhost:3000/api/auth/local/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "anotherpassword", "name": "Another User"}'

# 2. Test de connexion
echo "\nTest de connexion..."
curl -X POST http://localhost:3000/api/auth/local/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'

echo "\nTest de connexion avec mauvais mot de passe..."
curl -X POST http://localhost:3000/api/auth/local/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "wrongpassword"}'

# 3. Test de l'endpoint /api/user/me
echo "\nTest de /api/user/me..."
# Note: Pour ce test, vous devrez d'abord vous connecter via le navigateur pour obtenir le cookie de session
# Puis exécuter cette commande avec le cookie approprié
curl -X GET http://localhost:3000/api/user/me \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN_HERE"
