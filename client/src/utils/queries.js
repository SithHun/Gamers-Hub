import { gql } from '@apollo/client';

// Get logged in user's info
export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

// Server-side resolver API
export const SEARCH_GOOGLE_BOOKS = gql`
  query searchGoogleBooks($query: String!) {
    searchGoogleBooks(query: $query) {
      bookId
      authors
      description
      title
      image
      link
    }
  }
`;