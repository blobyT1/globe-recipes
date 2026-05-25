import countryList from 'country-list';

export const countries = countryList.getNames().slice().sort((a, b) => a.localeCompare(b));

export const countrySet = new Set(countries);
