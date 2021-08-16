import NodeCache from 'node-cache';

const CACHE_CONFIG = {
  stdTTL: 24 * 60 * 60 // 1 day
};

let AppCache: NodeCache;

if (process.env.NODE_ENV === 'production') {
  AppCache = new NodeCache(CACHE_CONFIG)
} else {
  if (!global.AppCache) {
    global.AppCache = new NodeCache(CACHE_CONFIG);
  }
  AppCache = global.AppCache;
}

export default AppCache;
