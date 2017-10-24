import homeView from './views/home'
import createView from './views/create'
import browseView from './views/browse'
import myWilsonView from './views/myWilson'

export default function initRouter(app) {
  app.route('/', homeView)
  app.route('/new', createView)
  app.route('/gallery', browseView)
  app.route('/my-wilson', myWilsonView)
}
