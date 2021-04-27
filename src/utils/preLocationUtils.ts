import pkg from '../../package.json';
import lsHelper from './localStorageHelper';

const PRE_LOCATION_KEY: string = `YS_${pkg.name}_PRE_LOCATION`;

const setPreLocation = (preLocation?: string): void => {
  let loc = preLocation;
  if (!loc) {
    loc = window.location.pathname;
  }
  if (loc !== '/' && !loc.includes('login')) {
    lsHelper.setItem(PRE_LOCATION_KEY, loc)
  }
}

const getPreLocation = (): string | undefined => {
  return lsHelper.getItem(PRE_LOCATION_KEY);
}

const clearPreLocation = (): void => {
  lsHelper.removeItem(PRE_LOCATION_KEY)
}

export { setPreLocation, getPreLocation, clearPreLocation };
