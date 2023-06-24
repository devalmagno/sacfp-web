import { AuthProvider } from './contexts';

import './App.scss';
import Router from './Router';

function App() {

  return (
    <div className="App">
      <AuthProvider>
        <Router />
      </AuthProvider>
    </div>
  )
}

export default App
