import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Libro from "./Libro";
import Spinner from "./Spinner";

const LibrosListado = () => {

    const [libros, setLibros] = useState([]);

    const [spinner, setSpinner] = useState(false);

    useEffect(() => {

        const getLibros = async () => {
            setSpinner(true);
            const misLibros = collection(db, "libros");
            const querySnapshot = await getDocs(misLibros);

            setLibros(
                querySnapshot.docs.map(doc => {

                    return { ...doc.data() }
                }
                )
            );
            setSpinner(false);
        }
        getLibros();
    }, []);


    return (
        <>
            <div className="container">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 mt-5">
                    {spinner ?
                        <Spinner></Spinner>
                        :
                        (
                            libros.map(libro =>
                                <Libro
                                    key={libro.idlibro}
                                    titulo={libro.titulo}
                                    id={libro.idlibro}
                                    precio={libro.precio}
                                    genero={libro.genero}
                                    imagen={libro.imagen}></Libro>)
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default LibrosListado