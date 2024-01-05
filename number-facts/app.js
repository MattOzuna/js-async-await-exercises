class Numbers{
    constructor(num){
        this.favNum = num
        this.numsArr = []
        this.baseURL = "http://numbersapi.com"
    }

    async getFact(num) {
        let response = await axios.get(`${this.baseURL}/${num}`)
        return response.data
        
    }
    
    async getMultipleFacts(arr){
        let response = await axios.get(`${this.baseURL}/${arr}`)
        return response.data
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

const fact = async function() {
    const fact = await myNum.getFact(myNum.favNum)
    myNum.addFactToPage(fact, 1)
}
fact()

//============================================== #2 ===========================================================//

const fourRandomFacts = async function() {
    const arr = myNum.randomNumbers()
    const facts = await myNum.getMultipleFacts(arr)
    for (let key in facts){
        myNum.addFactToPage(facts[key], 2)
    }
}
fourRandomFacts()

//============================================== #3 ===========================================================//

const fourFacts = async function() {
    let facts = await Promise.all([
        myNum.getFact(myNum.favNum),
        myNum.getFact(myNum.favNum),
        myNum.getFact(myNum.favNum),
        myNum.getFact(myNum.favNum)
    ])
    
    for (let fact of facts){
        myNum.addFactToPage(fact, 3)
    }
}

fourFacts()