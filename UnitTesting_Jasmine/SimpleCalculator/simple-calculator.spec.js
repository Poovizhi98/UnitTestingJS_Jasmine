describe("calculator.js", function() {

    describe("Calculator constructor", function() {
        let calculator;
        beforeEach(function() {
            calculator = new Calculator();
        });

        afterEach(function() {

        });

        describe("Custom matchers", function() {
            it("can be instantiated", function() {
                jasmine.addMatchers(customMatchers);
               
                expect(calculator).toBeCalculator();
                expect(2).not.toBeCalculator();
                expect(calculator.total).toBeNumber();
            })
        })
        
        describe("add()", function() {
            it("should add numbers to the total", function() {
                calculator.add(5)
        
                expect(calculator.total).toBe(5);
                // calculator.add(5)
                // expect(calculator.total).toBe(10);
            })

            it("returns total", function() {
                calculator.total = 20;
                calculator.add(5)
        
                expect(calculator.total).toBe(25);  
                expect(calculator.total).toMatch(/-?\d+/)  
                expect(typeof calculator.total).toMatch("number");  
                expect(calculator.total).toEqual(jasmine.anything());
                expect(function() {}).toEqual(jasmine.anything()); // fail for null & undefined 
            })
        })

        describe("subtract()", function() {
            it("should subtract numbers to the total", function() {
                calculator.total = 10;
                calculator.subtract(3)
        
                expect(calculator.total).toBe(7);
            })
        })

        describe("multiply()", function() {
            it("should multiply total by number", function() {
                calculator.total = 10;
                calculator.multiply(3)
        
                expect(calculator.total).toBe(30);
            })

            it("doesn't handle NaN", function() {
                calculator.total = 10;
                calculator.multiply("a")
        
                expect(calculator.total).toBeNaN();
            })
        })

        describe("divide()", function() {
            it("should divide total by number", function() {
                calculator.total = 30;
                calculator.divide(3)
        
                expect(calculator.total).toBe(10);
            })

            it("handles divide by zero", function() {
                calculator.total = 30;
                expect(function() { calculator.divide(0) } ).toThrow()
                expect(function() { calculator.divide(0) } ).toThrowError(Error,"Cannot divide by zero")
        
                // expect(calculator.total).toThrowError("Cannot divide by zero");
            })
        })

        describe("get version", function() {
            // it("fetches version from external source", function() {
            //     spyOn(window, 'fetch').and.returnValue(Promise.resolve(
            //         new Response('{ "id": 1 }')
            //     ));

            //     calculator.version.then(function(version) {
            //         expect(version).toBe(1);
            //         // done();
            //     })
            // })
            //  OR
            it("fetches version from external source",async function(done) {
                spyOn(window, 'fetch').and.returnValue(Promise.resolve(
                    new Response('{ "id": 1 }')
                ))
                const version = await calculator.version;
                expect(version).toBe(1);
                done();
            })
        }) 
    })   
})
