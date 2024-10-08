import { Icon } from 'leaflet';

const MarkerIcons = ({ level, type }) => {
    // const iconUrl = ;
    // require(`../../images/markers/${level}${type}.png`)
    const markerIcon = new Icon({
        iconUrl: require(`../../images/markers/${level}${type}.png`),
        iconSize: [69, 69],
        iconAnchor: [32, 59],
        popupAnchor: [3, -50],
        shadowUrl: require('../../images/markers/shadow3.png'),
        shadowSize: [45, 20],
        shadowAnchor: [13, 18],
    });

    return markerIcon;
};

export default MarkerIcons;