import { useEffect,useState,useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit,faEye , faTrash } from '@fortawesome/free-solid-svg-icons';
export default function Userlist() {
    return (
        <div className="user-list-container p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">User Management</h1>
        <div className="flex gap-4">
          <button className="bg-green-500 text-white px-4 py-2 rounded">Export</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Add Users</button>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search"
          className="border border-gray-300 px-4 py-2 rounded"
        />
        <div className="flex gap-4">
          <select className="border border-gray-300 px-4 py-2 rounded">
            <option value="">Select Role</option>
            <option value="Client">Client</option>
            <option value="Admin">Admin</option>
          </select>
          <div className="flex gap-2 items-center">
            <label className="flex items-center gap-1">
              <input type="radio" name="status" value="Active" />
              Active
            </label>
            <label className="flex items-center gap-1">
              <input type="radio" name="status" value="Passive" />
              Passive
            </label>
          </div>
        </div>
      </div>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="text-left p-2 border-b">S.no</th>
            <th className="text-left p-2 border-b">E-mail</th>
            <th className="text-left p-2 border-b">Username</th>
            <th className="text-left p-2 border-b">Role</th>
            <th className="text-left p-2 border-b">Status</th>
            <th className="text-left p-2 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Render user rows here */}
          <tr>
            <td className="p-2 border-b">1</td>
            <td className="p-2 border-b">Jhon@xyz.com</td>
            <td className="p-2 border-b">John_user1</td>
            <td className="p-2 border-b">Client</td>
            <td className="p-2 border-b text-green-500">Active</td>
            <td className="p-2 border-b">
            <FontAwesomeIcon icon={faEye} className="mr-2" />
            <FontAwesomeIcon icon={faEdit}className="mr-2" />
            <FontAwesomeIcon icon={faTrash} className="mr-2"/>
            </td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-2 items-center">
          <label>Items per Page</label>
          <select className="border border-gray-300 px-4 py-2 rounded">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        <div>
          <span>1 - 12 of 12</span>
        </div>
      </div>
    </div>
    );
}