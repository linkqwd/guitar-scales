// Select all notes which determine tonic
let slectTonic = document.querySelectorAll('.notes__item');
let defaultOptions = {
	scale: 'naturalMajor',
	tuning: 'standard'
}

document.querySelector('.scales').onclick = function () {
	setupTonic();
}

document.querySelector('.notes-trainer').onclick = function () {
	makeFreatBoard(defaultOptions, true);
	noteTrainerLauncher()
}

function setupTonic () {
	slectTonic.forEach(function(elem) {
		elem.onclick = function () {
			let t = document.querySelector('.selected');
			(t === null) ? false : t.classList.remove('selected');
			this.classList.add('selected');

			// options passes in makeFreatBoard function
			let options = {
				tonic: this.innerHTML,
				scale: 'naturalMajor',
				tuning: 'standard'
			}
			// Main function which paint notes on freatboard
			makeFreatBoard(options, false);
		}
	});
	slectTonic[0].click(); // Default launcher
}

function makeFreatBoard (options, noteTrainer) {
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

	// it removes alrady painted notes on freatboard from pervious invokes
	// of makeFreatBoard function
	erase () 
	function erase () {
		let freats = document.querySelectorAll('.freat');
		freats.forEach(function(elem) {
			elem.className = "freat";
			elem.removeAttribute('data-content');
		});
	}

	// This function returns arrey of objects with pair of {NOTE and it's INTERVAL}
	function makeInterval () {
		let result = [];

		// This variable contains position of choosed Tonic in source notes array
		let choosedTonic = notes.indexOf(options.tonic)

		// Needs 12 steps to fill array with needed data
		for (var i = 0, k = choosedTonic; i < notes.length; i++, k++) {
			// notes[tonic] = intervals[0], and os on, so K can be over 12 (number of notes)
			(notes[k] === undefined) ? k = 0 : false;

			result.push({
				note: notes[k],
				interval: intervals[i]
			});
		}

		return result
	}

	function makeScale (string, tuning, note1) {
		for (let i = 0, k = notes.indexOf(tuningOptions[tuning][note1]);
			i < string.length; i++, k++) {

			(notes[k] === undefined) ? k = 0 : false

			// Get pair of Note and it's interval
			let noteIntervalPair = search(notes[k], makeInterval());

			string[i].classList.add(noteIntervalPair.note);

			if (!(noteTrainer))  {
				string[i].classList.add(noteIntervalPair.interval); // paint notes on strings
				paintNotes(string[i], notes[k], noteIntervalPair.interval); // paint intervals on strings
			}
		}
	}

	/* Additional functions for makeScale function*/
	function paintNotes (selector, note, interval) {
		if (scaleList[options.scale].indexOf(interval) >= 0) {
			$(selector).attr('data-content', note);
			selector.classList.add('note');
		} else {
			$(selector).attr('data-content', note);
			selector.classList.add('gray');
		}
	}

	function search(nameKey, myArray) {
		for (var i=0; i < myArray.length; i++) {
			if (myArray[i].note === nameKey) {
				return myArray[i];
			}
		}
	}
	/* */

	makeScale(string1, options.tuning, 0);
	makeScale(string2, options.tuning, 1);
	makeScale(string3, options.tuning, 2);
	makeScale(string4, options.tuning, 3);
	makeScale(string5, options.tuning, 4);
	makeScale(string6, options.tuning, 5);
}

function noteTrainerLauncher() {
	let freats = document.querySelectorAll('.freat');
	let notes = document.querySelectorAll('.notes__item');

	notes.forEach(function(elem) {
		elem.onclick = function () {
			noteGuesser(elem)
		}
	});

	function noteGuesser(note) {
		let paintedNote = document.querySelector('.what-note');
	
		if (paintedNote.classList.contains(note.innerHTML)) {
			$(paintedNote).attr('data-content', note.innerHTML);
			paintedNote.classList.remove('what-note', 'err');
			paintedNote.classList.add('T');
		} else {
			paintedNote.classList.add('err');
		}
	}
	
	function paintRndNote() {
		let randNote = getRandNote()
		$(freats[randNote]).attr('data-content', '?');
		freats[randNote].classList.add('what-note');
	}

	function getRandNote() {
		return +(Math.random() * (freats.length - 0) + 0).toFixed();
	}

	paintRndNote()
	


	
}