var classFilter = 0, topicFilter = '';

sortExperiments(0, '');

function openNavL() {
  document.getElementById('sidenav-left').style.width = '25vw';
}
  
function closeNavL(choice) {
  document.getElementById('sidenav-left').style.width = '0';
  document.getElementById('filter-class-text').textContent = choice;
  sortExperiments(classFilter, topicFilter);
}

function openNavR() {
  document.getElementById('sidenav-right').style.width = '45vw';
}

function closeNavR(choice) {
  document.getElementById('sidenav-right').style.width = '0';
  document.getElementById('filter-topic-text').textContent = choice;
  sortExperiments(classFilter, topicFilter);
}