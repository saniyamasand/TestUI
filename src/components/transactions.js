import React, {useEffect} from 'react'
import MaterialTable from 'material-table'
import axios from "axios";

export default function Transactions() {
    const [value, setValue] = React.useState(0);
    const { useState } = React;
    const [columns, setColumns] = useState([
        { title: 'Customer name', field: 'customername',type : 'string',validate: rowData => rowData.customername === '' ? 'Customer Name cannot be empty' : ''},
        { title: 'Transaction amount', field: 'transactionamount', type: 'numeric', validate: rowData => rowData.transactionamount <= 100 ? 'Transaction Amount must be greater than 100 ' : '' },
        { title: 'Transaction date', field: 'transactiondate',type: 'date', dateSetting: {
                format: 'dd/MM/yyyy'},  validate: rowData => rowData.transactiondate === '' ? 'Date cannot be empty' : ''},


    ]);


    const order_info = [];
    const [data, setData] = React.useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const details = await axios(
                'http://localhost:3001/demoApi/transactions',
            );
            details.data.forEach(x => order_info.push({id : x.transactionId, customername: x.customerNAME, transactionamount: x.transactionAmount,transactiondate : x.transactionDate }));
            setData(order_info);
        };

        fetchData();
    },[]);



    // Add new rows : POST method
    const handleRowAdd = (newData) => {

        const postOrder = {
            'customerNAME' : newData.customername,
            'transactionAmount': newData.transactionamount,
            'transactionDate' : newData.transactiondate
        }

        axios
            .post(
                'http://localhost:3001/demoApi/transaction',
                postOrder,
            ).then(response => {
            console.log(response);
        })
    }

    // Edit the rows :  PUT method

    const handleRowUpdate = (updateData) => {

        const putOrder = {
            'customerNAME' : updateData.customername,
            'transactionAmount': updateData.transactionamount,
            'transactionDate' : updateData.transactiondate
        }

        const index = updateData.id;

        axios
            .put(
                'http://localhost:3001/demoApi/transaction/' + index.toString(),
                putOrder,
            ).then(response => {
            console.log(response);
        })
    }

    // Delete the rows : DELETE method
    const handleRowDelete = (selectedData) => {

        const index = selectedData.id;

        axios
            .delete(
                'http://localhost:3001/demoApi/transaction/' + index.toString(),
            ).then(response => {
            console.log(response);
        })
    }

    return (
        <div style={{ maxWidth: '100%' }}>
            <MaterialTable
                columns={columns}
                data={data}
                editable={{
                    onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                setData([...data, newData]);
                                handleRowAdd(newData)

                                resolve();
                            }, 1000)
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataUpdate = [...data];
                                const index = oldData.tableData.id;
                                dataUpdate[index] = newData;
                                setData([...dataUpdate]);
                                handleRowUpdate(newData)

                                resolve();
                            }, 1000)
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataDelete = [...data];
                                const index = oldData.tableData.id;
                                dataDelete.splice(index, 1);
                                setData([...dataDelete]);
                                handleRowDelete(oldData)

                                resolve()
                            }, 1000)
                        }),
                }}
                title="Customer orders"
                options={{
                    filtering: true,
                    headerStyle: {backgroundColor: 'lightcoral', color: 'snow', borderWidth: 5 ,
                        borderTopColor:'darkmagenta', borderColor:'darkslategray' , fontSize:18 , borderBlockColor:'darkslategray'},

                }}
            />
        </div>
    )
}
