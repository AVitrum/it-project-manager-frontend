import { useSelector } from "react-redux"
import { selectCurrentUser, selectCurrentToken } from "../features/auth/authSlice"
import { Link } from "react-router-dom"

const Welcome = () => {
    const user = useSelector(selectCurrentUser)
    const token = useSelector(selectCurrentToken)

    const welcome = user ? `Welcome ${user}!` : 'Welcome!'

    const content = (
        <section className="welcome">
            <h1>{welcome}</h1>
            <p><Link to="/profile">Go to the Profile</Link></p>
        </section>
    )

    return content
}
export default Welcome