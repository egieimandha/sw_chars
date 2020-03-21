import { gql } from 'apollo-boost';

const CASTS = gql`
  query {
    allPersons {
      id
      name
      birthYear
      gender
      hairColor
      height
      films {
        title
        episodeId
        releaseDate
        director
      }
    }
  }
`;

export default CASTS;
