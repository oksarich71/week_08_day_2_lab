const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Sightings = function (url) {
  this.url = url;
  this.request = new RequestHelper(this.url);
};

Sightings.prototype.bindEvents = function () {
  PubSub.subscribe('SightingView:sighting-delete-clicked', (evt) => {
    this.deleteSighting(evt.detail);
  });
  PubSub.subscribe('SightingFormView:sighting-submitted', (evt) => {
    // console.log("EVT DETAIL IN MODEL:", evt.detail);
    this.postSighting(evt.detail);
  })
  //TODO another subscribe to new form being created
  //make post request to server to add new data
};

Sightings.prototype.getData = function () {
  this.request.get()
    .then((sightings) => {
      PubSub.publish('Sightings:data-loaded', sightings);
    })
    .catch(console.error);
};

Sightings.prototype.deleteSighting = function (sightingId) {
  this.request.delete(sightingId)
    .then((sightings) => {
      PubSub.publish('Sightings:data-loaded', sightings);
    })
    .catch(console.error);
};
Sightings.prototype.postSighting = function (newSighting) {
  this.request.post(newSighting)
  .then((sightings) => {
    PubSub.publish('Sightings:data-loaded', sightings)
  })
  .catch(console.error);
};

module.exports = Sightings;
