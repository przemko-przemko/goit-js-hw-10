function fetchCountries(name) {
  if (name === '') {
    console.log('Please a choose a country');
  } else {
    return fetch(
      `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`,
    ).then(res => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      return res.json();
    });
  }
}
export { fetchCountries };
