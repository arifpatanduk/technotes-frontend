import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">Ragunan Repairs!</span></h1>
            </header>
            <main className="public__main">
                <p>Located in Beautiful Jakarta City, Ragunan Repairs  provides a trained staff ready to meet your tech repair needs.</p>
                <address className="public__addr">
                    Ragunan Repairs<br />
                    Pasar Minggu<br />
                    South Jakarta, 12550<br />
                    <a href="tel:+6285254590505">+62 85254590505</a>
                </address>
                <br />
                <p>Owner: Arif Patanduk</p>
            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>

    )
    return content
}
export default Public