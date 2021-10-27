import React, {useEffect} from 'react'
import MaterialTable from 'material-table'
import axios from "axios";

export default function Tailor() {
    const { useState } = React;

    const [value, setValue] = React.useState(0);

    const [columns, setColumns] = useState([
        { title: 'Tailor Name', field: 'tailorname'},
        { title: 'Tailor Phone Number', field: 'tailorphone', initialEditValue: '+91 ' , validate: rowData => rowData.tailorphone.length < 14 ? 'Phone Number must have 10 numbers' : '', },
        { title: 'Customer name', field: 'customername'},


    ]);

    const tailor_info = [];

    const [data, setData] = React.useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const details = await axios(
                'http://localhost:3001/demoApi/tailors',
            );
            details.data.forEach(x => tailor_info.push({id : x.tailorId, tailorname: x.tailorName, tailorphone: x.tailorPhone , customername:x.customerName}));
            setData(tailor_info);

        };

        fetchData();
    },[]);




    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // Add new rows : POST method
    const handleRowAdd = (newData) => {

        const postTailor = {
            'tailorName' : newData.tailorname,
            'tailorPhone': newData.tailorphone,
            'customerName': newData.customername,
        }

        axios
            .post(
                'http://localhost:3001/demoApi/tailor',
                postTailor,
            ).then(response => {
            console.log(response);
        })
    }

    // Edit the rows :  PUT method

    const handleRowUpdate = (updateData) => {

        const putTailor = {
            'tailorName' : updateData.tailorname,
            'tailorPhone': updateData.tailorphone,
            'customerName': updateData.customername,
        }

        const index = updateData.id;

        axios
            .put(
                'http://localhost:3001/demoApi/tailor/' + index.toString(),
                putTailor,
            ).then(response => {
            console.log(response);
        })
    }

    // Delete the rows : DELETE method
    const handleRowDelete = (selectedData) => {

        const index = selectedData.id;

        axios
            .delete(
                'http://localhost:3001/demoApi/tailor/' + index.toString(),
            ).then(response => {
            console.log(response);
        })
    }





    /*const [data, setData] = useState([
          { tailorname: 'Roopa', tailorphone: '+91 9628492739', customername: "saniya"},
          { tailorname: 'Ashalat', tailorphone: '+91 936283928', customername: "tanya"},
        { tailorname: 'Babu', tailorphone: '+91 9729473838', customername: "sanya"},

    ]);*/



    const te = data.map((item) => <li key={item.id}>{item.tailorphone}</li>)

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

