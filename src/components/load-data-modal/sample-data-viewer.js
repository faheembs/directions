// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { format } from 'd3-format';
import { LoadingDialog } from '@kepler.gl/components';
import { FormattedMessage } from 'react-intl';
import Modal from 'react-modal';
import { Button } from '@mui/material';

const numFormat = format(',');

// Your existing styles
const StyledSampleMap = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.theme.textColorLT};
  line-height: 22px;
  width: 30%;
  max-width: 480px;
  margin-bottom: 50px;
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }

  .contact-button {
    background-color: #000;
    color: #fff;
    padding: 10px 18px;
    font-size: 12px;
    font-weight: bold;
    border-radius: 10px;
    margin-top: 20px;
    cursor: pointer;
  }
  .sample-map__image {
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 12px;
    opacity: 0.9;
    transition: opacity 0.4s ease;
    position: relative;
    line-height: 0;

    img {
      max-width: 100%;
    }
    :hover {
      cursor: pointer;
      opacity: 1;
    }
  }

  .sample-map__size {
    font-size: 12px;
    font-weight: 400;
    line-height: 24px;
  }

  .badge {
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 10px 18px;
    font-size: 12px;
    font-weight: bold;
    color: #fff;
    border-radius: 5px;
  }

  .badge.premium {
    background-color: #ffcc00;
  }

  .badge.free {
    background-color: #4caf50;
  }

  :hover {
    .sample-map__image__caption {
      opacity: 0.8;
      transition: opacity 0.4s ease;
    }
  }
`;

const StyledImageCaption = styled.div`
  color: ${props => props.theme.labelColorLT};
  font-size: 11px;
  font-weight: 400;
  line-height: 16px;
  margin-top: 10px;
  opacity: 0;
`;

const StyledError = styled.div`
  color: red;
  font-size: 14px;
  margin-bottom: 16px;
`;

const customModalStyles = {
  content: {
    position: 'absolute',
    width: '57.5%',
    height: '79%',
    top: '60px',
    left: '319px',
    zIndex: 1001,
  },
  overlay: {
    zIndex: 1000
  }
};

const SampleMap = ({ id, sample, onClick, locale }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <StyledSampleMap id={id} className="sample-map-gallery__item">
        <div className="sample-map">
          <div className="sample-map__image" onClick={sample.isPremium ? openModal : onClick}>
            {sample.imageUrl && <img src={sample.imageUrl} />}
            {sample.isPremium ? (
              <div className="badge premium">Premium</div>
            ) : (
              <div className="badge free">Free</div>
            )}
          </div>
          <div className="sample-map__title">{sample.label}</div>
          <div className="sample-map__size">
            <FormattedMessage
              id={'sampleDataViewer.rowCount'}
              values={{ rowCount: numFormat(sample.size) }}
            />
          </div>
          <StyledImageCaption className="sample-map__image__caption">
            {sample.description}
          </StyledImageCaption>
        </div>
      </StyledSampleMap>

      {/* Modal component */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customModalStyles}
        contentLabel="Premium Sample Modal"
      >
        <Button variant='text' sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          backgroundColor: 'none',
          color: 'black',
          fontSize: 20,
          fontWeight: 'bolder',
          '&:hover': {
            backgroundColor: 'none',
            background: 'none'
          },
        }} onClick={closeModal}>
          &#x2715;
        </Button>
        <h2>{sample.label}</h2>
        <Button variant='outlined' sx={{
          color: 'black',
          padding: '10px 18px',
          fontSize: 14,
          textTransform: 'none',
          borderRadius: '6px',
          marginTop: '20px',
          borderColor: 'black',
          '&:hover': {
            backgroundColor: "#000",
            color: 'white',
          },
        }} onClick={() => window.location.href = 'mailto:your-email@example.com'}>
          Contact Us
        </Button>
      </Modal>
    </>
  );
};

const StyledSampleGallery = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const SampleMapGallery = ({
  sampleMaps,
  onLoadSample,
  error,
  isMapLoading,
  locale,
  loadSampleConfigurations
}) => {
  useEffect(() => {
    if (!sampleMaps.length) {
      loadSampleConfigurations();
    }
  }, [sampleMaps, loadSampleConfigurations]);

  return (
    <div className="sample-data-modal">
      {error ? (
        <StyledError>{error.message}</StyledError>
      ) : isMapLoading ? (
        <LoadingDialog size={64} />
      ) : (
        <StyledSampleGallery className="sample-map-gallery">
          {sampleMaps
            .filter(sp => sp.visible)
            .map(sp => (
              <SampleMap
                id={sp.id}
                sample={sp}
                key={sp.id}
                onClick={() => onLoadSample(sp)}
                locale={locale}
              />
            ))}
        </StyledSampleGallery>
      )}
    </div>
  );
};

SampleMapGallery.propTypes = {
  sampleMaps: PropTypes.arrayOf(PropTypes.object),
  onLoadSample: PropTypes.func.isRequired,
  loadSampleConfigurations: PropTypes.func.isRequired,
  error: PropTypes.object
};

export default SampleMapGallery;
