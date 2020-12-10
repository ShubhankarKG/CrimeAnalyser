const MAX_ZOOM_LEVEL = 24;

const heatmapLayer = {
  maxzoom: MAX_ZOOM_LEVEL,
  type: 'heatmap',
  paint: {
    // Increase the heatmap weight based on frequency and property magnitude
    'heatmap-weight': ['interpolate', ['linear'], ['get', 'count'], 0, 0, 50, 5],
    // Increase the heatmap color weight weight by zoom level
    // heatmap-intensity is a multiplier on top of heatmap-weight
    'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 4, 1, MAX_ZOOM_LEVEL, 10],
    // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
    // Begin color ramp at 0-stop with a 0-transparancy color
    // to create a blur-like effect.
    'heatmap-color': [
      'interpolate',
      ['linear'],
      ['heatmap-density'],
      0,
      'rgba(132,255,0,0.1)',
      0.25,
      'rgb(177,255,5)',
      0.50,
      'rgb(245,255,5)',
      0.75,
      'rgb(245,77,5)'
    ],
    // Adjust the heatmap radius by zoom level
    'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 4, 15, MAX_ZOOM_LEVEL, 100],
    // Transition from heatmap to circle layer by zoom level
    'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 4, 1, 9, 0.5]
  }
};

export default heatmapLayer;
