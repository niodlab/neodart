import rawArtworks from './artworks.json';

const resolveAssetUrl = (path) => {
  if (!path || !path.startsWith('/')) {
    return path;
  }

  return `${import.meta.env.BASE_URL}${path.slice(1)}`;
};

const artworks = rawArtworks.map((artwork) => ({
  ...artwork,
  image: resolveAssetUrl(artwork.image),
}));

export default artworks;
