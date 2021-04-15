import { useEffect, useState } from 'react';
import { DataGrid, gridRowsStSelector } from '@material-ui/data-grid';
import ApiService from '../api/api-service';
import OrderChange from '../components/orderChange';
import EditOrder from '../components/orderEdit';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'customer', headerName: 'Имя клиента', width: 250 },
    { field: 'phone', headerName: 'Телефон', width:200 },
    { field: 'master', headerName: 'Мастер', width: 250 },
    { field: 'service', headerName: 'Услуга', width: 200},
    { field: 'visitDate',
        headerName: 'Дата',
        type: 'date',
        width: 200,},
    { field: 'status', headerName: 'Статус', width: 170 },
  ];

export default function OrderPage() {

    const [rows, setOrders] = useState([]);
    
    function Order(arr_orders,arr_rows){
        arr_orders.forEach( function (item, i, arr_orders) {
            arr_rows.push({
                id: item.id, 
                customer: item.customer.fullName, 
                phone: item.customer.phone, 
                master : item.master.fullName,
                service: item.service.name, 
                visitDate: item.visitDate, 
                status: item.status,
            });
        });
    }

    useEffect(
        () => {
            async function fetchData(){
            const orders = await ApiService.getOrders();	
           // console.log(orders);
            const rows = [];
            Order(orders,rows);
            //rows.reverse();
            setOrders(rows);
            };
            //console.log(rows);
            fetchData();    
        }, []
    );

    function createOrder(order){
        if (order.id === undefined || order.id === "") {
            let id = 0;
            //const len = ;
            if (rows.length > 0) {
                //id = rows[rows.length - 1].id;
                id = Number(rows[0].id);
            }
            order.id = id + 1;
            rows.unshift(order);
        }
        else {
            rows.forEach( function (item, i, rows) {
                (Number(order.id) === item.id)&&(rows[i]=order);
            })
        }

        setOrders(rows.concat([]));
    }    

    const rowsSelected = {};
    //const [rowsSelected, setSelected] = useState([]);
    
    function setSelection (row) {
        row.isSelected ? rowsSelected[row.data.id]='' : delete rowsSelected[row.data.id]
        //console.log(rowsSelected);
        //setSelected(rowsSelected);        
    };    

    function removeOrder(){
        if (Object.keys(rowsSelected).length > 0) {
            setOrders(rows.filter(m => !(m.id in rowsSelected)));
        }
	};

    function editing(){
        switch (Object.keys(rowsSelected).length) {
            case 0:
              alert( 'Выберете заявку для редактирования' );
              break;
            case 1:
              rows.forEach ( function (item, i, rows){
                if (item.id in rowsSelected){
                    EditOrder(item);
                }
              });

              
              /*function(){}*/
              //OrderChange({},rowsSelected);
              //setOrders(rows.concat([]));
              break;
            default:
              alert( "Вы не можете редактировать больше одной заявки за раз" );
        };
    }

    return(
        <div className="container" style={{ height: 400 }}>
         <div>Orders</div>
         <DataGrid 
            rows={rows} 
            columns={columns} 
            pageSize={5} 
            checkboxSelection
            onRowSelected={(GridRowSelectedParams) => {
                //console.log(GridRowSelectedParams);
                setSelection(GridRowSelectedParams)
            }}
         />
         <p></p>
         <OrderChange onCreate={createOrder} />
         <p></p>
         <button onClick={removeOrder}>Удалить заявку</button>
         <button style={{marginLeft:10}} onClick={editing}>Редактировать заявку</button>
        </div>
    );
}

   /* Сервер присылает массив в обратном порядке. Пыталась сделать без переворачивания, 
    но так и не получилось добать строчку с новой заявкой. В консоли рисует, на странице нет.
    
    const {id} = rows[0];
        order.id = id + 1;
        rows.unshift(order);
        const newOrder = rows;
        setOrders(newOrder);
        console.log(order);
        console.log(rows);
	};

    function removeOrder(id){
		setOrders(orders.filter(m => m.id !== id));
	}*/

      /*
		setOrders(rows.concat([{
		...order,
		id: id + 1
		}])); */