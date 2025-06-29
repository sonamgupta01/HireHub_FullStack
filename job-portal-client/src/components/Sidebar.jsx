import React from 'react';
import { Link } from 'react-router-dom';
import QuizLink from './Quiz/QuizLink';

const Sidebar = () => {
  return (
    <div className='space-y-4'>
      <div className='bg-white p-4 rounded'>
        <nav>
          <ul className='space-y-2'>
            <li>
              <Link to='/' className='block hover:bg-gray-100 px-3 py-2 rounded'>
                Home
              </Link>
            </li>
            <li>
              <Link to='/my-job' className='block hover:bg-gray-100 px-3 py-2 rounded'>
                My Jobs
              </Link>
            </li>
            <li>
              <Link to='/post-job' className='block hover:bg-gray-100 px-3 py-2 rounded'>
                Post A Job
              </Link>
            </li>
            <li>
              <Link to='/salary' className='block hover:bg-gray-100 px-3 py-2 rounded'>
                Salary Estimate
              </Link>
            </li>
          </ul>
          <QuizLink />
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;