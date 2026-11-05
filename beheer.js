// beheer.js - Beheer van de game en spelers

// 1. Algemene spelstatus en instellingen
const gameInstellingen = {
    status: 'START', // Mogelijke statussen: 'START', 'BEZIG', 'PAUZE', 'GAMEOVER'
    moeilijkheidsgraad: 'normaal',
    geluidAan: true
};

// 2. Lijst om spelers en hun scores in op te slaan
const spelers = [];

/**
 * Voegt een nieuwe speler toe aan de game
 * @param {string} naam - De naam van de speler
 */
function voegSpelerToe(naam) {
    const nieuweSpeler = {
        id: spelers.length + 1,
        naam: naam,
        score: 0,
        levens: 3
    };
    spelers.push(nieuweSpeler);
    console.log(`[Beheer] Speler toegevoegd: ${naam}`);
}

/**
 * Past de score van een speler aan
 * @param {number} spelerId 
 * @param {number} punten 
 */
function voegPuntenToe(spelerId, punten) {
    const speler = spelers.find(s => s.id === spelerId);
    if (speler) {
        speler.score += punten;
        console.log(`[Beheer] ${speler.naam} heeft nu ${speler.score} punten.`);
    }
}

/**
 * Wijzigt de status van het spel (bijv. starten of stoppen)
 * @param {string} nieuweStatus 
 */
function veranderStatus(nieuweStatus) {
    gameInstellingen.status = nieuweStatus;
    console.log(`[Beheer] Game status gewijzigd naar: ${nieuweStatus}`);
}

// --- TEST CODE (om te controleren of het werkt in je terminal/console) ---
voegSpelerToe("Speler 1");
voegPuntenToe(1, 50);
veranderStatus("BEZIG");
