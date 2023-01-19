import React from 'react';
import { GoogleMap, useJsApiLoader , Marker} from '@react-google-maps/api';

const containerStyle = {
    width: '800px',
    height: '500px'
};

const center = {
    lat: 19.299416,
    lng: -70.254922
};


const MapComponent = (props) => {
    
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyCKBdleKDEtF_PKbCON9NOrwl2iX6SrYnE"
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={18}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            <Marker position={center} />
        </GoogleMap>
    ) : <></>
};

export default MapComponent;