import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { obtenerLibroPorId } from '../firebase';
import { formatoMoneda } from '../helpers/formatoMoneda';
import { Navbar } from '../components/Navbar';
import Spinner from '../components/Spinner';

const LibroDetalle = props => {

    console.log('useParams', useParams());

    const { id } = useParams();

    //Use states
    const [libro, setLibro] = useState({});

    const [enCarrito, setEnCarrito] = useState(false);

    const [spinner, setSpinner] = useState(false);

    // Contexto del carrito
    const { agregarLibro } = useContext(CartContext);

    const agregarAlCarrito = (cantidad) => {
        agregarLibro(libro, cantidad);
        setEnCarrito(true);
    }

    useEffect(() => {
        setSpinner(true);
        obtenerLibroPorId(id).then(libro => {
            setLibro(libro);
            setSpinner(false);
        });
    }, [id]);

    return (
        <>

            <Navbar />

            {spinner ?
                <div className="col mt-5">
                    <Spinner></Spinner>
                </div>
                :
                (
                    <div className="container">
                        <div className="row">
                            <div className="col mt-5">

                                <div className="card">
                                    <div className="row g-0">
                                        <div className="col-sm-4">
                                            <img src={libro.imagen} className="card-img-top h-100" alt="..." />
                                        </div>
                                        <div className="col-sm-8">
                                            <div className="card-body">
                                                <h4 className="card-title">{libro.titulo}</h4>
                                                <hr></hr>
                                                <p className="card-text">
                                                    idlibro: <b>{libro.idlibro}</b>
                                                </p>
                                                <p className="card-text">
                                                    autor: <b>{libro.autor}</b>
                                                </p>
                                                <p className="card-text">
                                                    editorial: <b>{libro.editorial}</b>
                                                </p>
                                                <p className="card-text">
                                                    genero: <b>{libro.genero}</b>
                                                </p>
                                                <p className="card-text">
                                                    nro de paginas: <b>{libro.nropaginas}</b>
                                                </p>
                                                <p className="card-text">
                                                    precio: <b>{formatoMoneda(libro.precio)}</b>
                                                </p>
                                                <p className="card-text">
                                                    publicacion: <b>{libro.publicacion}</b>
                                                </p>
                                                <p className="card-text">
                                                    sinopsis: <b>{libro.trama}</b>
                                                </p>

                                                {
                                                    enCarrito ?
                                                        <p className='alert alert-warning'>
                                                            "El libro ya se encuentra en el carrito"
                                                        </p>

                                                        :
                                                        <p>
                                                            <button className="btn btn-primary" onClick={() => agregarAlCarrito(1)}>Agregar al carrito</button>
                                                        </p>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className='row mt-3'>
                            <div className='col'>
                                <Link to='/' className="btn btn-primary">Volver</Link>
                            </div>
                        </div>

                    </div>
                )}
        </>
    )
}



export default LibroDetalle