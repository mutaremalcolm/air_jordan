import CountUp from "react-countup";

interface CoordinatesProps {
    lat: number | undefined;
    lon: number | undefined;
}

const CoordinatesDisplay: React.FC<CoordinatesProps> = ({ lat, lon }) => {
    return (
        <div className="font-borl text-left text-white p-1 mb-2">
            Coordinates:
            <br/>
            {lat !== undefined && (
                <p className="font-light text-white">
                    Latitude: <span><CountUp end={lat} duration={2} decimals={7} decimal='.'/></span>
                </p>
            )}
            {lon !== undefined && (
                <p>
                    Longitude: <span><CountUp end={lon} duration={2} decimals={7} decimal='.' />&deg;</span>
                </p>
            )}
        </div>
    )
}

export default CoordinatesDisplay;