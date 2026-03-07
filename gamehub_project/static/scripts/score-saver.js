/* Score Saver Utility for GameHub */

function getCSRFToken() {
    return document.cookie
        .split(";")
        .map(c => c.trim())
        .find(c => c.startsWith("csrftoken="))
        ?.split("=")[1] || "";
}

/**
 * Saves the score to the server for the current authenticated user.
 * @param {string} gameId - Unique identifier for the game
 * @param {number} score - The score to save
 */
function saveScoreToServer(gameId, score) {
    console.log(`DEBUG: Saving score ${score} for ${gameId}...`);
    fetch("/accounts/save-score/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCSRFToken()
        },
        credentials: "include",
        body: JSON.stringify({ game_id: gameId, score: score })
    })
        .then(response => {
            if (response.status === 401) {
                console.warn("User not authenticated, score not saved to server.");
                return { status: "error", message: "Not authenticated" };
            }
            return response.json();
        })
        .then(data => {
            if (data.status === "success") {
                if (data.message === "New high score!") {
                    console.log(`🏆 NEW HIGH SCORE! Your best for ${gameId} is now ${data.high_score}`);
                    if (typeof showToast === "function") {
                        showToast(`🏆 New High Score: ${data.high_score}`);
                    }
                } else {
                    console.log(`✅ Score saved for ${gameId}. Server high score: ${data.high_score}`);
                }
            }
        })
        .catch(err => console.error("Error saving score:", err));
}
