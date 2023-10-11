fetch('https://striveschool-api.herokuapp.com/books')
  .then((res) => {
    if (res.ok) {
      return res.json()
    } else {
      if (res.status === 404) {
        throw new Error('404 - Not Found')
      } else if (res.status === 500) {
        throw new Error('500 - Internal Server Error')
      } else {
        throw new Error('Errore generico')
      }
    }
  })
  .then((libreria) => {
    console.log('Libreria', libreria)
    // const titolo = document.getElementById('titolo')
    // const newTitolo = document.createElement('span')
    // newTitolo.innerText = libreria[0].title
    // titolo.appendChild(newTitolo)

    const libreriaRow = document.getElementById('libreriaRow')
    libreria.forEach((libreria) => {
      const col = document.createElement('div')
      col.classList.add('col', 'col-12', 'col-md-6', 'col-lg-3')
      const card = document.createElement('div')
      card.classList.add('card')
      card.setAttribute('style', 'height: 100%')
      const cardImg = document.createElement('img')
      cardImg.setAttribute('src', libreria.img)
      cardImg.classList.add('img-fluid')

      card.appendChild(cardImg)
      col.appendChild(card)
      libreriaRow.appendChild(col)
      const carddiv = document.createElement('div')
      carddiv.classList.add('card-body')
      card.appendChild(carddiv)
      const cardbodyH5 = document.createElement('h5')
      cardbodyH5.classList.add('card-title', 'fs-6')
      cardbodyH5.innerHTML =
        `<span class="text-info fs-5">Titolo: </span> ` + libreria.title
      carddiv.appendChild(cardbodyH5)
      const cardbodyP = document.createElement('p')
      cardbodyP.classList.add('card-text')
      cardbodyP.innerHTML =
        `<span class="text-info fs-5"> Prezzo: </span>` +
        libreria.price +
        `<span class="fs-6"> $</span>`
      carddiv.appendChild(cardbodyP)
      const cardbodyButton = document.createElement('button')
      cardbodyButton.innerText = `Elimina`
      cardbodyButton.classList.add('btn', 'btn-primary')
      cardbodyButton.setAttribute('type', 'button')
      carddiv.appendChild(cardbodyButton)
    })
  })
  .catch((err) => {
    console.log(err)
  })
