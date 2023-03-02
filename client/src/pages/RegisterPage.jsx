import React from 'react'
import { Link } from 'react-router-dom'

const RegisterPage = () => {
  return (
    <div className='mt-4 grow flex items-center justify-center'>
        <div className='-mt-32'>
            <h1 className='text-4xl text-center mb-4'>Register</h1>
            <form className='max-w-md mx-auto'>
                <input type="text" placeholder="John Doe" />
                <input type="email" placeholder="your@email.com" />
                <input type="password" placeholder="Password" />
                <button className='my-1 primary'>Register</button>
                <div className='text-gray-500 text-center py-2'>
                    Already a member ? <Link className='transition underline text-black hover:text-primary' to={'/login'}>Login here</Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default RegisterPage