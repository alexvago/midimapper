//@ts-check
const fs = require('fs');
const { parseMidi, writeMidi } = require('midi-file');
const { Midi } = require('tonal');
const { parse } = require("jsonc-parser");


if (process.argv.length < 5) {
    console.log('Usage: node midimapper.js <input.mid> <mapping.json> <output.mid>');
    process.exit(1);
}

const [, , midiPath, mappingPath, outputPath] = process.argv;

// Load mapping
const mapping = parse(fs.readFileSync(mappingPath, 'utf8'));

// Load MIDI
const midiData = fs.readFileSync(midiPath);
const midi = parseMidi(midiData);

// Remap notes
for (const track of midi.tracks) {
    for (const event of track) {
        if (event.type === 'noteOn' || event.type === 'noteOff') {

            const noteName = Midi.midiToNoteName(event.noteNumber - 12, { sharps: true });
            // console.log("Original note:", event.noteNumber - 12, noteName);
            if (mapping[noteName]) {
                // console.log(`Remapping note: ${noteName} -> ${mapping[noteName]}`);
                const newMidi = Midi.toMidi(mapping[noteName]);
                if (newMidi !== null) event.noteNumber = newMidi + 12;
            }
        }
    }
}

// Write new MIDI
const outData = Buffer.from(writeMidi(midi));
fs.writeFileSync(outputPath, outData);

console.log(`Remapped MIDI written to ${outputPath}`);
