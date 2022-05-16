//TODO: reference to external elements
var all_experiments = document.getElementsByClassName("experiment");

var _classFilter = 0, _topicFilter = 0;

//_classFilter count acts as class grade
//filter regex is: "kl-{_classFilter}"

//_topicFilter is index of topics
//filter regex is: "tpc-{topics[_topicFilter]}"
var topics = [
  "optik",
  "mechanik",
  "thermodynamik",
  "elektrizitaet",
  "energie_in_n_und_t",
  "mech_der_fl"
];

function openNavL() {
  document.getElementById("sidenav-left").style.width = "25vw";
}
  
function closeNavL(choice, filterIndex) {
  document.getElementById("sidenav-left").style.width = "0";
  document.getElementById("filter-class-text").textContent = choice;
  sortExperiments(filterIndex, _topicFilter);
}

function openNavR() {
  document.getElementById("sidenav-right").style.width = "45vw";
}

function closeNavR(choice, filterIndex) {
  document.getElementById("sidenav-right").style.width = "0";
  document.getElementById("filter-topic-text").textContent = choice;
  sortExperiments(_classFilter, filterIndex);
}

function sortExperiments(classFilter, topicFilter) {
  var filtered_experiments = [];

  if (classFilter != 0) {
    filtered_experiments.push(all_experiments.getElementsByClassName("kl-" + toString(classFilter)));
  }

  if (topicFilter != 0) {
    filtered_experiments.push(all_experiments.getElementsByClassName("tpc-" + topics[topicFilter]));""
  }

  console.log(classFilter + ", " + topicFilter);
  console.log(filtered_experiments);

  return null;
}

function updateExperimentList(list) {
  return null;
}