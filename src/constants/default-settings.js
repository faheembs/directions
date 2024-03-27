// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

/* different option share same query type e.g. events,
and segments both use queryRunner */
import keyMirror from 'keymirror';
import { baseURL } from "./baseURL"
import { toast } from "react-toastify";


export async function fetchData() {
  try {
    const response = await fetch(`${baseURL}dataset/getAll`);
    if (response.ok) {
      const responseData = await response.json();

      // Assuming response.data contains the map URL
      const mapUrl = responseData?.data;

      // Return the mapUrl
      return mapUrl;
    } else {
      toast.error("Error in getting all datasets");
      const errorData = await response.json();
      return Promise.reject(errorData.message);
    }
  } catch (error) {
    // Handle fetch errors here
    console.error("Fetch error:", error);
    toast.error("Error in fetching data");
    return Promise.reject(error);
  }
}

export const ASSETS_URL = 'https://d1a3f4spazzrp4.cloudfront.net/kepler.gl/';
// export const DATA_URL = 'https://raw.githubusercontent.com/keplergl/kepler.gl-data/master/';
// export const DATA_URL = '../data';
export const MAP_URI = 'demo/map?mapUrl=';
/*
 * If you want to add more samples, feel free to edit the json file on github kepler.gl data repo
 */
// export const MAP_CONFIG_URL = `${DATA_URL}samples.json?nocache=${new Date().getTime()}`;
// export const MAP_CONFIG_URL = 'https://raw.githubusercontent.com/faheembs/directions/main/src/data/sample.json';
let MAP_CONFIG_URL = ''; // Initialize MAP_CONFIG_URL

fetchData()
  .then(mapUrl => {
    MAP_CONFIG_URL = mapUrl;
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

export { MAP_CONFIG_URL };

/**
 * I know this is already defined in Kepler core but it should be defined here
 * because it belongs to the demo app
 * @type {string}
 */
export const KEPLER_GL_WEBSITE = 'http://kepler.gl/';

export const QUERY_TYPES = keyMirror({
  file: null,
  sample: null,
  directions: null,
  disabled: null

});

export const QUERY_OPTIONS = keyMirror({
  csv: null,
  geojson: null
});

export const LOADING_METHODS = keyMirror({
  remote: null,
  sample: null,
  directions: null,
  disabled: null
});

export const LOADING_SAMPLE_LIST_ERROR_MESSAGE = 'Not able to load sample gallery';
export const LOADING_SAMPLE_ERROR_MESSAGE = 'Not able to load sample';
export const CORS_LINK = 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS';
export const DEFAULT_FEATURE_FLAGS = {
  cloudStorage: true
};

export const CLOUD_PROVIDERS_CONFIGURATION = {
  MAPBOX_TOKEN: process.env.MapboxAccessToken, // eslint-disable-line
  DROPBOX_CLIENT_ID: process.env.DropboxClientId, // eslint-disable-line
  EXPORT_MAPBOX_TOKEN: process.env.MapboxExportToken, // eslint-disable-line
  CARTO_CLIENT_ID: process.env.CartoClientId, // eslint-disable-line
  FOURSQUARE_CLIENT_ID: process.env.FoursquareClientId, // eslint-disable-line
  FOURSQUARE_DOMAIN: process.env.FoursquareDomain, // eslint-disable-line
  FOURSQUARE_API_URL: process.env.FoursquareAPIURL, // eslint-disable-line
  FOURSQUARE_USER_MAPS_URL: process.env.FoursquareUserMapsURL // eslint-disable-line
};
