let map;
async function initMap() {
  const divMap = document.getElementById('map');
  const cityName = divMap.getAttribute('name');

  const response = await fetch(`/map/${cityName}`, { method: 'POST' });

  if (response.status !== 200) alert('Не получена информация по автоматам');
  const { automatList, cities } = await response.json();

  let cityIndex;
  cities.forEach((city, index) => {
    if (city.title == cityName) cityIndex = index;
  });
// console.log(cities, cityName, cityIndex);

  map = new google.maps.Map(divMap, {
    center: { lat: cities[cityIndex].position.lat, lng: cities[cityIndex].position.lng },
    zoom: cities[cityIndex].zoom,
  });

  const markers = []; const info = [];
  for (let i = 0; i < automatList.length; i++) {
    const title = `автомат №${automatList[i].id}\n`
    + `статус: ${automatList[i].status.flag}\n`
    + `роутеров: ${automatList[i].quantity.routers}\n`
    + `свободных ячеек: ${automatList[i].quantity.freeCells}`;

    markers[i] = new google.maps.Marker({
      position: {
        lat: automatList[i].adress.position.lat,
        lng: automatList[i].adress.position.lng,
      },
      map,
      icon: automatList[i].status.flag === 'активен'
        ? 'https://www.tricel.fr/wp-content/uploads/2016/08/adresse-partenaire.png'
        : 'http://www.4mobile.by/sites/default/files/raspolozhenie.png',
      title,
    });

    info[i] = new google.maps.InfoWindow({
      content: `<div style="font-size: 12px">нажмите, чтобы построить маршрут:<br />
      <b><a target="_blank" href="https://maps.google.com?saddr=Мое+Местоположение&daddr=
      ${automatList[i].adress.position.lat},${automatList[i].adress.position.lng}">
      ${automatList[i].adress.title}</a></b></div>`,
    });

    markers[i].addListener('click', () => {
      info[i].open(map, markers[i]);
    });
  }
}

document.getElementById('select').addEventListener('change', event => {
  window.location = event.target.value;
});
