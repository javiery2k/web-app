const BASE_URL = "http://localhost:3001";
/*Autenticacion*/
export function login() {
  fetch(`${BASE_URL}/login/`).then((response) => {
    return response.json();
  }).then((response) => {
    console.log(response);
  });
};

export function session() {
  return fetch(`${BASE_URL}/session/`).then((response) => {
    return (response.json());
  });
};

/*Requisiciones*/
export function getRequisicion(status) {
  return new Promise((resolve) => {});
};

export function addRequisicion(status) {
  return new Promise((resolve) => {});
};

/*Ordenes*/
export function getOrden(status) {
  return new Promise((resolve) => {});
};

export function addOrden(status) {
  return new Promise((resolve) => {});
};

/*Catalogo*/
export function getProductos(status) {
  return new Promise((resolve) => {});
};

/*Proveedores*/
export function getProveedores(status) {
  return new Promise((resolve) => {});
};
