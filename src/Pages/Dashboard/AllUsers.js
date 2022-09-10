import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import axiosPrivate from '../../Api/axiosPrivate';
import Loading from '../../Components/Loading/Loading';
import UsersRow from './UsersRow';

const AllUsers = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const { isLoading } = useQuery('user', () =>
        axiosPrivate.get('http://localhost:4000/user')
        .then(res => {
            setUsers(res.data);
        })        
    );
   

    const handleDelete = id => {
        const proceed = window.confirm('Are you sure want to delete this item ?')
        if (proceed) {
          const url = `http://localhost:4000/user/${id}`
          fetch(url, {
            method: 'DELETE',
          })
            .then(res => res.json())
            .then(data => {
              const remaining = users.filter(order => order._id !== id);
              setUsers(remaining);
              swal({
                title: "Successfully",
                text: "Delete This Item",
                icon: "success",
                buttons: false,
              });
            })
        }
          return;
      }

    if (isLoading) {
        <Loading />
    }


    return (
        <div className='bg-gradient-to-r  from-[#00214124] to-[#19d3ae2e] h-screen w-full'>
            <div class="overflow-x-auto">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th className='text-center'>Serial No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Make Admin</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users && [...users]?.reverse().map((user, index) => <UsersRow
                                index={index}
                                key={user._id}
                                user={user}
                                handleDelete={handleDelete}
                            ></UsersRow>)
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default AllUsers;