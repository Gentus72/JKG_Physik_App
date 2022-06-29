jQuery("h4").fitText(0.38);

var classFilter = 0, topicFilter = '';

function openNavL() {
  document.getElementById('sidenav-left').style.width = '25vw';
}
  
function closeNavL(choice, filterIndex) {
  document.getElementById('sidenav-left').style.width = '0';
  document.getElementById('filter-class-text').textContent = choice;
  sortExperiments(classFilter, topicFilter);
}

function openNavR() {
  document.getElementById('sidenav-right').style.width = '45vw';
}

function closeNavR(choice, filterIndex) {
  document.getElementById('sidenav-right').style.width = '0';
  document.getElementById('filter-topic-text').textContent = choice;
  sortExperiments(classFilter, topicFilter);
}