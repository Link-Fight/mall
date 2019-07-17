import base from './index.js'

export function getAreaLocation({ lat, lng, coordtype }) { return base('/common/area/location', { lat, lng, coordtype }) }

export function getLocationDetail({ lat, lng }) { return base('/common/area/location_detail', { lat, lng }) }