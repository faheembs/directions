import React, { useState, useEffect } from 'react';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import styled, { ThemeProvider } from 'styled-components';
import window from 'global/window';
import { connect, useDispatch } from 'react-redux';
import { theme } from '@kepler.gl/styles';
import Banner from './components/banner';
import Announcement, { FormLink } from './components/announcement';
import { replaceLoadDataModal } from './factories/load-data-modal';
import { replaceMapControl } from './factories/map-control';
import { replacePanelHeader } from './factories/panel-header';
import { CLOUD_PROVIDERS_CONFIGURATION, DEFAULT_FEATURE_FLAGS } from './constants/default-settings';
import { messages } from './constants/localization';
import {
  loadRemoteMap,
  loadSampleConfigurations,
  onExportFileSuccess,
  onLoadCloudMapSuccess
} from './actions';
import { loadCloudMap, addDataToMap, addNotification, replaceDataInMap } from '@kepler.gl/actions';
import { CLOUD_PROVIDERS } from './cloud-providers';
import sampleTripData, { testCsvData, sampleTripDataConfig } from './data/sample-trip-data';
// import sampleGeojson from './data/sample-small-geojson';
// import sampleGeojsonPoints from './data/sample-geojson-points';
// import sampleGeojsonConfig from './data/sample-geojson-config';
import sampleH3Data, { config as h3MapConfig } from './data/sample-hex-id-csv';
import sampleS2Data, { config as s2MapConfig, dataId as s2DataId } from './data/sample-s2-data';
import sampleAnimateTrip, { animateTripDataId } from './data/sample-animate-trip-data';
import sampleIconCsv, { config as savedMapConfig } from './data/sample-icon-csv';
import sampleGpsData from './data/sample-gps-data';
import { processCsvData, processGeojson } from '@kepler.gl/processors';
import { PanelHeaderFactory, injectComponents } from '@kepler.gl/components';
import logo from './assets/Slide1.png'
/* eslint-enable no-unused-vars */

const CustomHeader = () => (
  <div>
    <img src={logo} width={220} height={80} style={{ objectFit: 'cover',marginLeft:'30px' }} />
  </div>
);

const myCustomHeaderFactory = () => CustomHeader;

const BannerHeight = 48;
const BannerKey = `banner-${FormLink}`;
const keplerGlGetState = state => state.demo.keplerGl;

const GlobalStyle = styled.div`
  font-family: ff-clan-web-pro, 'Helvetica Neue', Helvetica, sans-serif;
  font-weight: 400;
  font-size: 0.875em;
  line-height: 1.71429;

  *,
  *:before,
  *:after {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  li {
    margin: 0;
  }

  a {
    text-decoration: none;
    color: ${props => props.theme.labelColor};
  }
`;

const CONTAINER_STYLE = {
  transition: 'margin 1s, height 1s',
  position: 'absolute',
  width: '100%',
  height: '100%',
  left: 0,
  top: 0
};

const App = (props) => {
  const dispatch = useDispatch();

  const [showBanner, setShowBanner] = useState(false);
  const KeplerGl = injectComponents(
    [
    replaceLoadDataModal(),
    replaceMapControl(),
    replacePanelHeader(),
    [ PanelHeaderFactory, myCustomHeaderFactory]
  ], 
  
  );


  useEffect(() => {
    const { params: { id, provider } = {}, location: { query = {} } = {} } = props;

    const cloudProvider = CLOUD_PROVIDERS.find(c => c.name === provider);
    if (cloudProvider) {
      dispatch(
        loadCloudMap({
          loadParams: query,
          provider: cloudProvider,
          onSuccess: onLoadCloudMapSuccess
        })
      );
      return;
    }

    if (id) {
      dispatch(loadSampleConfigurations(id));
    }

    if (query.mapUrl) {
      dispatch(loadRemoteMap({ dataUrl: query.mapUrl }));
    }
  }, []);

  const hideBanner = () => {
    setShowBanner(false);
  };

  const disableBanner = () => {
    hideBanner();
    window.localStorage.setItem(BannerKey, 'true');
  };

  const loadMockNotifications = () => {
    const notifications = [
      [{ message: 'Welcome to Kepler.gl' }, 3000],
      [{ message: 'Something is wrong', type: 'error' }, 1000],
      [{ message: 'I am getting better', type: 'warning' }, 1000],
      [{ message: 'Everything is fine', type: 'success' }, 1000]
    ];

    addNotifications(notifications);
  };

  const addNotifications = notifications => {
    if (notifications && notifications.length) {
      const [notification, timeout] = notifications[0];

      window.setTimeout(() => {
        dispatch(addNotification(notification));
        addNotifications(notifications.slice(1));
      }, timeout);
    }
  };

  const loadSampleData = () => {
    loadPointData();
    loadGeojsonData();
  };

  const loadPointData = () => {
    dispatch(
      addDataToMap({
        datasets: {
          info: {
            label: 'Sample Taxi Trips in New York City',
            id: 'test_trip_data'
          },
          data: sampleTripData
        },
        options: {
          keepExistingConfig: true
        },
        config: sampleTripDataConfig
      })
    );
  };

  const loadScenegraphLayer = () => {
    dispatch(
      addDataToMap({
        datasets: {
          info: {
            label: 'Sample Scenegraph Ducks',
            id: 'test_trip_data'
          },
          data: processCsvData(testCsvData)
        },
        config: {
          version: 'v1',
          config: {
            visState: {
              layers: [
                {
                  type: '3D',
                  config: {
                    dataId: 'test_trip_data',
                    columns: {
                      lat: 'gps_data.lat',
                      lng: 'gps_data.lng'
                    },
                    isVisible: true
                  }
                }
              ]
            }
          }
        }
      })
    );
  };

  const loadIconData = () => {
    dispatch(
      addDataToMap({
        datasets: [
          {
            info: {
              label: 'Icon Data',
              id: 'test_icon_data'
            },
            data: processCsvData(sampleIconCsv)
          }
        ]
      })
    );
  };

  const loadTripGeoJson = () => {
    dispatch(
      addDataToMap({
        datasets: [
          {
            info: { label: 'Trip animation', id: animateTripDataId },
            data: processGeojson(sampleAnimateTrip)
          }
        ]
      })
    );
  };

  const replaceData = () => {
    const sliceData = processGeojson({
      type: 'FeatureCollection',
      // features: sampleGeojsonPoints.features.slice(0, 5)
    });
    loadGeojsonData();
    window.setTimeout(() => {
      dispatch(
        replaceDataInMap({
          datasetToReplaceId: 'bart-stops-geo',
          datasetToUse: {
            info: { label: 'Bart Stops Geo Replaced', id: 'bart-stops-geo-2' },
            data: sliceData
          }
        })
      );
    }, 1000);
  };

  const loadGeojsonData = () => {
    dispatch(
      addDataToMap({
        datasets: [
          {
            info: { label: 'Bart Stops Geo', id: 'bart-stops-geo' },
            // data: processGeojson(sampleGeojsonPoints)
          },
          {
            info: { label: 'SF Zip Geo', id: 'sf-zip-geo' },
            // data: processGeojson(sampleGeojson)
          }
        ],
        options: {
          keepExistingConfig: true
        },
        // config: sampleGeojsonConfig
      })
    );
  };

  const loadH3HexagonData = () => {
    dispatch(
      addDataToMap({
        datasets: [
          {
            info: {
              label: 'H3 Hexagons V2',
              id: 'h3-hex-id'
            },
            data: processCsvData(sampleH3Data)
          }
        ],
        config: h3MapConfig,
        options: {
          keepExistingConfig: true
        }
      })
    );
  };

  const loadS2Data = () => {
    dispatch(
      addDataToMap({
        datasets: [
          {
            info: {
              label: 'S2 Data',
              id: s2DataId
            },
            data: processCsvData(sampleS2Data)
          }
        ],
        config: s2MapConfig,
        options: {
          keepExistingConfig: true
        }
      })
    );
  };

  const loadGpsData = () => {
    dispatch(
      addDataToMap({
        datasets: [
          {
            info: {
              label: 'Gps Data',
              id: 'gps-data'
            },
            data: processCsvData(sampleGpsData)
          }
        ],
        options: {
          keepExistingConfig: true
        }
      })
    );
  };

  const toggleCloudModal = () => {
    setShowBanner(!showBanner);
  };

  const getMapboxRef = (mapbox, index) => {
    if (!mapbox) {
      // The ref has been unset.
      // console.log(`Map ${index} has closed`);
    } else {
      const map = mapbox.getMap();
      map.on('zoomend', e => {
        // console.log(`Map ${index} zoom level: ${e.target.style.z}`);
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {/* <GlobalStyle
        ref={node => {
          node ? (root = node) : null;
        }}
      > */}
        <Banner
          show={showBanner}
          height={BannerHeight}
          bgColor="#2E7CF6"
          onClose={hideBanner}
        >
          <Announcement onDisable={disableBanner} />
        </Banner>
        <div style={CONTAINER_STYLE}>
          <AutoSizer>
            {({ height, width }) => (
              <KeplerGl
                mapboxApiAccessToken='pk.eyJ1IjoicmFuYWFtbWFyciIsImEiOiJjbHI0eHZudjIxbHRqMml0MzR2Y2w2c3NrIn0.nbMrBleZxpEGERoeeb3Arg'
                id="map"
                getState={keplerGlGetState}
                width={width}
                height={height}
                cloudProviders={CLOUD_PROVIDERS}
                localeMessages={messages}
                onExportToCloudSuccess={onExportFileSuccess}
                onLoadCloudMapSuccess={onLoadCloudMapSuccess}
                featureFlags={DEFAULT_FEATURE_FLAGS}
                theme="light"
              />
            )}
          </AutoSizer>
        </div>
      {/* </GlobalStyle> */}
    </ThemeProvider>
  );
};

export default App;
