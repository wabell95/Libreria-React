// Formatear el precio
export const formatoMoneda = (number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(number)
}