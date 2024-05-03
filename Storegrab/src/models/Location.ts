interface PlusCode {
    compound_code: string;
    global_code: string;
  }
  
  interface AddressComponent {
    long_name: string;
    short_name: string;
    types: string[];
  }
  
  interface Location {
    lat: number;
    lng: number;
  }
  
  interface Geometry {
    location: Location;
    bounds?: {
      northeast: Location;
      southwest: Location;
    };
    location_type: string;
    viewport?: {
      northeast: Location;
      southwest: Location;
    };
  }
  
  export interface GoogleMapsPlacesResult {
    address_components: AddressComponent[];
    formatted_address: string;
    geometry: Geometry;
    place_id: string;
    plus_code?: PlusCode;
    types: string[];
  }
  
  export interface GoogleMapsPlacesGeoData {
    plus_code: PlusCode;
    results: GoogleMapsPlacesResult[];
    status: string;
  }

  