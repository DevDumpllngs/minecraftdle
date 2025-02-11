class UserStats {
    constructor(userId, attempts, correctGuesses) {
      this.userId = userId; // ID del usuario
      this.attempts = attempts || 0; // Número total de intentos
      this.correctGuesses = correctGuesses || 0; // Adivinanzas correctas
    }
  }
  
  export default UserStats;
  