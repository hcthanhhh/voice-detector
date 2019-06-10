<script>
/*eslint-disable*/
import Vue from 'vue'

var recognition = new window.webkitSpeechRecognition();
let recognizing = false;
let result = null;

export const VoiceSearch = {
    bind(el, bindings, Vnode, oldVnode) {
        console.log('inserted')
        let self = vnode.context;
        let vModelName = bindings.value;

        function initVoiceSearch () {
            console.log(recognition);
            //format recognition
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = 'vi-VN'
            console.log(recognition.lang);

            //----------Recognition function----------
            recognition.onerror = (event) => {
                console.log(event);
                if (event.error === 'no-speech') recognizing = false;
                if (event.error === 'language-not-supported') recognition.lang = '';
                if (event.error === 'not-allowed') alert('cannot use your microphone!');
            }

            recognition.onend = () => {
                recognition = false
            }

            recognition.onresult = (event) => {
                for (var i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        result = event.results[i][0].transcript;
                        console.log('result: ', result);
                    }
                }
            }
        };

        function toggleStartStop () {
            if (recognizing) {
                console.log('stop recognizing');
                recognition.stop();
                recognizing = false;
            } else {
                console.log('start recognizing')
                initVoiceSearch()
                recognition.start();
                recognizing = true;
            }
        }

        windows.addEventListener('keyup', (e) => {
            if (e.keycode === 13) {
                toggleStartStop()
            }
        })
    }

}

Vue.directive('voice-search', VoiceSearch)
</script>
