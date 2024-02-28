import React, { useState, useEffect } from 'react';

interface Pokemon {
  name: string;
}

const OBgeneraciones = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const selectedGeneration = 'G1'; // You can update this based on your application logic

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=151');
        const data = await response.json();

        if (Array.isArray(data.results)) {
          const names: Pokemon[] = data.results.map((pokemon: { name: string }) => ({ name: pokemon.name }));
          setPokemonList(names);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
        setLoading(false);
      }
    };

    // Fetch data only when the selected generation is 'G1'
    if (selectedGeneration === 'G1') {
      fetchPokemonData();
    }
  }, [selectedGeneration]);

  return (
    <div>
      {selectedGeneration === 'G1' ? (
        <div>
          <h2>Primera Generación</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {pokemonList.map((pokemon, index) => (
                <li key={index}>{pokemon.name}</li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <p>Select 'G1' to see the list.</p>
      )}
    </div>
  );
};

export default OBgeneraciones;
