let options = {
	strings: 6,
	tonic: 'E',
	scale: 'natural-major'
}

function start (options) {
	const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
	
	function makeScale () {
		let tonic = options.tonic;
		let scale = options.scale;

		let notesFromTonic = notes.map(function(elem) {
			return 
		})

		if (scale === 'natural-major') {
			makeFreatBoard();
		}
	}

	function makeFreatBoard () {
		for (let i = 0; i < options.strings; i++) {
			drawString();
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

	makeScale();
}

//start(options);