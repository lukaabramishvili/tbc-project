import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import "./layout/index.css"

export const metadata = {
    title: 'TBC',
    description: 'My App is a...',
}

export default function RootLayout({ children }) {
return (
    <html lang="en">
    <body>
        <Header/>
        <div id="root">{children}</div>
        <Footer/>
    </body>
    </html>
)
}