$(document).ready(function()
{
  $.get('experiments.html', function(html_string)
   {
      console.log(html_string);  // this is not Working
   });
});

var _classFilter = 0, _topicFilter = 0;

/*
_classFilter count acts as class grade
filter regex is: 'kl-{_classFilter}'

_topicFilter is index of topics
filter regex is: 'tpc-{topics[_topicFilter]}'
*/

var experiments_names = [
  'das Ei in der Flasche',
  'das schwebende Röhrchen',
  'Demonstration des Auflagedrucks',
  'platzender Luftballon',
  'Wasser im Glas'
], experiments_classes = [
  [6, 8, 9],
  [7, 8],
  [10],
  [6, 8, 10],
  [5, 7]
], experiments_topics = [
  ['mechanik', 'mech_der_fl'],
  ['mech_der_fl'],
  ['mechanik', 'energie_in_n_und_t'],
  ['thermodynamik', 'mech_der_fl'],
  ['mech_der_fl']
]

var topics = [
  'optik',
  'mechanik',
  'thermodynamik',
  'elektrizitaet',
  'energie_in_n_und_t',
  'mech_der_fl'
];

function openNavL() {
  document.getElementById('sidenav-left').style.width = '25vw';
}
  
function closeNavL(choice, filterIndex) {
  document.getElementById('sidenav-left').style.width = '0';
  document.getElementById('filter-class-text').textContent = choice;
  sortExperiments(filterIndex, _topicFilter);
}

function openNavR() {
  document.getElementById('sidenav-right').style.width = '45vw';
}

function closeNavR(choice, filterIndex) {
  document.getElementById('sidenav-right').style.width = '0';
  document.getElementById('filter-topic-text').textContent = choice;
  sortExperiments(_classFilter, filterIndex);
}

//main filtering function
function sortExperiments(classFilter, topicFilter) {
  var filtered_experiments = [];

  //check if constraints are given
  if (classFilter != 0) {
    //error
    filtered_experiments.push(all_experiments.getElementsByClassName('kl-' + classFilter));
  }

  if (topicFilter != 0) {
    filtered_experiments.push(all_experiments.getElementsByClassName('tpc-' + topics[topicFilter]));''
  }

  console.log(classFilter + ', ' + topicFilter);
  console.log(filtered_experiments);

  return null;
}

function updateExperimentList(list) {
  return null;
}

class Experiment {
  constructor(name, klasse, topic) {
    this.name = name;
    this.klasse = klasse;
    this.topic = topic;
  }

  get getHTML() {
    /*
    Syntax:
      <td>
        <div id="exp-#xyz" class="experiment">
            <h4 class="exp-text">Example Exp</h4>
            <video onmouseover="this.play()" onmouseout="this.pause(); 
                this.currentTime=0;" onclick="window.location.href='res/experiments/example_exp.html'" class="prev-vid" muted loop src="res/experiments/exp1/res2.mp4">
            </video>
        </div>
      </td>
    */

    var code = "<td>\n\s<div id='{x}'";
  }
}