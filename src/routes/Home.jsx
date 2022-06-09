import React from 'react'
import LibrosListado from '../components/LibrosListado'
import { Navbar } from '../components/Navbar'

export const Home = () => {
  
  return (
      <>       
              
        <Navbar/>

        {
          <div>
            <LibrosListado></LibrosListado>            
          </div>
        }                   
      </>
  )
}
