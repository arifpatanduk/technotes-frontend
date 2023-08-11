import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome!</h1>
            </header>
            <main className="public__main">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet suscipit massa. Phasellus suscipit efficitur neque finibus aliquet. Aliquam pulvinar justo eget ante egestas lacinia. Mauris auctor tellus non dictum vestibulum. Nullam dignissim, arcu at molestie porta, ipsum velit sagittis nulla, eget fringilla quam erat quis ipsum. Vestibulum auctor, urna id eleifend bibendum, lectus ex commodo diam, in tincidunt mi erat non leo. Ut vestibulum nibh eget massa tristique consequat. Nunc feugiat porta leo et tristique. Vivamus eget venenatis odio, nec lacinia neque. Quisque sed fermentum ante. Sed laoreet ex eget porttitor elementum. Aliquam erat volutpat. Proin fringilla cursus magna, eu accumsan nunc porta sit amet. Cras et purus vehicula, tristique eros vel, aliquam libero. Integer convallis ultrices dui a tristique. Suspendisse leo ante, mattis at nibh eget, porttitor malesuada enim.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet suscipit massa. Phasellus suscipit efficitur neque finibus aliquet.
                </p>
            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>

    )
    return content
}
export default Public