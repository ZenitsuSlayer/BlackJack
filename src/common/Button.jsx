export default function Button ({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className='relative inline-flex items-center justify-center px-5 py-3 overflow-hidden font-medium text-white transition-all duration-300 bg-purple-600 rounded-lg shadow-lg group'
    >
      <span className='absolute inset-0 w-full h-full transition-all duration-300 transform bg-purple-700 group-hover:translate-x-full ease-out'></span>
      <span className='absolute inset-0 w-full h-full transition-all duration-300 transform translate-x-full bg-purple-500 group-hover:translate-x-0 ease-out'></span>
      <span className='relative'>{children}</span>
    </button>
  )
}
