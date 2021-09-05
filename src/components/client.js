import React from 'react'
import MaterialTable from 'material-table'

export default function Client() {
    const { useState } = React;
    const [columns, setColumns] = useState([
        { title: 'Name', field: 'name'},
        { title: 'Phone Number', field: 'phone', initialEditValue: '+91' },
        { title: 'Address', field: 'address'},
        { title: 'Measurements', field: 'measure'},

    ]);
    const [data, setData] = useState([
        { name: 'Mehmet', phone: '+91 9383939283', address: 'Lal Bagh Road 589373', measure: 'Shoulder : 14 , Waist : 25 , Bust : 34' },
            { name: 'Taehyung', phone: '+91 9274826352',address: 'Shanthi Nagar 562997' , measure: "Shoulder : 15, Waist : 26 , Bust : 36"},
            { name: 'Yoongi', phone: '+91 9274827491', address :'Hebbal 429428', measure: "Shoulder : 13, Waist : 34 , Bust : 35" },
            { name: 'Heoseok', phone: '+91 9628492739', address: 'Bangalore Club 491893', measure: "Shoulder : 15, Waist : 34 , Bust : 32"}
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
                    title="Client Measurements"
                    options={{
                        filtering: true,
                        headerStyle: {backgroundColor: 'lightcoral', color: 'snow', borderWidth: 5 ,
                            borderTopColor:'darkmagenta', borderColor:'darkslategray' , fontSize:18 , borderBlockColor:'darkslategray'},

                    }}
                />
            </div>
        )
}
