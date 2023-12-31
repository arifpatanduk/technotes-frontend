import { useEffect, useRef, useState } from "react"
import { useNavigate, Link } from 'react-router-dom'

import { useLoginMutation } from "./authApiSlice"
import { setCredentials } from "./authSlice"
import { useDispatch } from 'react-redux'
import usePersist from "../../hooks/usePersist"


const Login = () => {

  const userRef = useRef()
  const errRef = useRef()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [persist, setPersist] = usePersist()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation()

  // set focus to username
  useEffect(() => {
    userRef.current.focus()
  }, [])

  // clear errMsg if username or password changed
  useEffect(() => {
    setErrMsg('')
  }, [username, password])


  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      // get accessToken from login mutation
      const { accessToken } = await login({username, password}).unwrap()

      dispatch(setCredentials({ accessToken }))

      setUsername('')
      setPassword('')
      navigate('/dash')
    } catch (err) {
      if (!err.status) setErrMsg('No Server Response')
      else if (err.status === 400) setErrMsg('Missing username or password')
      else if (err.status === 401) setErrMsg('Unauthorized')
      else setErrMsg(err.data?.message)

      // set focus to error message
      errRef.current.focus()
    }
  }

  const handleUserInput = (e) => setUsername(e.target.value)
  const handlePwdInput = (e) => setPassword(e.target.value)
  const handleToggle = () => setPersist(prev => !prev)

  const errClass = errMsg ? 'errmsg' : 'offscreen'
  if (isLoading) return <p>Loading...</p>


  const content = (
    <section className="public">
      <header>
        <h1>Employee Login</h1>
      </header>
      <main className="login">
        <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>

        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input 
            className="form__input"
            type="text"
            id="username"
            ref={userRef}
            value={username}
            onChange={handleUserInput}
            autoComplete="off"
            required
          />
          <label htmlFor="password">Password:</label>
          <input 
            className="form__input"
            type="password"
            id="password"
            value={password}
            onChange={handlePwdInput}
            required
          />
          <button className="form__submit-button">Sign In</button>

          <label htmlFor="persist" className="form__persist">
            <input
              type="checkbox"
              className="form__checkbox"
              id="persist"
              onChange={handleToggle}
              checked={persist}
            />
            Trus this Device
          </label>

        </form>
      </main>
      <footer>
        <Link to='/'>Back to Home</Link>
      </footer>
    </section>
  )

  return content
}

export default Login