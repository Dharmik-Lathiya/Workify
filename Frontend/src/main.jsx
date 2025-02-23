import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserDetailsProvider } from './Context/UserDetailsContext.jsx';
import { ClientDetailsProvider } from "/src/Context/ClientDetailsContext.jsx";
import { UserProvider } from './Context/HeaderComponent'; // ✅ Ensure correct file import


createRoot(document.getElementById('root')).render(
  <UserDetailsProvider>
    <ClientDetailsProvider>
      <UserProvider>
        
        <BrowserRouter >
          <App />
        </BrowserRouter>

      </UserProvider>
    </ClientDetailsProvider>
  </UserDetailsProvider>
  ,
)
