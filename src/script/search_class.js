
class Ticker{
    constructor(name, price, open, dayLow, dayHigh){
        this.name = name;
        this.price = price;
        this.open = open;
        this.dayLow = dayLow;
        this.dayHigh = dayHigh;
    }
    getIntrinsicValue(){ // https://www.youtube.com/watch?v=nX2DcXOrtuo
        return 0;
    } 

    getChange(){
        return this.dayHigh - this.dayLow;
    }
}

module.exports = Ticker;