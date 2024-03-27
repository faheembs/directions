// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import { LoadDataModalFactory, withState } from '@kepler.gl/components';
import { LOADING_METHODS } from '../constants/default-settings';

import SampleMapGallery from '../components/load-data-modal/sample-data-viewer';
import LoadRemoteMap from '../components/load-data-modal/load-remote-map';
import SampleMapsTab from '../components/load-data-modal/sample-maps-tab';
import { loadRemoteMap, loadSample, loadSampleConfigurations } from '../actions';
import DisabledTab from '../components/load-data-modal/disabledTab';
const user = localStorage.getItem('usersInfo')
const users = JSON.parse(user)

const CustomLoadDataModalFactory = (...deps) => {
  const LoadDataModal = LoadDataModalFactory(...deps);
  const defaultLoadingMethods = LoadDataModal.defaultProps.loadingMethods;
  console.log('LoadDataModalFactory', LoadDataModal.defaultProps)
  const additionalMethods = {
    remote: {
      id: LOADING_METHODS.remote,
      label: 'modal.loadData.remote',
      elementType: LoadRemoteMap
    },
    // sample: {
    //   id: LOADING_METHODS.sample,
    //   label: 'modal.loadData.sample',
    //   elementType: SampleMapGallery,
    //   tabElementType: SampleMapsTab
    // },
    tryDirectionSample: {
      id: LOADING_METHODS.directions,
      label: 'modal.loadData.directions',
      elementType: SampleMapGallery,
      // tabElementType: SampleMapsTab
    },
    disabledTab: {
      id: LOADING_METHODS.disabled,
      label: 'modal.loadData.disabled',
      elementType: DisabledTab,
    }
  };

  // add more loading methods
  LoadDataModal.defaultProps = {
    ...LoadDataModal.defaultProps,
    loadingMethods: [
      users?.allowExportData ? defaultLoadingMethods.find(lm => lm.id === 'upload') : additionalMethods.disabledTab,
      // defaultLoadingMethods.find(lm => lm.id === 'upload'),
      // additionalMethods.remote,
      // defaultLoadingMethods.find(lm => lm.id === 'storage'),
      additionalMethods.tryDirectionSample,

    ]
  };

  return withState([], state => ({ ...state.demo.app, ...state.demo.keplerGl.map.uiState }), {
    onLoadSample: loadSample,
    onLoadRemoteMap: loadRemoteMap,
    loadSampleConfigurations
  })(LoadDataModal);
};

CustomLoadDataModalFactory.deps = LoadDataModalFactory.deps;

export function replaceLoadDataModal() {
  return [LoadDataModalFactory, CustomLoadDataModalFactory];
}
