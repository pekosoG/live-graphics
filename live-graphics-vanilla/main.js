let zoom=.1
let direction=.1;

let canvas = document.getElementById('el-canvas');
//canvas.width=window.innerWidth/2;
//canvas.height=window.innerHeight/2;
let ctx=canvas.getContext('2d');

window.requestAnimationFrame(function loop(){
    zoom+=.01;
    if(direction==.1 & zoom>=10)
        direction=-.1;
    if(direction==-.1 & zoom<=.11)
        direction=.1
    zoom+=direction;
    console.log(zoom,direction);
    for(let y=0; y<canvas.height; y++){
        for(let x=0; x< canvas.width; x++){
            let value = Math.floor( x/zoom * y/zoom) % 2;
            ctx.fillStyle= value? 'orange' :'red';
            ctx.fillRect(x,y,1,1);
        }
    }
    window.requestAnimationFrame(loop);
});