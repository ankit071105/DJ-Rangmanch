document.addEventListener('DOMContentLoaded', () => {
    const song1Input = document.getElementById('song1');
    const song2Input = document.getElementById('song2');
    const slider = document.getElementById('slider');
    const audio1 = document.getElementById('audio1');
    const audio2 = document.getElementById('audio2');
    const cd1 = document.getElementById('cd1');
    const cd2 = document.getElementById('cd2');
    const effectButtons = document.querySelectorAll('#effects button');

    let audio1Loaded = false;
    let audio2Loaded = false;

    song1Input.addEventListener('change', () => {
        const file = song1Input.files[0];
        if (file) {
            audio1.src = URL.createObjectURL(file);
            audio1.load();
            audio1.play();
            audio1Loaded = true;
            handlePlayback();
        }
    });

    song2Input.addEventListener('change', () => {
        const file = song2Input.files[0];
        if (file) {
            audio2.src = URL.createObjectURL(file);
            audio2.load();
            audio2.play();
            audio2Loaded = true;
            handlePlayback();
        }
    });

    slider.addEventListener('input', () => {
        if (audio1Loaded && audio2Loaded) {
            const value = slider.value / 100;
            audio1.volume = 1 - value;
            audio2.volume = value;
        }
    });

    function handlePlayback() {
        if (audio1Loaded && audio2Loaded) {
            const value = slider.value / 100;
            audio1.volume = 1 - value;
            audio2.volume = value;

           
            if (audio1.paused) {
                audio1.play();
            }

            if (audio2.paused) {
                audio2.play();
            }
        }
    }

    function playSoundEffect(effectFile) {
        const audio = new Audio(effectFile);
        audio.play();
    }

    effectButtons.forEach(button => {
        button.addEventListener('click', () => {
            const effectFile = button.getAttribute('data-effect');
            playSoundEffect(effectFile);
        });
    });

    function addCDHoverEffect(cdElement, soundFile) {
        cdElement.addEventListener('mouseover', () => {
            const audio = new Audio(soundFile);
            audio.play();
        });
    }

    addCDHoverEffect(cd1, 'cd-hover.mp3'); 
    addCDHoverEffect(cd2, 'cd-hover.mp3'); 

});
