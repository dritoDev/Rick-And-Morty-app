import { useEffect, useState } from "react";
import Character from "./Character";

function NavPage(props) {
  return (
    <header className="d-flex align-items-center justify-content-between">
      <p>page: { props.page }</p>
      <button
        className="btn btn-primary btn-sm "
        onClick={ () => { props.setPage(props.page + 1) } }>


        page: { props.page + 1 }
      </button>
    </header>
  );
}

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);


  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${page}`
      );

      const data = await response.json();
      setLoading(false);
      setCharacters(data.results);
    }
    fetchData();
  }, [page]);

  if (Loading) {
    return <div>Loading</div>;
  }

  return (
    <div className="container">
      <NavPage page={ page } setPage={ setPage } />
      { Loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="row">
          { characters.map((character) => {
            return (
              <div className="col-md-4" key={ character.id }>
                <Character character={ character } />
              </div>
            );
          }) }
        </div>
      ) }
    </div>
  );
};

export default CharacterList;
