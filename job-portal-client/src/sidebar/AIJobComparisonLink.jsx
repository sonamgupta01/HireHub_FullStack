import React from 'react'
import { Link } from 'react-router-dom'
import { FaRobot, FaChartBar } from 'react-icons/fa'

const AIJobComparisonLink = () => {
  return (
    <div className='bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200'>
      <div className='flex items-center gap-2 mb-2'>
        <FaRobot className='text-purple-600' />
        <h4 className='font-semibold text-gray-800'>AI Job Comparison</h4>
      </div>
      <p className='text-sm text-gray-600 mb-3'>
        Upload your resume and get AI-powered job matching with detailed analysis
      </p>
      <Link
        to="/ai-job-comparison"
        className='inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200'
      >
        <FaChartBar />
        Try AI Analysis
      </Link>
    </div>
  )
}

export default AIJobComparisonLink 