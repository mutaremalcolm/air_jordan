import React from 'react';

const AboutModal: React.FC = () => {
    const [showModal, setShowModal] = React.useState(false);
    return (
        <>
            <button
                className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hovertext-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                type='button'
                onClick={() => setShowModal(true)}
            >
                About
            </button>
            {showModal ? (
                <>
                    <div
                    className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'
                    >
                        <div className='relative w-auto my-6 mx-auto max-w-3xl'>
                            {/*content */}
                            <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none
                             bg-slate-950 bg-clip-pading backdrop-filter backdrop-slur-sm bg-opacity-50 border-gray-100'>
                                {/* header */}
                                <div className='flex items-start justify-between p-5 border-b border-solid sorder-slate-200 rounded-t'>
                                    <h3>
                                        About Air Jordan
                                    </h3>
                                    <button
                                    className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                                    onClick={() => setShowModal(false)}
                                    >
                                    <span className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>
                                        x
                                    </span>
                                    </button>
                                </div>
                                {/* Body */}
                                <div className='relative p-6 flex-auto'>
                                    <p className='my-4 text-slate-200 text-lg leading-relaxed'>
                                        Welcome to Air Jordan! An air pollution data dashboard. 
                                        <br />
                                        <br />
                                        Seamlessly developed with Typescript, React, Tailwind CSS, and Next.js,
                                        this app allows you to effortlessly search for cities and view real-time air quality data.
                                        It combines user friendly design with accurate data fetched from OpenWeather&apos;s Geocoding API and Air Pollution API.
                                        Whether you&apos;re planning a trip, concerned about your local environment, or just curious, Aero provides valueable insights into the air you breathe.
                                    </p>
                                </div>
                                {/* Footer */}
                                <div className='flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b'>
                                    <button
                                     className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                                     type='button'
                                     onClick={() => setShowModal(false)}
                                    >
                                    Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
                </>
            ) : null}
        </>
    );
}

export default AboutModal;