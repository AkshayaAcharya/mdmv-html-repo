const developers = [
    {
        name: 'Kushagra',
        expDetails: [
            {
                id: 1,
                expName: 'Two Degree of Freedom System',
                src: '../assets/kushagra/simulation/2dofForced/index.html'
            },
            {
                id: 2,
                expName: 'Vibration Absorber',
                src: '../assets/kushagra/simulation/VibrationAbsorber/index.html'
            }

        ]
    },
    {
        name: 'Vaishak',
        expDetails: [
            {
                id: 1,
                expName: 'Two Degree of Freedom System',
                src: '../assets/Vaishak/simulation/2dofForced/index.html'
            },
            {
                id: 2,
                expName: 'Base Excitation',
                src: '../assets/Vaishak/simulation/BaseExcitation/index.html'
            },
            {
                id: 3,
                expName: 'Cantilever Beam - Free Vibration',
                src: '../assets/Vaishak/simulation/CantileverBeam/index.html'
            },
            {
                id: 4,
                expName: 'Cantilever Beam - Forced Vibration',
                src: '../assets/Vaishak/simulation/CantileverBeamForced/index.html'
            },
            {
                id: 5,
                expName: 'Fixed Beam - Forced Vibration',
                src: '../assets/Vaishak/simulation/FixedBeam/index.html'
            },
            {
                id: 6,
                expName: 'Forced Vibration',
                src: '../assets/Vaishak/simulation/ForcedVibration/index.html'
            },
            {
                id: 7,
                expName: 'Simply Supported Beam - Free Vibration',
                src: '../assets/Vaishak/simulation/SimplySupported/index.html'
            },
            {
                id: 8,
                expName: 'Simply Supported Beam - Forced Vibration',
                src: '../assets/Vaishak/simulation/SimplySupportedForced/index.html'
            },
            {
                id: 9,
                expName: 'Rotating Unbalance',
                src: '../assets/Vaishak/simulation/UnbalancedRotatingMass/index.html'
            },
            {
                id: 10,
                expName: 'Vibration Absorber',
                src: '../assets/Vaishak/simulation/VibrationAbsorber/index.html'
            },

        ]
        
    },
    {
        name: 'Abhinav',
        expDetails: [
            {
                id: 1,
                expName: 'Base Excitation',
                src: '../assets/Abhinav/simulation/BaseExcitation/index.html'
            },
            {
                id: 2,
                expName: 'Rotating Unbalance',
                src: '../assets/Abhinav/simulation/RotatingUnbalance/index.html'
            }

        ]
           
    }
]
let iframeSet = document.getElementsByTagName('iframe')[0];
let simOption = null;
iframeSet.src = ' ';


function setSimulation(ele) {
    simOption = ele.getElementsByTagName("option")[ele.selectedIndex].value;
    console.log(simOption);
}

function changeColor(ele){
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

function scrolldiv(){ 
    var elem = document.getElementsByClassName("sim")[0]; 
    elem.scrollIntoView(); 
} 

function moveTop(){
    var el = document.getElementsByClassName('App')[0];
    el.scrollIntoView(); 
}