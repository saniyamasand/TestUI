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
    ]);

<<<<<<< HEAD
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
=======
        fetchData();
    });
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const [rows, setRows] = React.useState(tailor_data);


    const [previous, setPrevious] = React.useState({});


    const onToggleEditMode = id => {
        setRows(state => {
            return rows.map(row => {
                if (row.id === id) {
                    return { ...row, isEditMode: !row.isEditMode };
                }
                return row;
            });
        });
    };

    const onChange = (e, row) => {
        if (!previous[row.id]) {
            setPrevious(state => ({ ...state, [row.id]: row }));
        }
        const value = e.target.value;
        const name = e.target.name;
        const { id } = row;
        const newRows = rows.map(row => {
            if (row.id === id) {
                return { ...row, [name]: value };
            }
            return row;
        });
        setRows(newRows);
    };

    const onRevert = id => {
        const newRows = rows.map(row => {
            if (row.id === id) {
                return previous[id] ? previous[id] : row;
            }
            return row;
        });
        setRows(newRows);
        setPrevious(state => {
            delete state[id];
            return state;
        });
        onToggleEditMode(id);
    };

        return(


            <div className={classes.root}>
                <br/>
                <AppBar position="static" style={{ background: '#14447a'}}>
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
                        <Tab style={{ width: 500}} label="Create Tailors" {...a11yProps(0)} />
                        <Tab  style={{ width: 500}} label="View Tailors" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0} >
                    <Grid container spacing={12} align={"center"} alignItems="center"  direction={"column"}>
                        <Grid item xs={12} align="center">
                            <Container component="main" maxWidth="xs">
                                <CssBaseline />
                                <div className={classes.paper}>
                                    <Avatar className={classes.avatar}>
                                    </Avatar>
                                    <Typography component="h1" variant="h5">
                                        Create Tailor
                                    </Typography>
                                    <form className={classes.form} onSubmit={onCreateTailor} noValidate>

                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="NAME"
                                            label="Name"
                                            type="name"
                                            id="name"
                                            value = {tailorName}
                                            onInput={ e => setTailorName(e.target.value)}
                                            autoFocus
                                        />

                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="Phone Number"
                                            label="Phone Number"
                                            name="Phone Number"
                                            value = {tailorPhone}
                                            onInput={ e => setTailorPhone(e.target.value)}
                                            autoFocus
                                        />

                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                        >
                                            Create Tailor
                                        </Button>
                                    </form>
                                </div>
                            </Container>
                        </Grid>
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={1} >
                    <Grid container spacing={3} direction="row" justify="center" alignItems="center">
                        <Grid item xs={12}>
                            <div style={{ height: 300, width: '100%' }}>
                                <Paper className={classes.root}>
                                    <Table className={classes.table} aria-label="caption table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell align="left" />
                                                <StyledTableCell align="left">ID</StyledTableCell>
                                                <StyledTableCell align="left">Tailor Name</StyledTableCell>
                                                <StyledTableCell align="left">Date Joined</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map(row => (
                                                <TableRow key={row.id}>
                                                    <TableCell className={classes.selectTableCell}>
                                                        {row.isEditMode ? (
                                                            <>
                                                                <IconButton
                                                                    aria-label="done"
                                                                    onClick={() => onToggleEditMode(row.id)}
                                                                >
                                                                    <DoneIcon />
                                                                </IconButton>
                                                                <IconButton
                                                                    aria-label="revert"
                                                                    onClick={() => onRevert(row.id)}
                                                                >
                                                                    <RevertIcon />
                                                                </IconButton>
                                                            </>
                                                        ) : (
                                                            <IconButton
                                                                aria-label="delete"
                                                                onClick={() => onToggleEditMode(row.id)}
                                                            >
                                                                <EditIcon />
                                                            </IconButton>
                                                        )}
                                                    </TableCell>
                                                    <CustomTableCell {...{ row, name: "id", onChange }} />
                                                    <CustomTableCell {...{ row, name: "name", onChange }} />
                                                    <CustomTableCell {...{ row, name: "join_date", onChange }} />
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Paper>
                                <MaterialTable
                                    columns={[
                                        { title: 'Adı', field: 'name' },
                                        { title: 'Soyadı', field: 'surname' },
                                        { title: 'Doğum Yılı', field: 'birthYear', type: 'numeric' },
                                        { title: 'Doğum Yeri', field: 'birthCity', lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' } }
                                    ]}
                                    data={[{ name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 34 },
                                        { name: 'Taehyung', surname: 'Kim', birthYear: 1997, birthCity: 63 },
                                        { name: 'Yoongi', surname: 'Min', birthYear: 1992, birthCity: 63 },
                                        { name: 'Heoseok', surname: 'Jung', birthYear: 1924, birthCity: 34 }]}
                                    title="Demo Title"
                                />
                            </div>
                        </Grid>
                    </Grid>
                </TabPanel>
            </div>

        )
};
>>>>>>> 956ff74c4dad645f5beb8f6264c49e847b5a2523
