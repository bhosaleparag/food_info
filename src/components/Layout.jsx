import React from 'react';
import { Outlet ,useLoaderData} from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';


// export async function loader() {
//     return search("chicken")
// }

export default function Layout(){
    // const data = useLoaderData()
    // console.log(data)
    return(
        <>
            <Header/>
            <Outlet />
            <Footer />
        </>
    )
}