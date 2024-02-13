import { Icon } from 'leaflet';

const MarkerIcons = ({ level, type }) => {
    // const iconUrl = ;

    const markerIcon = new Icon({
        iconUrl: require(`../../images/markers/${level}${type}.png`),
        iconSize: [69, 69],
        iconAnchor: [32, 59],
        popupAnchor: [3, -50]
    });

    return markerIcon;
};

export default MarkerIcons;