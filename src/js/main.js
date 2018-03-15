let options = {
	tonic: 'A',
	scale: 'pentatonicMinor',
	tuning: 'standard'
}

start(options);

function start (options) {
	const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
	const intervals  = ['T', '2m', '2b', '3m', '3b', '4', 'TT', '5', '6m', '6b', '7m', '7b'];
	const scaleList = {
		naturalMajor: ['T', '2b', '3b', '4', '5', '6b', '7b'],
		naturalMinor: ['T', '2b', '3m', '4', '5', '6m', '7m'],
		pentatonicMajor: ['T', '2b', '3b', '5', '6b'],
		pentatonicMinor: ['T', '3m', '4', '5', '7m']
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

	function makeInterval () {
		let result = [];
		let tonicInArray = notes.indexOf(options.tonic)

		for (var i = 0, k = tonicInArray; i < notes.length; i++, k++) {
			(notes[k] === undefined) ? k = 0 : false;
			result.push({
				note: notes[k],
				interval: intervals[i]
			});
		}

		return result
	}

	let intervalArray = makeInterval();

	function makeScale (string, tuning, note1) {
		for (let i = 0, k = notes.indexOf(tuningOptions[tuning][note1]);
						 i < string.length; i++, k++) {

			(notes[k] === undefined) ? k = 0 : false

			string[i].classList.add(notes[k]);

			let temp = search(notes[k], intervalArray);

			string[i].classList.add(temp.interval);

			paintNotes(string[i], notes[k], temp.interval);
		}
	}

	function paintNotes (selector, note, interval) {
		if (scaleList[options.scale].indexOf(interval) >= 0) {
			$(selector).attr('data-content', note);
			selector.classList.add('note');
		}
	}
	
	makeScale(string1, options.tuning, 0);
	makeScale(string2, options.tuning, 1);
	makeScale(string3, options.tuning, 2);
	makeScale(string4, options.tuning, 3);
	makeScale(string5, options.tuning, 4);
	makeScale(string6, options.tuning, 5);

	function search(nameKey, myArray){
		for (var i=0; i < myArray.length; i++) {
			if (myArray[i].note === nameKey) {
				return myArray[i];
			}
		}
	}
}

