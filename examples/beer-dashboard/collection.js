Beers = new Mongo.Collection("Beers");

Meteor.methods({
  insertBeer(numBeers,date){
      numBeers = parseInt(numBeers);
      // type checking
        // insert amount and date into collection
      return Beers.insert({beers:numBeers, date: date });
  },

  removeBeer(id){
    return Beers.remove(id);
  }

});
