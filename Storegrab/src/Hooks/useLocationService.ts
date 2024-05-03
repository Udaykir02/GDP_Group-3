import { useCallback } from 'react'
import { requestLocation, RequestLocationReturnType } from '../Services/Location/LocationService'
export const useLocationService = () => {
  const currentLocation = async () => {
    const data = await requestLocation()
    if (!data) return
    return data
  }
  return {
    currentLocation
  }
}
export default useLocationService
