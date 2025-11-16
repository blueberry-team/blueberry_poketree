// 포켓몬 상세 페이지

interface PageProps {
    params: Promise<{ id: string }>;
  }

  export default async function PokemonDetailPage({ params }: PageProps) {
    const { id: pokemonId } = await params;

    return (
      <div>
        <h1>Pokemon #{pokemonId}</h1>
        <p>Detail page for Pokemon {pokemonId}</p>
      </div>
    );
  }
