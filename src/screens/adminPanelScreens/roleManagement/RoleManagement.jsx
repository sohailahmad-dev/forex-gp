import React, { useEffect, useState } from 'react'
import '../dashboard/Dashboard.css'
import avatar from '../../../assets/img/avatar.png'
import search from '../../../assets/img/search.png'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Grid, Modal } from '@mui/material';
import { deleteData, getData, postData, putData } from '../../../config/apiCalls';
import Snack from '../../../components/snack/Snack';
import Loader from '../../../components/loader/Loader';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import InputField from '../../../components/inputField/InputField';
import accountIcon from '../../../assets/img/accountIcon.png'
import emailIcon from '../../../assets/img/mailIcon.png'
import Btn from '../../../components/btn/Btn';
import CancelIcon from '@mui/icons-material/Cancel';

export default function RoleManagement() {

    let [userData, setUserData] = useState({});
    let [pageNumber, setPageNumber] = useState(1);
    let [totalRoles, setTotalRoles] = useState(0);
    let [limit, setLimit] = useState(0)
    let [roles, setRoles] = useState([])
    let [openCreateRoleModal, setOpenCreateRoleModal] = useState(false)
    let [openEditUserModal, setOpenEditUserModal] = useState(false)
    let [roleObj, setRoleObj] = useState({
        name: '',
        description: '',
    })
    let [editRoleObj, setEditRoleObj] = useState({});

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
        if (pageNumber < Math.ceil(totalRoles / limit)) {
            setPageNumber(pageNumber + 1);
        } else {
            setSnackMsg('Your are already at the last page.');
            setOpenSnack(true);
        }
    }

    const getRoles = () => {
        setIsLoading(true)
        getData(`/role?page=${pageNumber}`).then((response) => {
            if (response.success) {
                setRoles(response.roles)
                setTotalRoles(response.totalRoles)
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
        getRoles();
    }, [pageNumber])

    const deleteRole = (id) => {
        setIsLoading(true)
        deleteData(`/role/${id}`).then((response) => {
            if (response.success) {
                setSnackMsg(response.message);
                setOpenSnack(true);
                setSeverity('success');
                getRoles();
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

    const handleCreateRole = () => {
        setIsLoading(true)
        const { name, description } = roleObj;
        if (description && name) {
            // api call 
            postData('/role', roleObj).then((response) => {
                if (response.success) {
                    setOpenCreateRoleModal(false)
                    setSnackMsg(response.message);
                    setOpenSnack(true);
                    setSeverity('success');
                    setIsLoading(false);
                    getRoles();
                    setRoleObj({
                        description: '',
                        name: '',
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
        roleObj[key] = value;
        setRoleObj({ ...roleObj })
    }

    const createRoleModal = () => {
        return (
            <Modal open={openCreateRoleModal}>
                <div className='ap-userModal-style' >
                    <div className='ap-userModal-content'>
                        <div
                            onClick={() => setOpenCreateRoleModal(false)}
                            className='ap-modal-cancel-icon'><CancelIcon /></div>
                        <InputField
                            onChange={(e) => setInpValue("name", e.target.value)}
                            value={roleObj?.name}
                            icon={accountIcon} placeholder='Role Name' />

                        <InputField
                            onChange={(e) => setInpValue("description", e.target.value)}
                            value={roleObj?.description}
                            icon={emailIcon} placeholder='Role Description' />

                        <Btn label='Create Role' onClick={handleCreateRole} />
                    </div>
                </div>
            </Modal >
        )
    }

    const setInpValue1 = (key, value) => {
        editRoleObj[key] = value;
        setEditRoleObj({ ...editRoleObj })
    }

    const editUser = (item) => {
        setEditRoleObj(item)
        setOpenEditUserModal(true)
    }

    const handleEditUser = () => {
        setIsLoading(true)
        const { description, name, _id } = editRoleObj;
        if (description && name) {
            // api call 
            putData(`/role/${_id}`, editRoleObj).then((response) => {
                if (response.success) {
                    setOpenEditUserModal(false)
                    setSnackMsg(response.message);
                    setOpenSnack(true);
                    setSeverity('success');
                    setIsLoading(false);
                    getRoles();
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
                            onChange={(e) => setInpValue1("name", e.target.value)}
                            value={editRoleObj?.name}
                            icon={accountIcon} placeholder='Role Name' />

                        <InputField
                            onChange={(e) => setInpValue1("description", e.target.value)}
                            value={editRoleObj?.description}
                            icon={emailIcon} placeholder='Role Description' />

                        <Btn label='Save Changes' onClick={handleEditUser} />
                    </div>
                </div>
            </Modal >
        )
    }


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
                    <div onClick={() => setOpenCreateRoleModal(true)} className="ap-add-user-btn">Add Role</div>
                </div>
            </div>

            <div className="ap-table-data">
                <div className="ap-table-data-header">
                    <div>
                        <div className="ap-table-data-heading">All Roles</div>
                        <div className="ap-table-data-subHeading">Active Roles : {totalRoles}</div>
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
                        <Grid item sm={3}>
                            <div className="table-data-heading">
                                Role ID
                            </div>
                        </Grid>
                        <Grid item sm={2}>
                            <div className="table-data-heading">
                                Name
                            </div>
                        </Grid>
                        <Grid item sm={5}>
                            <div className="table-data-heading">
                                Description
                            </div>
                        </Grid>
                        <Grid item sm={2}>
                            <div className="table-data-heading">
                                Actions
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <div className="table-data-content-box">
                    {roles && roles.length > 0 &&
                        roles.map((item, index) => {
                            return (
                                <div key={item?._id} className="table-data-content-item">
                                    <Grid container spacing={3}>
                                        <Grid item sm={3} xs={12}>
                                            <div className="table-data-item-text">
                                                <span>Role ID: </span>
                                                {item?._id}
                                            </div>
                                        </Grid>
                                        <Grid item sm={2} xs={12}>
                                            <div className="table-data-item-text">
                                                <span>Name: </span>
                                                {item?.name}
                                            </div>
                                        </Grid>
                                        <Grid item sm={5} xs={12}>
                                            <div className="table-data-item-text">
                                                <span>Description: </span>
                                                {item?.description}
                                            </div>
                                        </Grid>
                                        <Grid item sm={2} xs={12}>
                                            <div className="table-data-item-btns">
                                                <div onClick={() => editUser(item)} className="ap-edit-btn">
                                                    Edit
                                                </div>
                                                <div onClick={() => deleteRole(item?._id)} className="ap-delete-btn">
                                                    Delete
                                                </div>

                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            )
                        })
                    }
                    {roles && roles.length > 0 &&
                        <div className='ap-pagination-style' >
                            <span onClick={handlePreviousUsers} ><ArrowBackIcon /></span>
                            <div> Page no.{pageNumber} of {Math.ceil(totalRoles / limit)}</div>
                            <span onClick={handleNextUsers}><ArrowForwardIcon /></span>
                        </div>
                    }

                </div>
            </div>
            {createRoleModal()}
            {editUserModal()}

            <Snack msg={snackMsg} open={openSnack} onClose={handleCloseSnack} severity={severity} />
            <Loader isLoading={isLoading} />
        </div>
    )
}
