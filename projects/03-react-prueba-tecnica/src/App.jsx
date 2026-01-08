import { useEffect, useState } from "react"

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact';
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/';
export function App() {
    const [fact, setFact] = useState('');
    const [imgUrl, setImgUrl] = useState('');

    useEffect(() => {

        fetch(CAT_ENDPOINT_RANDOM_FACT)
            .then(res => res.json())
            .then(data => {
                const { fact } = data;
                setFact(fact);
                console.log('fact: ', fact);
            });

    }, [])

    useEffect(() => {

        if (fact !== '') {
            const firstWord = fact.split(' ')[0];
            console.log('first word ', firstWord);
            const CAT_ENDPOINT_IMG = `https://cataas.com/cat?json=true/says/${firstWord}?fontSize=50&fontColor=red`;
            console.log(CAT_ENDPOINT_IMG);
            fetch(CAT_ENDPOINT_IMG)
                .then(res =>  res.json())
                .then(data => {
                    const { id } = data;
                    const  url  = `cat/${id}/says/${firstWord}?fontSize=80&fontColor=red`;
                    setImgUrl(url);
                })
                .catch(error => console.log('error getting image, more details: ', error));
        }

    }, [fact])

    return (
        <>
            <h1>React App</h1>
            {fact && <p>{fact}</p>}
            {imgUrl !== '' && <img src={CAT_PREFIX_IMAGE_URL + imgUrl} alt="image extracted from the first word" />}
        </>
    )
}