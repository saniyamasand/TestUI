import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import {Typography, Box, AppBar, Tab, Grid, Tabs, } from "@material-ui/core";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";

// Icons
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";
import axios from 'axios';
import MaterialTable from "material-table";

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

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);


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

const createData = (id, name, join_date) => ({
    id,
    name,
    join_date,
    isEditMode: false
});
const CustomTableCell = ({ row, name, onChange }) => {
    const classes = useStyles();
    const { isEditMode } = row;
    return (
        <TableCell align="left" className={classes.tableCell}>
            {isEditMode ? (
                <Input
                    value={row[name]}
                    name={name}
                    onChange={e => onChange(e, row)}
                    className={classes.input}
                />
            ) : (
                row[name]
            )}
        </TableCell>
    );
};

export default function Tailor() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [tailorName ,setTailorName] = useState('');
    const [tailorPhone ,setTailorPhone] = useState('');

    function onCreateTailor(e){
        e.preventDefault();
        const postTailor = {
            tailorName,
            tailorPhone
        }

        axios
            .post(
                'http://localhost:3001/demoApi/tailor',
                postTailor,
            ).then(response => {
            console.log(response);
        } );
    }

    const tailor_data = []
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                `http://localhost:3001/demoApi/tailors`,
            );
            result.data.forEach(film => tailor_data.push(createData(film.tailorId , film.tailorName , film.createdAt.substring(0,10))))
        };

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
