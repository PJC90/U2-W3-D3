const renderBooks = function (libreria) {
  libreria.forEach((libreria) => {
    //creo le colonne
    const newCol = document.createElement('div')
    newCol.classList.add('col', 'col-12', 'col-md-6', 'col-lg-3')
    //creo una card
    const newCard = document.createElement('div')
    newCard.classList.add('card')
    newCard.style.height = '700px'
    newCard.innerHTML = `
            <img src="${libreria.img}" class="card-img-top" alt="${libreria.title}" />
            <div class="card-body">
                <h5 class="card-title">${libreria.title}</h5>
                <p class="card-text">${libreria.price}</p>
                <button class="btn btn-primary" onclick="eliminaCard(event)">Scarta</button>
                <button class="btn btn-success" onclick="aggiungiAlCarrello(event)">Add to cart</button>
            </div>`
    newCol.appendChild(newCard)
    const row = document.getElementById('libreriaRow')
    row.appendChild(newCol)
  })
}

const eliminaCard = function (e) {
  console.log('elimino', e.target.closest('.col'))
  e.target.closest('.col').remove()
  // il metodo closest() trova il match più vicino tra l'elemento su cui lo chiamate e il selettore CSS che inserite tra le () risalendo il dom
}

const aggiungiAlCarrello = function (e) {
  // cliccando il bottone add to cart mi deve stampare il titolo del libro nel carrello
  //quindi mi serve un selettore che mi ritrova h5
  console.log(e.target.parentElement.querySelector('h5').innerText)
  const titoloLibro = e.target.parentElement.querySelector('h5').innerText
  //creo nuovi li e li appendo alla ul
  const carrelloUl = document.getElementById('carrello')
  const newLi = document.createElement('li')
  newLi.classList.add(
    'd-flex',
    'justify-content-between',
    'align-items-center',
    'border-bottom'
  )
  newLi.innerText = titoloLibro
  carrelloUl.appendChild(newLi)
  // ad ogni li creato aggiungo anche il suo bottone di elimina
  const deleteButton = document.createElement('button')
  deleteButton.classList.add('btn', 'btn-danger', 'm-2')
  deleteButton.innerText = 'Rimuovi'
  newLi.appendChild(deleteButton)
  //elimino li
  deleteButton.addEventListener('click', function (e) {
    const removeLi = e.target.parentElement
    //parent element sarebbe li
    removeLi.remove()
  })
}

fetch('https://striveschool-api.herokuapp.com/books')
  .then((res) => {
    if (res.ok) {
      return res.json()
    } else {
      throw new Error('404 - Not Found')
    }
  })

  .then((libri) => {
    console.log('Libreria', libri)
    renderBooks(libri)
  })
  .catch((err) => {
    console.log(err)
  })

// primo approccio (folle) creando ogni singolo elemento e appenderlo, sopra invece hoo creato un innerHTML

// const libreriaRow = document.getElementById('libreriaRow')
//     libreria.forEach((libreria) => {
//       const col = document.createElement('div')
//       col.classList.add('col', 'col-12', 'col-md-6', 'col-lg-3')
//       const card = document.createElement('div')
//       card.classList.add('card')
//       card.setAttribute('style', 'height: 100%')
//       const cardImg = document.createElement('img')
//       cardImg.setAttribute('src', libreria.img)
//       cardImg.classList.add('img-fluid')

//       card.appendChild(cardImg)
//       col.appendChild(card)
//       libreriaRow.appendChild(col)
//       const carddiv = document.createElement('div')
//       carddiv.classList.add('card-body')
//       card.appendChild(carddiv)
//       const cardbodyH5 = document.createElement('h5')
//       cardbodyH5.classList.add('card-title', 'fs-6')
//       cardbodyH5.innerHTML =
//         `<span class="text-info fs-5">Titolo: </span> ` + libreria.title
//       carddiv.appendChild(cardbodyH5)
//       const cardbodyP = document.createElement('p')
//       cardbodyP.classList.add('card-text')
//       cardbodyP.innerHTML =
//         `<span class="text-info fs-5"> Prezzo: </span>` +
//         libreria.price +
//         `<span class="fs-6"> $</span>`
//       carddiv.appendChild(cardbodyP)
//       const cardbodyButton = document.createElement('button')
//       cardbodyButton.innerText = `Elimina`
//       cardbodyButton.classList.add('btn', 'btn-primary')
//       cardbodyButton.setAttribute('type', 'button')
//       carddiv.appendChild(cardbodyButton)
