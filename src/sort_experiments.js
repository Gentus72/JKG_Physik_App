/*$(document).ready(function()
{
  $.get('experiments.html', function(html_string)
   {
      console.log(html_string);
   });
});*/

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

//grab from server / file from server
var total_experiments = [
  new Experiment('das Ei in der Flasche', [6, 8, 9], ['mechanik', 'mech_der_fl']),
  new Experiment('das schwebende Röhrchen', [7, 8], ['mech_der_fl']),
  new Experiment('Demonstration des Auflagedrucks', [10], ['mechanik', 'energie_in_n_und_t']),
  new Experiment('platzender Luftballon', [6, 8, 10], ['thermodynamik', 'mech_der_fl']),
  new Experiment('Wasser im Glas', [5, 7], ['mech_der_fl'])
]

function sortExperiments(classFilter, topicFilter) {
  //go through every entry of total_experiments and
  //scan for matches using Experiment.getInfo(filter)

  var result = [];

  console.log(classFilter + ' + ' + topicFilter);

  for (var e of total_experiments) {
    if(matchesFilter(e, classFilter, topicFilter)) {
      result.push(e);
    }
  }

  console.log(result);
  return result;
}

function matchesFilter(e, classFilter, topicFilter) {
  if (classFilter != 0 && topicFilter == '') {
    console.log('exec1');
    var _klasse = e.getInfo('klasse');

    for (var i = 0; i < _klasse.length; i++) {
      if (_klasse[i] == classFilter) {
        return true;
      }
    }

    return false;
  }

  else if (topicFilter != '' && classFilter == 0) {
    console.log('exec2');
    var _topic = e.getInfo('topic');

    for (var i = 0; i < _topic.length; i++) {
      if (_topic[i] == topicFilter) {
        return true;
      }
    }

    return false;
  }

  else if (topicFilter != '' && classFilter != 0) {
    console.log('exec3');
    var _class = e.getInfo('klasse');
    var _topic = e.getInfo('topic');

    for (var i = 0; i < _class.length; i++) {
      if (_class[i] == classFilter) {
        return true;
      }
    }

    for (var i = 0; i < _topic.length; i++) {
      if (_topic[i] == topicFilter) {
        return true;
      }
    }

    return false;
  }

  return false;
}

//TODO implement
function generateExperimentHTML(sorted_experiments, resultFountToF) {
  if (resultFountToF) {
    //generate HTML
  }
}