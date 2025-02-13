import FadeLoader from 'react-spinners/FadeLoader';

const Loader: React.FC = () => {
    return (
        <>
            <div className='flex flex-col justify-center w-full'>
                <FadeLoader 
                    color='#36d'
                />
            </div>
        </>
    )

}


export default Loader