let tuning = [7, 2, 10, 5, 12, 7];
    function renderFretboard() {
        const svg = document.getElementById('fretboard');
        svg.innerHTML = '';
        const noteNames = ['A', 'A♯', 'B', 'C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯'];
        function fretPosition(fret, totalFrets, width) {
            const lastFret = 1 - Math.pow(0.5, totalFrets / 12);
            return width * (1 - Math.pow(0.5, fret / 12)) / lastFret;
        }  
    
        const svgWidth = 900;
        const svgHeight = 300;
        const paddingY = 15;
        const stringCount = 6;
        const fretcount = 12;
        const stringSpacing = (svgHeight - paddingY * 2) / (stringCount - 1);
        let stringwidth = 2;
    
        const nutLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        nutLine.setAttribute('x1', 0);
        nutLine.setAttribute('x2', 0);
        nutLine.setAttribute('y1', 0);
        nutLine.setAttribute('y2', svgHeight);
        nutLine.setAttribute('stroke', '#A6A9B2');
        nutLine.setAttribute('stroke-width', 20);
        svg.appendChild(nutLine);
        for (let fret = 1; fret <= fretcount; fret++) {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            const x = fretPosition(fret, fretcount, svgWidth);
            line.setAttribute('x1', x);
            line.setAttribute('x2', x);
            line.setAttribute('y1', 0);
            line.setAttribute('y2', svgHeight);
            line.setAttribute('stroke', '#A6A9B2');
            line.setAttribute('stroke-width', 2);
            svg.appendChild(line);
        }
    
        for (let string = 0; string < stringCount; string++) {
            const x = -60 / 2;
            const y = paddingY + string * stringSpacing;
    
            const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            group.classList.add("note", noteNames[tuning[string] % noteNames.length]);
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.classList.add('marker');
            circle.setAttribute('cx', x);
            circle.setAttribute('cy', y);
            circle.setAttribute('r', 13);
            circle.setAttribute('fill', '#434750');

            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', x);
            text.setAttribute('y', y);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('dominant-baseline', 'middle');
            text.setAttribute('fill', 'white');
            text.textContent = noteNames[tuning[string] % noteNames.length];

            group.appendChild(circle);
            group.appendChild(text);
            svg.appendChild(group);
        }
    
        for (let string = 0; string < stringCount; string++) {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', 0);
            line.setAttribute('x2', svgWidth);
            line.setAttribute('y1', paddingY + string * stringSpacing);
            line.setAttribute('y2', paddingY + string * stringSpacing);
            line.setAttribute('stroke', 'silver');
            line.setAttribute('stroke-width', stringwidth);
            svg.appendChild(line);
            if (string == stringCount / 2) {
                stringwidth += 0.2;
            } else {
                stringwidth += 0.5;
                }
                
                for (let note = 0; note < fretcount; note++) {
                    const x = (fretPosition(note, fretcount, svgWidth) + fretPosition(note + 1, fretcount, svgWidth)) / 2;
                    const y = paddingY + string * stringSpacing;
                    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                    group.classList.add("note", noteNames[(tuning[string] + note + 1) % noteNames.length]);
                    
                    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                    circle.classList.add('marker');
                    circle.setAttribute('cx', x);
                    circle.setAttribute('cy', y);
                    circle.setAttribute('r', 13);
                    circle.setAttribute('fill', '#434750');
                    const markerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                    markerCircle.setAttribute('x', x);
                    markerCircle.setAttribute('y', y);
                    markerCircle.setAttribute('text-anchor', 'middle');
                    markerCircle.setAttribute('dominant-baseline', 'middle');
                    markerCircle.setAttribute('fill', 'white');
                    markerCircle.textContent = noteNames[(tuning[string] + note + 1) % noteNames.length];

                    group.appendChild(circle);
                    group.appendChild(markerCircle);
                    svg.appendChild(group);
                        
                    
            }
        }
    
    }

    renderFretboard();
        function chooseTuning(newTuning) {
        tuning = newTuning;
        renderFretboard();
    }
    
function toggleNote(button, note) {
    const elements = document.querySelectorAll(`.note.${note}`);
    button.classList.toggle("clicked");
    elements.forEach(el => {
        if (el.style.display === 'none') {
            el.style.display = 'block';
        } else {
            el.style.display = 'none';
        }
    });
}

const select_key = document.querySelector(".dropdown-key-select");
const option_key = document.querySelector(".dropdown-key-option");
let key;

document.addEventListener('click', (e) => {
    if (e.target.closest('.dropdown-key-select')) option_key.classList.toggle('show');
    else option_key.classList.remove('show');

    if(e.target.closest('.dropdown-key-option div')){
        select_key.textContent = e.target.textContent;
        key = select_key.textContent
        console.log("Current key:" + key)
        option_key.classList.remove('show');
    }
})

const select_mode = document.querySelector(".dropdown-mode-select");
const option_mode = document.querySelector(".dropdown-mode-option");

document.addEventListener('click', (e) => {
    if (e.target.closest('.dropdown-mode-select')) option_mode.classList.toggle('show');
    else option_mode.classList.remove('show');

    if(e.target.closest('.dropdown-mode-option div')){
        select_mode.textContent = e.target.textContent;
        key = select_mode.textContent
        console.log("Current key:" + key)
        option_mode.classList.remove('show');
    }
})