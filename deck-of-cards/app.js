

class Deck{
    constructor(){
        this.baseURL = 'https://deckofcardsapi.com/api/deck/'
    }

    async getDeckId(){
        const deck = await axios.get(`${this.baseURL}/new/shuffle/?deck_count=1`)
        this.deck_id = deck.data.deck_id
    }

    async drawCard(){
        const card = await axios.get(`${this.baseURL}/${this.deck_id}/draw/?count=1`)
        return card.data.cards
    }

}



let deck = new Deck()

async function drawAndShow(e){
    try{
        e.preventDefault()
        let angle = Math.random() * 90 - 45;
        let randomX = Math.random() * 40 - 20;
        let randomY = Math.random() * 40 - 20;

        let card = await deck.drawCard()

        $(`<img 
                src="${card[0].image}" 
                alt="${card[0].value} of ${card[0].suit}" 
                class="z-n1 position-absolute"
                style="transform: translate(${randomX}px, ${randomY}px) rotate(${angle}deg)">`)
            .appendTo('.deck-container')
    } catch{
        alert('Out of Cards')
    }
}

$('button').hide()
$('button').on('click', drawAndShow)



async function app() {
    await deck.getDeckId()
    //============================================== #1 ===========================================================//

    console.log('=========Get One Card=========')
    let card = await deck.drawCard()
    console.log(`${card[0].value} of ${card[0].suit}`)

    //============================================== #2 ===========================================================//

    console.log('=========Get Two Cards========')
    let twoCards = await Promise.all([
        deck.drawCard(),
        deck.drawCard()
    ])
    twoCards.forEach(card => console.log(`${card[0].value} of ${card[0].suit}`))

    //============================================== #3 ===========================================================//

    $('button').show()

}

app()



