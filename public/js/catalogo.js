document.addEventListener('DOMContentLoaded', () => {
    // Obtener productos desde localStorage
    const productoLocalStorage = JSON.parse(localStorage.getItem('seccionesData')) || [];

    // Verificar si productoLocalStorage es null o vacío
    if (productoLocalStorage.length === 0) {
        console.error('No hay productos en localStorage con la clave "seccionesData"');
        return;
    }

    // Referencias a los elementos del DOM
    const catalogo = document.getElementById('catalogo');
    const filtroCategoria = document.getElementById('filtro-categoria');
    const filtroOferta = document.getElementById('filtro-oferta');

    let allProducts = [];
    const valorTotal = document.querySelector(".total-pagar");
    const contadorProducto = document.querySelector("#contador-productos");
    const contenedorCarrito = document.querySelector(".contenedor-carrito");
    const rowProducto = document.querySelector(".row-producto");

    // Función para cargar categorías desde localStorage y actualizar el menú desplegable
    const loadCategories = () => {
        const storedCategories = JSON.parse(localStorage.getItem('categoriesData')) || [];
        filtroCategoria.innerHTML = '<option value="">Elegir</option>'; // Limpiar opciones actuales

        storedCategories.forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria.name;
            option.textContent = categoria.name;
            filtroCategoria.appendChild(option);
        });
    };

    // Cargar categorías inicialmente
    loadCategories();

    // Función para renderizar el catálogo
    const renderCatalogo = () => {
        catalogo.innerHTML = ''; // Limpiar catálogo

        // Obtener valores de los filtros
        const categoriaSeleccionada = filtroCategoria.value;
        const ofertaSeleccionada = filtroOferta.value;

        // Filtrar productos según los valores de los filtros
        const productosFiltrados = productoLocalStorage.filter(producto => {
            const cumpleCategoria = !categoriaSeleccionada || producto.categoria === categoriaSeleccionada;
            const cumpleOferta = !ofertaSeleccionada || String(producto.oferta) === ofertaSeleccionada;
            return cumpleCategoria && cumpleOferta;
        });

        // Generar catálogo dinámicamente
        productosFiltrados.forEach(producto => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('item');

            const figuraDiv = document.createElement('div');
            figuraDiv.classList.add('figura');

            const img = document.createElement('img');
            img.src = producto.imagen || '../html/imagenes_html/logo_resinoxy.png';
            figuraDiv.appendChild(img);

            const infoDiv = document.createElement('div');
            infoDiv.classList.add('info');

            const h2 = document.createElement('h2');
            h2.textContent = producto.nombreProducto;
            infoDiv.appendChild(h2);

            const pPrecio = document.createElement('p');
            pPrecio.classList.add('precio');
            pPrecio.textContent = `$${producto.precio}`;
            infoDiv.appendChild(pPrecio);

            const btn = document.createElement('button');
            btn.classList.add('btn-add-cart');
            btn.textContent = 'Añadir al carrito';
            infoDiv.appendChild(btn);

            itemDiv.appendChild(figuraDiv);
            itemDiv.appendChild(infoDiv);
            catalogo.appendChild(itemDiv);
        });
    };

    filtroCategoria.addEventListener('change', renderCatalogo);
    filtroOferta.addEventListener('change', renderCatalogo);

    // Llamar a renderCatalogo inicialmente para mostrar todos los productos
    renderCatalogo();

    // Escuchar cambios en localStorage para actualizar las categorías
    window.addEventListener('storage', (event) => {
        if (event.key === 'categoriesData') {
            loadCategories();
            renderCatalogo();
        }
    });

    // Manejo del carrito
    const btnCarrito = document.querySelector(".contenedor-carrito-icono");
    btnCarrito.addEventListener("click", () => {
        contenedorCarrito.classList.toggle("contenedor-carrito-escondido");
    });

    catalogo.addEventListener("click", e => {
        if (e.target.classList.contains("btn-add-cart")) {
            const producto = e.target.parentElement;
            const infoProducto = {
                cantidad: 1,
                titulo: producto.querySelector("h2").textContent,
                precio: producto.querySelector("p").textContent,
            };

            const existe = allProducts.some(prod => prod.titulo === infoProducto.titulo);
            
            if (existe) {
                allProducts = allProducts.map(prod => {
                    if (prod.titulo === infoProducto.titulo) {
                        prod.cantidad++;
                    }
                    return prod;
                });
            } else {
                allProducts.push(infoProducto);
            }
            mostrarHTML();
        }
    });

    rowProducto.addEventListener("click", (e) => {
        if (e.target.classList.contains("fa-rectangle-xmark")) {
            const producto = e.target.parentElement;
            const titulo = producto.querySelector("p").textContent;

            allProducts = allProducts.filter(prod => prod.titulo !== titulo);
            mostrarHTML();
        }
    });

    const mostrarHTML = () => {
        if (!allProducts.length) {
            rowProducto.innerHTML = `<p class="carrito-vacio">El carrito está vacío.</p>`;
            valorTotal.innerText = `$0`;
            contadorProducto.innerText = '0';
            return;
        }

        rowProducto.innerHTML = "";
        let total = 0;
        let totalProductos = 0;

        allProducts.forEach(prod => {
            const contenedorProducto = document.createElement("div");
            contenedorProducto.classList.add("carrito-producto");

            contenedorProducto.innerHTML = `
                <div class="info-carrito-producto">
                    <span class="cantidad-carrito-producto">${prod.cantidad}</span>
                    <p class="titulo-producto-carrito">${prod.titulo}</p>
                    <span class="precio-producto-carrito">${prod.precio}</span>
                </div>
                <i class="fa-solid fa-rectangle-xmark"></i>`;
            rowProducto.append(contenedorProducto);

            total += parseInt(prod.cantidad * prod.precio.slice(1));
            totalProductos += prod.cantidad;
        });

        valorTotal.innerText = `$${total}`;
        contadorProducto.innerText = totalProductos;
    };

    // Manejo del pago
    const btnPagar = document.querySelector(".btn-pagar");
    const voucher = document.getElementById("voucher");
    const btnCerrarVoucher = document.querySelector(".btn-cerrar-voucher");
    const voucherContentDiv = document.getElementById("voucher-content");

    btnPagar.addEventListener("click", () => {
        if (allProducts.length === 0) {
            alert("El carrito está vacío.");
            return;
        }

        voucher.classList.add("voucher-activo");
        const now = new Date();
        const fecha = now.toLocaleDateString();
        const hora = now.toLocaleTimeString();
        let voucherContent = `¡¡¡¡Su compra ha sido realizada con éxito!!!!\n\nFecha: ${fecha} Hora: ${hora}\n\nDetalles de la compra:\n\n`;
        let total = 0;

        allProducts.forEach((prod) => {
            voucherContent += `${prod.titulo} - Cantidad: ${prod.cantidad} - Precio: ${prod.precio} = Total: ${parseInt(prod.precio.slice(1)) * prod.cantidad}\n`;
            total += prod.cantidad * parseInt(prod.precio.slice(1));
        });

        voucherContent += `\nTotal a pagar: $${total}\n\nGracias por comprar en ResinoxyⓇ™`;
        voucherContentDiv.innerText = voucherContent;
    });

    btnCerrarVoucher.addEventListener("click", () => {
        voucher.classList.remove("voucher-activo");
        window.location.reload();
    });
});
