let stars=(()=>{
    let stars=[];
    let fullWidth=window.innerWidth;
    let fullHeigth=window.innerHeight;
    let maxSize=1000;
    let ctx=document.getElementById('elCanvas').getContext('2d');
    document.getElementById('elCanvas').width=fullWidth-10;
    document.getElementById('elCanvas').height=fullHeigth-20;
    function pad(val,size) {
        var s = String(val);
        while (s.length < (size || 2)) {s = "0" + s;}
        return s;
    }
    for(i=0;i<500;i++){
        stars.push({
            origin:[Math.floor(Math.random()*fullWidth),Math.floor(Math.random()*fullHeigth)],
            size:Math.floor(Math.random()*maxSize)
        });
    }
    let render = ()=>{
        ctx.clearRect(0,0,fullWidth,fullHeigth);
        stars=stars.map(element=>{
            let opacity=((100*element.size)/maxSize).toFixed(0);
            if(opacity<100){
                ctx.fillStyle='rgba(255,255,255,'+(1-parseFloat("0."+pad(opacity,2)))+")";
                ctx.fillRect(element.origin[0],element.origin[1],1,1);
            }
            if(element.size>=maxSize){
                element.size=1;
                element.origin[0]=Math.floor(Math.random()*fullWidth);
                element.origin[1]=Math.floor(Math.random()*fullHeigth)
            }
            else 
                element.size+=2;
            return element;
        });
    } 
    return{
        render:render
    }
})();


if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = stars;
else
    window.stars = stars;