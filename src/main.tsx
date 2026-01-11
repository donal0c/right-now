import { render } from 'preact'
import { LocationProvider, Router, Route } from 'preact-iso'
import './index.css'
import { path } from './utils/paths'

// Pages
import { Home } from './pages/Home'
import { Refine } from './pages/Refine'
import { Exercise } from './pages/Exercise'
import { About } from './pages/About'
import { NotFound } from './pages/NotFound'

function App() {
  return (
    <LocationProvider>
      <Router>
        <Route path={path('/')} component={Home} />
        <Route path={path('/s/:state')} component={Refine} />
        <Route path={path('/x/:exerciseId')} component={Exercise} />
        <Route path={path('/about')} component={About} />
        <Route default component={NotFound} />
      </Router>
    </LocationProvider>
  )
}

render(<App />, document.getElementById('app')!)
