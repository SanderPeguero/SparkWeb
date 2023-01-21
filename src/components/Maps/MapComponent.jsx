import React from 'react';
import { GoogleMap, useJsApiLoader , Marker} from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '450px'
};

const center = {
    lat: 19.299416,
    lng: -70.254922
};


const MapComponent = (props) => {
    
    const { isLoaded } = useJsApiLoader({
        id: 'sagrd-375317',
        googleMapsApiKey: "AIzaSyD3XAtcsIVvtjCYHqOS5yy8aRSMNYqF1DQ"
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        // map.fitBounds(bounds);

        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <div className="px-[1rem] md:px-[6rem] lg:px-[30rem]">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
                onLoad={onLoad}
                onUnmount={onUnmount}
                >
                <Marker position={center} />
            </GoogleMap>
        </div>
    ) : <></>
};

export default MapComponent;