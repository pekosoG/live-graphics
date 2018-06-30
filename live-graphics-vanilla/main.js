 /*jshint esversion: 6 */
let canvas = document.getElementById('el-canvas');
let ctx=canvas.getContext('2d') ;

let animation="drops";

/* 
 This is required for drops animation
*/
function pad(val,size) {
    var s = String(val);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}

function randomNum(ceiling){
    return Math.floor((Math.random()*ceiling)+1)
}

let dropsArray=[];
let maxSize=100;

let drops = () => {
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(dropsArray.length==0){
        for(let x=0;x<100;x++){
            dropsArray.push({
                origin:[randomNum(canvas.width),randomNum(canvas.height)],
                size:randomNum(maxSize)
            });
        }
    }
    dropsArray=dropsArray.map((element)=>{

        let opacity=((100*element.size)/maxSize).toFixed(0);
        if(opacity<100){
            ctx.fillStyle='rgba(0,0,255,'+(1-parseFloat("0."+pad(opacity,2)))+")";
            ctx.fillRect(element.origin[0],element.origin[1],2,2);
            ctx.strokeStyle='rgba(0,0,255,'+(1-parseFloat("0."+pad(opacity,2)))+")";
            ctx.beginPath();
            ctx.arc(element.origin[0],element.origin[1],element.size,0, 2 * Math.PI);
            ctx.stroke();
        }
        if(element.size>=maxSize){
            element.size=1;
            element.origin[0]=randomNum(canvas.width);
            element.origin[1]=randomNum(canvas.height);
        }
        else 
            element.size+=1;
        return element;
    });
};

let rainbowDrops = () => {
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(dropsArray.length==0){
        for(let x=0;x<100;x++){
            dropsArray.push({
                origin:[randomNum(canvas.width),randomNum(canvas.height)],
                size:randomNum(maxSize),
                color:[Math.floor(Math.random()*256), Math.floor(Math.random()*256), Math.floor(Math.random()*256)],
            });
        }
    }
    try{
        dropsArray=dropsArray.map((element)=>{

            let opacity=((100*element.size)/maxSize).toFixed(0);
            if(opacity<100){
                ctx.fillStyle='rgba('+element.color[0]+','+element.color[1]+','+element.color[2]+','+(1-parseFloat("0."+pad(opacity,2)))+")";
                ctx.fillRect(element.origin[0],element.origin[1],2,2);
                ctx.strokeStyle='rgba('+element.color[0]+','+element.color[1]+','+element.color[2]+','+(1-parseFloat("0."+pad(opacity,2)))+")";
                ctx.beginPath();
                ctx.arc(element.origin[0],element.origin[1],element.size,0, 2 * Math.PI);
                ctx.stroke();
            }
            if(element.size>=maxSize){
                element.size=1;
                element.origin[0]=randomNum(canvas.width);
                element.origin[1]=randomNum(canvas.height);
                element.color=[Math.floor(Math.random()*256), Math.floor(Math.random()*256), Math.floor(Math.random()*256)];
            }
            else 
                element.size+=1;
            return element;
        });
    }catch(err){
        dropsArray=[];
    }
};



/*
  This is required for weird animation
*/
let zoom=0.1;
let direction=0.1;

let weirdLoop= () => {
    if(direction==0.1 & zoom>=10)
        direction=-0.1;
    if(direction==-0.1 & zoom<=0.1)
        direction=0.1;
    zoom+=direction;
    console.log(zoom,direction);
    for(let y=0; y<canvas.height; y++){
        for(let x=0; x< canvas.width; x++){
            let value = Math.floor( x/zoom * y/zoom) % 2;
            ctx.fillStyle= value? 'orange' :'red';
            ctx.fillRect(x,y,1,1);
    }
 }
};

function changeShape(){
    event.preventDefault();
    console.log('ket codeeeeeeeeeeeeeee',event.keyCode);
    switch(event.keyCode){
        case 68: //D
            animation="drops";
            break;
        case 82: //R
            dropsArray=[];
            animation="rainbow";
            break;
        case 87: //W
            animation="weird";
            break;
        default:
            animation="";
    }
}

setInterval(()=>{
    let loop={};

    if(animation==="weird")
        loop=weirdLoop;
    else if(animation==='drops')
        loop=drops;
    else if(animation==="rainbow")
        loop=rainbowDrops;
    else
        loop = function(){
            console.log('default');
            ctx.fillStyle='white';
            ctx.strokeStyle='white';
            ctx.beginPath();
            ctx.arc(100,75,50,0*Math.PI,2*Math.PI);
            ctx.stroke();
        };
    
    window.requestAnimationFrame(loop);
},10);