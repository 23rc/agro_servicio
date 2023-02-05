var ctx= document.getElementById("myChart").getContext("2d");
var myChart= new Chart(ctx,{
    type:"doughnut", //bar=barras, pie=pastel,line=barra con relleno,radar,polarArea=grafica de pasteles con diversos tamaños,doughnut=dona,bubble=
    data:{
        labels:['cerda','barracos','lechones'],
        datasets:[{
                label:'Num datos',
                data:[10,9,15],
                backgroundColor:[
                    '#ff0000',
                    '#00ff00',
                    '#0000cc'
                ],
                hoverBackgroundColor: "#FFFF33",
                
        }]
    },
    options:{
        scales:{
            yAxes:[{
                    ticks:{
                        beginAtZero:true
                    }
            }]
        }
    }
});