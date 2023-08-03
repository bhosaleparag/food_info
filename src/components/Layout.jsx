import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';


// export async function loader() {
//     return search("chicken")
// }

export default function Layout(){
    // const data = useLoaderData()
    return(
        <>
            <Header/>
            <Outlet />
            <Footer />
        </>
    )
}