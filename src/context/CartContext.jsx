import { createContext, useState } from "react";

// Contexto carrito
const CartContext = createContext();

// Provider del carrito
const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState([]);

    // Agregar un libro al carrito
    const agregarLibro = (libro, cantidad) => {

        if (isInCart(libro.idlibro)) {
            const index = cartItems.findIndex((item) => item.idlibro === libro.idlibro);
            let copiaCarro = [...cartItems];
            copiaCarro[index].cantidad += cantidad;
            setCartItems([...cartItems]);
        } else {
            const libroAgregado = { ...libro, cantidad: cantidad };
            setCartItems([...cartItems, libroAgregado]);
        }

    }

    // Checkear si el libro ya se encuentra en el carrito
    const isInCart = (id) => {
        return cartItems.some((libro) => (libro.idlibro === id))
    }


    // Borrar un libro del carrito
    const borrarLibro = (id) => {
        setCartItems(cartItems.filter((libro) => (libro.idlibro !== id)));
    }

    // Vaciar el carrito
    const vaciarCarro = () => {
        setCartItems([]);
    }

    // Cantidad de Items del carrito
    const cartCantidadLibros = () => {
        let cantidad = 0;
        cartItems.forEach((item) => {
            cantidad += item.cantidad;
        })
        return cantidad
    }

    // Total
    const obtenerTotal = () => {
        let total = 0;
        cartItems.forEach((item) => {
            total += item.precio * item.cantidad;
        })
        return total
    }

    return (
        <CartContext.Provider
            value={
                {
                    cartItems,
                    agregarLibro,
                    borrarLibro,
                    vaciarCarro,
                    cartCantidadLibros,
                    obtenerTotal
                }
            }
        >
            {children}
        </CartContext.Provider>
    )

}

export { CartContext, CartProvider }