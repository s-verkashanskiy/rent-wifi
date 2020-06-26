let map;
async function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 55.7522, lng: 37.6156 },
    zoom: 13,
  });

  const markers = []; const
    info = [];

  const response = await fetch('/map', { method: 'POST' });

  if (response.status !== 200) {
    error = 'Не получена информация по автоматам';
    alert(error);
  }
  const { automatList } = await response.json();

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
      <b><a target="_blank" href="https://maps.google.com?saddr=Current+Location&daddr=
      ${automatList[i].adress.position.lat},${automatList[i].adress.position.lng}">
      ${automatList[i].adress.title}</a></b>`,
    });

    markers[i].addListener('click', () => {
      info[i].open(map, markers[i]);
    });
  }

  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address: `${lat},${lng}` }, (results, status) => {
    if (status !== google.maps.GeocoderStatus.OK || !results[0]) {
      return;
    }
    const result = results[0];

    let city; let region; let
      country;

    for (let i = 0; i < result.address_components.length; i++) {
      if (result.address_components[i].types[0] === 'locality') {
        city = result.address_components[i];
      }
      if (result.address_components[i].types[0] === 'administrative_area_level_1') {
        region = result.address_components[i];
      }
      if (result.address_components[i].types[0] === 'country') {
        country = result.address_components[i];
      }
    }

    alert(`${city.long_name}, ${region.long_name}, ${country.short_name}`);

    console.log(results);
  });
}
