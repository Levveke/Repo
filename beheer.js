// beheer.js - Arena & Player Manager voor een .io game

const gameConfig = {
    maxSpelersPerRoom: 20,
    mapGrootte: { breedte: 2000, hoogte: 2000 },
    tickRate: 60 // ververssnelheid van de game loop
};

// Map om alle actieve spelers in de arena bij te houden
const actieveSpelers = new Map();

/**
 * Speler verbindt met de arena
 */
function spelerVerbinden(spelerId, gebruikersnaam) {
    if (actieveSpelers.size >= gameConfig.maxSpelersPerRoom) {
        console.log(`[Lobby Vol] ${gebruikersnaam} kon niet deelnemen.`);
        return null;
    }

    const speler = {
        id: spelerId,
        naam: gebruikersnaam || 'Gast',
        // Willekeurige spawnpositie op de map
        x: Math.floor(Math.random() * gameConfig.mapGrootte.breedte),
        y: Math.floor(Math.random() * gameConfig.mapGrootte.hoogte),
        grootte: 10,
        score: 0,
        isAlive: true
    };

    actieveSpelers.set(spelerId, speler);
    console.log(`[Join] ${speler.naam} is gespawned op (${speler.x}, ${speler.y})`);
    return speler;
}

/**
 * Verwijder speler bij disconnect of afvallen
 */
function spelerVerlaat(spelerId) {
    if (actieveSpelers.has(spelerId)) {
        const speler = actieveSpelers.get(spelerId);
        console.log(`[Leave] ${speler.naam} heeft de arena verlaten.`);
        actieveSpelers.delete(spelerId);
    }
}

/**
 * Haalt de Top 5 van het leaderboard op
 */
function haalLeaderboardOp() {
    const alleSpelers = Array.from(actieveSpelers.values());
    return alleSpelers
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)
        .map(s => ({ naam: s.naam, score: s.score }));
}

// Exporteer functies voor gebruik in je main game loop
if (typeof module !== 'undefined') {
    module.exports = { gameConfig, spelerVerbinden, spelerVerlaat, haalLeaderboardOp };
}
