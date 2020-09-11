function runPage2() {
    background(255);
    image(bg, 0, 0);

    spring1.initialise(F0.inp,w.inp,k1.inp,m1.inp,k2.inp,m2.inp);
    spring1.update(t,factor)
    spring1.show(0, 1, 0);
    
    stroke(0);
    fill(0);

    push();
    textSize(36);
    textFont("Times");
    text('VIBRATION ABSORBER',255, 50);

    textSize(16);
    text("CONTROLS", 655, 417);
    text("VARIABLES", 655, 107);
    pop();

    textSize(12);
    text('w1 = ' + spring1.w1.toFixed(4) + " rad/s", 310, 520);
    text('w2 = ' + spring1.w2.toFixed(4) + " rad/s", 430, 520);
    text('w/w2 = ' + (spring1.w/spring1.w2).toFixed(4) + " rad/s", 310, 480)
    
    text('X1/Xst = ' + (abs(spring1.x1/(spring1.F0/spring1.k1))).toFixed(4) , 150, 480)
    text('X1 = ' + (abs(spring1.x1)).toFixed(4) , 150, 520)
    text('Xst = ' + ((spring1.F0/spring1.k1)).toFixed(4) , 150, 560)

    
    magFac1.initialise()
    magFac1.draw();
    

    button3.draw()
    button4.draw()

    F0.draw();
    w.draw();
    k1.draw();

    m1.draw();
    k2.draw();
    m2.draw();

    t = t+dt;
    //clear.mousePressed(clearMe);
}
