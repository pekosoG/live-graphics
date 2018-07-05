let mainLoop = (()=>{
    let animation='stars';
    let animations={};
    let maxTimer=50;

    let loadAnimations=()=>{

        ['stars','drops'].forEach(element=>{
            var animate=Tarp.require('./'+element);
            animations[element]=animate;
        })
    };

    let keyListener=()=>{
        event.preventDefault();
        console.log('ket codeeeeeeeeeeeeeee',event.keyCode);
        switch(event.keyCode){
            case 68: //D
                animation="drops";
                break;
            case 83: //S
                animation='stars';
                break;
            default:
                animation="";
        }
    }

    let init=()=>{

        document.addEventListener('keyup',()=>{
            keyListener();
        });

        loadAnimations();

        setInterval(()=>{
            let figure=animations[animation];
            if(figure==undefined)
                figure={
                    render:()=>{
                        console.log('default');
                        let ctx=document.getElementById('elCanvas').getContext('2d') ;
                        ctx.strokeStyle='black';
                        ctx.beginPath();
                        ctx.arc(100,75,50,0*Math.PI,2*Math.PI);
                        ctx.stroke();
                }
            }
            window.requestAnimationFrame(figure.render);
        },maxTimer);
    }

    return{
        init:init
    }
})();

window.onload=()=>{mainLoop.init()};