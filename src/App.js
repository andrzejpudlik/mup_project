import AppRouter from './components/AppRouter'
import axios from "axios";
import { AuthContextProvider } from './context/AuthContext'

axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthContextProvider>
      <AppRouter />
    </AuthContextProvider>
  )
}

export default App
