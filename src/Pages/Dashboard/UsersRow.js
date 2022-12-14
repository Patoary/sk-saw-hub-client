import React from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { toast } from 'react-toastify';
import axiosPrivate from '../../Api/axiosPrivate';
import PrimaryButton from '../../Components/PrimaryButton/PrimaryButton';

const UsersRow = ({ user, index, handleDelete, refetch }) => {
    const { name, email, _id, role } = user;
    const makeAdmin = () => {
        axiosPrivate.put(`https://lit-wildwood-53633.herokuapp.com/user/admin/${email}`)
        .then(res => {
            if(res.data.modifiedCount){
                refetch();
                toast.success('Successfully made an admin');
            }
           
        })   
    }
    return (
        <>
        <tr className='w-full '>
            <th className='text-center'>{index + 1}</th>
            <td>{name}</td>
            <td>{email}</td>
            <td>{role !== 'admin' && <PrimaryButton><span onClick={makeAdmin}>Admin</span></PrimaryButton>}</td>
            <td><MdDeleteOutline
                className='text-red-500 rounded-full text-3xl cursor-pointer'
            onClick={()=> handleDelete(_id)}
            /></td>
        </tr>
        
        </>
    );
};

export default UsersRow;