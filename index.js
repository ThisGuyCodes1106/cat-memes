import { catsData } from '/data.js'

const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const gifsCheckbox = document.getElementById('gifs-only-option')
const memeModal = document.getElementById("meme-modal")
const memeModalInner = document.getElementById("meme-modal-inner")
const modalCloseBtn = document.getElementById("meme-modal-close-btn")

emotionRadios.addEventListener('change', highlightCheckedOption)
modalCloseBtn.addEventListener('click', hideModal)
getImageBtn.addEventListener('click', renderCat)

function hideModal() {
    memeModal.style.display = "none"
}

function renderCat() {
    const catObject = getSingleCatObject()
    memeModal.style.display = "flex"
    memeModalInner.innerHTML = `
    <img src='images/${catObject.image}' class='cat-img'>`
}

function getSingleCatObject() {
    const catsArray = getMatchingCatsArray()
    
    if (catsArray.length === 1) {
        return catsArray[0]
    } else if (catsArray.length > 1) {
        const randomNumber = Math.floor(Math.random() * catsArray.length)
        const singleCat = catsArray[randomNumber]
        return singleCat
    }
}

function getMatchingCatsArray() {

    const isGif = gifsCheckbox.checked

    if (document.querySelector('input[type=radio]:checked')) {
        const selectedEmotion = document.querySelector('input[type=radio]:checked').value
        const matchingEmotionArray = catsData.filter(function(catMeme) {
            if (isGif) {
                return catMeme.emotionTags.includes(selectedEmotion) && catMeme.isGif
            } else {
                return catMeme.emotionTags.includes(selectedEmotion)
            }
        })
        return matchingEmotionArray
    }
}

function highlightCheckedOption(e){
    const radios = document.getElementsByClassName('radio')
    for (let radio of radios){
        radio.classList.remove('highlight')
    }
    // remove all instances of the highlight class
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function getEmotionsArray(cats){
    const emotionsArray = []    
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            if (!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}


function renderEmotionsRadios(cats){
        
    let radioItems = ``
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions){
        radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
            >
        </div>`
    }
    emotionRadios.innerHTML = radioItems
}

renderEmotionsRadios(catsData)




