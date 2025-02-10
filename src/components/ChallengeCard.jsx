function ChallengeCard({ challenge }) {
  if (!challenge) return <p>Cargando desafío...</p>;

  return (
    <div>
      <h2>{challenge.type === "bioma" ? "Adivina el Bioma" : "Adivina el Ítem"}</h2>
      <img src={`/assets/${challenge.image}`} alt={challenge.name} width={100} />
    </div>
  );
}

export default ChallengeCard;