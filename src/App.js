import React, { useEffect, useState } from 'react';
import './App.css';
import tmdb from './tmdb';
import MovieRow from './components/MovieRow';
import FeauturedMovie from './components/FeauturedMovie';
import Header from './components/header';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);

  useEffect(() => {
    const loadAll = async () => {
      //Pegando todas as listas
      let list = await tmdb.getHomeList();
      setMovieList(list);

      //Pegando o filme em destaque (featured)=
      let originals = list.filter((item) => item.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosenFilm = originals[0].items.results[randomChosen];
      let chosenInfo = await tmdb.getMovieInfo(chosenFilm.id, 'tv');
      setFeaturedData(chosenInfo);
    }
    loadAll();
  }, []);

  return (
    <div className='page'>

      <Header />

      {featuredData &&
        <FeauturedMovie item={featuredData} />
      }

      <section className='lists'>
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
    </div>
  );
}
