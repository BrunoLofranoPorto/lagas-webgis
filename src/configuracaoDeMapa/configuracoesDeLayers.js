// configurações de layers
export const LAYERS_DEFAULT = [
    {
        name: 'Região',
        visible: false,
        visibleUI: false,
        colorUI: '#78866b',
        componentName: 'layerdefault',
        props: {
            source: {
                type: 'geojson',
                generateId: true,
                data: 'https://servicodados.ibge.gov.br/api/v3/malhas/paises/BR?formato=application/vnd.geo+json&qualidade=maxima&intrarregiao=regiao'
            },
            'type': 'fill',
            'fill-color': '#ffa07a',
            'fill-opacity': 0.1
        }
    },
    {
        name: 'Estados',
        visible: false,
        visibleUI: false,        
        colorUI: '#789bdf',
        componentName: 'layerdefault',
        downloadLink: '',
        zIndex: 100,
        props: {
            source: {
                type: 'geojson',
                generateId: true,
                data: 'https://servicodados.ibge.gov.br/api/v3/malhas/paises/BR?formato=application/vnd.geo+json&qualidade=maxima&intrarregiao=UF'
            },
            'type': 'fill',
            'fill-color': '#ffa07a',
            'fill-opacity': 0.1
        }
    },
    {
        name: 'Mesorregião',
        visible: false,
        visibleUI: false,
        colorUI: '#78866b',
        componentName: 'layerdefault',
        props: {
            source: {
                type: 'geojson',
                generateId: true,
                data: 'https://servicodados.ibge.gov.br/api/v3/malhas/paises/BR?formato=application/vnd.geo+json&qualidade=maxima&intrarregiao=mesorregiao'
            },
            'type': 'fill',
            'fill-color': '#ffa07a',
            'fill-opacity': 0.1
        }
    },
    {
        name: 'Microrregião',
        visible: false,
        visibleUI: false,
        colorUI: '#78866b',
        componentName: 'layerdefault',
        props: {
            source: {
                type: 'geojson',
                generateId: true,
                data: 'https://servicodados.ibge.gov.br/api/v3/malhas/paises/BR?formato=application/vnd.geo+json&qualidade=maxima&intrarregiao=microrregiao'
            },
            'type': 'fill',
            'fill-color': '#ffa07a',
            'fill-opacity': 0.1
        }
    },
    {
        name: 'Distrito Federal',
        visible: false,
        visibleUI: false,        
        colorUI: '#789bdf',
        componentName: 'layerdefault',
        downloadLink: '',
        zIndex: 100,
        props: {
            source: {
                type: 'geojson',
                generateId: true,
                data: 'https://servicodados.ibge.gov.br/api/v3/malhas/estados/53?formato=application/vnd.geo+json&qualidade=maxima'
            },
            'type': 'fill',
            'fill-color': '#ffa07a',
            'fill-opacity': 0.1
        }
    }
]


// function urlMount (source) {
//     let url = `http://localhost:8600/geoserver/lagas-wg/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lagas-wg%3Atab_geo_${source}&maxFeatures=50&outputFormat=application%2Fjson`
//     return url
// }