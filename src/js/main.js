let options = {
	tonic: 'C',
	scale: 'naturalMajor',
	tuning: 'standard'
}

start(options);

function start (options) {
	const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
	const interval  = ['T', '2m', '2b', '3m', '3b', '4', 'TT', '5', '6m', '6b', '7m', '7b'];
	const scaleList = {
		naturalMajor: ['T', '2b', '3b', '4', '5', '6b', '7b']
	};
	const tuningOptions = {
		standard: ['E', 'B', 'G', 'D', 'A', 'E'],
		dropD: ['E', 'B', 'G', 'D', 'A', 'D']
	};

	const string1 = document.querySelectorAll('.string-1 .freat');
	const string2 = document.querySelectorAll('.string-2 .freat');
	const string3 = document.querySelectorAll('.string-3 .freat');
	const string4 = document.querySelectorAll('.string-4 .freat');
	const string5 = document.querySelectorAll('.string-5 .freat');
	const string6 = document.querySelectorAll('.string-6 .freat');

	function tagFretsWithNotes (str, tune, note) {
		for (let i = 0, j = notes.indexOf(tuningOptions[tune][note]); 
						 i < str.length; i++, j++)
		{
			str[i].classList.add(notes[j]);
			(notes[j] === options.tonic) ? str[i].classList.add('tonic') : false;
			$(str[i]).attr('data-content', notes[j]);
		}
	}
	
	tagFretsWithNotes(string1, options.tuning, 0);
	tagFretsWithNotes(string2, options.tuning, 1);
	tagFretsWithNotes(string3, options.tuning, 2);
	tagFretsWithNotes(string4, options.tuning, 3);
	tagFretsWithNotes(string5, options.tuning, 4);
	tagFretsWithNotes(string6, options.tuning, 5);
	
	function makeScale () {

	}

}




function drawString () {
	let divString = document.createElement('div');
	divString.classList.add('string');
	let tonic = notes.indexOf(options.tonic);
	let flag = true;
	for (let i = tonic; i < 20; i++) {
		console.log(notes[i] + " " + i);
		if (notes[i] === undefined && flag) {
			i = 0;
			flag = false;
		}
		let div = document.createElement('div');
		div.classList.add(notes[i]);
		div.classList.add('string__note');
		div.innerHTML = notes[i];
		divString.append(div);
	}
	document.body.append(divString);
}