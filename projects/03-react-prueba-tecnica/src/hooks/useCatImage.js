import { useEffect, useState } from "react";

const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/';

export function useCatImage({ fact }) {

    const [imageUrl, setimageUrl] = useState('');

    useEffect(() => {
        if (!fact) return;

        const firstWord = fact.split(' ')[0];
        const CAT_ENDPOINT_IMG = `https://cataas.com/cat?json=true/says/${firstWord}?fontSize=50&fontColor=red`;
        fetch(CAT_ENDPOINT_IMG)
            .then(res => res.json())
            .then(data => {
                const { id } = data;
                const url = `cat/${id}/says/${firstWord}?fontSize=80&fontColor=red`;
                setimageUrl(url);
            })
            .catch(error => console.log('error getting image, more details: ', error));

    }, [fact]);

    return { imageUrl: `${CAT_PREFIX_IMAGE_URL}${imageUrl}` }
}
