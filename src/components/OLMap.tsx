'use client';
import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import Draw from 'ol/interaction/Draw.js';
import Select from 'ol/interaction/Select.js';
import { click } from 'ol/events/condition.js';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';

export const OLMap = () => {
  const mapRef = useRef(null);
  const selectButtonRef = useRef(null);
  const select = useRef(null);

  const raster = new TileLayer({
    source: new OSM()
  });

  const source = new VectorSource({ wrapX: false });

  const vector = new VectorLayer({
    source: source
  });

  let map = null;
  let draw = null;

  useEffect(() => {
    if (!mapRef.current) return;

    map = new Map({
      target: mapRef.current,
      layers: [raster, vector],
      view: new View({
        center: fromLonLat([13.5, -9.17]),
        zoom: 12
      })
    });

    draw = new Draw({
      source: source,
      type: 'Polygon'
    });

    map.addInteraction(draw);

    select.current = new Select({
      condition: click
    });

    map.addInteraction(select.current);

    const handleSelect = (event) => {
      const selectedFeatures = event.selected;
      selectedFeatures.forEach((feature) => {
        const coordinates = feature.getGeometry().getCoordinates();
        console.log('Coordenadas del polígono seleccionado: ' + coordinates);
      });
    };

    select.current.on('select', handleSelect);

    return () => {
      map.setTarget(null);
    };
  }, []);

  const selected = new Style({
    fill: new Fill({
      color: '#eeeeee'
    }),
    stroke: new Stroke({
      color: 'rgba(255, 255, 255, 0.7)',
      width: 2
    })
  });

  function selectStyle(feature) {
    const color = feature.get('COLOR') || '#eeeeee';
    selected.getFill().setColor(color);
    return selected;
  }

  function selectMultipleStyle(feature) {
    const color = feature.get('COLOR') || '#eb4034';
    selected.getFill().setColor(color);
    return selected;
  }

  const handleSelectClick = () => {
    map.removeInteraction(draw);
    map.removeInteraction(selectMultipleClick);

    const selectClick = new Select({
      condition: click,
      style: selectStyle
    });

    map.addInteraction(selectClick);
  };

  const handleCreatePolygons = () => {
    map.addInteraction(draw);
  };

  //borra poligono seleccionado
  const handleDeletePolygon = () => {
    const selectedFeatures = select.current!.getFeatures();
    selectedFeatures.forEach((feature) => {
      source.removeFeature(feature);
    });
  };

  return (
    <div>
      <div ref={mapRef} style={{ width: '600px', height: '400px' }} />
      <button
        className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        ref={selectButtonRef}
        onClick={handleSelectClick}
      >
        Seleccionar polígono
      </button>

      <button
        className="ml-2 mt-2 bg-blue-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        ref={selectButtonRef}
        onClick={handleCreatePolygons}
      >
        Crear polígono
      </button>
      <button
        className="ml-2 mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleDeletePolygon}
      >
        Borrar polígono
      </button>
    </div>
  );
};
