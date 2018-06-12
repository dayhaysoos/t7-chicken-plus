import axios from 'axios';

// Initial In-App Stub Data
// import initialData from '../utils/initialData.json';
// import * as AsyncStorageUtil from '../utils/asyncStorageUtil.js';

// BLOB Types
export const BLOB_SET_INITIAL_DATA = 'BLOB_SET_INITIAL_DATA';
export const BLOB_UPDATE_DATA = 'BLOB_UPDATE_DATA';
export const BLOB_FETCH_SUCCESS = 'BLOB_FETCH_SUCCESS';
export const BLOB_FETCH_ERROR = 'BLOB_FETCH_ERROR';
export const BLOB_FETCH_OFFLINE = 'BLOB_FETCH_OFFLINE';
export const BLOB_SHOW_SPREADSHEETPROMPT = 'BLOB_SHOW_SPREADSHEETPROMPT';

const CHAR_DATA_API = 'http://localhost:8000/';
const CHAR_METADATA_API = 'http://api.tekkenchicken.com/api/metadata/';

export const checkIfDataOutdated = async (localTimeStamp) => {
    try {
        const response = await axios.get(CHAR_METADATA_API);

        const serverTimeStamp = response.alisa.last_updated;
        return {
            outDated: localTimeStamp !== response.data.alisa.last_updated,
            last_updated: serverTimeStamp
        };
    } catch (error) {
        return error;
    }
};

export const getFrameData = () => {
    const data = axios.get(CHAR_DATA_API);

    return data;
};
