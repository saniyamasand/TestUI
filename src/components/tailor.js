import React from 'react'
import MaterialTable from 'material-table'

export default function Tailor() {
    const { useState } = React;
    const [columns, setColumns] = useState([
        { title: 'Tailor Name', field: 'tailorname'},
        { title: 'Tailor Phone Number', field: 'tailorphone', initialEditValue: '+91' },
        { title: 'Customer name', field: 'customername'},


    ]);
    const [data, setData] = useState([
          { tailorname: 'Roopa', tailorphone: '+91 9628492739', customername: "saniya"},
          { tailorname: 'Ashalat', tailorphone: '+91 936283928', customername: "tanya"},
        { tailorname: 'Babu', tailorphone: '+91 9729473838', customername: "sanya"},

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
                title="Tailor details"
                options={{
                    filtering: true,
                    headerStyle: {backgroundColor: 'lightcoral', color: 'snow', borderWidth: 5 ,
                        borderTopColor:'darkmagenta', borderColor:'darkslategray' , fontSize:18 , borderBlockColor:'darkslategray'},

                }}
            />
        </div>
    )
}

