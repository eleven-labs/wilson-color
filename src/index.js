import initRouter from './router'
import initStore from './store'

const log = require('choo-log')
const choo = require('choo')

const app = choo()
initRouter(app)
initStore(app)
app.use(log())
app.mount('#app')
