import React from 'react';

const DisabledTab = () => {
    return (
        <div style={styles.container}>
            <div style={styles.message}>
                You don't have permission to use this feature. Please contact us at <a href="mailto:support@directions.com">support@directions.com</a>.
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    message: {
        textAlign: 'center',
        fontSize: '20px'

    },
};

export default DisabledTab;
