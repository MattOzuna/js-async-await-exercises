class Numbers{
    constructor(num){
        this.favNum = num
        this.numsArr = []
        this.baseURL = "http://numbersapi.com"
    }

    async getFact(num) {
        let response = await axios.get(`${this.baseURL}/${num}?json`)
        return response.data.text
        
    }
    
    async getMultipleFacts(arr){
        let response = await axios.get(`${this.baseURL}/${arr}`)
        return response.data
    }

    async addFact(container){
        const fact = await this.getFact(this.favNum)
        this.addFactToPage(fact, container)
    }

    async addFourFavNumFacts(container){
        let facts = await Promise.all([
            this.getFact(this.favNum),
            this.getFact(this.favNum),
            this.getFact(this.favNum),
            this.getFact(this.favNum)
        ])
    
        facts.forEach(fact => this.addFactToPage(fact, container))
    }

    async addFourRandomFacts(container){
        const arr = this.randomNumbers()
        const facts = await this.getMultipleFacts(arr)
        for (let key in facts){
            this.addFactToPage(facts[key], container)
        }
    }

    addFactToPage(fact, container) {
        fact
        $(`<li class="list-group-item">${fact}</li>`).appendTo(`.facts-container-${container}`)
    }

    randomNumbers() {
        for (let i = 0; i < 4; i++){
            this.numsArr.push(Math.floor(Math.random() * 100)+1)
        }
        return this.numsArr
    }
}

const myNum = new Numbers(2)

//============================================== #1 ===========================================================//

myNum.addFact(1)

//============================================== #2 ===========================================================//

myNum.addFourRandomFacts(2)

//============================================== #3 ===========================================================//

myNum.addFourFavNumFacts(3)