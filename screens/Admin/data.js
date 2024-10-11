export const movies = [
  {
    title: 'The Matrix',
    description: 'A hacker discovers the reality he lives in is a simulation, leading him on a journey to free humanity from its artificial oppressors.',
    posterUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.ubuy.vn%2Fvi%2Fproduct%2FRBDDGXK-the-matrix-movie-poster-us-version-24x36&psig=AOvVaw04ke_04dGBwl55sOiZkaWr&ust=1728486235318000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPC88pKH_4gDFQAAAAAdAAAAABAE',
    trailerUrl: 'https://youtu.be/vKQi3bBA1y8?si=qZpO1RcnAFKYa96a',
    imdbRating: 8.7,
    releaseDate: '1999-03-31',
    showtimes: {
      showtime_001: {
        start_time: '2024-10-01T18:00:00',
        end_time: '2024-10-01T20:30:00',
        price: 12.00,
        cinema: {
          cinema_name: 'Downtown Cinema',
          location: '456 Market Street, Los Angeles',
          hall_name: 'Hall 3',
          seat_capacity: 150
        },
        seats: {
          A1: true,
          A2: false,
          A3: true
        }
      },
      showtime_002: {
        start_time: '2024-10-01T21:00:00',
        end_time: '2024-10-01T23:30:00',
        price: 12.00,
        cinema: {
          cinema_name: 'Downtown Cinema',
          location: '456 Market Street, Los Angeles',
          hall_name: 'Hall 4',
          seat_capacity: 200
        },
        seats: {
          B1: false,
          B2: true,
          B3: true
        }
      }
    }
  },
  {
    title: 'Interstellar',
    description: 'A team of astronauts travel through a wormhole in search of a new home for humanity as Earth faces environmental collapse.',
    posterUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fvi.wikipedia.org%2Fwiki%2FT%25E1%25BA%25ADp_tin%3AInterstellar_poster.jpg&psig=AOvVaw38BshYmlKHgy-4vIv6pt1_&ust=1728487518181000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIjBmPaL_4gDFQAAAAAdAAAAABAE',
    trailerUrl: 'https://youtu.be/zSWdZVtXT7E?si=aXXCDpEAbyjIgjWM',
    imdbRating: 8.6,
    releaseDate: '2014-11-07',
    showtimes: {
      showtime_001: {
        start_time: '2024-10-02T19:00:00',
        end_time: '2024-10-02T22:00:00',
        price: 18.00,
        cinema: {
          cinema_name: 'Galaxy Theater',
          location: '789 Broadway, Chicago',
          hall_name: 'Hall 5',
          seat_capacity: 180
        },
        seats: {
          C1: true,
          C2: false,
          C3: false
        }
      },
      showtime_002: {
        start_time: '2024-10-02T22:30:00',
        end_time: '2024-10-03T01:30:00',
        price: 18.00,
        cinema: {
          cinema_name: 'Galaxy Theater',
          location: '789 Broadway, Chicago',
          hall_name: 'Hall 6',
          seat_capacity: 160
        },
        seats: {
          D1: false,
          D2: true,
          D3: true
        }
      }
    }
  },
  {
    title: 'The Dark Knight',
    description: 'Batman faces off against the Joker, a criminal mastermind who seeks to create chaos in Gotham City.',
    posterUrl: 'https://example.com/the-dark-knight-poster.jpg',
    trailerUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.imdb.com%2Ftitle%2Ftt0468569%2F&psig=AOvVaw30aNe4oZt8J3NJhC18m2qC&ust=1728487660159000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLCBzLmM_4gDFQAAAAAdAAAAABAE',
    imdbRating: 9.0,
    releaseDate: '2008-07-18',
    showtimes: {
      showtime_001: {
        start_time: '2024-10-03T20:00:00',
        end_time: '2024-10-03T22:45:00',
        price: 16.00,
        cinema: {
          cinema_name: 'Cityplex',
          location: '1010 Elm Street, San Francisco',
          hall_name: 'Hall 7',
          seat_capacity: 220
        },
        seats: {
          E1: true,
          E2: false,
          E3: true
        }
      },
      showtime_002: {
        start_time: '2024-10-03T23:00:00',
        end_time: '2024-10-04T01:45:00',
        price: 16.00,
        cinema: {
          cinema_name: 'Cityplex',
          location: '1010 Elm Street, San Francisco',
          hall_name: 'Hall 8',
          seat_capacity: 250
        },
        seats: {
          F1: false,
          F2: true,
          F3: false
        }
      }
    }
  },
  {
    title: 'Avengers: Endgame',
    description: 'The Avengers assemble once again to undo the destruction caused by Thanos and restore balance to the universe.',
    posterUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.ubuy.vn%2Fvi%2Fproduct%2F14THQNMU-marvel-the-avengers-endgame-movie-poster-24x36-inches-this-is-a-certified-print-with-holographic-seq&psig=AOvVaw3LSMzHAAK7vCSH4hVM9-pO&ust=1728487683511000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLiHtsSM_4gDFQAAAAAdAAAAABAo',
    trailerUrl: 'https://youtu.be/TcMBFSGVi1c?si=FhA3nYxVsTXPVSKU',
    imdbRating: 8.4,
    releaseDate: '2019-04-26',
    showtimes: {
      showtime_001: {
        start_time: '2024-10-04T18:30:00',
        end_time: '2024-10-04T21:30:00',
        price: 20.00,
        cinema: {
          cinema_name: 'Marvel Cinema',
          location: '222 River Road, Seattle',
          hall_name: 'Hall 9',
          seat_capacity: 300
        },
        seats: {
          G1: true,
          G2: false,
          G3: true
        }
      },
      showtime_002: {
        start_time: '2024-10-04T22:00:00',
        end_time: '2024-10-05T01:00:00',
        price: 20.00,
        cinema: {
          cinema_name: 'Marvel Cinema',
          location: '222 River Road, Seattle',
          hall_name: 'Hall 10',
          seat_capacity: 350
        },
        seats: {
          H1: false,
          H2: true,
          H3: true
        }
      }
    }
  },
  {
    title: 'Titanic',
    description: 'A fictionalized account of the ill-fated maiden voyage of the RMS Titanic, focusing on a romance between passengers from different social classes.',
    posterUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fvi.wikipedia.org%2Fwiki%2FT%25E1%25BA%25ADp_tin%3ATitanic_poster.jpg&psig=AOvVaw311Fwtg0j1PN6WvMf6hjey&ust=1728487774830000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLjekvCM_4gDFQAAAAAdAAAAABAQ',
    trailerUrl: 'https://youtu.be/LuPB43YSgCs?si=vJDGdVNDp5ROGxLd',
    imdbRating: 7.9,
    releaseDate: '1997-12-19',
    showtimes: {
      showtime_001: {
        start_time: '2024-10-05T17:30:00',
        end_time: '2024-10-05T21:00:00',
        price: 14.00,
        cinema: {
          cinema_name: 'Oceanview Theater',
          location: '333 Harbor Lane, Miami',
          hall_name: 'Hall 11',
          seat_capacity: 280
        },
        seats: {
          I1: true,
          I2: false,
          I3: true
        }
      },
      showtime_002: {
        start_time: '2024-10-05T22:00:00',
        end_time: '2024-10-06T01:30:00',
        price: 14.00,
        cinema: {
          cinema_name: 'Oceanview Theater',
          location: '333 Harbor Lane, Miami',
          hall_name: 'Hall 12',
          seat_capacity: 300
        },
        seats: {
          J1: false,
          J2: true,
          J3: false
        }
      }
    }
  }
];