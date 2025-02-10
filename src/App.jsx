import { useState } from "react";
import ChallengeCard from "./components/ChallengeCard";
import InputBox from "./components/InputBox";

function App() {
  const [challenge, setChallenge] = useState(null);
  const [result, setResult] = useState("");

  return (
    <div className="container">
      <h1>Minecraft-Worldle</h1>
      <ChallengeCard challenge={challenge} />
      <InputBox setResult={setResult} />
      <p>{result}</p>
    </div>
  );
}

export default App;