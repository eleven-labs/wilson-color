import homeView from './views/home'
import createView from './views/create'
import galleryView from './views/gallery'

export default function initRouter (app) {
  app.route('/', homeView)
  app.route('/new', createView)
  app.route('/gallery', galleryView)
  app.route('/my-wilson/:id', galleryView)
}
