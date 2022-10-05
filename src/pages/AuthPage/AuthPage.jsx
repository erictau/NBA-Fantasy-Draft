import './AuthPage.css'
import SignUpForm from '../../components/SignUpForm/SignUpForm'
import LoginForm from '../../components/LoginForm/LoginForm'

export default function AuthPage({ setUser }) {
    return (
        <main>
            <h2 className="m-0">NBA Fantasy Draft</h2>
            <SignUpForm setUser={setUser} />
            <h3 className="text-center mb-5">OR</h3>
            <LoginForm setUser={setUser} />
        </main>
    )
}