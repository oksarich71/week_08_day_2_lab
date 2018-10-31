const PubSub = require('../helpers/pub_sub.js')

const SightingFormView = function (form) {
  this.form = form;
};

SightingFormView.prototype.bindEvents = function () {
  this.form.addEventListener('submit', (evt) => {
    this.handleSubmit(evt);
  });
};

SightingFormView.prototype.handleSubmit = function (evt) {
  evt.preventDefault();
  //TODO handle functionality - submit
  // find values and publish them
  const newSighting = {
    species: evt.target.species.value,
    location: evt.target.location.value,
    date: evt.target.date.value
  }
  PubSub.publish('SightingFormView:sighting-submitted', newSighting);
  evt.target.reset();
}


module.exports = SightingFormView;
