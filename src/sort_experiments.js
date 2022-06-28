/*$(document).ready(function()
{
  $.get('experiments.html', function(html_string)
   {
      console.log(html_string);
   });
});*/

var _classFilter = 0, _topicFilter = '';

//grab from server / file from server
var total_experiments = [
  new Experiment('das Ei in der Flasche', [6, 8, 9], ['mechanik', 'mech_der_fl']),
  new Experiment('das schwebende Röhrchen', [7, 8], ['mech_der_fl']),
  new Experiment('Demonstration des Auflagedrucks', [10], ['mechanik', 'energie_in_n_und_t']),
  new Experiment('platzender Luftballon', [6, 8, 10], ['thermodynamik', 'mech_der_fl']),
  new Experiment('Wasser im Glas', [5, 7], 'mech_der_fl')
]



class Experiment {
  constructor(name, klasse, topic) {
    this.name = name;
    this.klasse = klasse;
    this.topic = topic;
  }

  getInfo(filter) {
    switch(filter) {
      case 'name':
        return this.name;
        break;
      case 'klasse':
        return this.klasse;
        break;
      case 'topic':
        return this.topic;
        break;
    }
  }
}