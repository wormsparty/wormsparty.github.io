"use strict";

let WebAudio = {};

WebAudio.new = function() {
    // Fix up prefixing
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    let context = new AudioContext();

    if (!context) {
      return undefined;
    }

    let handle = {
      context: context,
      data: {}
    };
    
    handle.load = function(file, onload, onfailure) {
        let request = new XMLHttpRequest();
        request.open('GET', file, true);
        request.responseType = 'arraybuffer';

        request.onload = function() {
          context.decodeAudioData(
            request.response,
            function(buffer) {
              if (!buffer) {
                console.error('error decoding file data: ' + file);
                onfailure();
                return;
              }

              handle.data[file] = buffer;
              onload(file);
            },
            function(error) {
              console.error('decodeAudioData error', error);
              onfailure();
            }
          );
        };

        request.onerror = function() {
          console.error('BufferLoader: XHR error');
          onfailure();
        };

        request.send();
    };

    handle.play = function(filename) {
        let data = handle.data[filename];

        let source = handle.context.createBufferSource();
        source.buffer = data;
        source.connect(handle.context.destination);
        source.start(0);
    };

    return handle;
};