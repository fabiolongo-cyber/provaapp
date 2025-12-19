# AggregatorLite - demo Expo

Questo repo è un progetto Expo minimale per generare un APK via EAS Build in GitHub Actions.
Aggiorna `app.json` con il tuo package id e sostituisci `SERVER` in `App.js` se hai un server pubblico per estrazione.

Per fare la build via GitHub Actions:
1. Crea secret `EXPO_TOKEN` (vedi istruzioni nel messaggio di supporto).
2. Avvia la workflow "EAS Build APK" da Actions → Workflows → Run workflow.
