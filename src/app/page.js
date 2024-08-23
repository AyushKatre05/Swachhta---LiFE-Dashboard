"use client";
import DashboardLayout from "@/app/(pages)/layout";
import OverviewSection from "@/app/(pages)/OverviewSection/page";
import ActionsSection from "@/app/(pages)/alert/page";
import StatisticsSection from "@/app/(pages)/statistics/page";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <OverviewSection />
      <ActionsSection />
      <StatisticsSection />
    </DashboardLayout>
  );
}
