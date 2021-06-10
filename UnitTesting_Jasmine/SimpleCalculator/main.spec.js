describe("main.js", function() {
    describe("calculate()", function() {
        it("validates expression  when first number is invalid", function() {
            spyOn(window, 'updateResult');// .and.stub() is optional can be omitted
            Calculate('a+3');
            
            expect(window.updateResult).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith("Expression not recognized");
            expect(window.updateResult).toHaveBeenCalledTimes(1);
        })
        it("validates expression when second number is invalid", function() {
            spyOn(window, 'updateResult');
            Calculate('2+s');

            expect(window.updateResult).toHaveBeenCalledWith("Expression not recognized");
        })
        it("validates expression when operation is null", function() {
            spyOn(window, 'updateResult');
            Calculate('11');

            expect(window.updateResult).toHaveBeenCalledWith("Expression not recognized");
        })
        it("calls add", function() {
            const spy = spyOn(Calculator.prototype, 'add');
            Calculate('2+1');

            expect(spy).toHaveBeenCalledTimes(2);
            expect(spy).toHaveBeenCalledWith(1);
            expect(spy).toHaveBeenCalledWith(2);
        })
        it("calls subtract", function() {
            const spy = spyOn(Calculator.prototype, 'subtract');
            Calculate('7-5');

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).not.toHaveBeenCalledWith(7);
            expect(spy).toHaveBeenCalledWith(5);
        })
        it("calls multiply", function() {
            const spy = spyOn(Calculator.prototype, 'multiply');
            Calculate('5*9');

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).not.toHaveBeenCalledWith(5);
            expect(spy).toHaveBeenCalledWith(9);
        })
        it("calls divide", function() {
            const spy = spyOn(Calculator.prototype, 'divide');
            Calculate('3/2');

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).not.toHaveBeenCalledWith(3);
            expect(spy).toHaveBeenCalledWith(2);
        })
        it("calls updateResult(ex using callThrough)", function() {
            const spy = spyOn(window, 'updateResult');
            spyOn(Calculator.prototype, 'multiply').and.callThrough();
            Calculate('6*7');

            expect(spy).toHaveBeenCalled()
            expect(spy).toHaveBeenCalledWith(42)
        })
        // rare implementation
        it("calls updateResult(ex using callFake)", function() {
            const spy = spyOn(window, 'updateResult');
            spyOn(Calculator.prototype, 'multiply').and.callFake(function(number){
                return 'it works';
            });
            Calculate('6*7');

            expect(spy).toHaveBeenCalled()
            expect(spy).toHaveBeenCalledWith('it works')
        })
        it("calls updateResult(ex using return value)", function() {
            const spy = spyOn(window, 'updateResult');
            spyOn(Calculator.prototype, 'multiply').and.returnValue('whatever [multiply] return');
            Calculate('6*7');

            expect(spy).toHaveBeenCalled()
            expect(spy).toHaveBeenCalledWith('whatever [multiply] return')
        })
        //returnValues first time don't care, only second call return matters
        it("calls updateResult(ex using return values)", function() {
            const spy = spyOn(window, 'updateResult');
            spyOn(Calculator.prototype, 'add').and.returnValues('null','whatever [add] returns');
            Calculate('6+7');

            expect(spy).toHaveBeenCalled()
            expect(spy).toHaveBeenCalledWith('whatever [add] returns')
        })
        it("doesnot handle errors", function() {
            spyOn(Calculator.prototype, 'multiply').and.throwError('some error');
            expect(function() { Calculate('5*5') }).toThrowError('some error');
        })
    })

    describe("updateResult()", function() {
        beforeAll(function() {
            const element = document.createElement('div');
            element.setAttribute('id', 'result');

            document.body.appendChild(element);
            this.element = element;
        })
        afterAll(function() {
            document.body.removeChild(this.element);
        })
        it("adds result to DOM element", function() {
            updateResult('5');

            expect(this.element.innerText).toBe('5');
        })
    })

    xdescribe("show version", function() {
        it("calls calculator version", function() {
            spyOn(document, 'getElementById').and.returnValue({
                innerText: null
            })
            const spy = spyOnProperty(Calculator.prototype, 'version', 'get')
            showVersion();
            // expect(Object.getOwnPropertyDescriptor(Calculator.prototype, 'version').get).toHaveBeenCalled();
            // OR
            expect(spy).toHaveBeenCalled()
        })
    })
})