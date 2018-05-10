const http = require('http');
const fs = require('fs');
const express = require('express');
const exphbs  = require('express-handlebars');
const debug = require('debug')('booking:app');
const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];
const app = express();
const mongojs = require('mongojs');
const db = mongojs('mongodb://127.0.0.1:27017/booking', ['hotels', 'searches']);
const server = http.createServer(app);
const scrap = require('./lib/scrap');


app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');
app.use( express.static('./public') );

app.get('/', (req, res) => {
  res.render('home', {});
});

app.get('/results', (req, res) => {

  const fromDate = new Date(req.query.fromdate);
  const toDate = new Date(req.query.todate);
  console.info('ranges: ', fromDate, toDate);

  const params = {
    lang: 'es',
    sb: 1,
    src_elem: 'sb',
    ss: 'Mendoza%2C+Mendoza+Province%2C+Argentina',
    checkin_monthday: fromDate.getDate(),
    checkin_month: fromDate.getMonth() + 1,
    checkin_year: fromDate.getFullYear(),
    checkout_monthday: toDate.getDate(),
    checkout_month: toDate.getMonth() + 1,
    checkout_year: toDate.getFullYear(),
    src: 'searchresults',
    no_rooms: 1,
    group_adults: 2,
    group_children: 0,
    genius_rate: 1,
    from_sf: 1,
    ss_raw: 'mendoza',
    ac_position: 0,
    highlighted_hotels: '',
    ac_langcode: 'es',
    dest_id: -1003869,
    dest_type: 'city',
    place_id_lat: -32.88903,
    place_id_lon: -68.842995,
    search_pageview_id: '0b1867475eb80086',
    search_selected: 'true',
    search_pageview_id: '0b1867475eb80086',
    ac_suggestion_list_length: 7,
    ac_suggestion_theme_list_length: 0,
    airport_sel: 0,
    sid: 'b45d7e7bfd421ec1da1e1d7406042908',
    label: 'gen173nr-1DCAQoggJCDWNpdHlfLTEwMDM4NjlIClgEaAyIAQGYAQrCAQN4MTHIAQzYAQPoAQH4AQOSAgF5qAID',
  };

  const queryString = Object.keys(params).map(k => `${k}=${params[k]}`).join('&');
  const url = `https://www.booking.com/searchresults.es.html?${queryString}`;
  debug('request to: ', url);

  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // await page.setRequestInterception(true);
    // await page.emulate(iPhone);
    page.on('console', msg => console.log('PAGE LOG:', msg.text));

    await page.goto(url);
    await page.mouse.move(50,70);
    await page.waitFor(3000);

    await page.screenshot({
      path: './screenshots/puppeteerexample1.png',
      fullPage: true,
    });

    const response = await page.evaluate(scrap); // end evaluate

    response.results.forEach((r) => {
      db.hotels.findOne({ url : r.url }, (err, doc) => {
        r.location = {
          type: 'Point',
          coordinates: r.coordinates,
        };

        r.coordinates = `${r.coordinates[1]},${r.coordinates[0]}`;
        if (doc) {
          return db.hotels.update({ url: r.url }, {
              $set : Object.assign(doc,
                r,
                {
                  updated: new Date(),
                })
            }, (err) => {
            if (err) console.error('error updating hotel info');
          });
        }
        r.added = new Date();
        return db.hotels.insert(r, (err2) => {
          if (err2) console.error('Error inserting: ', r);
        });
      })
    });
    res.render('home', {
      results: response.results,
      total: response.results.length,
      statusmsg: response.statusmsg,
    });

    db.searches.insert({
      added: new Date(),
      params,
      statusmsg: response.statusmsg,
    });


    await browser.close();
  })();

});

server.listen(80, () => console.info('listen *:80'));
