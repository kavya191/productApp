import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
const LazyLogin = React.lazy(() => import('./Pages/Login/Login'))
const LazyRegister = React.lazy(() => import('./Pages/Register/Register'))
const LazyProducts = React.lazy(() => import('./Pages/Products/Products'))
const LazyProfile = React.lazy(() => import('./Pages/Profile/Profile'))
const LazyViewproduct = React.lazy(() => import('./Pages/Viewproduct/Viewproduct'))
const LazyCart = React.lazy(() => import('./Pages/Cart/Cart'))
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import { AppProvider } from './Context/AppContext';

function App() {
  return (
    <div>
      <AppProvider>
        <Header />
        <Routes>
          <Route path='/' element={<React.Suspense fallback='loading...'><LazyLogin /></React.Suspense>} />
          <Route path='/register' element={<React.Suspense><LazyRegister /></React.Suspense>} />
          {/* <Route path='/profile' element={<React.Suspense><LazyProfile /></React.Suspense>} /> */}
          <Route path='/products' element={<React.Suspense><LazyProducts /></React.Suspense>} />
          <Route path='/viewproduct/:id' element={<React.Suspense><LazyViewproduct /></React.Suspense>} />
          <Route path='/cart' element={<React.Suspense><LazyCart /></React.Suspense>} />
        </Routes>
      </AppProvider>
      <Footer />
    </div>


  )
}

export default App
