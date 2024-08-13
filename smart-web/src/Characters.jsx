import { useState } from "react";
import { useEffect } from "react";
import loadingImage from "./assets/loading.gif";



function PhonesComponent() {
    const [characters, setCharacter] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visibleCount, setVisibleCount] = useState(20);
    const [increment] = useState(20);

    const loadMore = () => {
        setVisibleCount(prevCount => prevCount + increment);
    };


    const endPoint = 'https://hp-api.herokuapp.com/api/characters';


    useEffect(() => {
        fetch(endPoint)
        .then((response) => {
            if (!response.ok){
                throw new Error('Network response is not Okay');
            }
            return response.json();
        })
        .then(data => setCharacter(data))
        .catch(e => setError(e.message))
        .finally(() => setLoading(false))
    }, [endPoint])

    if (loading) return <img src={loadingImage}/>;
    if (error) return <h1 style={{color:'red'}}>Error : {error}</h1>



    return(
        <div className="containter">

            <div className="ini">
            <input className="input-box" type="text"/>
            <button className="load-more-button">Search</button>
            </div>
            
            {characters.slice(0, visibleCount).map((character) => (
                <div key={character.id} className="card">
                    <img src={character.image} alt={character.name} style={{ width: '100px', height: '150px', borderRadius: 10 }} />
                    <h1 className="char-name">{character.name}</h1>
                    <p>{character.ancestry}</p>
                </div>
            ))}

            {visibleCount < characters.length && (
                <button onClick={loadMore} className="load-more-button">Load More</button>
            )}

        </div>
        
    );

}

export default PhonesComponent