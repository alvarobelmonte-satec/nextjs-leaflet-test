'use client';

import 'leaflet/dist/leaflet.css';

import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';

import 'leaflet-defaulticon-compatibility';

import 'leaflet-draw/dist/leaflet.draw.css';
import L, { Map, FeatureGroup, tileLayer, Control, control } from 'leaflet';
import 'leaflet-draw';

import React, { useEffect } from 'react';

import { signal } from '@preact/signals-react';
import { useSignals } from '@preact/signals-react/runtime';


import '@/scripts/leaflet-heat.js';

const selectedColor = '#ff0000';
const layerOneColor = '#00c735';
const layerTwoColor = '#00c7ff';
const layerThreeColor = '#5100ff';

const layerColors = [
  {
    color: layerOneColor
  },
  {
    color: layerTwoColor
  },
  {
    color: layerThreeColor
  }
];

const currentLayer = signal(null);
const currentLayerName = signal(null);
const selectedItems = signal([]);
const layerControl = signal(null);
const layers = signal([]);
const map = signal(null);
const currentControl = signal(null);
const controls = signal([]);

const customMarkerIcon = L.icon({
  iconUrl: 'marker.png',
  iconSize: [32, 32], // Tamaño del icono
  iconAnchor: [16, 32] // Punto de anclaje del icono (donde se coloca en el mapa)
});

export const LeafletMap = () => {
  useSignals();
  let drawnItems = new FeatureGroup(); // Crea un FeatureGroup para almacenar los polígonos dibujados
  let heatmapLayer = new FeatureGroup();

  useEffect(() => {
    layers.value = [drawnItems];

    // Agrega la capa de OpenStreetMap
    const tile1 = tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png');
    const tile2 = tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png');
    const tile3 = tileLayer(
      'https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.jpg'
    );

    //Heatmap
    const coordinates = [-9.040999983945547, 13.244614997258907];
    const numPoints = 1000;
    const heatData = [];

    for (let i = 0; i < numPoints; i++) {
        const lat = coordinates[0] + (Math.random() - 0.5) * 0.05;
        const lng = coordinates[1] + (Math.random() - 0.5) * 0.05; 
        const intensity = Math.random() * 1; 
        heatData.push([lat, lng, intensity]);
    }


    map.value = new Map('map', {
      center: [-9.03802151421788, 13.25291273927196],
      zoom: 15,
      layers: [tile1, tile2, tile3],
    });

    const heat = L.heatLayer(
      heatData
    , {
      radius: 25,
      blur: 15,
      maxZoom: 17,
      gradient: {
        0.4: 'blue',
        0.6: 'cyan',
        0.7: 'lime',
        0.8: 'yellow',
        1: 'red'
      }
    }).addTo(heatmapLayer);

    const baseMaps = {
      OpenStreetMap: tile1,
      'OpenStreetMap.HOT': tile2,
      'Stadia.AlidadeSmooth': tile3,
    };

    const overlayMaps = {
      'Layer - 1': layers.value[0],
      'Heatmap': heatmapLayer
    };


    layerControl.value = control.layers(baseMaps, overlayMaps).addTo(map.value);

    drawnItems.name = 'Layer - ' + layers.value.length;
    currentLayerName.value = drawnItems.name;
    currentLayer.value = layers.value[0];

    //get index of current layer
    const index = layers.value.indexOf(currentLayer.value);

    // Configura los controles de dibujo
    const drawControl = new Control.Draw({
      position: 'bottomleft',
      draw: {
        marker: {
          icon: customMarkerIcon
        },
        polyline: {
          shapeOptions: {
            color: layerColors[index].color
          }
        },
        polygon: {
          shapeOptions: {
            color: layerColors[index].color
          }
        },
        rectangle: {
          shapeOptions: {
            color: layerColors[index].color
          }
        },
        circle: {
          shapeOptions: {
            color: layerColors[index].color
          }
        },
        circlemarker: {
          shapeOptions: {
            color: layerColors[index].color
          }
        }
      },
      edit: {
        featureGroup: currentLayer.value
      }
    });

    currentControl.value = drawControl;
    controls.value = [...controls.value, drawControl];

    map.value.addControl(currentControl.value);

    map.value.addLayer(layers.value[0]); // Agrega el FeatureGroup al mapa

    map.value.on(L.Draw.Event.CREATED, function (event) {
      const layer = event.layer;

      currentLayer.value.addLayer(layer); // Agrega el polígono dibujado al FeatureGroup

      // Agrega un evento de clic para seleccionar los polígonos

      layer.on('click', function () {
        var eventParentsKeys = Object.keys(this._eventParents);
        var id = Number(eventParentsKeys[0]);

        const layerIndex = layers.value.findIndex((layer) => layer._leaflet_id === id);

        if (selectedItems.value.includes(layer)) {
          // Si el polígono ya está seleccionado, lo deselecciona
          selectedItems.value = selectedItems.value.filter((item) => item !== layer);
          layer.setStyle({
            color: layerColors[layerIndex].color,
            fillColor: layerColors[layerIndex].color
          });
        } else {
          // Si el polígono no está seleccionado, lo selecciona
          selectedItems.value = [...selectedItems.value, layer];
          layer.setStyle({
            color: selectedColor,
            fillColor: selectedColor
          });
        }
      });
    });

    return () => {
      map.value.remove(); // Limpia el mapa al desmontar el componente
    };
  }, []);

  const exportSelectedToGeoJSON = () => {
    // Crea un objeto GeoJSON para almacenar los polígonos seleccionados
    const geojson = {
      type: 'FeatureCollection',
      features: []
    };

    // Agrega los polígonos seleccionados al objeto GeoJSON
    selectedItems.value.forEach(function (layer) {
      const feature = layer.toGeoJSON();
      geojson.features.push(feature);
    });

    // Convierte el objeto GeoJSON a una cadena JSON
    const json = JSON.stringify(geojson, null, 2);

    // Crea un archivo JSON y lo descarga
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(json));
    element.setAttribute('download', 'selected.json');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  //addLayer adds a new layer to the map
  const addMapLayer = () => {
    let newDrawnItems = new FeatureGroup();
    layers.value = [...layers.value, newDrawnItems];

    layerControl.value.addOverlay(newDrawnItems, 'Layer - ' + layers.value.length);

    newDrawnItems.name = 'Layer - ' + layers.value.length;
    map.value.addLayer(newDrawnItems);

    currentLayer.value = newDrawnItems;

    //new addControl same as above but changiong rectangle color
    const index = layers.value.indexOf(currentLayer.value);
    const newDrawControl = new Control.Draw({
      position: 'bottomleft',
      draw: {
        marker: {
          icon: customMarkerIcon
        },
        polyline: {
          shapeOptions: {
            color: layerColors[index].color
          }
        },
        polygon: {
          shapeOptions: {
            color: layerColors[index].color
          }
        },
        rectangle: {
          shapeOptions: {
            color: layerColors[index].color
          }
        },
        circle: {
          shapeOptions: {
            color: layerColors[index].color
          }
        },
        circlemarker: {
          shapeOptions: {
            color: layerColors[index].color
          }
        }
      },
      edit: {
        featureGroup: currentLayer.value
      }
    });

    map.value.removeControl(currentControl.value);
    currentControl.value = newDrawControl;
    controls.value = [...controls.value, newDrawControl];
    map.value.addControl(newDrawControl);
  };

  const setCurrentLayer = (layer) => {
    currentLayer.value = layer;

    map.value.removeControl(currentControl.value);
    map.value.addControl(controls.value[layers.value.indexOf(layer)]);
    currentControl.value = controls.value[layers.value.indexOf(layer)];
  };

  const exportLayerToGeoJSON = () => {
    // Crea un objeto GeoJSON para almacenar los polígonos seleccionados
    const geojson = {
      type: 'FeatureCollection',
      features: []
    };

    // Agrega los polígonos seleccionados al objeto GeoJSON
    currentLayer.value.eachLayer(function (layer) {
      const feature = layer.toGeoJSON();
      geojson.features.push(feature);
    });

    // Convierte el objeto GeoJSON a una cadena JSON
    const json = JSON.stringify(geojson, null, 2);

    // Crea un archivo JSON y lo descarga
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(json));
    element.setAttribute('download', currentLayer.value.name + '.json');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const getLabelColor = () => {
    const currentLayerIndex = layers.value.indexOf(currentLayer.value);
    if (currentLayerIndex === 0) {
      return 'bg-green-100 text-green-800 border border-green-400';
    } else if (currentLayerIndex === 1) {
      return 'bg-blue-100 text-blue-800 border border-blue-400';
    } else if (currentLayerIndex === 2) {
      return 'bg-purple-100 text-purple-800 border border-purple-400';
    }
  };

  return (
    <>
      <div className="flex">
        <div id="map" style={{ height: '700px', width: '900px' }} />
        <section className="ml-8 flex flex-col">
          {layers.value.length < 3 && (
            <button
              className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              style={{ height: '40px' }}
              onClick={addMapLayer}
            >
              Add Layer
            </button>
          )}
          <div className="mt-4">
            <span className={`${getLabelColor()} text-xl font-medium me-2 px-2.5 py-0.5 rounded `}>
              {currentLayer.value?.name}
            </span>
            <h1 className="my-3 text-2xl font-semibold text-gray-900 dark:text-white">Layers</h1>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <tbody>
                {layers.value.map((layer, index) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={index}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {layer.name}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <button
                        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                        onClick={() => {
                          setCurrentLayer(layer);
                        }}
                      >
                        Set Current Layer
                      </button>
                    </td>

                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {currentLayer.value === layer && (
                        <button
                          className="bg-purple-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={exportLayerToGeoJSON}
                        >
                          Export to GeoJSON
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div class="relative overflow-x-auto">
              <h1 className="my-3 text-2xl font-semibold text-gray-900 dark:text-white">
                Selected Items
              </h1>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <tbody>
                  {selectedItems.value.map((item, index) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      key={index}
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Item id {item._leaflet_id}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <button
                          className="bg-purple-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => item.setStyle({ color: '#fcba03', fillColor: '#fcba03' })}
                        >
                          Change Color
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                style={{ height: '40px' }}
                onClick={exportSelectedToGeoJSON}
              >
                Export selected
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
