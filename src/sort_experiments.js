/*$(document).ready(function()
{
    $.get('experiments.html', function(html_string)
    {
        console.log(html_string);
    });
});*/

class Experiment {
    constructor(name, klasse, topic, id) {
        this.name = name;
        this.klasse = klasse;
        this.topic = topic;
        this.id = id;
    }

    getInfo(filter) {
        switch(filter) {
            case 'name':
                return this.name;
            case 'klasse':
                return this.klasse;
            case 'topic':
                return this.topic;
            case 'id':
                return this.id;
        }
    }

    get getPath() {
        return 'res/experiments/exp' + this.id;
    }
}

//grab from server / file from server
var total_experiments = [
    new Experiment('das Ei in der Flasche',             [6, 8, 9],  ['mechanik', 'mech_der_fl'],        '001'),
    new Experiment('das schwebende Röhrchen',           [7, 8],     ['mech_der_fl'],                    '002'),
    new Experiment('Demonstration des Auflagedrucks',   [10],       ['mechanik', 'energie_in_n_und_t'], '003'),
    new Experiment('platzender Luftballon',             [6, 8, 10], ['thermodynamik', 'mech_der_fl'],   '004'),
    new Experiment('Wasser im Glas',                    [5, 7],     ['mech_der_fl'],                    '005')
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
    
    if (result.length > 0) {
        generateExperimentHTML(result);
    }
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
            for (var j = 0; j < _topic.length; j++) {
                if (_class[i] == classFilter && _topic[j] == topicFilter) {
                    return true;
                }
            }
        }
    }

    return false;
}

//TODO implement
function generateExperimentHTML(sorted_experiments) {
    var htmlContent = '';

    for (var i = 0; i < Math.floor(sorted_experiments / 3); i++) {
        htmlContent +=  '<tr>' + '<td><div id="exp'
        + sorted_experiments[i].getInfo('id')
        + '" class="experiment"><h4 class="exp-text">'
        + sorted_experiments[i].getInfo('name')
        + '</h4><video onmouseover="this.play()" onmouseout="this.pause(); this.currentTime=0" onClick="window.location.href=\'res/experiments/exp'
        + sorted_experiments[i].getInfo('id')
        + '.html\'" class="prev-vid" muted loop src="res/experiments/exp'
        + sorted_experiments[i].getInfo('id')
        + '/res2.mp4"></video></div></td>';

        htmlContent += '<td><div id="exp'
        + sorted_experiments[i + 1].getInfo('id')
        + '" class="experiment"><h4 class="exp-text">'
        + sorted_experiments[i + 1].getInfo('name')
        + '</h4><video onmouseover="this.play()" onmouseout="this.pause(); this.currentTime=0" onClick="window.location.href=\'res/experiments/exp'
        + sorted_experiments[i + 1].getInfo('id')
        + '.html\'" class="prev-vid" muted loop src="res/experiments/exp'
        + sorted_experiments[i + 1].getInfo('id')
        + '/res2.mp4"></video></div></td>';

        htmlContent +=  '<tr>' + '<td><div id="exp'
        + sorted_experiments[i + 2].getInfo('id')
        + '" class="experiment"><h4 class="exp-text">'
        + sorted_experiments[i + 2].getInfo('name')
        + '</h4><video onmouseover="this.play()" onmouseout="this.pause(); this.currentTime=0" onClick="window.location.href=\'res/experiments/exp'
        + sorted_experiments[i + 2].getInfo('id')
        + '.html\'" class="prev-vid" muted loop src="res/experiments/exp'
        + sorted_experiments[i + 2].getInfo('id')
        + '/res2.mp4"></video></div></td>' + '</tr>';
    }

    if ((sorted_experiments % 3) == 1) {

    }

    else if ((sorted_experiments % 3) == 2) {

    }

    //TODO implement empty experiment to fill <tr>
}