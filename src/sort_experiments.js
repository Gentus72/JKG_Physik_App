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
    new Experiment('das Ei in der Flasche',               [6, 8, 9],  ['mechanik', 'mech_der_fl'],        '001'),
    new Experiment('das schwebende Röhrchen',             [7, 8],     ['mech_der_fl'],                    '005'),
    new Experiment('Demonstration des Auflagedrucks',     [10],       ['mechanik', 'energie_in_n_und_t'], '006'),
    new Experiment('platzender Luftballon',               [6, 8, 10], ['thermodynamik', 'mech_der_fl'],   '007'),
    new Experiment('Wasser im Glas',                      [5, 7],     ['mech_der_fl'],                    '008'),
    new Experiment('Zusammenziehen auf Skateboards',      [6, 8],     ['mechanik', 'kräfte'],             '002'),
    new Experiment('Demonstration Oberflächenspannung',   [7, 9],     ['kräfte'],                         '003'),
    new Experiment('Luftdruck-Rakete 350ml',              [8, 10],    ['kräfte'],                         '004')
]

function sortExperiments(classFilter, topicFilter) {
    //go through every entry of total_experiments and
    //scan for matches using Experiment.getInfo(filter)

    let result = [];
    
    if (classFilter == 0 && topicFilter == '') {
        result = total_experiments;
    } else {
        for (let e of total_experiments) {
            if(matchesFilter(e, classFilter, topicFilter)) {
                result.push(e);
            }
        }
    }
    
    if (result.length > 0) {
        document.getElementById('experiments-table').innerHTML = generateExperimentHTML(result);
    }
}

function matchesFilter(e, classFilter, topicFilter) {
    if (classFilter != 0 && topicFilter == '') {
        let _klasse = e.getInfo('klasse');

        for (let i = 0; i < _klasse.length; i++) {
            if (_klasse[i] == classFilter) {
                return true;
            }
        }

        return false;
    }

    else if (topicFilter != '' && classFilter == 0) {
        console.log('exec2');
        let _topic = e.getInfo('topic');

        for (let i = 0; i < _topic.length; i++) {
            if (_topic[i] == topicFilter) {
                return true;
            }
        }

        return false;
    }

    else if (topicFilter != '' && classFilter != 0) {
        console.log('exec3');
        let _class = e.getInfo('klasse');
        let _topic = e.getInfo('topic');

        for (let i = 0; i < _class.length; i++) {
            for (let j = 0; j < _topic.length; j++) {
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
    let htmlContent = '';

    for (let i = 0; i < Math.floor(sorted_experiments.length / 3); i++) {
        htmlContent += '<tr>';

        for (let j = 0; j < 3; j++) {
            htmlContent += '<td><div id="exp'
            + sorted_experiments[i * 3 + j].getInfo('id')
            + '" class="experiment"><h4 class="exp-text">'
            + sorted_experiments[i * 3 + j].getInfo('name')
            + '</h4><video onmouseover="this.play()" onmouseout="this.pause(); this.currentTime=0" onClick="window.location.href=\'res/experiments/exp'
            + sorted_experiments[i * 3 + j].getInfo('id')
            + '/example_exp.html\'" class="prev-vid" muted loop src="res/experiments/exp'
            + sorted_experiments[i * 3 + j].getInfo('id')
            + '/res2.mp4"></video></div></td>';
        }

        htmlContent += '</tr>';
    }

    if ((sorted_experiments.length % 3) != 0) {
        htmlContent += '<tr>';

        for (let i = 1; i < (sorted_experiments.length % 3) + 1; i++) {
            let len = sorted_experiments.length;

            htmlContent += '<td><div id="exp'
            + sorted_experiments[len - i].getInfo('id')
            + '" class="experiment"><h4 class="exp-text">'
            + sorted_experiments[len - i].getInfo('name')
            + '</h4><video onmouseover="this.play()" onmouseout="this.pause(); this.currentTime=0" onClick="window.location.href=\'res/experiments/exp'
            + sorted_experiments[len - i].getInfo('id')
            + '/example_exp.html\'" class="prev-vid" muted loop src="res/experiments/exp'
            + sorted_experiments[len - i].getInfo('id')
            + '/res2.mp4"></video></div></td>';
        }

        htmlContent += '</tr>';
    }

    return htmlContent;
}

function getEmptyExperimentHTML() {
    return '<td><div class="experiment"><h4 class="exp-text">X</h4></div></td>';
}