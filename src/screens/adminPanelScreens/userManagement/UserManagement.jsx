import React, { useEffect, useState } from 'react'
import '../dashboard/Dashboard.css'
import avatar from '../../../assets/img/avatar.png'
import search from '../../../assets/img/search.png'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, FormControl, Grid, InputLabel, MenuItem, Modal, Select } from '@mui/material';
import { deleteData, getData, postData, putData } from '../../../config/apiCalls';
import Snack from '../../../components/snack/Snack';
import Loader from '../../../components/loader/Loader';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import InputField from '../../../components/inputField/InputField';
import accountIcon from '../../../assets/img/accountIcon.png'
import passwordIcon from '../../../assets/img/passwordIcon.png'
import emailIcon from '../../../assets/img/mailIcon.png'
import Btn from '../../../components/btn/Btn';
import CancelIcon from '@mui/icons-material/Cancel';

export default function UserManagement() {

    let [userData, setUserData] = useState({});
    let [pageNumber, setPageNumber] = useState(1);
    let [totalUsers, setTotalUsers] = useState(0);
    let [limit, setLimit] = useState(0)
    let [usersData, setUsersData] = useState([]);
    let [openCreateUserModal, setOpenCreateUserModal] = useState(false)
    let [openEditUserModal, setOpenEditUserModal] = useState(false)
    let [userObj, setUserObj] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
    })
    let [editUserObj, setEditUserObj] = useState({});
    let [roles, setRoles] = useState([]);
    let [openAssignRoleModal, setOpenAssignRoleModal] = useState(false);

    let [isLoading, setIsLoading] = useState(false);
    let [openSnack, setOpenSnack] = useState(false);
    let [severity, setSeverity] = useState('error')
    let [snackMsg, setSnackMsg] = useState('');

    const handleCloseSnack = () => {
        setOpenSnack(false);
        setSnackMsg('');
        setSeverity('error');
    }


    useEffect(() => {
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
            const data = JSON.parse(storedUserData);
            setUserData(data)
        }
    }, [])

    const handlePreviousUsers = () => {
        if (pageNumber !== 1) {
            setPageNumber(pageNumber - 1)
        } else {
            setSnackMsg('Your are already at the first page.');
            setOpenSnack(true);
        }
    }

    const handleNextUsers = () => {
        if (pageNumber < Math.ceil(totalUsers / limit)) {
            setPageNumber(pageNumber + 1);
        } else {
            setSnackMsg('Your are already at the last page.');
            setOpenSnack(true);
        }
    }

    const getUsers = () => {
        setIsLoading(true)
        getData(`/all/users?page=${pageNumber}`).then((response) => {
            if (response.success) {
                setUsersData(response.users)
                setTotalUsers(response.totalUsers)
                setLimit(response.limit)
                setIsLoading(false)
            } else {
                setSnackMsg(response.message);
                setOpenSnack(true);
                setIsLoading(false)
            }
        })
            .catch((error) => {
                setSnackMsg("Network Error ", error.message);
                setOpenSnack(true);
                setIsLoading(false)
            });
    }

    useEffect(() => {
        getUsers();
    }, [pageNumber])

    const deleteUser = (id) => {
        setIsLoading(true)
        deleteData(`/user/${id}`).then((response) => {
            if (response.success) {
                setSnackMsg(response.message);
                setOpenSnack(true);
                setSeverity('success');
                getUsers();
                setIsLoading(false);
            } else {
                setSnackMsg(response.message);
                setOpenSnack(true);
                setIsLoading(false);
            }
        })
            .catch((error) => {
                setSnackMsg("Network Error ", error.message);
                setOpenSnack(true);
                setIsLoading(false);
            });
    }

    const handleCreateUser = () => {
        setIsLoading(true)
        const { firstname, lastname, username, password, email } = userObj;
        if (firstname && lastname && username && password && email) {
            // api call 
            postData('/register', userObj).then((response) => {
                if (response.success) {
                    setOpenCreateUserModal(false)
                    setSnackMsg(response.message);
                    setOpenSnack(true);
                    setSeverity('success');
                    setIsLoading(false);
                    getUsers();
                    setUserObj({
                        firstname: '',
                        lastname: '',
                        username: '',
                        email: '',
                        password: '',
                    })
                } else {
                    setSnackMsg(response.message);
                    setOpenSnack(true);
                    setIsLoading(false)
                }
            })
                .catch((error) => {
                    setSnackMsg(error.message);
                    setOpenSnack(true);
                    setIsLoading(false)
                });
        } else {
            setSnackMsg('Required Fields are missing!')
            setOpenSnack(true)
            setIsLoading(false)
        }
    }

    const setInpValue = (key, value) => {
        userObj[key] = value;
        setUserObj({ ...userObj })
    }

    const createUserModal = () => {
        return (
            <Modal open={openCreateUserModal}>
                <div className='ap-userModal-style' >
                    <div className='ap-userModal-content'>
                        <div
                            onClick={() => setOpenCreateUserModal(false)}
                            className='ap-modal-cancel-icon'><CancelIcon /></div>
                        <InputField
                            onChange={(e) => setInpValue("username", e.target.value)}
                            value={userObj?.username}
                            icon={accountIcon} placeholder='Username' />

                        <InputField
                            onChange={(e) => setInpValue("firstname", e.target.value)}
                            value={userObj?.firstname}
                            icon={accountIcon} placeholder='First name' />

                        <InputField
                            onChange={(e) => setInpValue("lastname", e.target.value)}
                            value={userObj?.lastname}
                            icon={accountIcon} placeholder='Last name' />

                        <InputField
                            onChange={(e) => setInpValue("email", e.target.value)}
                            value={userObj?.email}
                            icon={emailIcon} placeholder='Email' />

                        <InputField
                            onChange={(e) => setInpValue("password", e.target.value)}
                            value={userObj?.password}
                            icon={passwordIcon} placeholder='Password' isPassword={true} />

                        <Btn label='Create User' onClick={handleCreateUser} />
                    </div>
                </div>
            </Modal >
        )
    }

    const setInpValue1 = (key, value) => {
        editUserObj[key] = value;
        setEditUserObj({ ...editUserObj })
    }

    const editUser = (item) => {
        setEditUserObj(item)
        setOpenEditUserModal(true)
    }

    const handleEditUser = () => {
        setIsLoading(true)
        const { firstname, lastname, username, email, _id } = editUserObj;
        if (firstname && lastname && username && email) {
            // api call 
            putData(`/user/${_id}`, editUserObj).then((response) => {
                if (response.success) {
                    setOpenEditUserModal(false)
                    setSnackMsg(response.message);
                    setOpenSnack(true);
                    setSeverity('success');
                    setIsLoading(false);
                    getUsers()
                } else {
                    setSnackMsg(response.message);
                    setOpenSnack(true);
                    setIsLoading(false)
                }
            })
                .catch((error) => {
                    setSnackMsg(error.message);
                    setOpenSnack(true);
                    setIsLoading(false)
                });
        } else {
            setSnackMsg('Required Fields are missing!')
            setOpenSnack(true)
            setIsLoading(false)
        }
    }


    const editUserModal = () => {
        return (
            <Modal open={openEditUserModal}>
                <div className='ap-userModal-style' >
                    <div className='ap-userModal-content'>
                        <div
                            onClick={() => setOpenEditUserModal(false)}
                            className='ap-modal-cancel-icon'><CancelIcon /></div>
                        <InputField
                            onChange={(e) => setInpValue1("username", e.target.value)}
                            value={editUserObj?.username}
                            icon={accountIcon} placeholder='Username' />

                        <InputField
                            onChange={(e) => setInpValue1("firstname", e.target.value)}
                            value={editUserObj?.firstname}
                            icon={accountIcon} placeholder='First name' />

                        <InputField
                            onChange={(e) => setInpValue1("lastname", e.target.value)}
                            value={editUserObj?.lastname}
                            icon={accountIcon} placeholder='Last name' />

                        <InputField
                            onChange={(e) => setInpValue1("email", e.target.value)}
                            value={editUserObj?.email}
                            icon={emailIcon} placeholder='Email' />

                        <Btn label='Save Changes' onClick={handleEditUser} />
                    </div>
                </div>
            </Modal >
        )
    }

    const assignRole = (id) => {
        setOpenAssignRoleModal(true);
        setIdForRole(id)
    }

    let [role, setRole] = useState('');
    let [idForRole, setIdForRole] = useState('')

    const handleChange = (event) => {
        setRole(event.target.value);
    };

    const assignRoleModal = () => {
        return (
            <Modal open={openAssignRoleModal}>
                <div className='ap-userModal-style' >
                    <div className='ap-userModal-content'>
                        <div
                            onClick={() => setOpenAssignRoleModal(false)}
                            className='ap-modal-cancel-icon'><CancelIcon /></div>
                        <Box sx={{ width: '90%', margin: '30px 0px' }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={role}
                                    label="Role"
                                    onChange={handleChange}
                                >
                                    {roles && roles.length > 0 &&
                                        roles.map((item) => {
                                            return (
                                                <MenuItem key={item?._id} value={item?.name}>{item?.name}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Box>

                        <Btn label='Assign Role' onClick={handleAssignRole} />
                    </div>
                </div>
            </Modal >
        )
    }

    const handleAssignRole = () => {
        setIsLoading(true)
        const roleObj = {
            userId: idForRole,
            name: role
        }
        if (idForRole && role) {
            // api call 
            postData('/assign-role', roleObj).then((response) => {
                if (response.success) {
                    setOpenAssignRoleModal(false)
                    setSnackMsg(response.message);
                    setOpenSnack(true);
                    setSeverity('success');
                    setIsLoading(false);
                    getUsers();
                } else {
                    setSnackMsg(response.message);
                    setOpenSnack(true);
                    setIsLoading(false)
                }
            })
                .catch((error) => {
                    setSnackMsg(error.message);
                    setOpenSnack(true);
                    setIsLoading(false)
                });
        } else {
            setSnackMsg('Required Fields are missing!')
            setOpenSnack(true)
            setIsLoading(false)
        }
    }



    const getRoles = () => {
        setIsLoading(true)
        getData(`/role?page=${1}`).then((response) => {
            if (response.success) {
                setRoles(response.roles)
                setIsLoading(false)
            } else {
                setSnackMsg(response.message);
                setOpenSnack(true);
                setIsLoading(false)
            }
        })
            .catch((error) => {
                setSnackMsg("Network Error ", error.message);
                setOpenSnack(true);
                setIsLoading(false)
            });
    }

    useEffect(() => {
        getRoles();
    }, [])


    return (
        <div className='dashboard-ap'>
            <div className="ap-upperMost">
                <div className="dashboard-pd">
                    <img src={avatar} alt="avatar" />
                    <div>
                        <div className="dashboard-pd-heading">
                            <span>Hello, </span>{userData?.firstname + " " + userData?.lastname}
                        </div>
                        <div className="dashboard-pd-subHeading">Check your activities in this dashboard.</div>
                    </div>
                </div>
                <div>
                    <div onClick={() => setOpenCreateUserModal(true)} className="ap-add-user-btn">Add User</div>
                </div>
            </div>

            <div className="ap-table-data">
                <div className="ap-table-data-header">
                    <div>
                        <div className="ap-table-data-heading">All Users</div>
                        <div className="ap-table-data-subHeading">Active Users : {totalUsers}</div>
                    </div>
                    <div className='ap-table-data-header-right'>
                        <div className="ap1-searchBox">
                            <img src={search} alt="search" />
                            <input type="text" placeholder='Search' />
                        </div>
                        <div className="ap1-selectBox">
                            <span> Sort by : </span>
                            Newest  <KeyboardArrowDownIcon />
                        </div>
                    </div>
                </div>
                <div className="table-data-headings-Box">
                    <Grid container spacing={3}>
                        <Grid item sm={2.25}>
                            <div className="table-data-heading">
                                User ID
                            </div>
                        </Grid>
                        <Grid item sm={1.5}>
                            <div className="table-data-heading">
                                Username
                            </div>
                        </Grid>
                        <Grid item sm={1.5}>
                            <div className="table-data-heading">
                                Name
                            </div>
                        </Grid>
                        <Grid item sm={2.25}>
                            <div className="table-data-heading">
                                Email
                            </div>
                        </Grid>
                        <Grid item sm={1.5}>
                            <div className="table-data-heading">
                                Role
                            </div>
                        </Grid>
                        <Grid item sm={3}>
                            <div className="table-data-heading">
                                Actions
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <div className="table-data-content-box">
                    {usersData && usersData.length > 0 &&
                        usersData.map((item) => {
                            return (
                                <div key={item?._id} className="table-data-content-item">
                                    <Grid container spacing={3}>
                                        <Grid item sm={2.25} xs={12}>
                                            <div className="table-data-item-text">
                                                <span>User ID: </span>
                                                {item?._id}
                                            </div>
                                        </Grid>
                                        <Grid item sm={1.5} xs={12}>
                                            <div className="table-data-item-text">
                                                <span>Name: </span>
                                                {item?.username}
                                            </div>
                                        </Grid>
                                        <Grid item sm={1.5} xs={12}>
                                            <div className="table-data-item-text">
                                                <span>Username: </span>
                                                {item?.firstname + ' ' + item?.lastname}
                                            </div>
                                        </Grid>
                                        <Grid item sm={2.25} xs={12}>
                                            <div className="table-data-item-text">
                                                <span>Email: </span>
                                                {item?.email}
                                            </div>
                                        </Grid>
                                        <Grid item sm={1.5} xs={12}>
                                            <div className="table-data-item-text">
                                                <span>Role: </span>
                                                {item?.role?.name}
                                            </div>
                                        </Grid>
                                        <Grid item sm={3} xs={12}>
                                            <div className="table-data-item-btns">
                                                <div onClick={() => assignRole(item?._id)} className="ap-assign-btn">
                                                    Assign Role
                                                </div>
                                                <div onClick={() => editUser(item)} className="ap-edit-btn">
                                                    Edit
                                                </div>
                                                <div onClick={() => deleteUser(item?._id)}
                                                    className="ap-delete-btn">
                                                    Delete
                                                </div>


                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            )
                        })
                    }
                    {usersData && usersData.length > 0 &&
                        <div className='ap-pagination-style' >
                            <span onClick={handlePreviousUsers} ><ArrowBackIcon /></span>
                            <div> Page no.{pageNumber} of {Math.ceil(totalUsers / limit)}</div>
                            <span onClick={handleNextUsers}><ArrowForwardIcon /></span>
                        </div>
                    }

                </div>
            </div>
            {createUserModal()}
            {editUserModal()}
            {assignRoleModal()}

            <Snack msg={snackMsg} open={openSnack} onClose={handleCloseSnack} severity={severity} />
            <Loader isLoading={isLoading} />
        </div>
    )
}
