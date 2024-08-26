import React, { useState, ReactNode } from 'react';
import Navbar from '../components/shared/Navbar';
import Sidebar from '../components/shared/Sidebar';



const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex h-screen overflow-x-hidden">
        <div
          className={`fixed left-0 top-0 h-full z-[1045] visible bg-primary ${
            open ? 'w-20' : 'w-64'
          } flex-none transition-width duration-300`}
        >
          <aside>
            <Sidebar open={open} setOpen={setOpen} />
          </aside>
        </div>

        <div
          className={`flex flex-col ${
            open
              ? 'w-[calc(100%_-_64px)] ml-16'
              : 'w-[calc(100%_-_256px)] ml-64'
          } transition duration-300`}
        >
          <header
            className={`fixed ${
              open ? 'left-16' : 'left-64'
            } right-0 top-0 h-16 flex-none z-10 bg-[#3fa9a9] shadow transition duration-300`}
          >
            <Navbar />
          </header>
          <main className="mt-16 flex-grow bg-background px-4 py-6">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
