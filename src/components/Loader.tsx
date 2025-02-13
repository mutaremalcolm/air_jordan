import FadeLoader from 'react-spinners/FadeLoader';

const Loader: React.FC = () => {
    return (
        <>
            <div className='flex flex-col justify-center w-full'>
                <FadeLoader 
                    color='#36d7b7'
                    loading
                />
            </div>
            <h1 className='m-auto text-3xl bg-gradient-t0-r from-sky-600 to-cyan-500 bg-clip-text text-tranparent'>Loading...</h1>
        </>
    )

}


export default Loader