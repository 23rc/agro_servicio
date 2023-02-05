document.addEventListener('DOMContentLoaded' , ()=>{
    fetch('http://localhost:5000/client/shop/todaySales')
    .then((res) => res.json())
    .then((data) => {
       
        loadHTMLTable(data['data']);
    });
});

function loadHTMLTable(data){

    console.log(data);
    const table = document.querySelector('table tbody');
    
    if(data.length === 0) {
        table.innerHTML = "<tr><td class='no-class' colspan='7'>No Data</td></tr>"
        return ;
    }

    let tableHtml = "";
    let AmountShow = 0;
    data.forEach(function ({ID, clientes, lotelechones, ventadia, Total}){
        AmountShow += Total;
        tableHtml += '<tr>';
        tableHtml += `<td>${ID}</td>`;
        tableHtml += `<td>${clientes}</td>`;
        tableHtml += `<td>${lotelechones}</td>`;
        tableHtml += `<td>${new Date(ventadia).toLocaleString().substring(0,10)}</td>`;
        tableHtml += `<td>${Total}</td>`;
        
        tableHtml += '</tr>';

    });
    
    table.innerHTML = tableHtml;

    document.querySelector('.todaySalesAmountShow').innerHTML = `Total de ventas del día = ${ AmountShow} Quetzales`
}