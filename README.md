## Wallbit Challenge - Tienda

> Para este desafío, nuestro cliente nos encargó hacer un carrito de compras para programadores. Tiene un formulario con 2 campos: ID del producto y cantidad. Los programadores habitualmente no necesitan saber ni ver que productos comprar, sino que saben por conexiones astrales cual es el ID del producto que quieren y así los agregan a su carrito.
> Cada vez que se agrega un producto, vamos a obtener el producto desde la API y lo vamos a mostrar en una tabla, junto a la cantidad que el usuario eligió.

Esta es una propuesta de solución para el challenge de Wallbit (y para pasar el finde). Está planteada con React utilizando Tailwind para los estilos.

[Live en Vercel](https://wallbit-challenge-one.vercel.app/)

[Fork en Github](https://github.com/lautarolopez/wallbit-challenge)

### Instalación local

Ejemplo utilizando bun como package manager, se puede utilizar cualquier otro de forma similar.

```bash
git clone git@github.com:lautarolopez/wallbit-challenge.git
cd wallbit-challenge
bun install
bun run dev
```

#### Requisitos:

- [x] Agregar productos al carrito.
- [x] Manejo de errores con `react-toastify`.
- [x] Listar de los productos.

#### Extras

- [x] Persistir los datos con LocalStorage.
- [x] Mostrar el total de los productos cargados.
- [x] Mostrar el costo total.
- [x] Mostrar la hora de creación, reiniciando al vaciar el carrito.

#### Otros objetivos

- [x] Diseño responsive.
- [x] UI basada en la aplicación de Wallbit.
- [x] Pequeño easter egg: modo junior o senior.
