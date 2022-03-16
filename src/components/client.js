import React, {useEffect} from 'react'
import MaterialTable from 'material-table'
import CssBaseline from "@material-ui/core/CssBaseline";
import axios from "axios";

export default function Client() {
    const { useState } = React;
    const [columns, setColumns] = useState([
        { title: 'Name', field: 'name', type : 'string', validate: rowData => rowData.name === '' ? 'Client Name cannot be empty' : '' },
        { title: 'Phone Number', field: 'phone', type : 'string',initialEditValue: '+91 ' , validate: rowData => rowData.phone.length < 14 ? 'Phone Number must have 10 numbers' : '', },
        { title: 'Address', field: 'address',type : 'string', validate: rowData => rowData.address === '' ? 'Client Address cannot be empty' : '' },
        { title: 'Measurements', field: 'measure' , type : 'string', validate: rowData => rowData.measure === '' ? 'Client Measurements cannot be empty' : '' },

    ]);

    const client_info = [];

    const [data, setData] = React.useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const details = await axios(
                'http://localhost:3001/demoApi/customers',
            );
            details.data.forEach(x => client_info.push({id : x.customerId, name: x.customerName, phone: x.customerPhone , address:x.customerAddress , measure : x.customerMeasurements}));
            setData(client_info);
        };

        fetchData();
    },[]);




    // Add new rows : POST method
    const handleRowAdd = (newData) => {

        const postClient = {
            'customerName' : newData.name,
            'customerPhone': newData.phone,
            'customerAddress' : newData.address,
            'customerMeasurements' : newData.measure
        }

        axios
            .post(
                'http://localhost:3001/demoApi/customer',
                postClient,
            ).then(response => {
            console.log(response);
        })
    }

    // Edit the rows :  PUT method

    const handleRowUpdate = (updateData) => {

        const putClient = {
            'customerName' : updateData.name,
            'customerPhone': updateData.phone,
            'customerAddress' : updateData.address,
            'customerMeasurements' : updateData.measure
        }

        const index = updateData.id;

        axios
            .put(
                'http://localhost:3001/demoApi/customer/' + index.toString(),
                putClient,
            ).then(response => {
            console.log(response);
        })
    }

    // Delete the rows : DELETE method
    const handleRowDelete = (selectedData) => {

        const index = selectedData.id;

        axios
            .delete(
                'http://localhost:3001/demoApi/customer/' + index.toString(),
            ).then(response => {
            console.log(response);
        })
    }






    /*const [data, setData] = useState([
        { name: 'Mehmet', phone: '+91 9383939283', address: 'Lal Bagh Road 589373', measure: 'Shoulder : 14 , Waist : 25 , Bust : 34' },
            { name: 'Taehyung', phone: '+91 9274826352',address: 'Shanthi Nagar 562997' , measure: "Shoulder : 15, Waist : 26 , Bust : 36"},
            { name: 'Yoongi', phone: '+91 9274827491', address :'Hebbal 429428', measure: "Shoulder : 13, Waist : 34 , Bust : 35" },
            { name: 'Hoseok', phone: '+91 9628492739', address: 'Bangalore Club 491893', measure: "Shoulder : 15, Waist : 34 , Bust : 32"}
    ]);*/
        return (
            <div style={{ maxWidth: '100%' }}>
                <CssBaseline />
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
                    title="Client Measurements"
                    options={{
                        filtering: true,
                        headerStyle: {backgroundColor: 'lightcoral', color: 'snow', borderWidth: 5 ,
                            borderTopColor:'darkmagenta', borderColor:'darkslategray' , fontSize:18 , borderBlockColor:'darkslategray'},
                        exportButton: {
                            pdf: true
                        }

                    }}
                />
            </div>
        )
}
