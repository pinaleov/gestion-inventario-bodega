const verificar = (id) => {
    const input = document.getElementById(id)
    const div = document.getElementById('e-' + id)
    input.classList.remove('is-invalid')
    if (input.value.trim() == '') {
        input.classList.add('is-invalid')
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio.</span>'
    } else {
        input.classList.add('is-valid')
        div.innerHTML = ''
    }
}

const limpiar = () => {
    document.querySelector('form').reset()
    document.querySelectorAll('.form-control').forEach(item => {
        item.classList.remove('is-invalid')
        item.classList.remove('is-valid')
        document.getElementById('e-' + item.name).innerHTML = ''
    })
    document.getElementById('codigo').readOnly = false
    document.getElementById('btnSave').value = 'Guardar'
}

const soloNumeros = (e) => {
    if (e.keyCode >= 48 && e.keyCode <= 57) return true
    return false
}


