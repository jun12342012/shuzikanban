<template>
  <div class="dashboard">
    <DashboardHeader />
    <div class="dashboard-body">
      <TakeoverPanel />
      <RiskPanel />
      <AssetPanel />
      <EfficiencyPanel />
      <WorkOrderPanel />
      <ProjectPanel />
    </div>
  </div>
</template>

<script setup>
/**
 * @component Dashboard
 * @description 大运维大安全驾驶舱主页面，3列x2行网格布局
 */
import DashboardHeader from '../components/DashboardHeader.vue'
import TakeoverPanel from '../panels/TakeoverPanel.vue'
import RiskPanel from '../panels/RiskPanel.vue'
import AssetPanel from '../panels/AssetPanel.vue'
import EfficiencyPanel from '../panels/EfficiencyPanel.vue'
import WorkOrderPanel from '../panels/WorkOrderPanel.vue'
import ProjectPanel from '../panels/ProjectPanel.vue'
</script>

<style>
@import '../assets/styles/dashboard.css';
</style>
