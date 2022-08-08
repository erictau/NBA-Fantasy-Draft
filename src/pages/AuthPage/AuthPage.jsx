import SignUpForm from '../../components/SignUpForm/SignUpForm'
import LoginForm from '../../components/LoginForm/LoginForm'

export default function AuthPage({ setUser }) {
    return (
        <main>
            <SignUpForm setUser={setUser} />
            <h3 className="text-center mb-5">OR</h3>
            <LoginForm setUser={setUser} />
        </main>
    )
}