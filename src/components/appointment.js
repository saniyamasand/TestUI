import React, {useEffect} from "react";
import { Box, Tabs, Tab, AppBar} from '@material-ui/core';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    WeekView,
    Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
import Typography from "@material-ui/core/Typography";

import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";

import CssBaseline from "@material-ui/core/CssBaseline";
import MaterialTable from "material-table";

import axios from "axios";



function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function switchPane(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },

    tab: {
        minWidth: 200, // number of your choice
        width: 500, // number of your choice
    } ,

    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightMedium,
    },

    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    table: {
        minWidth: 650
    },
    selectTableCell: {
        width: 60
    },
    tableCell: {
        width: 130,
        height: 40
    },
    input: {
        width: 130,
        height: 40
    }
}));


function schedData(record){
    const detail = record.name.toString() + ' ' + record.order.toString();
    const timings = record.time.toString().split("-");
    const new_date = new Date(record.date).toISOString().split('T')[0];
    const startTime = new_date + 'T' + timings[0];
    const endTime = new_date + 'T' + timings[1];
    const schedule = {startDate: startTime , endDate: endTime , title : detail}
    return schedule
}



const currentDate = new Date().toISOString().split('T')[0];


export default function Appointment(){

    const [value, setValue] = React.useState(0);

    const { useState } = React;

    const [columns, setColumns] = useState([
        { title: 'Name', field: 'name', type : 'string',validate: rowData => rowData.name === '' ? 'Name cannot be empty' : ''},
        { title: 'Order Description', field: 'order' ,type : 'string', validate: rowData => rowData.order === '' ? 'Order cannot be empty' : ''},
        { title: 'Date', field: 'date', type: 'date', dateSetting: {
                format: 'dd/MM/yyyy'},  validate: rowData => rowData.date === '' ? 'Date cannot be empty' : ''},
        { title: 'Time', field: 'time' ,validate: rowData => rowData.time === '' ? 'Time cannot be empty' : ''}

    ]);

    const calender = [];
    const appt_info = [];

    const [data, setData] = React.useState([]);

    useEffect(() => {

        const fetchData = async () => {
            const details = await axios(
                'http://localhost:3001/demoApi/appts',
            );
            //setData(details.data)
            details.data.forEach(x => appt_info.push({id : x.apptId, name: x.orderCustomer, order: x.orderDescription , date:  x.apptDate , time : x.apptTime}));
            details.data.forEach(x => calender.push(schedData({name: x.orderCustomer, order: x.orderDescription , date:  x.apptDate , time : x.apptTime})));
            setData(appt_info);
        };

        fetchData();
    },[]);





    const [calData , setCal] = React.useState(calender);
    const ApptList = calData;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // Add new rows : POST method
    const handleRowAdd = (newData) => {

        const postAppt = {
            'orderCustomer' : newData.name,
            'orderDescription': newData.order,
            'apptDate' : newData.date,
            'apptTime' : newData.time
        }

        axios
            .post(
                'http://localhost:3001/demoApi/appt',
                postAppt,
            ).then(response => {
                console.log(response);
            })
    }

    // Edit the rows :  PUT method

    const handleRowUpdate = (updateData) => {

        const putAppt = {
            'orderCustomer' : updateData.name,
            'orderDescription': updateData.order,
            'apptDate' : updateData.date,
            'apptTime' : updateData.time
        }

        const index = updateData.id;

        axios
            .put(
                'http://localhost:3001/demoApi/appt/' + index.toString(),
                putAppt,
            ).then(response => {
            console.log(response);
        })
    }

    // Delete the rows : DELETE method
    const handleRowDelete = (selectedData) => {

        const index = selectedData.id;

        axios
            .delete(
                'http://localhost:3001/demoApi/appt/' + index.toString(),
            ).then(response => {
            console.log(response);
        })
    }

    return(
        <div>
            <br/>
            <AppBar position="static" style={{ background: '#14447a'}}>
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
                    <Tab style={{ width: 800}} label="Table View" {...switchPane(0)} />
                    <Tab  style={{ width: 800}} label="Calender View" {...switchPane(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} >
                            <CssBaseline />
                            <div>
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
                                    title="Client Appointments"
                                    options={{
                                        filtering: true,
                                        headerStyle: {backgroundColor: 'lightcoral', color: 'snow', borderWidth: 5 ,
                                            borderTopColor:'darkmagenta', borderColor:'darkslategray' , fontSize:18 , borderBlockColor:'darkslategray'},

                                    }}
                                />
                            </div>

            </TabPanel>
            <TabPanel value={value} index={1} >

                        <div style={{width: '100%' }}>

                                    <Scheduler
                                        data = {ApptList}
                                    >
                                        <ViewState
                                            currentDate={currentDate}
                                        />
                                        <WeekView
                                            startDayHour = {9}
                                            endDayHour = {21}
                                        />
                                        <Appointments/>
                                    </Scheduler>
                        </div>
            </TabPanel>
        </div>

        )
}

/*export default Appointment;*/

