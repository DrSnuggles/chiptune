# Chiptune.js

## Info
This is a javascript library that can play module music files. It is based on the [libopenmpt](https://lib.openmpt.org/libopenmpt) C/C++ library. To translate libopenmpt into Javascript [emscripten](https://github.com/kripken/emscripten) was used. 

Modernized ES6 module version with libopenmpt AudioWorklet backend

**Please note**: The compiled `libopenmpt.worklet.js` in this repository is maybe outdated.

Latest released and beta versions are available via "npm i chiptune".

## Demo
See: https://DrSnuggles.github.io/chiptune

Modland demo player: https://DrSnuggles.github.io/chiptune/demo.html

Drop in your favorite songs.

## How to use
- HTML: Include latest release version via https://drsnuggles.github.io/chiptune/chiptune3.min.js
- NPM: "npm i chiptune3" will install latest release but there are also upcoming versions available
- See index.html or demo.html for working examples

## Features

* Play all tracker formats supported by libopenmpt (including mod, xm, s3m, it)
* Simple Javascript API
* Pause/Resume
* Play local and remote files
* Stereo playback
* Module metadata
* Looping mode
* Volume control
* Position control
* Pattern data

## Build
Docker was used to build the library

CD into docker and run build.bat (Win) or build.sh (Linux)

You can minify by "npm run minify"

## Chiptune Maintainers
- v3: [DrSnuggles](https://github.com/DrSnuggles)
- v1/v2: [deskjet](https://github.com/deskjet)

## v3 History
- 2025-04-22: Emscripten 4.0.7
- 2025-02-02: libopenmpt 0.7.13 + Emscripten 4.0.2
- 2025-02-02: Issue #1: Convert to AudioBuffer, see convert.html
- 2024-06-15: libopenmpt 0.7.8 + Emscripten 3.1.61
- 2024-05-12: libopenmpt 0.7.7 + Emscripten 3.1.59
- 2024-04-20: Emscripten 3.1.57 changes
- 2024-03-24: Bumped to 0.7.6
- 2024-03-18: Bumped to 0.7.5 using Emscripten 3.1.56
- 2024-03-13: Bumped to 0.7.4
- 2024-02-04: Metadata contains song, bugfixes and minify
- 2024-01-24: Added config object, Modland player
- 2024-01-23: Drag'n'Drop files. Build library using Docker.
- 2024-01-22: Libopenmpt 0.7.3 compiled with Emscripten 3.1.51

## License

All code in this project is MIT (X11) licensed. The only exception are the compiled libopenmpt parts which remain under the OpenMPT project BSD license.

License text below:

>Copyright © 2013-2024 The chiptune2.js/chiptune3.js contributers.
>
>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
>
>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
>
>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

