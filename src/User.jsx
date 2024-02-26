import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "./components/Header";
import Preloader from "../src/image/preloader.gif";

const User = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        const headers = {
          Authorization: `Bearer ${authToken}`,
        };

        const response = await axios.get(process.env.REACT_APP_GETALL_USER, { headers });

        // Simulate a 1-second delay before updating the state and hiding the loader
        setTimeout(() => {
          setUserData(response.data);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchData();
  }, []);

  return (
    <div>
              <Header />
      {loading ? (
        <div className='preloader'>
          <img className='preloaderimg' src={Preloader} alt="preloader img" />
        </div>
      ) : (
        <div className='user'>
          <div className="usercon">
            
            <table  style={{ width: '90%' }}>
              <thead>
                <tr className='head'>
                  <th style={{ width: '20%' }}>Name</th>
                  <th style={{ width: '40%' }}>Email</th>
                  <th style={{ width: '10%' }}>Contact No</th>
                  <th style={{ width: '10%' }}>Last Login</th>
                  <th style={{ width: '30%' }}>Account Created On</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user) => (
                  <tr key={user._id}>
                    <td>{`${user.firstName} ${user.lastName}`}</td>
                    <td>{user.email}</td>
                    <td>{user.contactNumber}</td>
                    <td>{user.lastLogin.length > 0 ? user.lastLogin[0] : 'N/A'}</td>
                    <td>{new Date(Number(user.createdOn)).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
