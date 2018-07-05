let drops=(()=>{
    let drops=[];
    let fullWidth=window.innerWidth;
    let fullHeigth=window.innerHeight;
    let maxSize=100;
    let ctx=document.getElementById('elCanvas').getContext('2d');
    document.getElementById('elCanvas').width=fullWidth-10;
    document.getElementById('elCanvas').height=fullHeigth-20;
    for(i=0;i<200;i++){
        drops.push({
            origin:[Math.floor(Math.random()*fullWidth),Math.floor(Math.random()*fullHeigth)],
            size:Math.floor(Math.random()*maxSize)
        });
    }
    function pad(val,size) {
        var s = String(val);
        while (s.length < (size || 2)) {s = "0" + s;}
        return s;
    }
    let render = ()=>{
        ctx.clearRect(0,0,fullWidth,fullHeigth);
        drops=drops.map(element=>{
            let opacity=((100*element.size)/maxSize).toFixed(0);
            if(opacity<100){
                ctx.strokeStyle='rgba(0,0,255,'+(1-parseFloat("0."+pad(opacity,2)))+")";
                ctx.beginPath();
                ctx.arc(element.origin[0],element.origin[1],element.size,0, 2 * Math.PI);
                ctx.stroke();
            }
            if(element.size>=maxSize){
                element.size=1;
                element.origin[0]=Math.floor(Math.random()*fullWidth);
                element.origin[1]=Math.floor(Math.random()*fullHeigth)
            }
            else 
                element.size+=1;
            return element;
        });
    } 
    return{
        render:render
    }
})();


if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = drops;
else
    window.drops = drops;