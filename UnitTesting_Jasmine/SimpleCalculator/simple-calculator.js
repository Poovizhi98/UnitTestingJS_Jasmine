function Calculator() {
    this.total = 0;
}

Calculator.prototype.add = function(number) {
    return this.total += number;
}

Calculator.prototype.subtract = function(number) {
    return this.total -= number;
}

Calculator.prototype.multiply = function(number) {
    return this.total *= number;
}

Calculator.prototype.divide = function(number) {
    if(number === 0) {
        throw new Error("Cannot divide by zero");
    }
    return this.total /= number;
}

Object.defineProperty(Calculator.prototype, 'version', {
    // get: function() {
    //     return 0.1;
    // },
    get: function() {
        return fetch('https://jsonplaceholder.typicode.com/posts/1').then(function(response){
            return response.json()
        }).then(function(result) {
            return result.id;
        })
    },
    enumerable: true,
    configurable: true
})
