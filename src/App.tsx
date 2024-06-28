import './styles/index.scss';

import { AppProvider } from './context/AppContext';
import Navigation from './routes';
function App() {
  return (
    <AppProvider>
      <Navigation />
    </AppProvider>
  );
}

export default App;
