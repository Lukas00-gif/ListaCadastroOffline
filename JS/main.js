const KEY_BD = '@seriesBD'

let listaRegistro = {
    ultimoIDGerado: 0,
    series: []
}

function gravarBD(){
    localStorage.setItem(KEY_BD, JSON.stringify(listaRegistro))
}

function lerBD(){
    const data = localStorage.getItem(KEY_BD)
    if (data){
        listaRegistro = JSON.parse(data)
    }
    desenhar()
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
                    <td>
                     <button onClick='visualizar("cadastro",false,${serie.id})'>Editar</button>
                     <button class="vermelho" onclick='perguntaSeDeleta(${serie.id})'>Deletar</button>
                    </td>
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
    gravarBD()
    desenhar()
    visualizar('lista')
}

function editSerie (id, nomeSerie, temp, status, stream){
    let serie = listaRegistro.series.find(series => series.id ==id)
    serie.NomeSerie = nomeSerie;
    serie.Temp = temp;
    serie.Stream = stream;
    serie.Status = status;
    gravarBD()
    desenhar()
    visualizar('lista')
}

function deleta (id){
    listaRegistro.series = listaRegistro.series.filter(serie =>{
        return serie.id != id
    });
    gravarBD()
    desenhar()
}

function perguntaSeDeleta(id){
    if (confirm('Que deletar a serie?')){
        deleta(id)
    }

}

function limpar(){
    document.getElementById('nomeSerie').value = ''
    document.getElementById('temp').value = ''
    document.getElementById('status').value = ''
    document.getElementById('stream').value = ''
}


function visualizar(pagina, novo = false, id = null){
    document.body.setAttribute('page',pagina);
    if (pagina === 'cadastro'){
        if (novo) limpar()
        if (id){
            const serie = listaRegistro.series.find(serie => serie.id == id);
            if (serie){
                document.getElementById('id').value = serie.id
                document.getElementById('nomeSerie').value = serie.NomeSerie
                document.getElementById('temp').value = serie.Temp
                document.getElementById('status').value = serie.Status
                document.getElementById('stream').value = serie.Stream
            }
        }
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
        editSerie(data.id, data.nomeSerie, data.temp, data.status, data.stream)
    } else {
        insertSerie(data.nomeSerie, data.temp, data.status, data.stream)
    }
}

window.addEventListener('load', () =>{
    lerBD()
    document.getElementById('cadastroRegistro').addEventListener('submit', submeter)
})

