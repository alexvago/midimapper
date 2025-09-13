# MIDI Mapper

A simple Node.js tool to remap notes in a MIDI file using a mapping file. Useful in case you have different VSTs with incompatible notes (e.g virtual drums)

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `mapping.jsonc` to define your note mappings. Example:
   ```jsonc
   {
     "C1": "D0", // Kick
     "F#1": "A1" // Hi-Hat 
   }
   ```

3. Run the script:
   ```
   node midimapper.js input.mid mapping.jsonc output.mid
   ```

- `input.mid`: Your source MIDI file
- `mapping.jsonc`: Your mapping file
- `output.mid`: The remapped MIDI file (can be any name)
