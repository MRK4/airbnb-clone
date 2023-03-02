import React from 'react'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  return (
    <div className='mt-4 grow flex items-center justify-center'>
        <div className='-mt-32'>
            <h1 className='text-4xl text-center mb-4'>Login</h1>
            <form className='max-w-md mx-auto'>
                <input type="email" placeholder="your@email.com" />
                <input type="password" placeholder="Password" />
                <button className='my-1 primary'>Login</button>
                <div className='text-gray-500 text-center py-2'>
                    Don't have any account yet ? <Link className='transition underline text-black hover:text-primary' to={'/register'}>Register now !</Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default LoginPage