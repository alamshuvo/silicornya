import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { persistor, store } from './redux/store.js'
import router from './routes/routes.jsx'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router}></RouterProvider>
      </PersistGate>
    </Provider>
    <Toaster></Toaster>
  </StrictMode>,
)
