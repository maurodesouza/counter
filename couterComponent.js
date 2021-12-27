// IIFE Invoke Funcion Expression

(() => {
    const BTN_RESTART = 'btnRestart'
    const ID_COUNTER = 'counter'

    const INIT_COUNTER_VALUE = 100
    const INTERVAl = 10

    class CounterComponent {
        constructor() {
            this.getElements()
            this.preperCounterProxy()

            this.init()
        }

        getElements = () => {
            this.counterEl = document.getElementById(ID_COUNTER)
            this.btnRestart = document.getElementById(BTN_RESTART)

            this.addEvents()
        }

        addEvents = () => {
            this.btnRestart.addEventListener('click', this.init.bind(this))
        }

        preperCounterProxy() {
            const handler = {
                set: (context, key, newValue) => {

                    if (!context.value) this.stopCounter()
                    context[key] = newValue

                    return true
                }
            }

            this.counter = new Proxy({ value: INIT_COUNTER_VALUE }, handler)
        }

        updateCounter = () => {
            this.counterEl.innerHTML = `Starting in <strong>${this.counter.value--}</strong> seconds...`
        }

        stopCounter = () => {
            clearInterval(this.intervalId)

            this.disableRestartBtn(false)
        }

        disableRestartBtn = (disable = true) => {
            const attr = 'disabled'

            if (disable) this.btnRestart.setAttribute(attr, disable)
            else this.btnRestart.removeAttribute(attr) 
        }

        init() {
            this.counter.value = INIT_COUNTER_VALUE
            this.disableRestartBtn()

            this.intervalId = setInterval(this.updateCounter, INTERVAl)
        }
    }

    window.CounterComponent = CounterComponent
})()
