import { getGridRowElement } from "@material-ui/data-grid";

export default function EditOrder(row){
    let form = document.getElementById('editForm');
    //console.log(row);
    
    for (let key in row){
        let el =  document.getElementsByClassName(key)[0];
        el.value = row[key];
        //console.log(el);
    }
    
}