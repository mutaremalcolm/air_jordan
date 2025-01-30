import Image from 'next/image';

interface FooterProps {
    //Props Here
}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className='fixed flex flex-wrap items-center justify-center w-full z-20 px-2 py-3 bg-gradient-to-r from-gray-700 via-gray-900 to-black bottom-0 left-0 shadow-[0px_2px_11px_12px_rgba(0,_0,_0,_0.4)]'>
        <p className='text-white'>2025 | Built by <a href='https://github.com/mutaremalcolm' className='text-blue-500'>Malcolm Mutare</a></p>
    </footer>
  )
}

export default Footer