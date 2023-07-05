import { Nunito } from 'next/font/google'
import './globals.css'
import Navbar from './components/navbar/Navbar'
import ClientOnly from './components/ClientOnly'
import RegisterModel from './components/modals/RegisterModel'
import ToasterProvider from './providers/ToasterProvider'
import LoginModel from './components/modals/LoginModel'
import getCurrentUser from './actions/getCurrentUser'
import RentModel from './components/modals/RentModel'
import SearchModel from './components/modals/SearchModel'



const font = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Tripsen',
  description: 'Tripsen.sen',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider/>
          <SearchModel/>
          <RentModel/>
          <LoginModel/>
          <RegisterModel/>
          <Navbar currentUser={currentUser}/>
        </ClientOnly>
        
        <div className='pb-20 pt-28'>
        {children}
        </div>
        
        </body>
    </html>
  )
}
