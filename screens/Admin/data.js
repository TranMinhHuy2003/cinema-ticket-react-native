export const movies = [
  {
    title: 'The Matrix',
    description: 'A hacker discovers the reality he lives in is a simulation, leading him on a journey to free humanity from its artificial oppressors.',
    posterUrl: 'https://rukminim2.flixcart.com/image/850/1000/kmns7m80/poster/l/p/f/medium-the-matrix-an-american-maxi-origins-jumbo-medium-size-original-imagfgb6gx9yhwzs.jpeg?q=90&crop=false',
    trailerUrl: 'https://youtu.be/vKQi3bBA1y8?si=qZpO1RcnAFKYa96a',
    imdbRating: 8.7,
    releaseDate: '1999-03-31T18:00:00',
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
    posterUrl: 'https://m.media-amazon.com/images/I/71dN1QYnf+L._AC_UF894,1000_QL80_.jpg',
    trailerUrl: 'https://youtu.be/zSWdZVtXT7E?si=aXXCDpEAbyjIgjWM',
    imdbRating: 8.6,
    releaseDate: '2014-11-07T18:00:00',
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
    posterUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3ekE6Hhz9gvIbiFSUPxt-FyAh4zXTXX0bjQ&s',
    trailerUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.imdb.com%2Ftitle%2Ftt0468569%2F&psig=AOvVaw30aNe4oZt8J3NJhC18m2qC&ust=1728487660159000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLCBzLmM_4gDFQAAAAAdAAAAABAE',
    imdbRating: 9.0,
    releaseDate: '2008-07-18T18:00:00',
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
    posterUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEF7UyHuP022xuZWHTFl9U-X25DauogJYi6Q&s',
    trailerUrl: 'https://youtu.be/TcMBFSGVi1c?si=FhA3nYxVsTXPVSKU',
    imdbRating: 8.4,
    releaseDate: '2019-04-26T18:00:00',
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
    posterUrl: 'https://c8.alamy.com/comp/BKB5RX/titanic-year-1997-director-james-cameron-kate-winslet-leonardo-dicaprio-BKB5RX.jpg',
    trailerUrl: 'https://youtu.be/LuPB43YSgCs?si=vJDGdVNDp5ROGxLd',
    imdbRating: 7.9,
    releaseDate: '1997-12-19T18:00:00',
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

export const users = [
  {
    name: "John Doe",
    email: "user@example.com",
    password: "password123",
    role: "customer",  // or 'admin'
    birthday: "23/06/2003",
    phoneNumber: "0908102651",
    booking: [
      {
        bookingId: 'bk001',
        movie_title: 'Inception',
        cinema_name: 'Cinema Center',
        showtime: '2024-09-30T19:00:00',
        seat_number: 'A1',
        status: 'Đã xác nhận',
        type: 'Người lớn',
        totalPrice: 100,
      },
      {
        bookingId: 'bk002',
        movie_title: 'Avatar',
        cinema_name: 'Grand Cinema',
        showtime: '2024-10-01T18:30:00',
        seat_number: 'B12',
        status: 'Đã hủy',
        type: 'Người lớn',
        price: 100,
      },
      {
        bookingId: 'bk003',
        movie_title: 'The Matrix',
        cinema_name: 'Cinema World',
        showtime: '2024-10-02T20:00:00',
        seat_number: 'C5',
        status: 'Đã xác nhận',
        type: 'Người lớn',
        price: 100,
      },
    ]
  },
  {
    name: "Admin",
    email: "admin@example.com",
    password: "password123",
    role: "admin",
    birthday: "23/06/2003",
    phoneNumber: "0908102651",
    booking: []
  },
]

export const tickets = [
  {
    user_id: 'user_001',
    movie_title: 'Inception',
    cinema_name: 'Cinema Center',
    showtime: '2024-09-30T19:00:00',
    seat_number: 'A1',
    status: 'Đã xác nhận',
    type: 'Người lớn',
    price: 100,
    created_at: '2024-09-28T12:00:00',
    updated_at: '2024-09-28T12:30:00'
  },
  {
    user_id: 'user_002',
    movie_title: 'Avatar',
    cinema_name: 'Grand Cinema',
    showtime: '2024-10-01T18:30:00',
    seat_number: 'B12',
    status: 'Đã hủy',
    type: 'Người lớn',
    price: 100,
    created_at: '2024-09-29T15:00:00',
    updated_at: '2024-09-29T15:15:00'
  },
  {
    user_id: 'user_003',
    movie_title: 'The Matrix',
    cinema_name: 'Cinema World',
    showtime: '2024-10-02T20:00:00',
    seat_number: 'C5',
    status: 'Đã xác nhận',
    type: 'Người lớn',
    price: 100,
    created_at: '2024-09-30T10:00:00',
    updated_at: '2024-09-30T10:20:00'
  },
  {
    user_id: 'user_004',
    movie_title: 'Titanic',
    cinema_name: 'Cinema Center',
    showtime: '2024-10-03T17:45:00',
    seat_number: 'D8',
    status: 'Đã xác nhận',
    type: 'Người lớn',
    price: 100,
    created_at: '2024-10-01T09:00:00',
    updated_at: '2024-10-01T09:10:00'
  },
  {
    user_id: 'user_005',
    movie_title: 'Joker',
    cinema_name: 'Movie Palace',
    showtime: '2024-10-04T21:00:00',
    seat_number: 'A10',
    status: 'Đã hủy',
    type: 'Người lớn',
    price: 100,
    created_at: '2024-10-02T14:30:00',
    updated_at: '2024-10-02T14:45:00'
  },
  {
    user_id: 'user_006',
    movie_title: 'Parasite',
    cinema_name: 'City Cinema',
    showtime: '2024-10-05T16:00:00',
    seat_number: 'E3',
    status: 'Đã xác nhận',
    type: 'Người lớn',
    price: 100,
    created_at: '2024-10-03T11:00:00',
    updated_at: '2024-10-03T11:15:00'
  },
  {
    user_id: 'user_007',
    movie_title: 'Interstellar',
    cinema_name: 'Cinema World',
    showtime: '2024-10-06T18:15:00',
    seat_number: 'F6',
    status: 'Đã xác nhận',
    type: 'Người lớn',
    price: 100,
    created_at: '2024-10-04T13:30:00',
    updated_at: '2024-10-04T13:45:00'
  },
  {
    user_id: 'user_008',
    movie_title: 'The Dark Knight',
    cinema_name: 'Cinema Center',
    showtime: '2024-10-07T20:45:00',
    seat_number: 'B2',
    status: 'Đã xác nhận',
    type: 'Người lớn',
    price: 100,
    created_at: '2024-10-05T15:20:00',
    updated_at: '2024-10-05T15:35:00'
  },
  {
    user_id: 'user_009',
    movie_title: 'Pulp Fiction',
    cinema_name: 'Grand Cinema',
    showtime: '2024-10-08T22:30:00',
    seat_number: 'G10',
    status: 'Đã hủy',
    type: 'Người lớn',
    price: 100,
    created_at: '2024-10-06T12:00:00',
    updated_at: '2024-10-06T12:10:00'
  },
  {
    user_id: 'user_010',
    movie_title: 'Forrest Gump',
    cinema_name: 'Movie Palace',
    showtime: '2024-10-09T19:00:00',
    seat_number: 'H4',
    status: 'Đã xác nhận',
    type: 'Người lớn',
    price: 100,
    created_at: '2024-10-07T17:30:00',
    updated_at: '2024-10-07T17:45:00'
  }
];
