import React from 'react'
import MaterialTable from 'material-table'

export default function Transactions() {
    const { useState } = React;
    const [columns, setColumns] = useState([
        { title: 'Customer name', field: 'customername'},
        { title: 'Transaction amount', field: 'transcationamount' },
        { title: 'Transaction date', field: 'transactiondate'},


    ]);
    const [data, setData] = useState([
        { customername: 'Saniya', transcationamount: '7000', transactiondate: "2018-11-12"},
        { customername: 'Tanya', transcationamount: '9000', transactiondate: "2018-11-10"},
    ]);

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
