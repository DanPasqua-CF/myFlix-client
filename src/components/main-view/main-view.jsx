import { useState } from "react";
import MovieCard from "../movie-card/movie-card"
import MovieView from "../movie-view/movie-view";

const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: 'Good Will Hunting',
      genre: [ "Drama" ],
      description: 'Will Hunting, a janitor at MIT, has a gift for mathematics, but needs help from a psychologist to find direction in his life.',
      directors: [
        {
          name: 'Gus Van Sant',
          biography: 'Gus Green Van Sant Jr. is an American filmmaker from Louisville, Kentucky.',
          birthYear: 1952,
          deathYear: null
        }
      ],
      image: {
        imageUrl: 'https://www.movieposters.com/cdn/shop/files/goodwillhunting.mpw.124427_480x.progressive.jpg?v=1707501307',
        imageAttribution: 'MoviePosters.com'
      },
      featured: true
    },
    {
      id: 2,
      title: 'Goodfellas',
      description: 'The story of Henry Hill and his life in the mafia, covering his relationship with his wife Karen and his mob partners Jimmy Conway and Tommy DeVito.',
      genre: [ "Crime" ],
      directors: [
        {
          name: 'Martin Scorsese',
          biography: 'Martin Charles Scorsese was born in Queens, New York City.',
          birthYear: 1942,
          deathYear: null
        }
      ],
      image: {
        imageUrl: 'https://www.movieposters.com/cdn/shop/files/Goodfellas.mpw.116119_480x.progressive.jpg?v=1731338435',
        imageAttribution: 'MoviePosters.com'
      },
      featured: true
    },
    {
      id: 3,
      title: 'Step Brothers',
      genre: [ "Comedy" ],
      description: 'Two aimless middle-aged losers still living at home are forced against their will to become roommates when their parents marry.',
      directors: [
        {
        name: 'Adam McKay',
        biography: 'Adam McKay is an American screenwriter, director, comedian, and actor.',
        birthYear: 1968,
        deathYear: null
        }
      ],
      image: {
        imageUrl: 'https://www.movieposters.com/cdn/shop/products/stepbrothers.mp_480x.progressive.jpg?v=1608672208',
        imageAttribution: 'MoviePosters.com'
      },
      featured: true
    }
  ]);

  const [ selectedMovie, setSelectedMovie ] = useState(null);

  if (selectedMovie) {
    return <MovieView movie = { selectedMovie } onBackClick={() => setSelectedMovie(null)} />;
  }

  if (movies.length === 0) {
    return <div>The list is empty</div>;
  }

  return (
    <>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </>
  );
}

export default MainView;
