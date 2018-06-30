let zoom=.1
let direction=.1;

let canvas = document.getElementById('el-canvas');
//canvas.width=window.innerWidth;
//canvas.height=window.innerHeight;
let ctx=canvas.getContext('2d') ;

function loop(){
    zoom+=.01;
    if(direction==.1 & zoom>=10)
        direction=-.1;
    if(direction==-.1 & zoom<=.1)
        direction=.1
    zoom+=direction;
    for(let y=0; y<canvas.height; y++){
        for(let x=0; x< canvas.width; x++){
            let value = Math.floor( x/zoom * y/zoom) % 2;
            ctx.fillStyle= value? 'orange' :'red';
            ctx.fillRect(x,y,1,1);
    }
 }
}

setInterval(()=>{window.requestAnimationFrame(loop)},100);