import { Router, Route } from 'wouter';
import { VerdeVivo } from './pages/VerdeVivo';
import { CategoriaPage } from './pages/Categoria';

function App() {
  return (
    <Router>
      <Route path="/" component={VerdeVivo} />
      <Route path="/categoria/:nombre">
        {(params) => <CategoriaPage categoria={decodeURIComponent(params.nombre)} />}
      </Route>
      
      <Route path="*">
        {() => (
          <div className="flex items-center justify-center min-h-screen bg-[#FCFCF8]">
            <div className="text-center">
              <h1 className="font-serif text-4xl text-[#20362A] mb-4">404 - Página no encontrada</h1>
              <a href="/" className="text-[#2E5E3E] font-medium hover:underline">
                Volver al inicio
              </a>
            </div>
          </div>
        )}
      </Route>
    </Router>
  );
}

export default App;