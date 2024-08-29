import React from 'react'
import OverviewSection from './OverviewSection/page'
import ActionsSection from './alert/page'
import StatisticsSection from './statistics/page'

const Dashboard = () => {
  return (
    <div>
      <OverviewSection />
      <ActionsSection />
      <StatisticsSection />
    </div>
  )
}

export default Dashboard