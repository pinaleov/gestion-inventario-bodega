import { getAll, remove, save, selectOne, update } from "./firestore.js"

let id = ''

document.getElementById('btnSave').addEventListener('click', () => {
    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id)
    })
    if (document.querySelectorAll('.is-invalid').length == 0) {
        const producto = {
            codigo: document.getElementById('codigo').value,
            nombre: document.getElementById('nombre').value,
            categoria: document.getElementById('categoria').value,
            cantidad: document.getElementById('cantidad').value,
            fecha: document.getElementById('fecha').value,
            proveedor: document.getElementById('proveedor').value,
            precio: document.getElementById('precio').value
        }
        if (id == '') {
            save(producto)
        } else {
            update(id, producto)
        }
        limpiar()
        id = ''
    }
})

window.addEventListener('DOMContentLoaded', () => {
    getAll(datos => {
        let tabla = ''
        datos.forEach(doc => {
            const item = doc.data()
            tabla += `<tr>
                <td>${item.codigo}</td>
                <td>${item.nombre}</td>
                <td>${item.categoria}</td>
                <td>${item.cantidad}</td>
                <td>${item.fecha}</td>
                <td>${item.proveedor}</td>
                <td>${item.precio}</td>
                <td nowrap>
                    <input type="button" class="btn btn-danger" value="Eliminar" id="${doc.id}">
                    <input type="button" class="btn btn-warning" value="Editar" id="${doc.id}">
                </td>
            </tr>`
        })
        document.getElementById('contenido').innerHTML = tabla
        document.querySelectorAll('.btn-danger').forEach(btn => {
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Está seguro de eliminar el registro?",
                    text: "No podrá revertir los cambios",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        remove(btn.id)
                        Swal.fire("Eliminado", "El registro ha sido eliminado.", "success")
                    }
                })
            })
        })
        document.querySelectorAll('.btn-warning').forEach(btn => {
            btn.addEventListener('click', async () => {
                const doc = await selectOne(btn.id)
                const producto = doc.data()
                id = doc.id
                document.getElementById('codigo').value = producto.codigo
                document.getElementById('codigo').readOnly = true
                document.getElementById('nombre').value = producto.nombre
                document.getElementById('categoria').value = producto.categoria
                document.getElementById('cantidad').value = producto.cantidad
                document.getElementById('fecha').value = producto.fecha
                document.getElementById('proveedor').value = producto.proveedor
                document.getElementById('precio').value = producto.precio
                document.getElementById('btnSave').value = 'Actualizar'
            })
        })
    })
})

