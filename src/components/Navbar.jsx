import React from 'react'

const Navbar = () => {
    return (
        <nav className="flex justify-center fixed top-0 w-full bg-black opacity-80 text-white p-2 ">
            <div className="logo">
                <span className="font-bold text-xl mx-8">Task Manager</span>
            </div>
           
        </nav>
    )
}

export default Navbar
