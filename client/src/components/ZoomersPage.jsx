import { useEffect, useState } from 'react';
import { useParams } from "react-router";
import axiosInstance from '../axiosInstance';

export default function ZoomersPage() {
    const { categoryId } = useParams();
    const [words, setWords] = useState([])
    // const [show, setShow] = useState(false)

    useEffect(() => {
        axiosInstance(`/categories/${categoryId}/words`)
        .then((res) => {
            setWords(res.data)
        })
    }, [])
    
    console.log(words)
    // el.title
    return (
        <>
            <div>
                {words.map((el) => (
                    <div>
                        <h3>{ el.name }</h3>
                        <p>{el.description}</p> 
                        {/* {show && (<ol>{el.ingredients.map((el) => (<li>{el.name}</li>))}</ol>)}
                        <button onClick={() => setShow(!show)}> Подробнее </button> */}
                    </div>
                ))}
            </div>
        </>
    )
}