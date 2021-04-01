
const url = 'data/horticoles_car_imgs.json'
const solution = document.querySelector('.carte-info')
const nomLatin = document.querySelector('.nom-latin')
const nomFranc = document.querySelector('.nom-francais')
const famille = document.querySelector('.famille')
const btnNext = document.querySelector('.btn-next')
const btnNextKeep = document.querySelector('.btn-keep')
const btnDisplay = document.querySelector('.btn-display')
const images = document.querySelector('.images')
const counter = document.querySelector('.counter')

const imgs = document.querySelectorAll('.images')


const nbImagesDisplay = 3

let objPlantes = {}
let listPlantes =[]
let listImages = []
let nom
let nbPlants
let wikipedia
let googleImage

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

function fetchJsonInfos(){
    fetch(url)
    .then(response=>response.json())
    .then((plantes)=>{
        objPlantes = plantes

        Object.keys(plantes).forEach(name=>{
            listPlantes.push(name)
        })

        shuffle(listPlantes)
        nbPlants = listPlantes.length
        nextPlant()
        

    })

    btnNext.addEventListener('click', nextPlant)
    btnNextKeep.addEventListener('click',()=>{
        listPlantes.push(nom)
        shuffle(listPlantes)
        nextPlant()
    })
    
    //click sur image
    for(let i=0;i<imgs.length;i++){
        
        imgs[i].addEventListener('click',()=>{
            if(solution.style.display ==='none'){
                solution.style.display = 'block'
            }else{
                nextPlant()
            }
        })
    }
    //GOOGLE-IMAGE (touche q ou g) ET WIKIPEDIA (touche(w))
    document.addEventListener('keydown', (event) => {
        const nomTouche = event.key;
        if (nomTouche === 'w') {
            window.open(wikipedia, '_blank')
            return
        }else if (nomTouche === 'q' || nomTouche==='g' ) {
            window.open(googleImage, '_blank');
            return

        }
    })
}


fetchJsonInfos()

function nextPlant(){
    counter.innerText=`${listPlantes.length}/${nbPlants}`
    solution.style.display='none' 
    nom = listPlantes.pop()
    nomLatin.innerText = nom
    const car = objPlantes[nom]['caract']
    nomFranc.innerText = car['nom_fr']
    famille.innerText = car['famille']

    wikipedia = `https://fr.wikipedia.org/w/index.php?search=${nom.replace(' ','+')}`
    googleImage = `https://www.google.com/search?q=${nom.replace(' ','+')}&tbm=isch`

    listImages = objPlantes[nom]['images']

    shuffle(listImages)
    images.innerHTML = ''
    

    //affichage des premières images
    for(let i=0; i< nbImagesDisplay;i++){
        const img = document.createElement('img')
        img.src = listImages[i]
        images.appendChild(img)
    }
}

btnDisplay.addEventListener('click',()=> {
    if(solution.style.display==='none'){
        solution.style.display='block' 
    }else{
        solution.style.display='none'  
    }
     
})

// Scroll inifini

window.addEventListener('scroll', () => {

    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;

    if(clientHeight + scrollTop >= scrollHeight - 20){
        addImages(6)
    }

})

let index = nbImagesDisplay

function addImages(nb){
    if(index > listImages.length){
        return;
    }

    const arrToAdd = listImages.slice(index,index+nb)
    
    
    for(let i=0; i< nb;i++){
        const img = document.createElement('img')
        img.src = listImages[i]
        images.appendChild(img)
    }

    index += nb

}

