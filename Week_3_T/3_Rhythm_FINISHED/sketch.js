//beetjs is good for percussive sounds where you don't really need to change the notes 
var polySynth, monoSynth, kicks, hats;

function setup() {
	var beet = new Beet({
		context: Tone.context,
		tempo: 100
	});

	//Visualization 
	//setup audio context 
	Nexus.context = Tone.context

	//remember to set DIV in html file 
	var spectrogram = new Nexus.Spectrogram('#spec')
	spectrogram.connect(Tone.Master);

	var oscilloscope = new Nexus.Oscilloscope('#osc')
	oscilloscope.connect(Tone.Master);


	kicks = new Tone.Players({
		'k1': 'dilla/ASD Dilla Kicks/ASD Dilla Kick 01.wav',
		'k2': 'dilla/ASD Dilla Kicks/ASD Dilla Kick 02.wav'
	}).toMaster();

	hats = new Tone.Players({
		'h1': 'dilla/ASD Dilla Hats/ASD Dilla Hat 01.wav'
	}).toMaster();

	snares = new Tone.Players({
		's1': 'dilla/ASD Dilla Snares/ASD Dilla Snare 01.wav'
	}).toMaster();

	var fours = beet.pattern(4);
	var threes = beet.pattern(2);
	var seven = beet.pattern(3);

	var layer = beet.layer(fours, (time) => {
		kicks.get('k2').start();
	});
	var layer2 = beet.layer(threes, (time) => {
		hats.get('h1').start();
	});
	var layer3 = beet.layer(seven, (time) => {
		snares.get('s1').start();
	})

	beet.add(layer, layer2, layer3);

	//to make stop 
	// beet.start()
}