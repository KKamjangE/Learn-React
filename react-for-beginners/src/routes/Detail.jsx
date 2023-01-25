import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Detail.module.css";

function Detail() {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const { id } = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
    await console.log(movie);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loader}>
          <span>Loading...</span>
        </div>
      ) : (
        <div className={styles.movie}>
          <h1>{movie.title}</h1>
          <img
            src={movie.large_cover_image}
            alt={movie.id}
            className={styles.movie__img}
          />
          <p className={styles.movie__rating}>Rating: {movie.rating}</p>
          <ul className={styles.movie__genres}>
            {movie.genres.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
export default Detail;
