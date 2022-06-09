import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { CartContext } from '../context/CartContext';
import { addOrder } from '../firebase';
import { formatoMoneda } from '../helpers/formatoMoneda';

const Checkout = props => {

    // Context
    const {
        cartCantidadLibros,
        obtenerTotal,
        vaciarCarro,
    }
        = useContext(CartContext);

    const [compraFinalizada, setCompraFinalizada] = useState(false);
    const [idCompra, setIdCompra] = useState("")

    const [comprador, setComprador] = useState({
        nombre: "",
        apellido: "",
        telefono: "",
        email: ""
    });

    // Expresion regular para el email
    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i

    const fechaCompra = new Date().toLocaleDateString()

    // Obtener los datos del cliente
    const handleSubmitChange = (e) => {

        console.log('comprador', comprador)
        console.log('e.target.name', e.target.name)
        console.log('e.target.value', e.target.value)

        setComprador({
            ...comprador,
            [e.target.name]: e.target.value
        })

    }

    // Generación de la orden
    function orderHandler() {

        const order = {
            comprador,
            item: cartCantidadLibros(),
            price: obtenerTotal(),
            date: fechaCompra,
        }

        addOrder(order).then(data => {
            setIdCompra(data)
        })

        setCompraFinalizada(true);
    }

    return (
        <>
            {
                !compraFinalizada ? (
                    <Navbar />
                ) :
                    <>
                    </>
            }


            <div className='container'>

                {!compraFinalizada ?
                    (
                        <div className='row'>
                            <div className="row">
                                <div className="col mt-5"><h3>Finalizar compra</h3> </div>
                            </div>
                            <div className="row">
                                <div className="col mt-5">
                                    <p className='alert alert-success'>
                                        Cantidad de libros: <b>{cartCantidadLibros()}</b> <br />
                                        Importe Total: <b>{formatoMoneda(obtenerTotal())}</b>
                                    </p>

                                </div>
                            </div>
                            <div className='col'>

                                <form>
                                    <div className="mb-3">

                                        <label htmlFor="nombre" className="form-label">
                                            Nombre
                                        </label>
                                        <input
                                            id="nombre"
                                            name="nombre"
                                            type="text"
                                            required
                                            className="form-control"
                                            placeholder='Nombre'
                                            onChange={handleSubmitChange}
                                        />

                                        <label htmlFor="apellido" className="form-label">
                                            Apellido
                                        </label>
                                        <input
                                            id="apellido"
                                            name="apellido"
                                            type="text"
                                            required
                                            className="form-control"
                                            placeholder='Apellido'
                                            onChange={(e) => handleSubmitChange(e)}
                                        />

                                        <label htmlFor="telefono" className="form-label">
                                            Telefono
                                        </label>
                                        <input
                                            id="telefono"
                                            name="telefono"
                                            type="text"
                                            required
                                            className="form-control"
                                            placeholder='Telefono'
                                            onChange={(e) => handleSubmitChange(e)}
                                        />

                                        <label htmlFor="email" className="form-label">
                                            Email
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            className="form-control"
                                            placeholder='Ingresa un email valido'
                                            onChange={(e) => handleSubmitChange(e)}
                                        />
                                    </div>
                                </form>

                                {comprador.nombre && comprador.apellido && comprador.telefono && emailRegex.test(comprador.email)
                                    ?
                                    (
                                        <input
                                            onClick={() => { orderHandler() }}
                                            className="btn btn-primary"
                                            type="submit"
                                            value="Proceder al pago"
                                        />
                                    ) :
                                    (
                                        <input
                                            className="btn btn-primary"
                                            type="submit"
                                            value="Proceder al pago"
                                            disabled
                                        />
                                    )
                                }

                            </div>
                        </div>
                    ) : (
                        <>

                            <div className='row mt-5'>
                                <div className="col text-center">
                                    <h1>
                                        Compra finalizada:
                                    </h1>

                                    <div className="div alert alert-success mt-4">

                                        <h4>
                                            ¡MUCHAS GRACIAS POR TU COMPRA <b>{comprador.nombre.toUpperCase()}</b>!
                                        </h4>

                                        <p>
                                            Numero de Orden: <b> {idCompra} </b> <br />
                                        </p>

                                        <p>
                                            Cantidad de libros: <b>{cartCantidadLibros()}</b> <br />
                                        </p>

                                        <p>
                                            Importe Total: <b>{formatoMoneda(obtenerTotal())}</b>
                                        </p>
                                        <p>
                                            Verifica tu correo  <b>{comprador.email}</b> y encontraras tu orden de compra de ID: <b>{idCompra}</b>.<br />
                                            Espero que el proceso de compra en <b>LIBRERIA REACT</b> haya sido satisfactorio. ¡Vuelve pronto!
                                        </p>


                                    </div>

                                </div>
                            </div>
                            <div className='row mt-4'>
                                <div className="col text-center">
                                    <Link to="/">
                                        <button onClick={vaciarCarro} className="btn btn-primary">
                                            Volver a la tienda
                                        </button>
                                    </Link>
                                </div>
                            </div>

                        </>
                    )
                }

            </div>
        </>


    )
}



export default Checkout