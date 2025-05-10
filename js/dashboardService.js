tokenValidate();

function getUsers() {
    document.getElementById('cardHeader').innerHTML = '<h4>Listado de usuarios</h4>';
    fetch("https://reqres.in/api/users?page=1", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            'x-api-key': 'reqres-free-v1'
        }
    })
    .then((response) => {
        if(response.status === 200) {
            return response.json().then(data => {
                let listUsers = `
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Apellido</th>
                                <th scope="col">Email</th>
                                <th scope="col">Avatar</th>
                            </tr>
                        </thead>
                        <tbody>
                `;
                
                data.data.forEach(user => {
                    listUsers += `
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.first_name}</td>
                            <td>${user.last_name}</td>
                            <td>${user.email}</td>
                            <td><img src="${user.avatar}" class="img-thumbnail" width="50"></td>
                        </tr>
                    `;
                });
                
                listUsers += `</tbody></table>`;
                document.getElementById('info').innerHTML = listUsers;
            });
        } else {
            document.getElementById('info').innerHTML = 
                '<div class="alert alert-warning">No se pudieron cargar los usuarios</div>';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('info').innerHTML = 
            '<div class="alert alert-danger">Error al cargar usuarios</div>';
    });
}



function getProducts() {
    document.getElementById('cardHeader').innerHTML = '<h4>Listado de productos</h4>';
    document.getElementById('info').innerHTML = '<p>Cargando productos...</p>';
    
    fetch("https://reqres.in/api/products", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            'x-api-key': 'reqres-free-v1'
        }
    })
    .then((response) => {
        if(response.status === 200) {
            return response.json().then(data => {
                if(data.data && data.data.length > 0) {
                    let productsHTML = `
                        <div class="table-responsive">
                            <table class="table table-striped table-hover">
                                <thead class="table-dark">
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Año</th>
                                        <th>Color</th>
                                        <th>Valor Pantone</th>
                                    </tr>
                                </thead>
                                <tbody>
                    `;
                    
                    data.data.forEach(product => {
                        productsHTML += `
                            <tr>
                                <td>${product.id}</td>
                                <td>${product.name}</td>
                                <td>${product.year}</td>
                                <td>
                                    <span class="badge rounded-pill" style="background-color:${product.color}; color:${getContrastColor(product.color)}">
                                        ${product.color}
                                    </span>
                                </td>
                                <td>${product.pantone_value}</td>
                            </tr>
                        `;
                    });
                    
                    productsHTML += `
                                </tbody>
                            </table>
                        </div>
                        <div class="mt-3">
                            <p class="text-muted">Mostrando ${data.data.length} de ${data.total} productos</p>
                        </div>
                    `;
                    
                    document.getElementById('info').innerHTML = productsHTML;
                } else {
                    document.getElementById('info').innerHTML = 
                        '<div class="alert alert-info">No se encontraron productos</div>';
                }
            });
        } else {
            document.getElementById('info').innerHTML = 
                '<div class="alert alert-warning">Error al obtener productos (Código: '+response.status+')</div>';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('info').innerHTML = 
            '<div class="alert alert-danger">Error al conectar con el servidor</div>';
    });
}


function getContrastColor(hexColor) {
    
    const r = parseInt(hexColor.substr(1,2), 16);
    const g = parseInt(hexColor.substr(3,2), 16);
    const b = parseInt(hexColor.substr(5,2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#FFFFFF';
}

function logout() {
    localStorage.removeItem('token');
    location.href = '../index.html';
}

function tokenValidate() {
    const TOKEN = localStorage.getItem('token');
    if(!TOKEN || TOKEN !== 'QpwL5tke4Pnpja7X4') { 
        location.href = '../index.html';
    }
}