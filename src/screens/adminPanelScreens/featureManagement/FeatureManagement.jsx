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
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

export default function FeatureManagement() {

    let [userData, setUserData] = useState({});
    let [pageNumber, setPageNumber] = useState(1);
    let [totalFeatures, setTotalFeatures] = useState(0);
    let [limit, setLimit] = useState(0)
    let [features, setFeatures] = useState([])
    let [openCreateFeatureModal, setOpenCreateFeatureModal] = useState(false)
    let [openEditFeatureModal, setOpenEditFeatureModal] = useState(false)
    let [featureObj, setFeatureObj] = useState({
        name: '',
        description: '',
    })
    let [editFeatureObj, setEditFeatureObj] = useState({});
    let [openAssignRolesModal, setOpenAssignRolesModal] = useState(false)

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

    const handlePreviousFeatures = () => {
        if (pageNumber !== 1) {
            setPageNumber(pageNumber - 1)
        } else {
            setSnackMsg('Your are already at the first page.');
            setOpenSnack(true);
        }
    }

    const handleNextFeatures = () => {
        if (pageNumber < Math.ceil(totalFeatures / limit)) {
            setPageNumber(pageNumber + 1);
        } else {
            setSnackMsg('Your are already at the last page.');
            setOpenSnack(true);
        }
    }

    const getFeatures = () => {
        setIsLoading(true)
        getData(`/getallallowfeatures?page=${pageNumber}`).then((response) => {
            if (response.success) {
                setFeatures(response.data)
                setTotalFeatures(response.totalFeatures)
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
        getFeatures();
    }, [pageNumber])

    const deleteFeature = (id) => {
        setIsLoading(true)
        deleteData(`/feature/delete/${id}`).then((response) => {
            if (response.success) {
                setSnackMsg(response.message);
                setOpenSnack(true);
                setSeverity('success');
                getFeatures();
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

    const handleCreateFeature = () => {
        setIsLoading(true)
        const { name, description } = featureObj;
        if (description && name) {
            // api call 
            postData('/feature', featureObj).then((response) => {
                if (response.success) {
                    setOpenCreateFeatureModal(false)
                    setSnackMsg(response.message);
                    setOpenSnack(true);
                    setSeverity('success');
                    setIsLoading(false);
                    getFeatures();
                    setFeatureObj({
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
        featureObj[key] = value;
        setFeatureObj({ ...featureObj })
    }

    const createFeatureModal = () => {
        return (
            <Modal open={openCreateFeatureModal}>
                <div className='ap-userModal-style' >
                    <div className='ap-userModal-content'>
                        <div
                            onClick={() => setOpenCreateFeatureModal(false)}
                            className='ap-modal-cancel-icon'><CancelIcon /></div>
                        <InputField
                            onChange={(e) => setInpValue("name", e.target.value)}
                            value={featureObj?.name}
                            icon={accountIcon} placeholder='Feature Name' />

                        <InputField
                            onChange={(e) => setInpValue("description", e.target.value)}
                            value={featureObj?.description}
                            icon={emailIcon} placeholder='Feature Description' />

                        <Btn label='Create Feature' onClick={handleCreateFeature} />
                    </div>
                </div>
            </Modal >
        )
    }

    const setInpValue1 = (key, value) => {
        editFeatureObj[key] = value;
        setEditFeatureObj({ ...editFeatureObj })
    }

    const editFeature = (item) => {
        setEditFeatureObj(item)
        setOpenEditFeatureModal(true)
    }

    const handleEditFeature = () => {
        setIsLoading(true)
        const { description, name, _id } = editFeatureObj;
        if (description && name) {
            // api call 
            putData(`/feature/update/${_id}`, editFeatureObj).then((response) => {
                if (response.success) {
                    setOpenEditFeatureModal(false)
                    setSnackMsg(response.message);
                    setOpenSnack(true);
                    setSeverity('success');
                    setIsLoading(false);
                    getFeatures();
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


    const editFeatureModal = () => {
        return (
            <Modal open={openEditFeatureModal}>
                <div className='ap-userModal-style' >
                    <div className='ap-userModal-content'>
                        <div
                            onClick={() => setOpenEditFeatureModal(false)}
                            className='ap-modal-cancel-icon'><CancelIcon /></div>
                        <InputField
                            onChange={(e) => setInpValue1("name", e.target.value)}
                            value={editFeatureObj?.name}
                            icon={accountIcon} placeholder='Feature Name' />

                        <InputField
                            onChange={(e) => setInpValue1("description", e.target.value)}
                            value={editFeatureObj?.description}
                            icon={emailIcon} placeholder='Feature Description' />

                        <Btn label='Save Changes' onClick={handleEditFeature} />
                    </div>
                </div>
            </Modal >
        )
    }

    let [roles, setRoles] = useState([]);
    let [idForRoles, setIdForRoles] = useState('')
    let [rolesName, setRolesName] = useState([]);


    const assignRoles = (id) => {
        setOpenAssignRolesModal(true);
        setIdForRoles(id);
    }

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;

        setRolesName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );

    };



    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const assignRolesModal = () => {
        return (
            <Modal open={openAssignRolesModal}>
                <div className='ap-userModal-style' >
                    <div className='ap-userModal-content'>
                        <div
                            onClick={() => setOpenAssignRolesModal(false)}
                            className='ap-modal-cancel-icon'><CancelIcon /></div>

                        <div>
                            <FormControl sx={{ m: 1, width: '370px', maxWidth: '90%', margin: '30px 0px' }}>
                                <InputLabel id="demo-multiple-checkbox-label">Roles</InputLabel>
                                <Select
                                    labelId="demo-multiple-checkbox-label"
                                    id="demo-multiple-checkbox"
                                    multiple
                                    value={rolesName}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Roles" />}
                                    renderValue={(selected) => `${selected.length} Item${selected.length > 1 ? 's' : ''} Selected`}
                                    MenuProps={MenuProps}
                                >
                                    {roles && roles.length > 1 && roles.map((item) => (
                                        <MenuItem key={item?._id} value={item?._id}>
                                            <Checkbox checked={rolesName.indexOf(item?._id) > -1} />
                                            <ListItemText primary={item?.name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>


                        <Btn label='Assign Roles' onClick={handleAssignRoles} />
                    </div>
                </div>
            </Modal >
        )
    }

    const handleAssignRoles = () => {
        setIsLoading(true)
        const rolesObj = {
            featureId: idForRoles,
            roleIds: rolesName
        }
        if (idForRoles && rolesName) {
            // api call 
            postData('/allow-feature', rolesObj).then((response) => {
                if (response.success) {
                    setOpenAssignRolesModal(false)
                    setSnackMsg(response.message);
                    setOpenSnack(true);
                    setSeverity('success');
                    setIsLoading(false);
                    setRolesName([])
                    getFeatures()

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
                    <div onClick={() => setOpenCreateFeatureModal(true)} className="ap-add-user-btn">Add Feature</div>
                </div>
            </div>

            <div className="ap-table-data">
                <div className="ap-table-data-header">
                    <div>
                        <div className="ap-table-data-heading">All Features</div>
                        <div className="ap-table-data-subHeading">Active Features : {totalFeatures}</div>
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
                        <Grid item sm={2}>
                            <div className="table-data-heading">
                                Name
                            </div>
                        </Grid>
                        <Grid item sm={4}>
                            <div className="table-data-heading">
                                Description
                            </div>
                        </Grid>
                        <Grid item sm={3}>
                            <div className="table-data-heading">
                                Allowed Roles
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
                    {features && features.length > 0 &&
                        features.map((item) => {
                            return (
                                <div key={item?._id} className="table-data-content-item">
                                    <Grid container spacing={3}>
                                        <Grid item sm={2} xs={12}>
                                            <div className="table-data-item-text">
                                                <span>Name: </span>
                                                {item?.name}
                                            </div>
                                        </Grid>
                                        <Grid item sm={4} xs={12}>
                                            <div className="table-data-item-text">
                                                <span>Description: </span>
                                                {item?.description}
                                            </div>
                                        </Grid>
                                        <Grid item sm={3} xs={12}>
                                            <div className="table-data-item-text">
                                                <span>Allowed Roles: </span>
                                                {item?.role && item?.role.length > 0 &&
                                                    item?.role.map((e) => `${e.name}, `)
                                                }
                                            </div>
                                        </Grid>
                                        <Grid item sm={3} xs={12}>
                                            <div className="table-data-item-btns">
                                                <div onClick={() => assignRoles(item?._id)} className="ap-assign-btn">
                                                    Assign Roles
                                                </div>
                                                <div
                                                    onClick={() => editFeature(item)}
                                                    className="ap-edit-btn">
                                                    Edit
                                                </div>
                                                <div
                                                    onClick={() => deleteFeature(item?._id)}
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
                    {features && features.length > 0 &&
                        <div className='ap-pagination-style' >
                            <span onClick={handlePreviousFeatures} ><ArrowBackIcon /></span>
                            <div> Page no.{pageNumber} of {Math.ceil(totalFeatures / limit)}</div>
                            <span onClick={handleNextFeatures}><ArrowForwardIcon /></span>
                        </div>
                    }

                </div>
            </div>
            {createFeatureModal()}
            {editFeatureModal()}
            {assignRolesModal()}

            <Snack msg={snackMsg} open={openSnack} onClose={handleCloseSnack} severity={severity} />
            <Loader isLoading={isLoading} />
        </div>
    )
}
