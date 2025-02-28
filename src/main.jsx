import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import { router } from './router/Router'
import { RouterProvider } from 'react-router-dom'

createRoot(document.getElementById('root')).render(<RouterProvider router={router} />)
