let iframeSet = document.getElementsByTagName('iframe')[0];
let simOption = null;
iframeSet.src = ' ';


const setSimulation = (ele) => {
    simOption = ele.getElementsByTagName("option")[ele.selectedIndex].value;
    console.log(simOption);
}

const changeColor = (ele) => {
    const dev = document.getElementsByClassName('heading');
    const btn = document.getElementsByTagName('button');
    for (let i = 0; i < dev.length; i++) {
        dev[i].style.backgroundColor = 'white';
        dev[i].style.color = 'black';
    }
    dev[ele.id].style.backgroundColor = 'green';
    dev[ele.id].style.color = 'white';
    console.log(parseInt(ele.id));
    if (simOption != null) {
        iframeSet.src = developers[parseInt(ele.id)].expDetails[simOption].src;
    } else {
        iframeSet.src = ' ';
    }
    scrolldiv();
    dev[3].innerHTML = 'Simulation: '+developers[parseInt(ele.id)].expDetails[simOption].expName;
}

const scrolldiv = () => { 
    var elem = document.getElementsByClassName("sim")[0]; 
    elem.scrollIntoView(); 
} 

const moveTop = () => {
    var el = document.getElementsByClassName('App')[0];
    el.scrollIntoView(); 
}