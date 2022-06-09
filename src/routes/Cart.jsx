import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { CartContext } from '../context/CartContext'
import { formatoMoneda } from '../helpers/formatoMoneda';

export const Cart = () => {

  // contexto carrito
  const {
    cartItems,
    agregarLibro,
    borrarLibro,
    vaciarCarro,
    cartCantidadLibros,
    obtenerTotal
  }
    = useContext(CartContext);


  const addToCart = (cantidad, libro) =>  {
    agregarLibro(libro, cantidad);
  }

  console.log("cartItems", cartItems);

  return (
    <>
      
      <Navbar/>

      <div className="container">
        <div className="row">
          <div className="col mt-5">
            {
              cartCantidadLibros() === 0 ? (
                <div>
                  <p className='alert alert-warning'>
                    No hay nada en el carro
                  </p>
                </div>
              ) : (
                <div>
                      <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <td>Portada</td>
                        <td>Titulo</td>
                        <td>Cantidad</td>
                        <td></td>
                        <td></td>
                        <td>Precio</td>
                        <td>Total</td>
                        <td></td>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        cartItems.map((libro) => (
                          <tr>
                            <td>
                              <img src={libro.imagen} width={80} alt={libro.titulo} />
                            </td>
                            <td className='align-middle'>
                              {libro.titulo}
                            </td>
                            <td className='align-middle'>
                              {libro.cantidad} 
                            </td>
                            <td className='align-middle'> 
                              <button onClick={() => addToCart(1, libro)}  className='btn btn-outline-primary btn-sm'>+</button> 
                            </td>
                            <td className='align-middle'> 
                              {
                                libro.cantidad > 1 ? (
                                  <button onClick={() => addToCart(-1, libro)} className='btn btn-outline-danger btn-sm'>-</button> 

                                ) : (
                                  <button disabled className='btn btn-outline-danger btn-sm'>-</button> 
                                )
                              }
                            </td>
                            <td className='align-middle'>
                              {formatoMoneda(libro.precio)}
                            </td>
                            <td className='align-middle'>
                              {formatoMoneda(libro.cantidad * libro.precio)}  
                            </td>
                            <td className='align-middle'>
                              <button  
                                  onClick={() => borrarLibro(libro.idlibro)}
                                  className='btn btn-outline-danger btn-sm'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                  </svg>
                                </button>
                              </td>
                          </tr>
                        ))
                      }
                      <tr>
                        <td colSpan="5">
                          
                        <button onClick={vaciarCarro} className='btn btn-danger btn-sm'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                              </svg> Vaciar carrito</button>
                        </td>
                        <td >
                          <p>Total: </p>
                        </td>
                        <td>
                          <p><b>{formatoMoneda(obtenerTotal())}</b></p>
                        </td>
                        <td colSpan="2">
                          <Link to= "/checkout"  className='btn btn-danger btn-sm'>Confirmar compra</Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>

    </>
  )
}
