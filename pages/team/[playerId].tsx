import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const PlayerProfile = () => {
  const router = useRouter();
  const { playerId } = router.query;
  
  // Example static data for demonstration, replace with actual data fetching
  const players = {
    '1': { name: 'John Doe', position: 'Forward', age: 18 },
    '2': { name: 'Jane Smith', position: 'Defender', age: 17 },
    // More players
  };

  const [player, setPlayer] = useState<{ name: string; position: string; age: number } | null>(null);

  useEffect(() => {
    // Ensure playerId is a string and not an array
    if (playerId && typeof playerId === 'string') {
      // Fetch the player data based on playerId
      const fetchedPlayer = players[playerId as keyof typeof players];
      setPlayer(fetchedPlayer || null); // Update state with the player data or null if not found
    }
  }, [playerId]);

  if (!player) {
    return <div>Player not found</div>;
  }

  return (
    <div>
      <h1>{player.name}</h1>
      <p>Position: {player.position}</p>
      <p>Age: {player.age}</p>
    </div>
  );
};

export default PlayerProfile;