import { useState } from "react";
import axios from "axios";

function InputBox({ setResult }) {
  const [guess, setGuess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/guess", { guess });
      setResult(response.data.message);
    } catch (error) {
      console.error("Error en la respuesta:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Escribe tu respuesta..."
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
      />
      <button type="submit">Enviar</button>
    </form>
  );
}

export default InputBox;
