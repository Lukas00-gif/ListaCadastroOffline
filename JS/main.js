let listaRegistro = {
    ultimoIDGerado: 0,
    series: [
        {id: 1, NomeSerie: 'The Witcher', Temp:'2', Status: 'Terminada', Stream:'Netflix'},
        {id: 2, NomeSerie: 'Vikins', Temp:'6', Status: 'Em Andamento', Stream: 'Netflix'},
        {id: 3, NomeSerie: 'Homen Do castelo alto', Temp:'2', Status: 'Proxima', Stream: 'Prime Video'}
    ]
}

function desenhar(){
    const tbody = document.getElementById('listaRegistroBody')
    if (tbody){
        tbody.innerHTML = listaRegistro.series
        .sort((a, b) =>{
            return a.nome < b.nome ? -1 : 1
        })
        .map(serie => {
            return `<tr>
                    <td>${serie.id}</td>
                    <td>${serie.NomeSerie}</td>
                    <td>${serie.Temp}</td>
                    <td>${serie.Status}</td>
                    <td>${serie.Stream}</td>
             </tr>`
        }).join('')
    }
}

function insertSerie (NomeSerie, Temp, Status, Stream){
    const id = listaRegistro.ultimoIDGerado + 1;
    listaRegistro.ultimoIDGerado = id;
    listaRegistro.series.push({
        id, NomeSerie, Temp, Status, Stream 
    })
    desenhar()
    visualizar('lista')
}

function editSerie (id, NomeSerie, Temp, Status, Stream){

}

function deletaData (id){

}


function visualizar(pagina){
    document.body.setAttribute('page',pagina);
    if (pagina === 'cadastro'){
        document.getElementById('nomeSerie').focus();
    }
}

function submeter(e){
    e.preventDefault();
    const data = {
        id: document.getElementById('id').value,
        nomeSerie: document.getElementById('nomeSerie').value,
        temp: document.getElementById('temp').value,
        status: document.getElementById('status').value,
        stream: document.getElementById('stream').value,
    }
    console.log(data)
    if (data.id){
        editSerie(...data)
    } else {
        insertSerie(data.nomeSerie, data.temp, data.status, data.stream)
    }
}

window.addEventListener('load', () =>{
    desenhar()
    document.getElementById('cadastroRegistro').addEventListener('submit', submeter)
})

