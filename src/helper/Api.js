const BASE_URL = "http://localhost:3001";
/*Autenticacion*/
export function login() {
    return fetch(`${BASE_URL}/login/`).then((response) => {
        return response.json();
    }).then((response) => {
        return response;
    });
};

/*Requisiciones*/


export function proveedores() {
    return fetch(`${BASE_URL}/proveedores/`).then((response) => {
        return response.json();
    }).then((response) => {
        return response.rows;
    });
};

/*Ordenes*/
export function ordenes(status) {
    fetch(`${BASE_URL}/ordenes/`).then((response) => {
        return response.json();
    }).then((response) => {
        return {};
    });
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
