const API_KEY = '0b64b0c76f41d2884aca7d76e3c86e55';
const API_BASE = 'https://api.themoviedb.org/3';

/*
- originais da netflix
- recomendados (trending)
- em alta (top rated) 
- ação
- comédia
- terror
- romance
- documentários
*/

const basicFetch = async (endpoint) => {
  const req = await fetch(`${API_BASE}${endpoint}`);
  const json = await req.json();
  return json;
}

export default {
  getHomeList: async () => {
    return [
      {
        slug: 'originals',
        title: 'Originais da Netflix',
        items: await basicFetch(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: 'trending',
        title: 'Recomendados para você',
        items: await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`),
      }, {
        slug: 'top rated',
        title: 'Em Alta',
        items: await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`),
      }, {
        slug: 'action',
        title: 'Ação',
        items: await basicFetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`),
      }, {
        slug: 'comedy',
        title: 'Comédia',
        items: await basicFetch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`),
      }, {
        slug: 'horror',
        title: 'Terror',
        items: await basicFetch(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`),
      }, {
        slug: 'romance',
        title: 'Romance',
        items: await basicFetch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`),
      }, {
        slug: 'documentary',
        title: 'Documentários',
        items: await basicFetch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`),
      },
    ];
  },
  getMovieInfo: async (movie_id, type) => {
    let info = {};

    if (movie_id) {
      switch (type) {
        case 'movie':
          info = await basicFetch(`/movie/${movie_id}?language=pt-BR&api_key=${API_KEY}`);
        break;
        case 'tv':
          info = await basicFetch(`/tv/${movie_id}?language=pt-BR&api_key=${API_KEY}`);
        break;
      }
    }
    return info;
  }
}