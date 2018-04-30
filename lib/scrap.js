const scrap = () => {

  const items = document.querySelectorAll('.sr_property_block');
  const results = [];
  const reinforcement = [];
  const facilitiesArray = [];
  let statusmsg = document.querySelector('h1.sorth1');

  if (statusmsg) statusmsg = statusmsg.innerText;
  for (let x = 0; x < items.length; x++) {

    const img = items[x].querySelector('.hotel_image').src;
    const title = items[x].querySelector('.sr-hotel__name').innerText;
    let price = items[x].querySelector('.availprice');
    let badge = items[x].querySelector('.review-score-badge');
    let demand = items[x].querySelector('.sr_property_in_demand');
    let url = items[x].querySelector('.hotel_name_link');
    let description = items[x].querySelector('div.hotel_desc');;
    const facilities = items[x].querySelectorAll('.facility-badge__title');
    let coordinates  = items[x].querySelector('a.district_link');

    console.info('facilities length: ', facilities.length);
    for(let i = 0; i < facilities.length; i++) {
      if (facilities[i].attributes['data-title']) {
        const attr = facilities[i].attributes['data-title'].value.replace(/(<([^>]+)>)/ig,"").trim();
        console.info('facilities attr: ', attr);
        if (attr) facilitiesArray.push(attr);
      }
    }

    if (price) {
        price = price.innerText.replace('$', '').trim();
        if (price) price = parseInt(price.replace('.', ''), 10);
    }

    if (demand) demand = demand.innerText;
    if (badge) badge = badge.innerText;
    if (url) url = url.href.split('?')[0];
    if (description) description = description.innerText;
    if (coordinates && coordinates.attributes['data-coords']) coordinates = coordinates.attributes['data-coords'].value;


    results.push({
      image: img,
      title: title,
      price: price,
      badge: badge,
      url: url,
      demand: demand,
      description: description,
      coordinates: !coordinates ? [0, 0]: coordinates.split(',').map(c => parseFloat(c)),
      facilities: facilitiesArray,
    });
  }// end for

  return Promise.resolve({
    results: results,
    statusmsg: statusmsg,
  });
};

module.exports = scrap;
