import CountUp from 'react-countup';
import { Tooltip } from 'react-tooltip';
import Image from 'next/image';
import TooltipIcon from '../../../public/icons8-info-16.png';
import { interFontClass } from '@/lib/fonts';
import { pollutantGases } from '@/lib/constants';

interface AirDataGridProps {
    data: any;
    end: any | undefined;
    value: number;
}

const AirDataGrid: React.FC<AirDataGridProps> = ({ data }) => {
    return (
        <>
        <div id='data-grid' className={`text-lg text-center p-4 flex flex-col ${interFontClass} font-sans grid grid-cols-3 grid-rows-3 rounded-2xl bg-black bg-clip-padding background-filter background-blur-md bg-opacity-20 border border-gray-100` }>
            {Object.entries(data.components).map(([key, value]) => (
                <div key={key} className='flex flex-col justify-center w-full xl:h-14 border-0 rounded-md p-1 bg-gray-100 bg-clip-padding backdrop-filter backdrop-blur-none bg-opacity-20 border-gray-100 shadow-[0_8px_30px_rgb(0,0,0.12)]'>
                    <div className='flex flex-row justify-between w-full'>
                    <p className=' text-sm font-light text-gray-200 flex flex-row justify-between'>{key}:</p>
                    <Image data-tooltip-id={key} src={TooltipIcon} alt='info icon' width={16} />
                </div>
                <h3 className='text-center font-medium text-sm text-white w-full lg:mt-auto' key={key}>
                    <CountUp end={value as number} duration={6} decimals={2} decimal='.' />
                </h3>

                {/* POLLUTANT TOOLTIPS */}
                {pollutantGases.map((pollutant) => (
                    <Tooltip key={pollutant.ab} id={pollutant.ab}>
                        <div className='w-64'>
                            <strong>{pollutant.name}</strong>
                            <p className=' text-sm'>{pollutant.desc}</p>
                        </div>
                    </Tooltip>
                ))}
                </div>
            ))}

            <div className='flex flex-col justify-center items-start min-w-100 w-100 border-0 rounded-md p-1 bg-gray-100 bg-clip-padding backdrop-filter backdrop-blur-none bg-opacity-20 border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)]'>
                <div className='flex flex-row justify-between w-full'>
                    <p className='text-xs font-light text-gray-200 flex flex-row justify-between'>aqi:</p>
                    <Image data-tooltip-id='aqi' src={TooltipIcon} alt='info icon' width={16} />
                </div>
                <h3>
                    <CountUp end={data.aqi} duration={6} />
                </h3>
            </div>
        </div>
        </>
    );
};

export default AirDataGrid