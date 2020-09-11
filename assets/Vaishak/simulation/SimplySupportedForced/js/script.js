        var time=0; //keeps track of the time of the animation
        var beamlength=1500; //Length of the beam inmm
        var simTimeId; //for animation function
        var pauseTime;//for running animation when simulation is paused
        var rho=7750; //Density in kg/m^3
        var A; //Area in m^2
        var massbeam=rho*A*beamlength/1000; //Mass of the beam=volume * density
        var E=200E9; //Young's Modulus
        var I=4.08E-7;//Ixx value
        var forceamp;
        var forcefreq;
        var n;
        var phi;
        var dampingratio=0;
        var endmass=5;
        var m=massbeam+endmass;
        var k=48*E*I/Math.pow(beamlength/1000,3); //Stiffness value for a cantilever beam
        var wn=Math.sqrt(k/(massbeam+endmass)); //Natural Frequency
        var wd=wn*Math.sqrt(1-dampingratio*dampingratio); //Damped natural frequency
        var initdisp=500; //Initial displacement given to the beam
        var simstatus;
        var kdisp;
        var wndisp;
        var wddisp;
        function actdisplace(t){
            let value = (1000*forceamp/(k))/Math.sqrt(Math.pow((1-n*n),2)+Math.pow((2*dampingratio*n),2))*Math.sin(forcefreq*t+phi);
            return value;
        } //Function to calculate the displacement
        var beaminf=[
            "ISMB 100\n h=100 mm,b=75 mm\n t1=4 mm,t2=7 mm\nIxx=257.5 cm^4\nIyy=40.8 cm^4\nA=14.6 cm^2",
            "ISNT 150\n h=150 mm,b=150 mm\n t1=10 mm,t2=10 mm\nIxx=541.1 cm^4\nIyy=250.3 cm^4\nA=28.88 cm^2",
            "ISMC 100\n h=100 mm,b=50 mm\n t1=4.7 mm,t2=7.5 mm\nIxx=186.7 cm^4\nIyy=25.9 cm^4\nA=11.7 cm^2",
            "ISA 100100\n h=100 mm,b=100 mm\n t=12 mm\nIxx=207 cm^4\nIyy=207 cm^4\nA=22.59 cm^2",
            "SQUARE\n h=150 mm,b=150 mm\n Ixx=4218.75 cm^4\nIyy=4218.75 cm^4\nA=225 cm^2",
            "CIRCLE\n D=150 mm\n Ixx=2485.05 cm^4\nIyy=2485.05 cm^4\nA=176.72 cm^2"
        ];//Standard beam dimensions
        //start of simulation here; starts the timer with increments of 0.01 seconds
        function startsim()
        {
            pauseTime=setInterval("varupdate();",'100');
            simstatus=1;
        }

        // switches state of simulation between 0:Playing & 1:Paused
        function simstate()
        {
            let imgfilename=document.getElementById('playpausebutton').src;
            imgfilename = imgfilename.substring(imgfilename.lastIndexOf('/') + 1, imgfilename.lastIndexOf('.'));
            if (imgfilename==="bluepausedull")
            {
                document.getElementById('playpausebutton').src="./images/blueplaydull.png";

                clearInterval(simTimeId);
                simstatus=1;
                pauseTime=setInterval("varupdate();",'100');
            }
            if (imgfilename==="blueplaydull")
            {
                document.getElementById('playpausebutton').src="./images/bluepausedull.png";
                simstatus=0;
                clearInterval(pauseTime);
                time=0;
                simTimeId=setInterval("varupdate();time+=.01;",10);

            }
        }
        //Initialise system parameters here
        function varinit()
        {
            let canvas=document.getElementById("graphscreen");
            canvas.style.visibility="hidden";
            varchange();
            //Variable slider and number input types
            $('#massslider').slider("value", 25); // slider initialisation : jQuery widget
            $('#massspinner').spinner("value", 25); // number initialisation : jQuery widget
            $('#lengthslider').slider("value", 1500);
            $('#lengthspinner').spinner("value", 1500);
            $('#dampslider').slider("value", 0.05);
            $('#dampspinner').spinner("value", 0.05);
            $('#forceslider').slider("value",1500);
            $('#frequencyslider').slider("value",315);
            $('#forcespinner').spinner("value",1500);
            $('#frequencyspinner').spinner("value",315);
        }
        function varchange()
        {
            $('#forcespinner').spinner({ max : 2000, min : 100, step : 1 });
            $('#forceslider').slider({ max : 2000, min : 100, step : 1 });
            $( "#forceslider" ).on( "slide", function( e, ui ) { $('#forcespinner').spinner("value",ui.value);time=0;});
            $( "#forcespinner" ).on( "spin", function( e, ui ) { $('#forceslider').slider("value",ui.value);time=0;} );
            $( "#forcespinner" ).on( "change", function() {  varchange()} );
            $('#frequencyspinner').spinner({ max : 800, min : 0, step : 0.1 });
            $('#frequencyslider').slider({ max : 800, min : 0, step : 0.1 });
            $( "#frequencyslider" ).on( "slide", function( e, ui ) { $('#frequencyspinner').spinner("value",ui.value);time=0;});
            $( "#frequencyspinner" ).on( "spin", function( e, ui ) { $('#frequencyslider').slider("value",ui.value);time=0;} );
            $( "#frequencyspinner" ).on( "change", function() {  varchange()} );

            $('#massslider').slider({ max : 200, min : 0, step : 0.5 });
            $('#massspinner').spinner({ max : 200, min : 0, step : 0.5 });

            $( "#massslider" ).on( "slide", function( e, ui ) { $('#massspinner').spinner("value",ui.value);time=0;});
            $( "#massspinner" ).on( "spin", function( e, ui ) { $('#massslider').slider("value",ui.value);time=0;} );
            $( "#massspinner" ).on( "change", function() {  varchange();} );

            $('#lengthslider').slider({ max : 2000, min : 200, step : 10 });
            $('#lengthspinner').spinner({ max : 2000, min : 200, step : 10 });

            $( "#lengthslider" ).on( "slide", function( e, ui ) { $('#lengthspinner').spinner("value",ui.value);time=0;});
            $( "#lengthspinner" ).on( "spin", function( e, ui ) { $('#lengthslider').slider("value",ui.value);time=0;} );
            $( "#lengthspinner" ).on( "change", function() {  varchange()} );

            $('#dampslider').slider({ max : 0.99, min : 0.01, step : 0.01 });
            $('#dampspinner').spinner({ max : 0.99, min : 0.01, step : 0.01 });

            $( "#dampslider" ).on( "slide", function( e, ui ) { $('#dampspinner').spinner("value",ui.value);time=0;});
            $( "#dampspinner" ).on( "spin", function( e, ui ) { $('#dampslider').slider("value",ui.value);time=0;} );
            $( "#dampspinner" ).on( "change", function() {  varchange()} );

            varupdate();

        }
        function varupdate()
        {

            $('#massslider').slider("value", $('#massspinner').spinner('value')); //updating slider location with change in spinner(debug)
            $('#lengthslider').slider("value", $('#lengthspinner').spinner('value'));
            $('#dampslider').slider("value", $('#dampspinner').spinner('value'));
            $('#forceslider').slider("value", $('#forcespinner').spinner('value'));
            $('#frequencyslider').slider("value", $('#frequencyspinner').spinner('value'));
            let crossec=document.getElementById("sections").options.selectedIndex; //Using drop down menu as input
            switch (crossec) {
                case 0:
                 document.getElementById("crosssec").src="./images/crossI.PNG";
                     document.getElementById("crosssec").title=beaminf[0];
                     A=14.6E-4;
                     I=257.5E-8;
                    break;
                 case 1:
                     document.getElementById("crosssec").src="./images/crossT.PNG";
                     document.getElementById("crosssec").title=beaminf[1];
                     A=28.88E-4;
                     I=541.1E-8;
                     break;
                 case 2:
                    document.getElementById("crosssec").src="./images/crossC.PNG";
                     document.getElementById("crosssec").title=beaminf[2];
                     A=11.7E-4;
                     I=186.7E-8;
                    break;
                 case 3:
                    document.getElementById("crosssec").src="./images/crossL.PNG";
                     document.getElementById("crosssec").title=beaminf[3];
                     A=22.59E-4;
                     I=207E-8;
                    break;
                 case 4:
                    document.getElementById("crosssec").src="./images/crossSqr.PNG";
                     document.getElementById("crosssec").title=beaminf[4];
                     A=225E-4;
                     I=4218.75E-8;
                    break;
                 case 5:
                    document.getElementById("crosssec").src="./images/crossCirc.PNG";
                     document.getElementById("crosssec").title=beaminf[5];
                     A=176.72E-4;
                     I=2485.05E-8;
                    break;
            }
            let matt=document.getElementById("metals").options.selectedIndex;
            switch (matt){
                case 0:
                    E=200E9;
                    rho=7750;
                    break;
                case 1:
                    E=70.33E9;
                    rho=2712;
                    break;
                case 2:
                    E=111.006E9;
                    rho=8304;
                    break;

            }
            endmass=$('#massspinner').spinner("value"); //Updating variables
            beamlength=$('#lengthspinner').spinner("value");
            dampingratio=$('#dampspinner').spinner("value");
            massbeam=rho*A*beamlength/1000;
            forceamp = $('#forcespinner').spinner("value");
            forcefreq = $('#frequencyspinner').spinner("value");
            m=massbeam+endmass;
            k=48*E*I/Math.pow(beamlength/1000,3);
            kdisp=k/2000;
            wn=Math.sqrt(k/(massbeam+endmass));
            wndisp=Math.sqrt(kdisp/(massbeam+endmass));
            let cc=2*Math.sqrt(k*m);
            let c=dampingratio*cc;
            n = forcefreq/wn;
            phi = Math.atan(2*dampingratio*n/(1-n*n));
            wd=wn*Math.sqrt(1-dampingratio*dampingratio);
            wddisp=wndisp*Math.sqrt(1-dampingratio*dampingratio);
            document.getElementById("dampvalue").innerHTML= dampingratio;        //Dispalying values in the comment box
            document.getElementById("wn").innerHTML =wn.toFixed(4) + "rad/s";
            document.getElementById("ratio").innerHTML = n.toFixed(4);
            document.getElementById("stiffvalue").innerHTML = "k="+"<b>"+(k/1000).toFixed(4)+"N/mm</b>";
           document.getElementById("massSystem").title="M ="+m.toFixed(4)+" kg"+"\n"+"c = "+c.toFixed(4)+" Ns/m"+"\n"+"k ="+(k/1000).toFixed(4)+" N/mm";
            //If simulation is running
           if(!simstatus)
            {
                //Disabling the slider,spinner and drop down menu
                $('#massspinner').spinner("disable");
                $('#massslider').slider("disable");
                $('#lengthspinner').spinner("disable");
                $('#lengthslider').slider("disable");
                $('#dampspinner').spinner("disable");
                $('#dampslider').slider("disable");
                $('#forcespinner').spinner("disable");
                $('#forceslider').slider("disable");
                $('#frequencyspinner').spinner("disable");
                $('#frequencyslider').slider("disable");
                document.getElementById("sections").disabled=true;
                document.getElementById("metals").disabled=true;
                document.getElementById("graphbutton").style.visibility = "visible";


            }
            //If simulation is stopped
            if(simstatus)
            {
                //Enabling the slider,spinner and drop down menu
                $('#massspinner').spinner("enable");
                $('#massslider').slider("enable");
                $('#lengthspinner').spinner("enable");
                $('#lengthslider').slider("enable");
                $('#dampspinner').spinner("enable");
                $('#dampslider').slider("enable");
                $('#forcespinner').spinner("enable");
                $('#forceslider').slider("enable");
                $('#forcespinner').spinner("enable");
                $('#forceslider').slider("enable");
                $('#frequencyspinner').spinner("enable");
                $('#frequencyslider').slider("enable");
                document.getElementById("sections").disabled=false;
                document.getElementById("metals").disabled=false;
                document.getElementById("graphbutton").style.visibility = "hidden";

            }
            draw();
            plotgraph();

        }
        //Simulation graphics
        function draw() {

            let canvas = document.getElementById("simscreen");
            let ctx = canvas.getContext("2d");
            var ball = {
                xpos: (beamlength)/5/2+50 + 25,
                ypos: 210 + actdisplace(time),
                size:endmass===0?0:15+endmass/5,
                draw: function () {
                    ctx.beginPath();
                    ctx.arc(ball.xpos, ball.ypos, ball.size, 0, 2 * Math.PI, false);
                    ctx.lineWidth = 3;
                    ctx.strokeStyle = 'brown';
                    ctx.stroke();
                    ctx.fillStyle = "brown";
                    ctx.fill();
                }

            };

            function beamdef(y) {
                ctx.beginPath();
                ctx.arc(25, 210, 10, 3*Math.PI/2,Math.PI/2, true);
                ctx.fillStyle = "blue";
                ctx.fill();
                ctx.beginPath();
                ctx.arc(25+beamlength/5+100, 210, 10, 3*Math.PI/2,Math.PI/2, false);
                ctx.fillStyle = "blue";
                ctx.fill();


                for (var i = 0; i <= (beamlength)/5/2+50 ; i++) {
                    ctx.fillRect(i + 25, y * i/ (Math.pow((beamlength)/5+100, 3)) * (3 * (Math.pow((beamlength)/5+100, 2)) - 4*i*i) - 10 + 210, 1, 20)
                }
                ctx.save();
                ctx.translate(beamlength/5+25+100,0);
                ctx.scale(-1,1);
               for (var i = 0; i <= (beamlength)/5/2+50 ; i++) {
                   ctx.fillRect(i , y * i/ (Math.pow((beamlength)/5+100, 3)) * (3 * (Math.pow((beamlength)/5+100, 2)) - 4*i*i) - 10 + 210, 1, 20)
               }
                ctx.restore();
                ctx.beginPath();
                ctx.strokeStyle="black";
                ctx.fillStyle="black";
                ctx.moveTo(25,210);
                ctx.lineTo(15,240);
                ctx.lineTo(35,240);
                ctx.fill();
                ctx.stroke();
                ctx.beginPath();
                ctx.strokeStyle="black";
                ctx.fillStyle="black";
                ctx.moveTo(25+beamlength/5+100,210);
                ctx.lineTo(15+beamlength/5+100,240);
                ctx.lineTo(35+beamlength/5+100,240);
                ctx.fill();
                ctx.stroke();
            }
            ctx.clearRect(0,0,550,400);
            beamdef(ball.ypos - 210);
            ball.draw();
        }
        //Graph plotting function
        function plotgraph(){
            let canvas=document.getElementById("graphscreen")
            let ctx= canvas.getContext("2d");
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.strokeStyle = "black";
            ctx.beginPath();
            ctx.moveTo(20,0);
            ctx.lineTo(20,250);
            ctx.moveTo(20,125);
            ctx.lineTo(250,125)
            ctx.stroke();
            ctx.font="18px Comic Sans MS";
            ctx.save()
            ctx.translate(0,200);
            ctx.rotate(-Math.PI/2);
            ctx.fillText("Displacement",0,15);
            ctx.restore();
            ctx.fillText('t',250,150);
            ctx.beginPath();
            ctx.moveTo(20,125-actdisplace(0));
            ctx.strokeStyle = "blue";
            for(let i =0;i<230;){        
                ctx.lineTo(i+20,125-10*actdisplace(.003*i)/5);
                ctx.moveTo(i+20,125-10*actdisplace(.003*i)/5);
                i+=.01;
                }
            ctx.stroke();
            
            ctx.beginPath();
            ctx.strokeStyle = "black";
            ctx.moveTo(300,0)
            ctx.lineTo(300,220);
            ctx.lineTo(600,220);
            ctx.moveTo(300,180);
            ctx.lineTo(600,180);
            ctx.stroke();
            ctx.save();
            ctx.translate(0,200);
            ctx.rotate(-Math.PI/2);
            ctx.fillText("Magnification Factor",0,280);
            ctx.restore();
            ctx.fillText("\u03B7",530,240);
            ctx.font="10px Comic Sans MS";
            for(i=0;i<=7;i++){
                ctx.fillText(i,290,220-30*i);
            }
            ctx.beginPath();
            ctx.moveTo(300,210);
            ctx.moveTo(300,180);
            ctx.lineWidth = 2;
            ctx.strokeStyle = "blue";
            for(let i=0;i<250;){
                
                ctx.lineTo(300+i,210-magnifac(0.01*i));
                i+=0.01;
            }
            ctx.stroke();
            ctx.beginPath();
            ctx.strokeStyle = "black";
            ctx.moveTo(300,250);
            ctx.lineTo(600,250);
            ctx.moveTo(300,250);
            ctx.lineTo(300,400);
            ctx.lineTo(600,400);
            ctx.moveTo(300,325);
            ctx.lineTo(600,325);
            ctx.stroke();
            ctx.font="18px Comic Sans MS";
            ctx.fillText("\u03B7",530,380);
            ctx.save();
            ctx.translate(0,200);
            ctx.rotate(-Math.PI/2);
            ctx.fillText("Phase Angle(\u03A6)",-180,250);
            ctx.restore();
            ctx.font="16px Comic Sans MS";
            ctx.fillText("0\u00B0",270,400);
            ctx.fillText("90\u00B0",270,325);
            ctx.fillText("180\u00B0",270,250);
            ctx.beginPath();
            ctx.strokeStyle = "blue";
            for(let i=0;i<250;){
                ctx.lineTo(300+i,400-phaseangle(0.01*i));
                ctx.moveTo(300+i,400-phaseangle(0.01*i));
                i+=0.01;
            }
            ctx.stroke();

            function magnifac(v)
            {
            let value=1/(Math.sqrt(Math.pow((1-v*v),2)+Math.pow((2*dampingratio*v),2)));
            return 30*value;
            }
            function phaseangle(v) {
                if(v<1) 
                {
                    return (75 / (Math.PI / 2)) * Math.atan(2 * dampingratio * v / (1 - v * v));
                }
                if(v>1) 
                {
                return 150+((75 / (Math.PI / 2)) * Math.atan(2 * dampingratio * v / (1 - v * v)));
                }
            if(v==1)
            {
                return 75;
            }
            }
        }
        //Switches between graph screen and simulation screen
        function changescreen(){
            let imgfilename=document.getElementById('graphbutton').src;
            imgfilename = imgfilename.substring(imgfilename.lastIndexOf('/') + 1, imgfilename.lastIndexOf('.'));
            if (imgfilename==="graphbutton")
            {
                document.getElementById('graphbutton').src="./images/bluebkdulls.png";
                document.getElementById('playpausebutton').style.visibility = "hidden";
                document.getElementById("crosssection").style.visibility = "hidden";
                document.getElementById("titleincanvas").style.visibility = "hidden";
                document.getElementById("simscreen").style.visibility="hidden";
                document.getElementById("graphscreen").style.visibility="visible";
            }
            if (imgfilename==="bluebkdulls")
            {
                document.getElementById('graphbutton').src="./images/graphbutton.png";
                document.getElementById('playpausebutton').style.visibility = "visible";
                document.getElementById("crosssection").style.visibility = "visible";
                document.getElementById("titleincanvas").style.visibility = "visible";
                document.getElementById("simscreen").style.visibility="visible";
                document.getElementById("graphscreen").style.visibility="hidden";
            }
        }