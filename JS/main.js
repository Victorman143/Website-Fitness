// --- Parallax Scroll ---
window.addEventListener('scroll', () => {
  const bg = document.querySelector('.hero-bg');
  if (bg) {
    bg.style.transform = `translateY(${window.scrollY * 0.3}px)`;
  }
});

document.addEventListener("DOMContentLoaded", () => {

  // --- Scroll Reveal ---
  const observarScrollReveal = () => {
    const elementos = document.querySelectorAll('.subir');
    const observer = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('activo');
        }
      });
    }, { threshold: 0.3 });
    elementos.forEach(el => observer.observe(el));
  };

  // --- Typewriter funciones ---
  const escribirTexto = (elemento, texto, velocidad = 100, callback) => {
    if (!elemento) return;
    let i = 0;
    const escribir = () => {
      if (i < texto.length) {
        elemento.textContent += texto.charAt(i++);
        setTimeout(escribir, velocidad);
      } else if (callback) {
        callback();
      }
    };
    escribir();
  };

  const iniciarEscrituraTitulo1 = () => {
    const titulo = document.getElementById("titulo");
    const parrafo = titulo?.nextElementSibling;
    const boton = parrafo?.nextElementSibling;
    escribirTexto(titulo, "Transforma tu cuerpo en 21 días", 100, () => {
      titulo.classList.add("oculto");
      [parrafo, boton].forEach(el => {
        if (el) {
          el.style.transition = "opacity 0.6s ease";
          el.style.opacity = 1;
        }
      });
    });
  };

  const iniciarEscrituraTitulo2 = () => {
    const titulo = document.getElementById("titulo2");
    const parrafo = titulo?.nextElementSibling;
    const textos = ["Conoce a nuestros clientes", ["aumento", "pérdidas"]];
    let modo = 0, i = 0, j = 0, borrando = false;

    const escribirLoop = () => {
      if (!titulo) return;
      if (modo === 0) {
        if (i < textos[0].length) {
          titulo.textContent += textos[0].charAt(i++);
          setTimeout(escribirLoop, 150);
        } else {
          parrafo && (parrafo.style.opacity = 1);
          modo = 1; i = 0;
          setTimeout(escribirLoop, 1500);
        }
      } else {
        const base = "Resultados de ";
        const variante = textos[1][j];
        const textoActual = base + variante;

        if (!borrando) {
          if (i < textoActual.length) {
            titulo.textContent = textoActual.substring(0, ++i);
            setTimeout(escribirLoop, 150);
          } else {
            borrando = true;
            setTimeout(escribirLoop, 1500);
          }
        } else {
          if (i > base.length) {
            titulo.textContent = textoActual.substring(0, --i);
            setTimeout(escribirLoop, 100);
          } else {
            borrando = false;
            j = (j + 1) % textos[1].length;
            setTimeout(escribirLoop, 300);
          }
        }
      }
    };
    escribirLoop();
  };

  const iniciarEscrituraTitulo3 = () => {
    const titulo = document.getElementById("titulo3");
    escribirTexto(titulo, "Contáctame para más información", 120, () => {
      titulo.classList.add("oculto");
    });
  };

  const iniciarEscrituraTitulo4 = () => {
    const titulo = document.getElementById("titulo4");
    escribirTexto(titulo, "Acerca de Mi", 120, () => {
      titulo.classList.add("oculto");
    });
  };

  // --- Validación teléfono ---
  const validarCelular = () => {
    const input = document.getElementById("celular");
    if (!input) return;
    input.addEventListener("input", () => {
      input.value = input.value.replace(/\D/g, '');
      input.setCustomValidity('');
    });
    input.addEventListener("invalid", (e) => {
      e.target.setCustomValidity("Por favor, ingresa solo números");
    });
  };

  // --- Manejo de formulario ---
  const manejarFormulario = () => {
    const form = document.getElementById("contactForm");
    const tituloContacto = document.getElementById("tittlcontact");
    const mensajeExito = document.getElementById("mensajeExito");

    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const formData = new FormData(form);
      fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
        .then(res => {
          if (res.ok) {
            form.style.display = "none";
            tituloContacto && (tituloContacto.style.display = "none");
            mensajeExito && (mensajeExito.style.display = "block");
          } else {
            alert("Hubo un error al enviar el formulario.");
          }
        })
        .catch(err => {
          alert("Hubo un error al enviar el formulario.");
          console.error(err);
        });
    });
  };

  // --- Menú móvil ---
  const manejarMenuMovil = () => {
    const reto21 = document.getElementById('reto21dias');
    const toggler = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeBtn = document.getElementById('closeBtn');
    const overlay = document.getElementById('overlay');

    const openCart = document.getElementById('openCart');
    const openCartDektop = document.getElementById('openCartdesktop');
    const closeCart = document.getElementById('closeCart');
    const cartSidebar = document.getElementById('cartSidebar');
    const popupcontainer = document.querySelector('.popup-container');

    if (openCart && closeCart && cartSidebar) {
  openCart.addEventListener('click', () => {
    cartSidebar.classList.add('open');
    overlay.classList.add('active');
  });

  openCartDektop.addEventListener('click', () => {
    cartSidebar.classList.add('open');
    overlay.classList.add('active');
  });

  closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('open');
    overlay.classList.remove('active');
  });

  overlay.addEventListener('click', () => {
    cartSidebar.classList.remove('open');
    popupcontainer.style.display = 'none';
    document.body.style.overflow = ""; // Reactiva scroll
    overlay.classList.remove('active');
  });
} else {
  console.warn('Faltan elementos para abrir/cerrar el carrito');
}

    if (!toggler || !mobileMenu || !overlay) return;

    const cerrarMenu = () => {
      mobileMenu.classList.remove('open');
      overlay.classList.remove('active');
    };

    toggler.addEventListener('click', () => {
      mobileMenu.classList.add('open');
      overlay.classList.add('active');
    });

    closeBtn?.addEventListener('click', cerrarMenu);
    reto21?.addEventListener('click', cerrarMenu);
    overlay.addEventListener('click', cerrarMenu);
  };

  // --- Carrito ---
  const obtenerCarrito = () => JSON.parse(localStorage.getItem('carrito') || '[]');

  const guardarCarrito = (carrito) => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  };

  const actualizarContadorCarrito = () => {
    const carrito = obtenerCarrito();
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const badge = document.getElementById('cart-count');
    if (badge) {
      badge.textContent = totalItems;
      badge.style.display = totalItems > 0 ? 'inline-block' : 'none';
    }
  };

  const manejarBotonCarrito = () => {
  const cartSidebar = document.getElementById('cartSidebar');
  const overlay = document.getElementById('overlay');

  // Escucha clics en cualquier botón con clase "agregar-carrito"
  document.addEventListener('click', (e) => {
    const boton = e.target.closest('.agregar-carrito');

    if (boton) {
      const nombre = boton.getAttribute('data-nombre');
      const precio = boton.getAttribute('data-precio'); // ⬅ NO usar parseFloat aquí
      const id = nombre.toLowerCase().replace(/\s+/g, '-'); // genera ID como reto-21-dias

      const carrito = obtenerCarrito();
      const existente = carrito.find(item => item.id === id);

      if (existente) {
        mostrarMensajeCarrito('Este producto ya está en el carrito.');
        return;
      }

      // Mostrar el carrito
      cartSidebar.classList.add('open');
      overlay.classList.add('active');

      // Agregar al carrito
      carrito.push({
        id,
        nombre,
        precio, // lo guardamos como string, tal como está (ej: "1000")
        cantidad: 1
      });

      guardarCarrito(carrito);
      actualizarContadorCarrito();
      renderCartFull(); // refresca visualmente
    }
  });

  actualizarContadorCarrito();
};



  const renderCartFull = () => {
  const carrito = obtenerCarrito();
  const tbody = document.getElementById('cartTableBody');
  const emptyMsg = document.getElementById('emptyCartMessage');
  const btncheckout = document.getElementById('btn-checkout');
  const cartTable = document.getElementById('cartTable');
  const btnTransfer = document.getElementById("btnTransfer");
  if (!tbody || !emptyMsg) return;

  tbody.innerHTML = ''; // limpiar filas

  if (carrito.length === 0) {
    btncheckout.style.display = 'none';
    btnTransfer.style.display = 'none';
    cartTable.style.display = 'none';
    emptyMsg.style.display = 'block';
    return;
  } else {
    btncheckout.style.display = 'block';
    btnTransfer.style.display = 'block';
    cartTable.style.display = 'block';
    emptyMsg.style.display = 'none';
  }

  carrito.forEach(item => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
  <td>${item.nombre}</td>
  <td>${item.cantidad}</td>
  <td>$${item.precio}</td>
  <td>
    <button class="btn-eliminar" aria-label="Eliminar ${item.nombre}" data-id="${item.id}">
      🗑️
    </button>
  </td>
`;


    tbody.appendChild(tr);
  });

  // Agregar listener a botones eliminar
  document.querySelectorAll('.btn-eliminar').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id;
      eliminarDelCarrito(id);
      renderCartFull(); // re-render para actualizar vista
      actualizarContadorCarrito();
    });
  });
};

// Función para eliminar un item por id
const eliminarDelCarrito = (id) => {
  let carrito = obtenerCarrito();
  carrito = carrito.filter(item => item.id !== id);
  guardarCarrito(carrito);
};


  const mostrarMensajeCarrito = (mensaje) => {
  const contenedor = document.getElementById('mensaje-carrito');
  if (!contenedor) return;
  
  contenedor.textContent = mensaje;
  contenedor.style.display = 'block';

  // Ocultar después de 3 segundos
  setTimeout(() => {
    cartSidebar.classList.add('open');
    overlay.classList.add('active');
    contenedor.style.display = 'none';
  }, 2000);
};


  

  // --- Ejecutar todas ---
  observarScrollReveal();
  iniciarEscrituraTitulo1();
  iniciarEscrituraTitulo2();
  iniciarEscrituraTitulo3();
  iniciarEscrituraTitulo4();
  validarCelular();
  manejarFormulario();
  manejarMenuMovil();
  manejarBotonCarrito();
  renderCartFull();
});


document.addEventListener("DOMContentLoaded", () => {
const btnTransfer = document.getElementById("btnTransfer");
  const popup = document.querySelector(".popup-container");
  const closeBtn = document.querySelector(".close-popup");

  // Mostrar popup
  btnTransfer.addEventListener("click", ()=> {
    popup.style.display = "block";
    cartSidebar.classList.remove('open');
    document.body.style.overflow = "hidden"; // Desactiva scroll
  });

  // Cerrar popup
  closeBtn.addEventListener("click", ()=> {
    popup.style.display = "none"; 
    overlay.classList.remove('active');
    document.body.style.overflow = ""; // Reactiva scroll
  });

});
