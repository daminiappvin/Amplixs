import React, { useEffect, useState } from 'react';
import AuthLayout from "../components/auth/AuthLayout";
const Error500 = () => {
    return (
        <AuthLayout>
          <div>
            <h1>500 - Server error !</h1>
            <p>Experiance internal server error.</p>
          </div>
        </AuthLayout>
      );
    };
    
export default Error500;