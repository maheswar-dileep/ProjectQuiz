import axios from 'axios';

export const backend = axios.create({
    baseURL: `${window.location.origin.split(window.location.host)[0]}${window.location.hostname}:${5000}/`
});
export const authServer = axios.create({
    baseURL: `${window.location.origin.split(window.location.host)[0]}${window.location.hostname}:${4001}/`
})