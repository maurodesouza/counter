// IIFE Invoke Funcion Expression

(() => {
    const BTN_RESTART = 'btnRestart'
    const ID_COUNTER = 'counter'

    const COUNTER_VALUE = 100
    const INTERVAl = 10

    class CounterComponent {
        constructor() {
            this.init()
        }

        preperCounterProxy() {
            const handler = {
                set: (currentContext, propertyKey, newValue) => {
                    if (!currentContext.value) currentContext.stop()
                    
                    currentContext[propertyKey] = newValue

                    return true
                }
            }

            const counter = new Proxy({
                value: COUNTER_VALUE,
                stop: () => {}
            }, handler)

            return counter
        }

        updateText = ({ counterEl, counter }) => () => {
            const identifier = '$$counter'
            const defaultText = `Starting in <strong>${identifier}</strong> seconds...`

            counterEl.innerHTML = defaultText.replace(identifier, counter.value--)
        }

        stopCounter(idInterval) {
            return () => {
                clearInterval(idInterval)

                this.disableButton(false)
            }
        }

        restartCounter = (btnRestart, fn) => {
            btnRestart.addEventListener('click', fn.bind(this))

            return (disabled = true) => {
                const attr = 'disabled'

                if (disabled) btnRestart.setAttribute(attr, disabled)
                else btnRestart.removeAttribute(attr) 
            }
        }

        init() {
            const counterEl = document.getElementById(ID_COUNTER)
            const btnRestart = document.getElementById(BTN_RESTART)

            const counter = this.preperCounterProxy()
            const args = { counterEl, counter }

            const fn = this.updateText(args)
            const idInterval = setInterval(fn, INTERVAl)

            const disableButton = this.restartCounter(btnRestart, this.init)
            disableButton()

            {
                const fn = this.stopCounter.apply({ disableButton }, [idInterval])
                counter.stop = fn
            }
        }
    }

    window.CounterComponent = CounterComponent
})()
