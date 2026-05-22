declare namespace naver {
  namespace maps {
    class Map {
      constructor(element: string | HTMLElement, options: MapOptions);
      setCenter(latLng: LatLng): void;
      setZoom(zoom: number): void;
    }
    class LatLng {
      constructor(lat: number, lng: number);
    }
    class Marker {
      constructor(options: MarkerOptions);
      setMap(map: Map | null): void;
      addListener(event: string, handler: () => void): void;
    }
    class InfoWindow {
      constructor(options: InfoWindowOptions);
      open(map: Map, marker: Marker): void;
      close(): void;
    }
    interface MapOptions {
      center: LatLng;
      zoom: number;
      zoomControl?: boolean;
      zoomControlOptions?: { position: any };
    }
    interface MarkerOptions {
      position: LatLng;
      map?: Map;
      icon?: MarkerIcon;
    }
    interface MarkerIcon {
      content?: string;
      anchor?: Point;
    }
    interface InfoWindowOptions {
      content: string;
      borderWidth?: number;
      backgroundColor?: string;
      borderColor?: string;
      anchorSize?: Size;
    }
    class Point {
      constructor(x: number, y: number);
    }
    class Size {
      constructor(width: number, height: number);
    }
    const Position: {
      TOP_RIGHT: any;
      BOTTOM_RIGHT: any;
    };
  }
}
