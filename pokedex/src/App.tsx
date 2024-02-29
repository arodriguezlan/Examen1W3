import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Archivo CSS para estilos básicos

// Definición de tipo para los Pokémon
interface Pokemon {
  name: string;
}

// Definición de tipo para las generaciones
enum Generation {
  G1 = 1,
  G2,
  G3,
  G4,
  G5,
}

// Obtener los números de índice de Pokémon por generación
const getGenerationRange = (gen: Generation) => {
  switch (gen) {
    case Generation.G1:
      return { start: 1, end: 151 };
    case Generation.G2:
      return { start: 152, end: 251 };
    case Generation.G3:
      return { start: 252, end: 386 };
    case Generation.G4:
      return { start: 387, end: 493 };
    case Generation.G5:
      return { start: 494, end: 649 };
    default:
      return { start: 1, end: 151 };
  }
};

// Componente para la lista de Pokémon
interface PokemonListProps {
  onSelectPokemon: (pokemonName: string) => void;
  selectedGeneration: Generation; // Nuevo prop para almacenar la generación seleccionada
}

const PokemonList: React.FC<PokemonListProps> = ({ onSelectPokemon, selectedGeneration }) => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const { start, end } = getGenerationRange(selectedGeneration);
    axios.get<{ results: Pokemon[] }>(`https://pokeapi.co/api/v2/pokemon?offset=${start - 1}&limit=${end - start + 1}`)
      .then(res => {
        setPokemon(res.data.results);
      })
      .catch(error => {
        setError(error);
      });
  }, [selectedGeneration]);

  if (error) {
    return <div>Error al cargar la lista de Pokémon. Por favor, inténtalo de nuevo más tarde.</div>;
  }

  return (
    <div className="pokemon-grid">
      {pokemon.map(p => (
        <div key={p.name} className="pokemon-card" onClick={() => onSelectPokemon(p.name)}>
          <img src={`https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${p.name}.png`} alt={p.name} />
          <p>{p.name}</p>
        </div>
      ))}
    </div>
  );
};

// Componente para el modal
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  pokemonData: any; // Datos del Pokémon seleccionado
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, pokemonData }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {pokemonData ? (
          <>
            <h2>{pokemonData.name}</h2>
            <img src={`https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${pokemonData.name}.png`} alt={pokemonData.name} />
            <p>Altura: {pokemonData.height}</p>
            <p>Peso: {pokemonData.weight}</p>
            <p>Tipo: {pokemonData.types.map((t: { type: { name: string } }) => t.type.name).join(', ')}</p>
            <p>Movimientos: {pokemonData.moves.slice(0, 5).map((m: { move: { name: string } }) => m.move.name).join(', ')}</p>
          </>
        ) : (
          <div>Loading...</div>
        )}
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

// Componente principal de la aplicación
const App: React.FC = () => {
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const [selectedGeneration, setSelectedGeneration] = useState<Generation>(Generation.G1); // Nuevo estado para almacenar la generación seleccionada
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [pokemonData, setPokemonData] = useState<any>(null); // Nuevo estado para almacenar los datos del Pokémon seleccionado

  const handleSelectPokemon = (pokemonName: string) => {
    setSelectedPokemon(pokemonName);
    setIsModalOpen(true);
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then(res => {
        setPokemonData(res.data);
      })
      .catch(error => {
        console.error('Error al cargar los datos del Pokémon:', error);
      });
  };

  const handleSelectGeneration = (generation: Generation) => { // Nueva función para manejar la selección de generación
    setSelectedGeneration(generation);
    setSelectedPokemon(null); // Limpiar el Pokémon seleccionado al cambiar de generación
    setPokemonData(null); // Limpiar los datos del Pokémon al cambiar de generación
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <nav>
        <img
          className="img-fluid logo-img"
          src="/final.png"
          alt=""
        />
      </nav>
      <hr />
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <div className="btn-group">
          <button type="button" className="btn btn-generacion  me-md-2 dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Elige la generación
          </button>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <div className="G1">
              <li><a className="dropdown-item" href="#" onClick={() => handleSelectGeneration(Generation.G1)}>Primera Generación</a></li>
            </div>
            <li><a className="dropdown-item" href="#" onClick={() => handleSelectGeneration(Generation.G2)}>Segunda Generación</a></li>
            <li><a className="dropdown-item" href="#" onClick={() => handleSelectGeneration(Generation.G3)}>Tercera Generación</a></li>
            <li><a className="dropdown-item" href="#" onClick={() => handleSelectGeneration(Generation.G4)}>Cuarta Generación</a></li>
            <li><a className="dropdown-item" href="#" onClick={() => handleSelectGeneration(Generation.G5)}>Quinta Generación</a></li>
          </ul>
        </div>
      </div>
      <br /><br />
      <PokemonList onSelectPokemon={handleSelectPokemon} selectedGeneration={selectedGeneration} />
      <Modal isOpen={isModalOpen} onClose={closeModal} pokemonData={pokemonData} />
    </div>
  );
};

export default App;
