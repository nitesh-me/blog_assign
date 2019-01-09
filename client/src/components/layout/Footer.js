import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 p-2 text-center fixed-bottom">
        Copyright &copy; {new Date().getFullYear()}  N-Blog
    </footer>
  )
}
